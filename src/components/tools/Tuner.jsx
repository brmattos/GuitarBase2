import '../../styles/tools/tuner.scss';
import { useEffect, useRef, useState } from "react";

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function frequencyToNote(freq) {
  const noteNumber = 12 * (Math.log2(freq / 440)) + 69;
  const noteIndex = Math.round(noteNumber) % 12;
  const octave = Math.floor(Math.round(noteNumber) / 12) - 1;
  const noteName = NOTES[noteIndex];
  const cents = Math.floor((noteNumber - Math.round(noteNumber)) * 100);
  return { noteName, octave, cents };
}

function Tuner() {
  const [note, setNote] = useState("--");
  const [freq, setFreq] = useState(0);
  const [cents, setCents] = useState(0);
  const [isListening, setIsListening] = useState(false);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const streamRef = useRef(null);
  const bufferRef = useRef(new Float32Array(2048));
  const rafRef = useRef(null);

  const autoCorrelate = (buffer, sampleRate) => {
    let SIZE = buffer.length;
    let rms = 0;
    for (let i = 0; i < SIZE; i++) rms += buffer[i] * buffer[i];
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return -1;

    let r1 = 0, r2 = SIZE - 1, threshold = 0.2;
    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buffer[i]) < threshold) { r1 = i; break; }
    }
    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buffer[SIZE - i]) < threshold) { r2 = SIZE - i; break; }
    }

    buffer = buffer.slice(r1, r2);
    SIZE = buffer.length;

    let c = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) {
        c[i] += buffer[j] * buffer[j + i];
      }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;
    let maxval = -1, maxpos = -1;
    for (let i = d; i < SIZE; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }

    let T0 = maxpos;
    return sampleRate / T0;
  };

  const updatePitch = () => {
    if (!analyserRef.current) return;
    analyserRef.current.getFloatTimeDomainData(bufferRef.current);
    const freq = autoCorrelate(bufferRef.current, audioContextRef.current.sampleRate);
    if (freq > 0) {
      setFreq(freq.toFixed(2));
      const { noteName, octave, cents } = frequencyToNote(freq);
      setNote(`${noteName}${octave}`);
      setCents(cents);
    }
    rafRef.current = requestAnimationFrame(updatePitch);
  };

  const startTuner = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
    sourceRef.current.connect(analyserRef.current);
    analyserRef.current.fftSize = 2048;
    setIsListening(true);
    updatePitch();
  };

  const stopTuner = () => {
    // Stop animation loop, microphone input, & close audio context
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setIsListening(false);
    setNote("--");
    setFreq(0);
    setCents(0);
  };

  const toggleTuner = () => {
    if (isListening) stopTuner();
    else startTuner();
  };

  useEffect(() => {
    return () => stopTuner();
  }, []);

  return (
    <div className='tuner'>
      <div className='tuner-display'>
        <div className='note'>{note}</div>
        <div className='freq'>{freq ? `${freq} Hz` : '--'}</div>
      </div>
      <div className='tuner-gauge'>
        <img src='images/tuner-gauge.png' alt='Tuner gauge' className='gauge-img' />
        <div className='needle' style={{ transform: `translateX(-50%) rotate(${cents * 0.9}deg)` }} />
      </div>
      <button className='start-stop-btn' onClick={toggleTuner}>
        {isListening ? 'STOP' : 'START'}
      </button>
    </div>
  );
}

export default Tuner;