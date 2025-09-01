"use client";

import { useEffect, useState } from "react";
import Button from "@/Components/Button";
import { useRouter } from "next/router";
import ExerciseInput from "@/Components/ExerciseInput";

type Exercise = {
  name: string;
  reps: number;
  duration: number;
};

export default function Home() {
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[]>(
    Array.from({ length: 3 }, () => ({ name: "", reps: 5, duration: 5 }))
  );
  const [restDuration, setRestDuration] = useState(10);

  useEffect(() => {
    const savedExercises = localStorage.getItem("exercises");
    const savedRest = localStorage.getItem("restDuration");

    if (savedExercises) {
      setExercises(JSON.parse(savedExercises));
    }

    if (savedRest) {
      setRestDuration(JSON.parse(savedRest));
    }
  }, []);

  /**
   * 更新
   */
  const handleChange = (
    index: number,
    key: keyof Exercise,
    value: string | number
  ) => {
    setExercises((prev) =>
      prev.map((exercise, i) => {
        if (i !== index) {
          return exercise;
        }

        const updatedValue = key === "name" ? value : Number(value);
        return {
          ...exercise,
          [key]: updatedValue,
        };
      })
    );
  };

  /**
   * セーブ
   */
  const handleSave = () => {
    localStorage.setItem("exercises", JSON.stringify(exercises));
    localStorage.setItem("restDuration", JSON.stringify(restDuration));
    alert("保存しました");
  };

  return (
    <main
      className={`h-[100dvh] flex items-center justify-center flex-col gap-3`}
    >
      {exercises.map((exercise, i) => (
        <ExerciseInput
          key={i}
          index={i}
          exercise={exercise}
          onChange={handleChange}
        />
      ))}

      <section className="p-2 flex gap-1 items-center">
        <label htmlFor="rest">休憩秒数</label>
        <input
          id="rest"
          type="number"
          value={restDuration}
          onChange={(e) => setRestDuration(Number(e.target.value))}
          className="m-1 border rounded-md w-15 px-1"
        />
      </section>

      <Button onClick={handleSave} variant="normal" size="sm">
        保存
      </Button>
      <Button onClick={() => router.push("/")} variant="normal" size="sm">
        ホームに戻る
      </Button>
    </main>
  );
}
