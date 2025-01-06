import React from 'react';
import { Link } from 'react-router-dom';
import CoverOne from '../../images/dashen/background.jpg';

const Puzzle = () => {
  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-2"
      style={{
        backgroundImage: `url(${CoverOne})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
      }}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Welcome to Image Puzzle Game
        </h1>
        <div className="flex justify-center items-center gap-3 mb-3">
          <Link
            to={'/time-puzzle'}
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            30 Second Challenge
          </Link>
          <Link
            to={'/min-puzzle'}
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Minimum Swap Challenge
          </Link>
        </div>
        <Link
          to={'/'}
          className="bg-blue-500  text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition mt-5"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default Puzzle;
