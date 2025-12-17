import '../../styles/features/fretboard/board.scss'
import { notesFlat, notesSharp, fretmarkDots, baseOctaves } from './constants';
import React from 'react';

export default function Board({
  accidentals,
  numFrets,
  tuning,
  selectedNotes,
  onSelect,
}) {
  return (
    <>
      <div className='fretboard'>
        {[...Array(6)].map((_, stringIdx) => {
          return (
            <div className='string' key={stringIdx} id={(stringIdx + 1).toString()}>
              {[...Array(numFrets + 1)].map((_, fret) => {
                const pitch = tuning[stringIdx] + fret;
                let octave = baseOctaves[stringIdx];
                const noteName =
                  accidentals === 'sharps'
                    ? notesSharp[pitch % 12]
                    : notesFlat[pitch % 12];
                if (noteName === 'E' && fret > 0) octave += 1;
                const isSelected =
                  selectedNotes[stringIdx + 1]?.note === noteName &&
                  selectedNotes[stringIdx + 1]?.octave === octave &&
                  selectedNotes[stringIdx + 1]?.fret === fret;
                const showSingle = fretmarkDots.includes(fret) && stringIdx === 0;
                const showDouble = fret === 12 && stringIdx === 0;

                return (
                  <div
                    key={fret}
                    className={`note-fret ${showSingle ? 'single-fretmark' : ''}`}
                    data-note={noteName}
                    style={{ '--noteOpacity': isSelected ? 1 : 0 }}
                    onClick={() => onSelect(stringIdx + 1, noteName, octave, fret)}
                  >
                    {showDouble && <div className="double-fretmark" />}
                  </div>
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
