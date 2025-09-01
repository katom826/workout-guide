type Exercise = {
  name: string;
  reps: number;
  duration: number;
};

type Props = {
  index: number;
  exercise: Exercise;
  onChange: (
    index: number,
    key: keyof Exercise,
    value: string | number
  ) => void;
};

export default function ExerciseInput({ index, exercise, onChange }: Props) {
  const fields: {
    key: "name" | "reps" | "duration";
    label: string;
    type: string;
  }[] = [
    {
      key: "name",
      label: "種目",
      type: "text",
    },
    {
      key: "reps",
      label: "回数",
      type: "number",
    },
    {
      key: "duration",
      label: "持続秒数",
      type: "number",
    },
  ];

  return (
    <section key={index} className="border rounded-md border-blue-500 p-2">
      <p>No. {index + 1}</p>
      <div className="grid grid-cols-[2fr_1fr_1fr] gap-2">
        {fields.map(({ key, label, type }) => (
          <div key={key}>
            <div className="flex gap-1 items-center">
              <label htmlFor={`${key}_${index}`}>{label}</label>
              <input
                id={`${key}_${index}`}
                type={type}
                value={exercise[key]}
                onChange={(e) => onChange(index, key, e.target.value)}
                className={`m-1 border rounded-md px-1 ${
                  type === "number" ? "w-15" : ""
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
