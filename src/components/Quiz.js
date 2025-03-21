import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Quiz.css";
//import React from "react";
import "./Quiz.css";


const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions = [] } = location.state || {}; // Ensure questions is always an array
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = async (selectedAnswer) => {
    if (!questions[currentQuestionIndex]) return;

    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    setScore((prevScore) => (isCorrect ? prevScore + 1 : prevScore));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowResult(true);
      await updateScore(isCorrect ? score + 1 : score);
    }
  };

  const updateScore = async (newScore) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.username) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post("http://localhost/update-score.php", {
        username: user.username,
        score: newScore,
      });
      if (response.data.success) {
        console.log("Score updated successfully");
      } else {
        console.error("Error updating score:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  // Show result page if the quiz is completed
  if (showResult) {
    return (
      <div className="quiz-wrapper">
        <div className="quiz-result">
          <h2>Quiz Completed!</h2>
          <p>Your score: {score} / {questions.length}</p>
        </div>
      </div>
    );
  }

  // Handle the case where there are no quiz questions
  if (!questions || questions.length === 0) {
    return (
      <div style={{ color: "red", fontSize: "30px", textAlign: "center", padding: "200px" }}>
        No quiz questions available. <br></br>
        Go back to LEARN
      </div>
      
    );
  }

  const currentQuestion = questions[currentQuestionIndex] || {}; // Prevents undefined errors

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        <h2>{currentQuestion?.question || "Loading question..."}</h2>
        <div className="quiz-options">
          {currentQuestion?.options?.map((option, index) => (
            <button key={index} onClick={() => handleAnswerClick(option)}>
              {option}
            </button>
          )) || <p>Loading options...</p>}
        </div>
        <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
      </div>
    </div>
  );
};

export default Quiz;
