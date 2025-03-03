import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserRegistration from "../../components/UserRegistration";
export default function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [showRegistration, setShowRegistration] = useState(!username);
  const currentScore = localStorage.getItem("score") || "0";

  const handleRegister = (newUsername) => {
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
    setShowRegistration(false);
  };

  const handleReset = () => {
    localStorage.setItem("score", "0");
    localStorage.removeItem("seenQuestionIds");
    localStorage.removeItem("trivia_cache");
    setUsername("");
    setShowRegistration(true);
    localStorage.removeItem("username");
  };

  return (
    <>
      <div className="home-container">
        <div className="hero-section">
          <h1 className="title">Globetrotter</h1>
          <p className="subtitle">Explore the world, one guess at a time</p>
          <button className="start-button" onClick={() => navigate("/game")}>
            Start Playing
            <span className="icon">🌍</span>
          </button>
        </div>
        <div className="leaderboard">
          <h2>Your Score</h2>
          <div className="scores">
            <p className="score-value">{currentScore} pts</p>
          </div>
          <button className="reset-button" onClick={handleReset}>
            Reset Progress
          </button>
        </div>
      </div>
      <UserRegistration isOpen={showRegistration} onRegister={handleRegister} />
    </>
  );
}
