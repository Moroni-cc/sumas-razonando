export type GameMode = 'guide' | 'examples' | 'worksheet' | 'game' | 'stats';

export type DifficultyLevel = 'level1' | 'level2' | 'level3';

export interface LevelInfo {
  id: DifficultyLevel;
  name: string;
  description: string;
  badge: string;
  color: string;
  borderColor: string;
  bgColor: string;
  unlocked: boolean;
  stars: number;
}

export interface ReasoningProblem {
  id: string;
  num1: number;
  num2: number;
  neededFor10: number; // e.g. for 9 + 6, needed is 1
  remainder: number;   // e.g. for 9 + 6, remainder is 5
  total: number;       // e.g. 15
}

export interface WorksheetState {
  treeLeft: string;
  treeRight: string;
  line1Num1: string;
  line1Num2: string;
  line2Remainder: string;
  finalAnswer: string;
  isCorrect?: boolean;
}
