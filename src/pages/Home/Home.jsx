import "./Home.css";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  return (
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
        <h2>Top Explorers</h2>
        <div className="scores">
          {/* Placeholder for leaderboard */}
          <div className="score-item">
            <span>🥇 Jane D.</span>
            <span>2,450 pts</span>
          </div>
          <div className="score-item">
            <span>🥈 John S.</span>
            <span>2,100 pts</span>
          </div>
          <div className="score-item">
            <span>🥉 Alex M.</span>
            <span>1,890 pts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
