import React, { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [showSearch, setShowSearch] = useState(false);

  const registerUser = () => {
    if (newUser.name && newUser.email && newUser.phoneNumber) {
      setUsers([...users, newUser]);
      setNewUser({ name: "", email: "", phoneNumber: "" });
    } else {
      alert("Please enter name, email, and phone number");
    }
  };

  const searchUser = () => {
    const foundUser = users.find(
      (user) => user.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (foundUser) {
      setSelectedUser(foundUser);
    } else {
      alert("User not found");
    }
  };

  return (
    <div className="container">
      <h1>USER DETAILS</h1>

      <div className="input-container">
        <h2>REGISTER USER</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={newUser.phoneNumber}
          onChange={(e) =>
            setNewUser({ ...newUser, phoneNumber: e.target.value })
          }
        />
        <div className="button-container">
          <button onClick={registerUser}>Register</button>
        </div>
      </div>

      <div className="input-container">
        <h2>SEARCH</h2>
        <div className="button-container">
          <button onClick={() => setShowSearch(!showSearch)}>Search</button>
        </div>
        {showSearch && (
          <div>
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="button-container">
              <button onClick={searchUser}>Find User</button>
            </div>
          </div>
        )}
      </div>

      {selectedUser && (
        <div className="user-details">
          <h2>User Details</h2>
          <p>Name: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Phone Number: {selectedUser.phoneNumber}</p>
        </div>
      )}
    </div>
  );
}

export default App;
