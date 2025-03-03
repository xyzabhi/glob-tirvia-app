import React, { useState } from "react";
import "./UserRegistration.css";

function UserRegistration({ onRegister, isOpen }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }
    // Here we'll later add check for unique username
    onRegister(username);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Choose Your Username</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            maxLength={20}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Start Playing</button>
        </form>
      </div>
    </div>
  );
}

export default UserRegistration;
