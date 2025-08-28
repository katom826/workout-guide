"use client";

import Button from "../Components/Button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleGoToSettings = () => {
    router.push("/settings");
  };

  const handleGoToWorkout = () => {
    router.push("/workout");
  };

  return (
    <div className="h-screen flex flex-col justify-center">
      <header className="pt-15 flex justify-center">
        <h1 className="text-6xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          筋トレガイド
        </h1>
      </header>
      <main className="flex flex-1 flex-col gap-5 items-center justify-center">
        <Button
          onClick={handleGoToSettings}
          optionalClass="text-6xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
        >
          設定
        </Button>
        <Button
          onClick={handleGoToWorkout}
          optionalClass="text-6xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
        >
          スタート
        </Button>
      </main>
    </div>
  );
}
