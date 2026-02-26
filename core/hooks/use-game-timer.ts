import { useState, useEffect, useRef } from "react";

export const useGameTimer = (initialSeconds: number, onTimeUp?: () => void) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);

  const restart = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    setIsActive(false);
    setSeconds(initialSeconds);
    setTimeout(() => setIsActive(true), 10);
  };

  useEffect(() => {
    if (isActive && seconds > 0) {
      const endTime = Date.now() + seconds * 1000;
      timerRef.current = setInterval(() => {
        const remaining = Math.round((endTime - Date.now()) / 1000);
        if (remaining <= 0) {
          setSeconds(0);
          clearInterval(timerRef.current!);
        } else {
          setSeconds(remaining);
        }
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      if (onTimeUp) onTimeUp();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, seconds]);

  return { seconds, isActive, start, pause, restart };
};
