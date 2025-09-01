"use client";

import { useEffect, useState } from "react";
import Button from "../Components/Button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [exercises, setExercises] = useState([
    {
      name: "",
      reps: 0,
      duration: 0,
    },
    {
      name: "",
      reps: 0,
      duration: 0,
    },
    {
      name: "",
      reps: 0,
      duration: 0,
    },
  ]);
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
   * @param index
   * @param key
   * @param value
   */
  const handleChange = (
    index: number,
    key: "name" | "reps" | "duration",
    value: string
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

  /**
   * ホームに戻る処理
   */
  const handleGoToHome = () => {
    router.push("/");
  };

  return (
    <main
      className={`h-screen flex items-center justify-center flex-col gap-5`}
    >
      {exercises.map((exercise, i) => (
        <section key={i}>
          <p>{i + 1}つ目</p>

          <div>
            <label htmlFor={`name_${i}`}>種目名</label>
            <input
              id={`name_${i}`}
              type="text"
              value={exercise.name}
              onChange={(e) => handleChange(i, "name", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`reps_${i}`}>回数</label>
            <input
              id={`reps_${i}`}
              type="number"
              value={exercise.reps}
              onChange={(e) => handleChange(i, "reps", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`duration_${i}`}>１回の秒数</label>
            <input
              id={`duration_${i}`}
              type="number"
              value={exercise.duration}
              onChange={(e) => handleChange(i, "duration", e.target.value)}
            />
          </div>
        </section>
      ))}

      <section>
        <label htmlFor="rest">休憩時間（秒）</label>
        <input
          id="rest"
          type="number"
          value={restDuration}
          onChange={(e) => setRestDuration(Number(e.target.value))}
        />
      </section>

      <Button onClick={handleSave} variant="normal" size="md">
        保存
      </Button>
      <Button onClick={handleGoToHome} variant="normal" size="md">
        ホームに戻る
      </Button>
    </main>
  );
}
