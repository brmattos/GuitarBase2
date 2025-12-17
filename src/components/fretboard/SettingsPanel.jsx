import '../../styles/features/fretboard/settings-panel.scss';
import React from 'react';

export default function SettingsPanel({
  accidentals,
  setAccidentals,
  numFrets,
  setNumFrets,
  tuningNames,
  onChangeTuning,
  reset,
  play,
}) {
  return (
    <div className='settings-container'>
      <div className='settings'>
        {/* Accidentals */}
        <div className='setting-group'>
          <div className='accidental-selector'>
            <button
              className={`radio_label ${
                accidentals === 'sharps' ? 'active' : ''
              }`}
              onClick={() => setAccidentals('sharps')}>
              ♯
            </button>
            <button
              className={`radio_label ${
                accidentals === 'flats' ? 'active' : ''
              }`}
              onClick={() => setAccidentals('flats')}>
              ♭
            </button>
          </div>
          <h4 className='setting-title'>accidentals</h4>
        </div>

        {/* Fret Count */}
        <div className='setting-group'>
          <div className='fret-container'>
            <button onClick={() => setNumFrets((n) => Math.max(5, n - 1))}>
              -
            </button>
            <input readOnly value={numFrets} />
            <button onClick={() => setNumFrets((n) => Math.min(22, n + 1))}>
              +
            </button>
          </div>
          <h4 className='setting-title'>frets</h4>
        </div>
        <div className='line'></div>

        {/* Tuning Selection */}
        <div className='setting-group'>
          <div className='tuning-row'>
            {tuningNames.map((note, i) => (
              <button
                key={i}
                className='tuning-btn'
                onClick={() => onChangeTuning(i)}>
                {note}
              </button>
            ))}
          </div>
          <h4 className='setting-title'>tuning</h4>
        </div>
        <div className='line' />

        {/* Reset / Play */}
        <div className='setting-group'>
          <div className='btn-group'>
            <button className='reset-button' onClick={reset}>
              Reset
            </button>
            <button className='play-button' onClick={play}>
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
