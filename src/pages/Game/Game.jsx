import { useState, useEffect } from "react";
import "./Game.css";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import ChallengeModal from "../../components/ChallengeModal";
import UserRegistration from "../../components/UserRegistration";

export default function Game() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [showRegistration, setShowRegistration] = useState(!username);
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  // Placeholder data - replace with your actual questions
  const sampleQuestions = [
    {
      destination: "Paris",
      clues: ["The city of lights and love", "Home to a famous iron tower"],
      funFact:
        "The Eiffel Tower grows by up to 6 inches in summer due to heat expansion!",
      options: ["Paris", "London", "Rome", "Berlin"],
    },
    // Add more questions here
  ];

  const loadNewQuestion = () => {
    const randomQuestion =
      sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setOptions(randomQuestion.options);
    setShowFeedback(false);
  };

  useEffect(() => {
    loadNewQuestion();
  }, []);

  const handleAnswer = (answer) => {
    const correct = answer === currentQuestion.destination;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 100);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRegister = (newUsername) => {
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
    setShowRegistration(false);
  };

  const handleChallengeClick = () => {
    if (!username) {
      setShowRegistration(true);
    } else {
      setShowChallengeModal(true);
    }
  };

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="game-container">
      <button className="back-button" onClick={() => navigate("/")}>
        <span className="back-icon">⬅️</span>
        Home
      </button>

      <div className="score-display">Score: {score}</div>

      <button className="challenge-button" onClick={handleChallengeClick}>
        <span className="material-icons">group_add</span>
        Challenge a Friend
      </button>

      {!showFeedback ? (
        <>
          <div className="clues-container">
            {currentQuestion.clues.map((clue, index) => (
              <div key={index} className="clue-card">
                <div className="postcard-header">
                  <div className="stamp">✈️</div>
                  <div className="postmark">TRAVEL QUEST</div>
                </div>
                <p>{clue}</p>
              </div>
            ))}
          </div>

          <div className="options-container">
            {options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div
          className={`feedback-container ${
            isCorrect ? "correct" : "incorrect"
          }`}
        >
          <div className="feedback-content">
            <div className="feedback-emoji">{isCorrect ? "🎉" : "😢"}</div>
            <h2>{isCorrect ? "Correct!" : "Not quite right..."}</h2>
            <p className="fun-fact">{currentQuestion.funFact}</p>
            <button className="play-again-button" onClick={loadNewQuestion}>
              Next Question
            </button>
          </div>
        </div>
      )}

      <UserRegistration isOpen={showRegistration} onRegister={handleRegister} />

      <ChallengeModal
        isOpen={showChallengeModal}
        onClose={() => setShowChallengeModal(false)}
        score={score}
        username={username}
      />
    </div>
  );
}
