import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface WheelComponentProps {
  segments: string[];
  segColors: string[];
  winningSegment?: string;
  onFinished: (segment: string) => void;
  primaryColor?: string;
  contrastColor?: string;
  buttonText?: string;
  isOnlyOnce?: boolean;
  size?: number;
  upDuration?: number;
  downDuration?: number;
  fontFamily?: string;
}

const WheelComponent: React.FC<WheelComponentProps> = ({
  segments,
  segColors,
  winningSegment,
  onFinished,
  primaryColor = 'black',
  contrastColor = 'white',
  buttonText = 'Spin',
  isOnlyOnce = true,
  size = 290,
  upDuration = 100,
  downDuration = 1000,
  fontFamily = 'proxima-nova',
}) => {
  const [isFinished, setIsFinished] = useState(false);
  const [winner, setWinner] = useState<string | null>(null); // Winner's state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const centerX = 300;
  const centerY = 300;

  let currentSegment = '';
  let isStarted = false;
  let timerHandle: number | null = null;
  let angleCurrent = 0;
  let angleDelta = 0;
  let spinStart = 0;
  let frames = 0;

  const timerDelay = segments.length;
  const maxSpeed = Math.PI / segments.length;
  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;

  useEffect(() => {
    wheelInit();
  }, []);

  const wheelInit = () => {
    initCanvas();
    draw();
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener('click', spin, false);
  };

  const spin = () => {
    if (isStarted || timerHandle) return;

    isStarted = true;
    setIsFinished(false); // Reset finished state
    setWinner(null); // Clear the previous winner
    spinStart = Date.now();
    frames = 0;
    timerHandle = window.setInterval(onTimerTick, timerDelay);
  };

  const onTimerTick = () => {
    frames++;
    const duration = Date.now() - spinStart;
    let progress = 0;
    let finished = false;

    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (winningSegment) {
        if (currentSegment === winningSegment && frames > segments.length) {
          progress = duration / upTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        } else {
          progress = duration / downTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        angleDelta =
          maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }

      if (progress >= 1) finished = true;
    }

    angleCurrent += angleDelta;

    while (angleCurrent >= Math.PI * 2) {
      angleCurrent -= Math.PI * 2;
    }

    if (finished) {
      setIsFinished(true);
      setWinner(currentSegment); // Set the winner in state
      onFinished(currentSegment); // Call the callback with the winner
      isStarted = false; // Reset isStarted to allow future spins
      if (timerHandle) {
        clearInterval(timerHandle);
        timerHandle = null;
      }
      angleDelta = 0;
    }
    draw();
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const len = segments.length;
    let lastAngle = angleCurrent;
    const PI2 = Math.PI * 2;

    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = `1em ${fontFamily}`;

    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(ctx, i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw center button
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor;
    ctx.lineWidth = 10;
    ctx.strokeStyle = contrastColor;
    ctx.fill();
    ctx.font = `bold 1em ${fontFamily}`;
    ctx.fillStyle = contrastColor;
    ctx.textAlign = 'center';
    ctx.fillText(buttonText, centerX, centerY + 3);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = primaryColor;
    ctx.stroke();
  };

  const drawSegment = (
    ctx: CanvasRenderingContext2D,
    key: number,
    lastAngle: number,
    angle: number,
  ) => {
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColors[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor;
    ctx.font = `bold 1em ${fontFamily}`;
    ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  const drawNeedle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor;
    ctx.fillStyle = contrastColor;
    ctx.beginPath();
    ctx.moveTo(centerX + 20, centerY - 50);
    ctx.lineTo(centerX - 20, centerY - 50);
    ctx.lineTo(centerX, centerY - 70);
    ctx.closePath();
    ctx.fill();

    const change = angleCurrent + Math.PI / 2;
    const i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1;

    const segmentIndex = i < 0 ? i + segments.length : i;
    currentSegment = segments[segmentIndex];

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = primaryColor;
    ctx.font = `bold 1.5em ${fontFamily}`;
    isStarted &&
      ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, 1000, 800);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div id="wheel">
        <canvas
          id="canvas"
          ref={canvasRef}
          width="600"
          height="500"
          style={{
            pointerEvents: isFinished && isOnlyOnce ? 'none' : 'auto',
          }}
        />

        {/* Display winner */}
      </div>
      {winner && (
        <p className="text-2xl font-bold mt-4 text-center text-white">
          🎉 Congratulations! You have won a <br /> {winner}
        </p>
      )}{' '}
      <Link
        to={'/'}
        className="bg-blue-500 mt-3 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
      >
        Home
      </Link>
    </div>
  );
};

export default WheelComponent;
