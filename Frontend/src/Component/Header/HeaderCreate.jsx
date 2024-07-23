import React from 'react';
import DocumentSearchBar from '../DocumentSearchBAr/DocumentSearchBAr';
import UserDropDown from '../UserDropDown/UserDropDown';

const DocumentCreateHeader = () => {
  return (
    <div className="w-full px-3 py-1 flex justify-between items-center bg-blue-600 text-white">
      <h1 className='text-2xl font-bold'>CollabDcos</h1>
      <DocumentSearchBar />
      <UserDropDown />
    </div>
  );
};

export default DocumentCreateHeader;
