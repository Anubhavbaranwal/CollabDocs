import React, { useContext } from 'react';
import { EditorContext } from '../../Context/Editor.context';
import { EditorState, RichUtils } from 'draft-js';
import IconButton from '../Iconbtn/Icon-btn';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';
import FontSelect from '../Font-Select/Font-Select';

const EditorToolbar = () => {
  const { editorState, setEditorState } = useContext(EditorContext);

  const handleUndoBtnClick = () => {
    setEditorState(EditorState.undo(editorState));
  };

  const handleRedoBtnClick = () => {
    setEditorState(EditorState.redo(editorState));
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  return (
    <div className="w-full h-9 px-3 py-1 flex-shrink-0 flex items-center">
      <IconButton
        onClick={handleUndoBtnClick}
        icon={<ArrowLeftIcon className="h-4 w-4" />}
        tooltip="Undo"
      />
      <IconButton
        onClick={handleRedoBtnClick}
        icon={<ArrowRightIcon className="h-4 w-4" />}
        tooltip="Redo"
      />
      <div className="h-5 border-1 border-gray-300 mx-2"></div>
      <FontSelect />
    </div>
  );
};

export default EditorToolbar;
