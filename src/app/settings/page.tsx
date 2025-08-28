"use client";

import { useEffect, useState } from "react";
import Button from "../Components/Button";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
    const saved = localStorage.getItem("exercises");
    if (saved) {
      setExercises(JSON.parse(saved));
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
    alert("保存しました");
  };

  /**
   * ホームに戻る処理
   */
  const handleGoToHome = () => {
    router.push("/index");
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
              type="text"
              value={exercise.reps}
              onChange={(e) => handleChange(i, "reps", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor={`duration_${i}`}>１回の秒数</label>
            <input
              id={`duration_${i}`}
              type="text"
              value={exercise.duration}
              onChange={(e) => handleChange(i, "duration", e.target.value)}
            />
          </div>
        </section>
      ))}

      <Button
        onClick={handleSave}
        optionalClass="text-6xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
      >
        保存
      </Button>
      <Button
        onClick={handleGoToHome}
        optionalClass="text-6xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
      >
        ホームに戻る
      </Button>
    </main>
  );
}
