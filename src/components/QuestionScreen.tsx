import React, { useState } from 'react';

// Dummy Data
const dummyQuestions = [
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Science: Mathematics',
    question:
      'The metric prefix &quot;atto-&quot; makes a measurement how much smaller than the base unit?',
    correct_answer: 'One Quintillionth',
    incorrect_answers: [
      'One Billionth',
      'One Quadrillionth',
      'One Septillionth',
    ],
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'History',
    question: 'In what year was the M1911 pistol designed?',
    correct_answer: '1911',
    incorrect_answers: ['1907', '1899', '1917'],
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment: Music',
    question: 'Which music publication is often abbreviated to NME?',
    correct_answer: 'New Musical Express',
    incorrect_answers: [
      'New Metro Entertainment',
      'Next Musical Enterprise',
      'North Manchester Express',
    ],
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment: Board Games',
    question:
      'In which year was the pen and paper RPG &quot;Deadlands&quot; released?',
    correct_answer: '1996',
    incorrect_answers: ['2003', '1999', '1993'],
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Geography',
    question: 'The Alps are a mountain range on which continent?',
    correct_answer: 'Europe',
    incorrect_answers: ['North America', 'Asia', 'Africa'],
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
