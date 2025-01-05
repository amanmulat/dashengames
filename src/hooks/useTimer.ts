import { useState, useEffect, useRef, useCallback } from 'react';

type UseTimerReturn = [
  number, // timeLeft
  () => void, // start
  () => void, // pause
  () => void, // reset
  () => void, // restart
];

/**
 * Custom hook for managing a countdown timer.
 * @param initVal - The initial time in seconds for the timer.
 * @returns A tuple with timeLeft, start, pause, reset, and restart functions.
 */
export const useTimer = (initVal: number): UseTimerReturn => {
  const [timeLeft, setTimeLeft] = useState<number>(initVal); // seconds
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const currentTimeLeftRef = useRef<number>(initVal);

  useEffect(() => {
    // Cleanup timer when component unmounts
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []);

  const pause = useCallback(() => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }
  }, []);

  const start = useCallback(() => {
    timerIdRef.current = setInterval(() => {
      if (currentTimeLeftRef.current <= 0) {
        if (timerIdRef.current) {
          clearInterval(timerIdRef.current);
        }
        return;
      }
      currentTimeLeftRef.current -= 1;
      setTimeLeft((time) => time - 1);
    }, 1000);
  }, []);

  const reset = useCallback(() => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }
    setTimeLeft(initVal);
    currentTimeLeftRef.current = initVal;
  }, [initVal]);

  const restart = useCallback(() => {
    reset();
    setTimeout(() => {
      start();
    }, 0);
  }, [reset, start]);

  return [timeLeft, start, pause, reset, restart];
};
