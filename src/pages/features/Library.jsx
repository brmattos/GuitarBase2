import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/authContext';
import { db } from '../../firebase/firebase';
import LibraryHeader from '../../components/library/LibraryHeader';
import LibraryTable from '../../components/library/LibraryTable';
import '../../styles/features/library/library.scss';

function Library() {
  const { currentUser } = useAuth();
  const [library, setLibrary] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!currentUser) return;

    const loadLibrary = async () => {
      const userLibraryRef = collection(db, 'users', currentUser.uid, 'library');
      const snapshot = await getDocs(userLibraryRef);
      const songs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLibrary(songs.length ? songs : []); // start empty if no data
    };

    loadLibrary();
  }, [currentUser]);

  const filteredLibrary = library.filter((song) => {
    const term = searchTerm.toLowerCase();
    return (
      song.song.toLowerCase().includes(term) ||
      song.artist.toLowerCase().includes(term) ||
      song.tuning.toLowerCase().includes(term)
    );
  });

  const addSong = async () => {
    const userId = currentUser.uid;
    const userLibraryRef = collection(db, 'users', userId, 'library');
    const docRef = doc(userLibraryRef);
    await setDoc(docRef, {
      favorite: false,
      status: 'not-learned',
      song: '',
      artist: '',
      tuning: '',
      tabs: '',
      userId,
    });
    setLibrary([
      ...library,
      {
        id: docRef.id,
        favorite: false,
        status: 'not-learned',
        song: '',
        artist: '',
        tuning: '',
        tabs: '',
        userId,
      },
    ]);
  };

  return (
    <div className='library-container'>
      <LibraryHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <LibraryTable library={filteredLibrary} setLibrary={setLibrary} />
      <button className='add-btn' onClick={addSong}>ADD SONG</button>
    </div>
  );
}

export default Library;