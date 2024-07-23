import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const Modal = ({ button, content, size = 'md' }) => {
  const [showModal, setShowModal] = useState(false);
  const contentRef = useRef(null);

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm';
      case 'md':
        return 'max-w-2xl';
      case 'lg':
        return 'max-w-5xl';
      default:
        return 'max-w-2xl';
    }
  };

  return (
    <>
      <div onClick={() => setShowModal(true)}>{button}</div>
      <CSSTransition
        nodeRef={contentRef}
        in={showModal}
        timeout={200}
        classNames="fade-in"
        unmountOnExit
        appear
      >
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10">
          <div ref={contentRef} className={`${getSizeClass()} w-full z-10 p-4`}>
            {content}
          </div>
          <div
            onClick={() => setShowModal(false)}
            className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-0"
          ></div>
        </div>
      </CSSTransition>
    </>
  );
};

export default Modal;
