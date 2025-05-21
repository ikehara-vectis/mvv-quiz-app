import OpenAI from "openai";
import { mvvCorrectAnswers } from "../data/mvv";
import type { GradeRequest, GradeResponse } from "../types/grade";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function gradeMVV(
  userAnswer: GradeRequest,
): Promise<GradeResponse> {
  const prompt = createPrompt(userAnswer);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenAI");
  }

  console.log(content);
  const result = JSON.parse(content) as GradeResponse;

  const totalScore =
    (result.vision.score + result.mission.score + result.values.score) / 3;

  return {
    ...result,
    totalScore: Math.round(totalScore),
  };
}

function createPrompt(userAnswer: GradeRequest): string {
  return `
あなたはプロの採点者です。  
以下の模範回答とユーザー回答を比較して、各セクション（Vision、Mission、Values）について採点とフィードバックを行ってください。

【模範回答】
Vision:
${mvvCorrectAnswers.vision.map((v) => `- ${v}`).join("\n")}
Mission:
${mvvCorrectAnswers.mission.map((m) => `- ${m}`).join("\n")}
Values:
${mvvCorrectAnswers.values.map((val) => `- ${val}`).join("\n")}

【ユーザー回答】
Vision:
${userAnswer.vision.map((v) => `- ${v}`).join("\n")}
Mission:
${userAnswer.mission.map((m) => `- ${m}`).join("\n")}
Values:
${userAnswer.values.map((val) => `- ${val}`).join("\n")}

【採点ルール】
- 各セクションの回答を総合的に評価してください。
- 意味の一致度を0〜100点で点数化してください。
- フィードバックでは良い点、不足している点、表現の違いを具体的に指摘してください。
- 出力は以下のJSON形式で返してください。
- ユーザー回答が空だったり、一部空だったりすることがあります。その場合はその前提で評価を返してください。
- 出力は**以下のJSON形式のみで**、**コードブロックや説明なしで**返してください。
- **JSONの構造、プロパティ名、データ型を絶対に変更しないでください。**
- **文字列中の改行や特殊文字に注意し、JSON.parse()できるように返してください。**
- ユーザー回答が空、または一部空でも評価を行い、正しいJSONを返してください。
- **以下の形式を厳守してください：**

{
  "vision": {
    "score": 0,
    "feedback": ""
  },
  "mission": {
    "score": 0,
    "feedback": ""
  },
  "values": {
    "score": 0,
    "feedback": ""
  }
}
  `.trim();
}
