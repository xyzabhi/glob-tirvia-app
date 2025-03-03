import React from "react";
import "./ChallengeModal.css";

function ChallengeModal({ isOpen, onClose, score, username }) {
  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/?from=${username}&score=${score}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Word Game Challenge!",
          text: `${username} challenged you! Can you beat their score of ${score}?`,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share failed:", err);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareUrl);
      alert("Challenge link copied to clipboard!");
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content challenge-modal">
        <h2>Challenge a Friend</h2>
        <div className="challenge-preview">
          <p className="challenge-text">
            Hey! {username} challenged you to beat their score of {score}!
          </p>
          <div className="challenge-score">{score} points</div>
        </div>
        <div className="button-group">
          <button className="share-button" onClick={handleShare}>
            Share Challenge
          </button>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChallengeModal;
