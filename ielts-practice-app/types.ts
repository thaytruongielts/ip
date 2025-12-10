export enum QuestionType {
  PARAGRAPH_MATCH = 'PARAGRAPH_MATCH',
  SENTENCE_COMPLETION = 'SENTENCE_COMPLETION',
  TRUE_FALSE = 'TRUE_FALSE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  MATCHING = 'MATCHING',
}

export interface Question {
  id: number;
  type: QuestionType;
  prompt: string;
  prefix?: string; // Text before the input
  suffix?: string; // Text after the input
  options?: string[]; // For dropdowns/radios
  correctAnswers: string[]; // Array of acceptable string answers
}

export interface Paragraph {
  id: string;
  title?: string;
  content: string;
}

export interface Stage {
  id: number;
  type: 'reading_only' | 'reading_answering' | 'review';
  paragraphIds: string[]; // Which paragraphs to show
  durationSeconds: number;
  description: string;
}

export interface UserAnswers {
  [questionId: number]: string;
}