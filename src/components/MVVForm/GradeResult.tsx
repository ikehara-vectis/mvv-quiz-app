import { mvvCorrectAnswers } from "@/data/mvv";
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

      <div className="space-y-6">
        {(["mission", "vision", "values"] as const).map((section) => {
          const sectionData = result[section];
          const correctAnswers = mvvCorrectAnswers[section];

          const titleMap: Record<typeof section, string> = {
            vision: "Vision",
            mission: "Mission",
            values: "Values",
          };

          return (
            <div key={section}>
              <h3 className="text-lg font-semibold mb-1">
                {titleMap[section]}: {sectionData.score} 点
              </h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap mb-2">
                {sectionData.feedback}
              </p>

              <div className="bg-base-200 p-3 rounded text-sm">
                <div className="font-semibold mb-1 text-gray-800">正答:</div>
                <ul className="list-disc list-inside space-y-1">
                  {correctAnswers.map((text, idx) => (
                    <li key={idx} className="text-gray-700 whitespace-pre-wrap">
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
