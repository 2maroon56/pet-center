import React, { useState, useEffect } from 'react';
import { auth } from "../../Components/firebase/firebase"; // Assuming you have a firebase config file
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {updateProfile  } from "firebase/auth"; // Assuming you have imported auth
import { faPaw } from '@fortawesome/free-solid-svg-icons';

function Header({user}) {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logout = () => {
    auth.signOut().then(() => {
      localStorage.clear();
      navigate("/");
      toggleDropdown();
    });
  };

  const homePage = () => {
    navigate("/")
  }

  const updateAccount = async () => {
    toggleDropdown();
    setIsLoading(true); // Set loading to true when starting the update
    try {
      // Update displayName in Firebase
      await updateProfile(auth.currentUser, {
        displayName: user.username,
      });
      navigate("/update-account");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false when the update is done
    }
  };

  useEffect(() => {
    if (user) {
      setIsLoading(false); // Set loading to false when user data is loaded
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading message while loading
  }

  return(
    <header className="header">
      <div onClick={homePage} className="logo"><FontAwesomeIcon icon={faPaw} /> Pet Center</div>
      <i className="bx bx-menu" id="menu-icon"></i>
      <nav className="navbar">
        <div onClick={homePage} className="active home">Home</div>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
        {user ? (
          <div className="dropdown">
            <span onClick={toggleDropdown} className="username">{user.displayName || user.email}</span>
            <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
              <div onClick={updateAccount}>Update Account</div>
              <div onClick={logout}>Logout</div>
            </div>
          </div>
        ) : (
          <button><a href="/signIn">Login</a></button>
        )}
      </nav>
    </header>
  );
}

export default Header;
