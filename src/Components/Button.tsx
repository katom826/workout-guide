"use client";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
};

const variantClasses = {
  normal:
    "bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent",
  workout:
    "bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent",
  rest: "bg-linear-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent",
};

const sizeClasses = {
  sm: "text-4xl",
  md: "text-5xl",
  lg: "text-6xl",
};

export default function Button({
  onClick,
  children,
  variant = "normal",
  size = "md",
}: Props) {
  return (
    <button
      className={`p-5 cursor-pointer font-bold ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
