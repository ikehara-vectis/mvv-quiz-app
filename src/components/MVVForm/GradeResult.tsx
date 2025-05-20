import type { GradeResponse } from "@/types/grade";

type Props = {
  result: GradeResponse;
};

export default function GradeResult({ result }: Props) {
  return (
    <div className="mt-6 p-6 border rounded-lg bg-base-100 shadow">
      <h2 className="text-xl font-bold mb-4 text-primary">
        総合スコア: {result.totalScore} / 100
      </h2>

      <div className="space-y-4">
        {["mission", "vision", "values"].map((section) => {
          const sectionData = result[section as keyof GradeResponse] as {
            score: number;
            feedback: string;
          };

          const titleMap: Record<string, string> = {
            vision: "Vision",
            mission: "Mission",
            values: "Values",
          };

          return (
            <div key={section}>
              <h3 className="text-lg font-semibold mb-1">
                {titleMap[section]}: {sectionData.score} 点
              </h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {sectionData.feedback}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
