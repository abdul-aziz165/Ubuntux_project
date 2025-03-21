import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./HistoryContent.css"; // Reuse the same CSS for styling

const HistoryDetail = () => {
  const location = useLocation();
  const historyItem = location.state; // Get the history item data passed via navigation
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleStartQuiz = () => {
    // Navigate to the quiz page with the quiz questions for this history item
    navigate("/quiz", { state: { questions: historyItem.quizQuestions } });
  };

  return (
    <div className="history-detail-container">
      <button className="back-button" onClick={handleBackClick}>
        &larr; Back
      </button>
      <h1 className="history-detail-title">{historyItem.title}</h1>
      <img src={historyItem.image} alt={historyItem.title} className="history-detail-image" />
      <p className="history-detail-content">{historyItem.content}</p>

      {/* Add the "Start Quiz" button */}
      <button className="quiz-button" onClick={handleStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default HistoryDetail;