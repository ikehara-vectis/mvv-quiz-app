export type GradeRequest = {
  vision: string[];
  mission: string[];
  values: string[];
};

export type SectionScore = {
  score: number;
  feedback: string;
};

export type GradeResponse = {
  vision: SectionScore;
  mission: SectionScore;
  values: SectionScore;
  totalScore: number;
};
