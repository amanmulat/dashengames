import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          Welcome <br />
          Choose a Challenge
        </h1>
        <div className="flex justify-center items-center gap-3">
          <Link
            to={'/puzzle'}
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Puzzle
          </Link>
          <Link
            to={'/trivia'}
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Trivia
          </Link>
          <Link
            to={'/spinner'}
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Spinner Wheel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
