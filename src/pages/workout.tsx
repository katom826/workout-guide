"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../Components/Button";
import SvgButton from "../Components/SvgButton";
import { useRouter } from "next/router";

type Exercise = {
  name: string;
  reps: number;
  duration: number;
};

export default function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [currentRep, setCurrentRep] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [isRest, setIsRest] = useState(false);
  const [restDuration, setRestDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("exercises");
    const savedRest = localStorage.getItem("restDuration");

    if (saved) {
      const loaded = JSON.parse(saved);
      setExercises(loaded);
      setCurrentSeconds(loaded[0].duration);
      setCurrentRep(loaded[0].reps);
      setIsLoaded(true);
    }

    if (savedRest) {
      setRestDuration(Number(savedRest));
    }
  }, []);

  /**
   * 秒カウント
   */
  useEffect(() => {
    if (!isRunning || !isLoaded) return;

    const timer = setInterval(() => {
      setCurrentSeconds((prev: number) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  /**
   * 秒サウンド
   */
  useEffect(() => {
    if (!audioRef.current || !isLoaded) return;

    if (currentSeconds > 0) {
      resetAudio();
      audioRef.current.play().catch(() => {});
    } else {
      // 回数カウント0の時
      // const audio = new Audio("/audio/rep_change.mp3");
      const audio = new Audio("/workout-guide/audio/rep_change.mp3");
      resetAudio();
      audio.play();
    }
  }, [currentSeconds]);

  /**
   * 秒カウント0の時
   */
  useEffect(() => {
    if (currentSeconds > 0 || !isLoaded) return;

    if (isRest) {
      const nextIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIndex);
      setCurrentRep(exercises[nextIndex].reps);
      setCurrentSeconds(exercises[nextIndex].duration);
      setIsRest(false);
    } else {
      setCurrentRep((prev: number) => prev - 1);
      setCurrentSeconds(exercises[currentExerciseIndex].duration);
    }
  }, [currentSeconds]);

  /**
   * 回数カウント0の時
   */
  useEffect(() => {
    if (currentRep > 0 || !isLoaded) return;

    const isLastExercise = currentExerciseIndex === exercises.length - 1;

    if (isLastExercise) {
      // 全エクササイズ完了時
      setIsCompleted(true);
      setIsRunning(false);
      // const audio = new Audio("/audio/clear.mp3");
      const audio = new Audio("/workout-guide/audio/clear.mp3");
      resetAudio();
      audio.play();
    } else {
      setIsRest(true);
      setCurrentSeconds(restDuration);
    }
  }, [currentRep]);

  /**
   * スタート押下処理
   */
  const handleStart = () => {
    setIsRunning(true);

    if (!audioRef.current) {
      // const audio = new Audio("/audio/tick.mp3");
      audioRef.current = new Audio("/workout-guide/audio/tick.mp3");
      audioRef.current.play().catch(() => {});
      resetAudio();
    }
  };

  /**
   * ポーズ押下処理
   */
  const handlePause = () => {
    setIsRunning(false);
  };

  /**
   * オーディオをリセットする
   */
  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  /**
   * ホームへ戻る処理
   */
  const handleGoToHome = () => {
    router.push("/");
  };

  const PauseIcon = () => (
    <path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z" />
  );
  const StartIcon = () => <path d="M320-200v-560l440 280-440 280Z" />;

  return (
    <div className={`h-screen flex items-center justify-center flex-col gap-5`}>
      {!isLoaded ? (
        <p>読み込み中...</p>
      ) : isRest ? (
        <>
          <h1 className="text-6xl font-bold bg-linear-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
            休憩
          </h1>
          <h2 className="text-4xl font-bold bg-linear-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
            次： {exercises[currentExerciseIndex + 1].name}
          </h2>
          <p className="text-6xl font-bold bg-linear-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
            {currentSeconds} / {restDuration} 秒
          </p>
          <div className="w-64 h-4 bg-gray-300 rounded overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{
                width: `${(currentSeconds / restDuration) * 100}%`,
              }}
            ></div>
          </div>
        </>
      ) : isCompleted ? (
        <>
          <h1 className="text-6xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            お疲れさまでした！
          </h1>
          <Button onClick={handleGoToHome} variant="normal" size="sm">
            ホームに戻る
          </Button>
        </>
      ) : (
        <>
          <Button onClick={handleGoToHome} variant="normal" size="sm">
            ホームに戻る
          </Button>
          <h1 className="text-7xl font-bold bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            {exercises[currentExerciseIndex].name}
          </h1>

          <p className="text-6xl font-bold bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            {currentRep} / {exercises[currentExerciseIndex].reps} 回
          </p>
          <div className="w-64 h-4 bg-gray-300 rounded overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{
                width: `${
                  (currentRep / exercises[currentExerciseIndex].reps) * 100
                }%`,
              }}
            ></div>
          </div>

          <p className="text-6xl font-bold bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            {currentSeconds} / {exercises[currentExerciseIndex].duration} 秒
          </p>
          <div className="w-64 h-4 bg-gray-300 rounded overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{
                width: `${
                  (currentSeconds / exercises[currentExerciseIndex].duration) *
                  100
                }%`,
              }}
            ></div>
          </div>

          <SvgButton onClick={isRunning ? handlePause : handleStart}>
            {isRunning ? <PauseIcon /> : <StartIcon />}
          </SvgButton>
        </>
      )}
    </div>
  );
}
