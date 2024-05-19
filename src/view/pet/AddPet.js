import { auth } from "../../Components/firebase/firebase"; 
import React, { useState, useEffect }  from 'react';
import { getDatabase, ref, set, onValue, push } from "firebase/database";



const AddPet = () => {
  const user = auth.currentUser;
  const [petName, setPetName] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petGender, setPetGender] = useState("");
  const [petSize, setPetSize] = useState("");
  const [petColor, setPetColor] = useState("");
  const [petVacinated, setPetVacinated] = useState("");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [petCount, setPetCount] = useState(0)

  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const petRef = ref(db, 'users/' + user.uid + '/pets');
      
      const unsubscribe= onValue(petRef, (snapshot) => {
        const pets = snapshot.val();
        if (pets) {
          const petList = Object.values(pets); //chuyển object thành mảng
          setPetCount(petList.length);
        } else {
          setPetCount(0);
        }
      });
       // Cleanup function để gỡ bỏ listener khi không cần thiết nữa
    return () => unsubscribe();
    }
  }, [user]);

  const addDataBase = (userId) => {
    try {
        const db = getDatabase();
        const petRef = ref(db, 'users/' + userId + '/pets');
  const newPetRef = push(petRef);
      set(newPetRef, {
        name: petName,
        age: petAge,
        gender: petGender,
        size: petSize,
      });
      alert('Pet added successfully!');
    } catch (error) {
      alert('Error adding pet: ' + error.message);
    }
  };
console.log(user.uid)
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
        
      addDataBase(user.uid);
    } else {
      alert('User not logged in.');
    }
  };
    return(
    <div className="container" id="container">
      <h3 className = "account-title">Add Info Pet</h3>
      <p>Current number of pets: {petCount}</p>
        <form onSubmit={handleSubmit}>
        <label>Pet Name</label>
        <input
          id="petname"
          type="petname"
          autoComplete="off"
          value={petName}
          placeholder="Enter your pet name"
          onChange={(e) => {
            setPetName(e.target.value);
          }}
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
        />
        <label>Pet Gender</label>
        <input
          id="petgender"
          type="petgender"
          autoComplete="off"
          value={petGender}
          placeholder="Enter your pet gender"
          onChange={(e) => {
            setPetGender(e.target.value);
          }}
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
        />
        <label>Pet Age</label>
        <input
          id="address"
          type="address"
          autoComplete="off"
          value={petAge}
          placeholder="Enter your pet age"
          onChange={(e) => {
            setPetAge(e.target.value);
          }}
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
        />
        <label>Pet Size</label>
              <input
          id="petsize"
          type="petsize"
          autoComplete="off"
          required
          value={petSize}
          placeholder="Enter your pet size"
          onChange={(e) => {
            setPetSize(e.target.value);
          }}
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
        />
        <button>Add Pet</button>
      </form>
      </div>
    )
}

export default AddPet