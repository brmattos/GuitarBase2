import '../../styles/tools/metronome.scss';
import Timer from '../../utils/timer.js';
import { useEffect, useState, useRef } from "react";

function Metronome() {
  const [bpm, setBpm] = useState(140);
  const [measureBeats, setMeasureBeats] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [tempoText, setTempoText] = useState("Steady");

  const click1 = useRef(new Audio("/sounds/click1.mp3"));
  const click2 = useRef(new Audio("/sounds/click2.mp3"));
  const measureBeatsRef = useRef(measureBeats);
  const metronomeRef = useRef(null);
  const countRef = useRef(0);

  // Update tempo text whenever BPM changes
  useEffect(() => {
    if (bpm <= 40) setTempoText("Super Slow");
    else if (bpm < 80) setTempoText("Slow");
    else if (bpm < 120) setTempoText("Getting there");
    else if (bpm < 180) setTempoText("Steady");
    else if (bpm < 220) setTempoText("Speeding up");
    else if (bpm < 240) setTempoText("Fast");
    else if (bpm < 260) setTempoText("Faster");
    else setTempoText("Super Fast");

    if (metronomeRef.current) {
      metronomeRef.current.timeInterval = 60000 / bpm;
    }
  }, [bpm]);

  useEffect(() => {
    measureBeatsRef.current = measureBeats;
  }, [measureBeats]);

  const playClick = () => {
    if (countRef.current === measureBeatsRef.current) {
      countRef.current = 0;
    }

    if (countRef.current === 0) {
      click1.current.currentTime = 0;
      click1.current.play();
    } else {
      click2.current.currentTime = 0;
      click2.current.play();
    }
    countRef.current++;
  };

  const startStop = () => {
    if (!isRunning) {
      metronomeRef.current = new Timer(playClick, 60000 / bpm, { immediate: true });
      metronomeRef.current.start();
      setIsRunning(true);
    } else {
      metronomeRef.current.stop();
      setIsRunning(false);
      countRef.current = 0;
    }
  };

  return (
    <div className="metronome">
      <div className="bpm-display">
        <span className="tempo">{bpm}</span>
        <span className="bpm">BPM</span>
      </div>
      <div className="tempo-speed-text">{tempoText}</div>
      <div className="tempo-settings">
        <div className="tempo-adjust decrease" onClick={() => bpm > 20 && setBpm(bpm - 1)}>-</div>
        <input type="range" className="tempo-slider" min="20" max="300" step="1" value={bpm} onChange={(e) => setBpm(Number(e.target.value))} />
        <div className="tempo-adjust increase" onClick={() => bpm < 280 && setBpm(bpm + 1)}>+</div>
      </div>
      <div className="measures">
        <div className="measure-adjust decrease" onClick={() => setMeasureBeats((prev) => (prev > 2 ? prev - 1 : prev))}>-</div>
        <div className="measure-count">{measureBeats}</div>
        <div className="measure-adjust increase" onClick={() => setMeasureBeats((prev) => (prev < 12 ? prev + 1 : prev))}>+</div>
      </div>
      <span className="bpm-text">Beats per Measure</span>
      <div className="start-stop-btn" onClick={startStop}>{isRunning ? "STOP" : "START"}</div>
    </div>
  );
}

export default Metronome;