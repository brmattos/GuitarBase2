import SettingsPanel from '../../components/fretboard/SettingsPanel';
import Board from '../../components/fretboard/Board';
import '../../styles/features/fretboard.scss'
import React, { useState } from 'react';
import { notesFlat, notesSharp, defaultTuning } from '../../components/fretboard/constants';


/** ------------------------------------------- Helpers ------------------------------------------- */

function getNoteName(index, accidentalMode) {
  return accidentalMode === 'sharps'
    ? notesSharp[index % 12]
    : notesFlat[index % 12];
}

function loadAudio() {
  const audio = {};
  for (let i = -12; i <= 47; i++) {
    audio[i] = new Audio(`../sounds/${i}.mp3`);
  }
  return audio;
}

export default function Fretboard() {
  const [accidentals, setAccidentals] = useState('sharps');
  const [numFrets, setNumFrets] = useState(12);
  const [tuning, setTuning] = useState(defaultTuning);
  const [selectedNotes, setSelectedNotes] = useState({});
  const audio = loadAudio();

  const handleSelect = (stringIndex, note, octave) => {
    setSelectedNotes((prev) => ({
      ...prev,
      [stringIndex]: { note, octave },
    }));
  };

  const handleReset = () => {
    setSelectedNotes({});
  };

  const handlePlay = async () => {
    for (let i = 1; i <= 6; i++) {
      if (selectedNotes[i]) {
        const key = selectedNotes[i].midiIndex;
        if (audio[key]) {
          audio[key].currentTime = 0;
          audio[key].play();
        }
        await new Promise((res) => setTimeout(res, 160));
      }
    }
  };

  return (
    <div>
      <SettingsPanel
        accidentals={accidentals}
        setAccidentals={setAccidentals}
        numFrets={numFrets}
        setNumFrets={setNumFrets}
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
      <div class='help-text'> press SPACE to play | press DELETE to reset </div>
    </div>
  );
}
