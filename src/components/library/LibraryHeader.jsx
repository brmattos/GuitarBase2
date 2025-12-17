import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import '../../styles/features/library/libraryHeader.scss';

function LibraryHeader({ searchTerm, setSearchTerm }) {
  return (
    <div className='table-heading'>
      <div className='heading-group'>
        <h1 style={{ marginLeft: '4rem' }}>Your Library</h1>
        <div className='input-group'>
          <input
            className='search'
            type='search'
            placeholder='Search ...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default LibraryHeader;
