"use client";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  optionalClass?: string;
};

export default function Button({
  onClick,
  children,
  optionalClass = "",
}: Props) {
  return (
    <button className={`p-5 cursor-pointer ${optionalClass}`} onClick={onClick}>
      {children}
    </button>
  );
}
