import React, { useState } from 'react';
import LibraryRow from './LibraryRow';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import '../../styles/features/library/libraryTable.scss';

const LibraryTable = ({ library, setLibrary }) => {
  const [sortConfig, setSortConfig] = useState({
    column: null,
    ascending: true,
  });

  const handleSort = (column) => {
    const ascending =
      sortConfig.column === column ? !sortConfig.ascending : true;
    const sorted = [...library].sort((a, b) => {
      if (a[column] < b[column]) return ascending ? -1 : 1;
      if (a[column] > b[column]) return ascending ? 1 : -1;
      return 0;
    });
    setSortConfig({ column, ascending });
    setLibrary(sorted);
  };

  return (
    <div className='table-body'>
      <table>
        <thead>
          <tr>
            <th>&#9733;</th>
            <th onClick={() => handleSort('status')}>Status</th>
            <th onClick={() => handleSort('song')}>Song Title</th>
            <th onClick={() => handleSort('artist')}>Artist</th>
            <th onClick={() => handleSort('tuning')}>Tuning</th>
            <th><DocumentScannerIcon className='th-icon' /></th>
            <th><LibraryMusicIcon className='th-icon' /></th>
            <th><DeleteIcon className='th-icon' /></th>
          </tr>
        </thead>
        <tbody>
          {library.map((song) => (
            <LibraryRow key={song.id} song={song} setLibrary={setLibrary} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LibraryTable;