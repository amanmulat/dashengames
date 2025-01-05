import React, { useRef, useState } from 'react';
import WheelComponent from '../../components/WheelComponent';

const Spinner: React.FC = () => {
  const segments2 = [
    'better luck next time',
    'won 70',
    'won 10',
    'better luck next time',
    'won 2',
    'won uber pass',
  ];
  const segColors = ['#EE4040', '#F0CF50', '#815CD1', '#3DA5E0', '#34A24F'];
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
