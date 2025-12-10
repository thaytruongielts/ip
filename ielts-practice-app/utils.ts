import { Question } from "./types";

/**
 * Normalizes answer text for comparison (trims, lowercase, removes extra spaces)
 */
export const normalizeAnswer = (text: string): string => {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
};

/**
 * Calculates the raw score based on user answers.
 */
export const calculateScore = (userAnswers: Record<number, string>, questions: Question[]): number => {
  let score = 0;
  questions.forEach((q) => {
    const userAnswer = userAnswers[q.id];
    if (userAnswer) {
      const normalizedUser = normalizeAnswer(userAnswer);
      const isCorrect = q.correctAnswers.some(ans => normalizeAnswer(ans) === normalizedUser);
      if (isCorrect) score++;
    }
  });
  return score;
};

/**
 * Estimates IELTS Band score based on a raw score scaled to 40.
 * Formula: (Raw / Total) * 40 -> Map to Band
 */
export const calculateBandScore = (correctCount: number, totalQuestions: number): string => {
  if (totalQuestions === 0) return "0.0";
  
  // Scale the score to be out of 40 (standard IELTS Reading total)
  const scaledScore = (correctCount / totalQuestions) * 40;
  const roundedScaled = Math.round(scaledScore);

  // Approximate Academic Reading Band Scale
  if (roundedScaled >= 39) return "9.0";
  if (roundedScaled >= 37) return "8.5";
  if (roundedScaled >= 35) return "8.0";
  if (roundedScaled >= 33) return "7.5";
  if (roundedScaled >= 30) return "7.0";
  if (roundedScaled >= 27) return "6.5";
  if (roundedScaled >= 23) return "6.0";
  if (roundedScaled >= 19) return "5.5";
  if (roundedScaled >= 15) return "5.0";
  if (roundedScaled >= 13) return "4.5";
  if (roundedScaled >= 10) return "4.0";
  if (roundedScaled >= 8) return "3.5";
  if (roundedScaled >= 6) return "3.0";
  if (roundedScaled >= 4) return "2.5";
  return "2.0"; // Below 4
};