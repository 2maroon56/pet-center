import React, { useState, useEffect } from 'react';
import { auth } from "../../Components/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {updateProfile  } from "firebase/auth"; 
import { getDatabase, ref, onValue, update } from "firebase/database";
import { faPaw } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const user = auth.currentUser;
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

  useEffect(() => {
    if (userId) {
      const db = getDatabase();
      const userRef = ref(db, "users/" + userId);

      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const username = setUsername(data.username);
        }
      });
    }
  }, [userId]);

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
      navigate("/account");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false when the update is done
    }
  };
  const pet = () => {

  }

  useEffect(() => {
    if (user) {
      setIsLoading(false); // Set loading to false when user data is loaded
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading message while loading
  }
  const aboutPage = () => {
    navigate("/about")
  }

  return(
    <header className="header">
      <div onClick={homePage} className="logo"><FontAwesomeIcon icon={faPaw} /> Pet Center</div>
      <i className="bx bx-menu" id="menu-icon"></i>
      <nav className="navbar">
        <a href='#home' onClick={homePage} className="active home">Home</a>

        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
        {user ? (
          <div className="dropdown">
            <span onClick={toggleDropdown} className="username">{user.displayName || username}</span>
            <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
              <div onClick={updateAccount}>Account</div>
              <div onClick={pet}>Pet</div>
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