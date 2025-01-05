import React, { useRef, useState } from 'react';
import WheelComponent from '../../components/WheelComponent';

const Spinner: React.FC = () => {
  const segments2 = [
    'Chicken and Eggs',
    'Free event tickets',
    'Four Packer Dashen beer',
    'Key chain',
    'Bottle opener',
    'Small wallets',
    'USB flash',
    'Free Dashen beer',
  ];
  const segColors = [
    '#EE4040', // Red
    '#F0CF50', // Yellow
    '#815CD1', // Purple
    '#3DA5E0', // Blue
    '#34A24F', // Green
    '#FF7F50', // Coral
    '#FFD700', // Gold
    '#4682B4', // Steel Blue
  ];

  const onFinished = (winner) => {
    console.log(winner);
  };

  return (
    <div>
      <WheelComponent
        segments={segments2}
        segColors={segColors}
        onFinished={(winner) => onFinished(winner)}
        primaryColor="black"
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={false}
        size={190}
        upDuration={500}
        downDuration={600}
        fontFamily="Arial"
      />
    </div>
  );
};

export default Spinner;
