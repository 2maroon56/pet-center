import React, { useState, useEffect } from "react";
import { auth } from "../../Components/firebase/firebase"; 
import { useNavigate } from "react-router-dom";
import {updateProfile  } from "firebase/auth"; 
import { getDatabase, ref, onValue, update } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';


function Update() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = auth.currentUser;
console.log(user)
  useEffect(() => {
  
    if (user) {
      setUserId(user.uid);
      setEmail(localStorage.getItem('email') || '');
      setUsername(localStorage.getItem('username') || '');
      setPhone('');
      setAddress('');
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const db = getDatabase();
      const userRef = ref(db, "users/" + userId);

      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setEmail(data.email);
          setUsername(data.username);
          setPhone(data.phone);
          setAddress(data.address);
        }
        setLoading(false);
      });
    }
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when starting the update
    const updates = {};
    if (email) {
        updates.email = email;
        localStorage.setItem('email', email);
      }
      if (username) {
        updates.username = username;
        localStorage.setItem('username', username);
      }
      if (phone) {
        updates.phone = phone;
      }
      if (address) {
        updates.address = address;
      }
  
    if (Object.keys(updates).length > 0) {
      // Check if any updates are needed
      const user = auth.currentUser;
      if (user) {
        try {
          // Update displayName in Firebase
          await updateProfile(user, {
            displayName: username,
            phone: phone,
            address: address
          });
  
          // Update user data in your database
          await update(ref(getDatabase(), "users/" + userId), updates);
          navigate("/update-account")
          toast.success("Cập nhật thành công !!!");
        } catch (error) {
          alert("Lỗi");
        }
      }
    } else {
      alert("No changes to update");
    }
    setLoading(false); // Set loading to false if there are no changes to update
  };

  return (
    <div className="container container-update" id="container">
      <div className="account">
      <h3 className = "account-title">Update Account</h3>
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        id="email"
        type="email"
        autoComplete="off"
        value={user ? user.email : ''}
        placeholder="Enter your email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
        disabled
      />
      <label>Phone</label>
      <input
        id="phone"
        type="phone"
        autoComplete="off"
        value={user ? user.phone : ''}
        placeholder="Enter your phone"
        onChange={(e) => {
          setPhone(e.target.value);
        }}
        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
      />
      <label>Address</label>
      <input
        id="address"
        type="address"
        autoComplete="off"
        value={user ? user.address : ''}
        placeholder="Enter your address"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
      />
      <label>Username</label>
            <input
        id="username"
        type="username"
        autoComplete="off"
        required
        value={user ? user.displayName : ''}
        placeholder="Enter your username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
      />
      <button>Update</button>
    </form>
    </div>
    </div>
  );
  
}

export default Update;