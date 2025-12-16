import '../../styles/features/fretboard.scss'
import { notesFlat, notesSharp, fretmarkDots } from './constants';
import React from 'react';

export default function Board({ accidentals, numFrets, tuning, selectedNotes, onSelect }) {
  return (
    <>
      <div className='fretboard'>
        {[...Array(6)].map((_, stringIdx) => {
          let octave = stringIdx === 0 ? 3 : 2;

          return (
            <div
              className='string'
              key={stringIdx}
              id={(stringIdx + 1).toString()}>
              {[...Array(numFrets + 1)].map((_, fret) => {
                const pitch = tuning[stringIdx] + fret;
                const noteName =
                  accidentals === 'sharps'
                    ? notesSharp[pitch % 12]
                    : notesFlat[pitch % 12];

                if (noteName === 'E' && fret > 0) octave++;

                const isSelected =
                  selectedNotes[stringIdx + 1]?.note === noteName &&
                  selectedNotes[stringIdx + 1]?.octave === octave;

                const fretClasses = [];
                if (fret === 12 && stringIdx === 0)
                  fretClasses.push('double-fretmark');
                else if (fretmarkDots.includes(fret) && stringIdx === 0)
                  fretClasses.push('single-fretmark');

                return (
                  <div
                    key={fret}
                    className={`note-fret ${fretClasses.join(' ')}`}
                    data-note={noteName}
                    octave={octave}
                    style={{ '--noteOpacity': isSelected ? 1 : 0 }}
                    onClick={() => onSelect(stringIdx + 1, noteName, octave)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      <div className='numbers'>
        {[...Array(numFrets + 1)].map((_, fret) => (
          <div key={fret} className='fret-number'>
            {fret}
          </div>
        ))}
      </div>
    </>
  );
}
