import React, { useContext, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useRandomBackground from '../../hooks/useRandomBackground';
import { CSSTransition } from 'react-transition-group';

const UserDropDown = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { backgroundColor } = useRandomBackground();
  const dropdownRef = useRef(null);
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await logout();
    // To
    navigate('/login');
  };

  return (
    <div className="relative" onBlur={() => setShowDropDown(false)}>
      <button
        onClick={() => setShowDropDown(!showDropDown)}
        className={`${backgroundColor} w-8 h-8 text-white font-semibold flex justify-center items-center rounded-full ring-2 flex-shrink-0 uppercase`}
      >
        {email !== null && email[0]}
      </button>
      <CSSTransition
        nodeRef={dropdownRef}
        in={showDropDown}
        timeout={200}
        className="fade-in"
        unmountOnExit
        children={
          <div
            ref={dropdownRef}
            className="absolute top-full mt-1 right-0 z-10 w-52 bg-white py-2 rounded-sm shadow-lg border"
          >
            <button
              onClick={logoutUser}
              className="w-full text-black hover:bg-gray-100 text-sm px-6 py-1 text-left "
            >
              Logout
            </button>
          </div>
        }
      />
    </div>
  );
};

export default UserDropDown;
