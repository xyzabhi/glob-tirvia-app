import { useState, useEffect } from "react";
import "./Game.css";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import ChallengeModal from "../../components/ChallengeModal";
import UserRegistration from "../../components/UserRegistration";
import { getRandomTrivia } from "../../lib/supabase";
export default function Game() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(
    parseInt(localStorage.getItem("score")) || 0
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [showRegistration, setShowRegistration] = useState(!username);
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  const handleRandomTrivia = async () => {
    try {
      setLoading(true);
      const question = await getRandomTrivia();
      if (!question) {
        navigate("/");
        return;
      }
      setCurrentQuestion(question);
      setOptions(question.options);

      // Update seen questions in localStorage
      const seenQuestionIds = JSON.parse(
        localStorage.getItem("seenQuestionIds") || "[]"
      );
      if (!seenQuestionIds.includes(question.id)) {
        seenQuestionIds.push(question.id);
        localStorage.setItem(
          "seenQuestionIds",
          JSON.stringify(seenQuestionIds)
        );
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleRandomTrivia();
  }, []);

  const loadNewQuestion = () => {
    setShowFeedback(false);
    handleRandomTrivia();
  };

  const handleAnswer = (answer) => {
    const correct = answer === currentQuestion.city;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      const newScore = score + 100;
      setScore(newScore);
      localStorage.setItem("score", newScore);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRegister = (newUsername) => {
    localStorage.setItem("username", newUsername);
    setShowRegistration(false);
  };

  //   const handleChallengeClick = () => {};

  if (loading) return <div className="loading">Loading...</div>;
  if (!currentQuestion) return <div>No more questions available!</div>;

  return (
    <div className="game-container">
      <button className="back-button" onClick={() => navigate("/")}>
        <span className="back-icon">⬅️</span>
        Home
      </button>

      <div className="score-display">
        <span className="username">{username}</span>
        <span>•</span>
        <span>{score} pts</span>
      </div>

      <button
        className="challenge-button"
        onClick={() => setShowChallengeModal(true)}
      >
        Challenge a Friend!
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
            <p className="fun-fact">{currentQuestion.fun_fact[0]}</p>
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
