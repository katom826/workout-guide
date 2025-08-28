"use client";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
};

export default function SvgButton({ onClick, children }: Props) {
  return (
    <button className={`p-5 cursor-pointer mt-10 text-6xl`} onClick={onClick}>
      <svg
        className="h-20 w-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="#e3e3e3"
      >
        {children}
      </svg>
    </button>
  );
}
