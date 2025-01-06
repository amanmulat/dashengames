import React from 'react';
import { Link } from 'react-router-dom';
import Beer from '../../images/dashen/Screenshot_2024-11-19_145307-removebg-preview.png';
import CoverOne from '../../images/dashen/background.jpg';

const Welcome = () => {
  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${CoverOne})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
      }}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Welcome <br />
          Choose a Challenge
        </h1>
        <div className="flex justify-center items-center gap-3 z-1">
          <Link
            to={'/puzzle'}
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition z-10"
          >
            Puzzle
          </Link>
          <Link
            to={'/trivia'}
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition z-10"
          >
            Trivia
          </Link>
          <Link
            to={'/spinner'}
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition z-10"
          >
            Spinner Wheel
          </Link>
        </div>
      </div>
      <img
        src={Beer}
        alt="profile cover"
        className="w-[200px]  rounded-tl-sm rounded-tr-sm object-cover object-center absolute bottom-0 right-0  z-0 sm:w-[300px] lg:w-[400px]"
      />
    </div>
  );
};

export default Welcome;
