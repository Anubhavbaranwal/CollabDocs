import React from 'react';
import DocumentMenuBar from '../DocumentMenuBar/DocumentMenuBar';
import EditorToolbar from '../Editor-Toolbar/Toolbar';

const DocumentHeader = ({ documentHeaderRef }) => {
    console.log(documentHeaderRef);
    
  return (
    <div ref={documentHeaderRef} className="border-b w-full bg-white flex flex-col">
      <DocumentMenuBar />
      <EditorToolbar />
    </div>
  );
};

export default DocumentHeader;
