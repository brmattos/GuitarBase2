import React, { useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import '../../styles/features/library/libraryRow.scss';

const LibraryRow = ({ song, setLibrary }) => {
  const [localSong, setLocalSong] = useState(song);

  const updateField = async (field, value) => {
    setLocalSong((prev) => ({ ...prev, [field]: value }));
    const docRef = doc(db, 'users', song.userId, 'library', song.id);
    await updateDoc(docRef, { [field]: value });
  };

  const toggleFavorite = () => {
    updateField('favorite', !localSong.favorite);
  };

  const cycleStatus = () => {
    const nextStatus =
      localSong.status === 'not-learned'
        ? 'in-progress'
        : localSong.status === 'in-progress'
        ? 'learned'
        : 'not-learned';
    updateField('status', nextStatus);
  };

  const goToTabs = async (e) => {
    e.preventDefault();

    // Build the search link
    let searchQuery = '';
    if (localSong.song) searchQuery += localSong.song.split(' ').join('%20');
    if (localSong.artist) searchQuery += '%20' + localSong.artist.split(' ').join('%20');
    if (!searchQuery) return;
    const link = `https://www.ultimate-guitar.com/search.php?search_type=title&value=${searchQuery}`;
    window.open(link, '_blank');

    // Update Firebase + local state
    const docRef = doc(db, 'users', song.userId, 'library', song.id);
    await updateDoc(docRef, { tabs: link });
    setLocalSong((prev) => ({ ...prev, tabs: link }));
  };

  const deleteEntry = async () => {
    const docRef = doc(db, 'users', song.userId, 'library', song.id);
    await deleteDoc(docRef);
    setLibrary((prev) => prev.filter((s) => s.id !== song.id));
  };

  return (
    <tr>
      <td>
        <span className='favorite' style={{ color: localSong.favorite ? 'gold' : '' }} onClick={toggleFavorite}>
          &#9733;
        </span>
      </td>
      <td>
        <button className='status' id={localSong.status} onClick={cycleStatus}>
          {localSong.status === 'not-learned'
            ? 'Not Learned'
            : localSong.status === 'in-progress'
            ? 'In Progress'
            : 'Learned'}
        </button>
      </td>
      <td>
        <input type='text' value={localSong.song} className='song' onChange={(e) => updateField('song', e.target.value)} />
      </td>
      <td>
        <input type='text' value={localSong.artist} className='artist' onChange={(e) => updateField('artist', e.target.value)} />
      </td>
      <td>
        <input type='text' value={localSong.tuning} className='tuning' onChange={(e) => updateField('tuning', e.target.value)} />
      </td>
      <td>
        <a href={localSong.tabs || '#'} onClick={goToTabs} target="_blank" rel="noreferrer">
          <OpenInNewIcon className="td-icon" />
        </a>
      </td>
      <td><PlayCircleIcon className='td-icon' /></td>
      <td><DeleteIcon className='td-icon' onClick={deleteEntry} /></td>
    </tr>
  );
};

export default LibraryRow;