import { useAudioPlayer } from "expo-audio";
import { useState, useEffect } from "react";
import { SOUND_EFFECTS } from "../constants/audio";

interface Props {
  duration: number;
  onTimeUp?: () => void;
  externalPause?: boolean;
}

export const useGameTimer = ({duration, externalPause, onTimeUp}:Props) => {
  let interval: ReturnType<typeof setInterval> | null = null;
  const audioPlayer = useAudioPlayer(SOUND_EFFECTS.Countdown);
  const [seconds, setSeconds] = useState(duration);
  const [isActive, setIsActive] = useState(true);

  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);

  const restart = () => {
    if (interval) clearInterval(interval);

    setIsActive(false);
    setSeconds(duration);
    setTimeout(() => setIsActive(true), 10);
  };

  useEffect(() => {
    if (externalPause) {
      pause();
    }
  }, [externalPause]);

  useEffect(() => {
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => Math.max(prev - 1, 0));
      }, 1000);
    } else {
      audioPlayer.pause();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  useEffect(() => {
    if (seconds < 5 && seconds > 0) {
      audioPlayer.play();
    }
    if (seconds === 0 && isActive) {
      setIsActive(false);
      audioPlayer.seekTo(0);
      audioPlayer.pause();
      onTimeUp?.();
    }
  }, [seconds, isActive]);

  return { seconds, isActive, start, pause, restart };
};
