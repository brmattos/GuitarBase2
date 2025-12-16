import React from 'react';
import '../../styles/features/fretboard.scss';

export default function SettingsPanel({ accidentals, setAccidentals, numFrets, setNumFrets, reset, play }) {
  return (
    <div className='settings'>
      {/* Accidentals */}
      <div className='setting-group'>
        <div className='accidental-selector'>
          <button
            className={`radio_label ${accidentals === 'sharps' ? 'active' : ''}`}
            onClick={() => setAccidentals('sharps')}>
            ♯
          </button>
          <button
            className={`radio_label ${accidentals === 'flats' ? 'active' : ''}`}
            onClick={() => setAccidentals('flats')}>
            ♭
          </button>
        </div>
        <h4 className='setting-title'>accidentals</h4>
      </div>

      {/* Fret Count */}
      <div className='setting-group'>
        <div className='fret-container'>
          <button onClick={() => setNumFrets((n) => Math.max(5, n - 1))}>-</button>
          <input readOnly value={numFrets} />
          <button onClick={() => setNumFrets((n) => Math.min(22, n + 1))}>+</button>
        </div>
        <h4 className='setting-title'>frets</h4>
      </div>
      <div className='line'></div>

      {/* Reset / Play */}
      <div className='setting-group'>
        <button className='reset-button' onClick={reset}>Reset</button>
      </div>
      <div className='setting-group'>
        <button className='play-button' onClick={play}>Play</button>
      </div>
    </div>
  );
}
