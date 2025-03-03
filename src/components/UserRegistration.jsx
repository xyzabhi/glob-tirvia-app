import React, { useState } from "react";
import "./UserRegistration.css";

function UserRegistration({ onRegister, isOpen }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const validateUsername = (name) => {
    if (name.trim().length < 3) {
      return "Username must be at least 3 characters long";
    }
    if (name.trim().length > 20) {
      return "Username must be less than 20 characters";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      return "Username can only contain letters, numbers, and underscores";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateUsername(username);
    if (validationError) {
      setError(validationError);
      return;
    }
    onRegister(username.trim());
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
