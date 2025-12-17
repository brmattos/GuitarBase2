import SettingsPanel from '../../components/fretboard/SettingsPanel';
import Board from '../../components/fretboard/Board';
import '../../styles/features/fretboard/fretboard.scss'
import { noteSounds, notesFlat, notesSharp, defaultTuning } from '../../components/fretboard/constants';
import React, { useState, useEffect, useCallback } from 'react';

export default function Fretboard() {
  const [accidentals, setAccidentals] = useState('sharps');
  const [numFrets, setNumFrets] = useState(12);
  const [tuning, setTuning] = useState(defaultTuning);
  const [selectedNotes, setSelectedNotes] = useState({});

  const tuningNames = tuning.map((noteIndex) =>
    accidentals === 'sharps'
      ? notesSharp[noteIndex % 12]
      : notesFlat[noteIndex % 12]
  ); 

  const handleSelect = (stringIndex, note, octave, fret) => {
    // Compute numeric sound key
    const noteIndex = notesSharp.indexOf(note);
    const soundKey = noteIndex + (octave - 1) * 12;

    setSelectedNotes((prev) => {
      // update from previous string selection
      const current = prev[stringIndex];
      if (current?.note === note && current?.octave === octave && current?.fret === fret) {
        const next = { ...prev };
        delete next[stringIndex];
        return next;
      }
      return {
        ...prev,
        [stringIndex]: { note, octave, fret, soundKey },
      };
    });
  };

  const handleChangeTuning = (stringIndex) => {
    setTuning((prev) => {
      const next = [...prev];
      next[stringIndex] = (next[stringIndex] + 1) % 12;
      return next;
    });
  };

  const handleReset = useCallback(() => {
    setSelectedNotes({});
    setNumFrets(12);
    setTuning(defaultTuning)
    setAccidentals('sharps')
  }, []);

  const handlePlay = useCallback(async () => {
    for (let i = 6; i >= 1; i--) {
      if (selectedNotes[i]) {
        const key = selectedNotes[i].soundKey;
        const audio = noteSounds[key];
        if (audio) {
          audio.currentTime = 0;
          audio.play();
        }
        await new Promise((res) => setTimeout(res, 50));
      }
    }
  }, [selectedNotes]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handlePlay();
      }
      if (e.code === 'Backspace' || e.code === 'Delete') {
        e.preventDefault();
        handleReset();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handlePlay, handleReset]);

  return (
    <div>
      <SettingsPanel
        tuningNames={tuningNames}
        accidentals={accidentals}
        setAccidentals={setAccidentals}
        numFrets={numFrets}
        setNumFrets={setNumFrets}
        onChangeTuning={handleChangeTuning}
        reset={handleReset}
        play={handlePlay}
      />
      <Board
        accidentals={accidentals}
        numFrets={numFrets}
        tuning={tuning}
        selectedNotes={selectedNotes}
        onSelect={handleSelect}
      />
      <div className='help-text'>press SPACE to play | press DELETE to reset</div>
    </div>
  );
}
