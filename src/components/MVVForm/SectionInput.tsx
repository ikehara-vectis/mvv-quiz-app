type Props = {
  section: string;
  values: string[];
  type: "textarea" | "input";
  onChange: (index: number, value: string) => void;
};

export default function SectionInput({
  section,
  values,
  type,
  onChange,
}: Props) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-3">{section}</h2>
      {values.map((value, idx) => {
        const commonProps = {
          className: `${type === "textarea" ? "textarea textarea-bordered" : "input input-bordered"} w-full mb-3`,
          placeholder: `${section} ${idx + 1}`,
          value,
          onChange: (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => onChange(idx, e.target.value),
        };

        return type === "textarea" ? (
          <textarea key={`${section}-${idx}`} {...commonProps} />
        ) : (
          <input key={`${section}-${idx}`} type="text" {...commonProps} />
        );
      })}
    </section>
  );
}
