import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Dummy Data
const dummyQuestions = [
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Science: Mathematics',
    question: 'የክትፎ ግብአቶች ምን ምን ናቸው?',
    correct_answer: 'ሚጥሚጣ እና ጥሬ ስጋ',
    incorrect_answers: [' ጉበት እና ጨጟራ', 'ስጋ እና ቅቤ', 'ጎመን እና አይብ '],
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'History',
    question: ' የበሬ ብልቶች ምን ምን ናቸው?',
    correct_answer: 'ታናሽና ታላቅ',
    incorrect_answers: ['ፈረሰኛ', 'ፍርንባ', 'ቀንድ'],
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment: Music',
    question: ' የዶሮ ብልቶች ስንት ናቸው?',
    correct_answer: 'እስራ ሁለት',
    incorrect_answers: ['አንድ', 'ሶስት', 'አስራ ሶስት'],
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment: Board Games',
    question: 'የአሸንዳ በዓል ለስንት ጊዜ ይከበራል?',
    correct_answer: '5 ቀን',
    incorrect_answers: ['10 ቀን', '1 ቀን', '30 ቀን'],
  },
];

const QuestionScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [targetScore] = useState(3); // Score to beat

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1);
    if (currentIndex + 1 < dummyQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="w-full max-w-xl bg-white p-6 shadow-md rounded text-center">
        {score >= targetScore ? (
          <h2 className="text-2xl font-bold text-green-500">
            🎉 Congratulations! You beat the score to beat ({targetScore})!
          </h2>
        ) : (
          <h2 className="text-2xl font-bold text-red-500">
            😔 Sorry, you didn't beat the score to beat ({targetScore}). Try
            again!
          </h2>
        )}
        <p className="mt-4 text-gray-600">Your Score: {score}</p>
        <button
          onClick={resetGame}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Play Again
        </button>
        <div className="mt-4">
          <Link
            to={'/'}
            className="bg-blue-500 mt-3  text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Home
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = dummyQuestions[currentIndex];

  return (
    <div className="w-full max-w-xl bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">{currentQuestion.question}</h2>
      <div className="grid gap-4">
        {currentQuestion.incorrect_answers
          .concat(currentQuestion.correct_answer)
          .sort(() => Math.random() - 0.5)
          .map((answer, index) => (
            <button
              key={index}
              className="bg-gray-200 p-3 rounded hover:bg-gray-300"
              onClick={() =>
                handleAnswer(answer === currentQuestion.correct_answer)
              }
            >
              {answer}
            </button>
          ))}
      </div>
      <p className="mt-4 text-gray-600">
        Score: {score} / {dummyQuestions.length}
      </p>
    </div>
  );
};

export default QuestionScreen;
