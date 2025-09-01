"use client";

import Button from "../Components/Button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const gradientClass =
    "text-6xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent";

  const navigate = (path: "/settings" | "/workout") => router.push(path);

  return (
    <div>
      <main className="h-screen flex flex-col justify-center items-center gap-10">
        <h1 className={gradientClass}>筋トレガイド</h1>
        <div className="flex flex-col gap-5 items-center">
          <Button
            onClick={() => navigate("/settings")}
            variant="normal"
            size="md"
          >
            設定
          </Button>
          <Button
            onClick={() => navigate("/workout")}
            variant="normal"
            size="md"
          >
            スタート
          </Button>
        </div>
      </main>
    </div>
  );
}
