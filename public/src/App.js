import React, { useState, useEffect }  from 'react';
import SignIn from './Components/googleSignIn/signIn'; // Replace with your actual login component path
import './App.css'; // Import your CSS styles (optional)
import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
import Home from "./Components/googleSignIn/Home";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './view/partials/Header';
import { auth, provider } from "./Components/firebase/firebase"; // Assuming config file with Firebase settings
import Update from './view/account/Update';



function MainContent() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe; // Clean up listener on component unmount
  }, []);
  return (
     <div className="App">
       {location.pathname !== "/signIn" && <Header user={user} />} {/* Only show Header if not on login page */}
       <Routes>
         <Route path="/signIn" element={<SignIn />} />
         <Route path="/" element={<Home />} />
         <Route path="/update-account" element={<Update user={user} />} />
       </Routes>
     </div>
 );
}

function App() {
   return (
    <Router>
<MainContent />
      <ToastContainer 
        autoClose = {2500}
      />
    </Router>
  );
}


export default App;