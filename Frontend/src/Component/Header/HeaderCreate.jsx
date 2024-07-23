import React from 'react';
import DocumentSearchBar from '../DocumentSearchBAr/DocumentSearchBAr';
import UserDropDown from '../UserDropDown/UserDropDown';

const DocumentCreateHeader = () => {
  return (
    <div className="w-full px-3 py-1 flex justify-between items-center">
      <p>"CollabDocs"</p>
      <DocumentSearchBar />
      <UserDropDown />
    </div>
  );
};

export default DocumentCreateHeader;
