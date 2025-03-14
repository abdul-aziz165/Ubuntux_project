import React, { useState } from 'react';
import axios from 'axios';
 // Import axios for sending data to the backend
import "./Quiz.css";

function Quiz() {
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState(Array(4).fill(null)); // Stores answers for each question
    const [submitted, setSubmitted] = useState(false);

    const questions = [
        {
            question: "Who was the first emperor of Mali?",
            options: ["Mansa Musa", "Sundiata Keita", "Shaka Zulu", "Kwame Nkrumah"],
            answer: "Mansa Musa",
            image: "/images/mansa.jpg"
        },
        {
            question: "Which African country was never colonized?",
            options: ["Nigeria", "Ethiopia", "Ghana", "South Africa"],
            answer: "Ethiopia",
            image: "/images/ethiopia_flag.jpg"
        },
        {
            question: "What is the Great Zimbabwe?",
            options: ["A city in Kenya", "An ancient kingdom", "A famous river", "A type of food"],
            answer: "An ancient kingdom",
            image: "/images/great_zimbabwe.jpg"
        },
        {
            question: "Who was known as the ‘Conqueror of the Zulu Nation’?",
            options: ["Nelson Mandela", "Shaka Zulu", "Julius Nyerere", "Patrice Lumumba"],
            answer: "Shaka Zulu",
            image: "/images/shaka_zulu.jpg"
        },
    ];

    //  answer selection
    const handleAnswer = (index, selectedOption) => {
        const newAnswers = [...answers];
        newAnswers[index] = selectedOption;
        setAnswers(newAnswers);
    };

    //  final submission
    const handleSubmit = async () => {
        let finalScore = 0;
        answers.forEach((answer, index) => {
            if (answer === questions[index].answer) {
                finalScore++;
            }
        });
        setScore(finalScore);
        setSubmitted(true);

        // Save the score to the database
        try {
            await axios.post("http://localhost:5000/save-score", {
                username: "test_user", // Replace with actual username from login
                score: finalScore
            });
            console.log("Score saved successfully!");
        } catch (error) {
            console.error("Error saving score:", error);
        }
    };

    return (
        <div className="quiz-container">
            <h2>Quiz Time!</h2>
            {questions.map((q, index) => (
                <div key={index} className="question-block">
                    <p className="question">{q.question}</p>
                    {q.image && <img src={q.image} alt="quiz" className="quiz-image" />}
                    <div className="options-container">
                        {q.options.map((option, i) => (
                            <button
                                key={i}
                                className={`option-button ${answers[index] === option ? "selected" : ""}`}
                                onClick={() => handleAnswer(index, option)}
                                disabled={submitted}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
            <button 
                className="submit-button" 
                onClick={handleSubmit} 
                disabled={answers.includes(null) || submitted}
            >
                Submit Quiz
            </button>
            {submitted && <p className="score">Your score: {score}</p>}
        </div>
    );
}

export default Quiz;
