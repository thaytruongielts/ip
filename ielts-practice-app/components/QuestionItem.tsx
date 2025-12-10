import React from 'react';
import { Question, QuestionType } from '../types';
import { CheckCircle, XCircle } from 'lucide-react';
import { normalizeAnswer } from '../utils';

interface QuestionItemProps {
  question: Question;
  userAnswer: string;
  onAnswerChange: (id: number, value: string) => void;
  showFeedback: boolean;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({ question, userAnswer, onAnswerChange, showFeedback }) => {
  const isCorrect = showFeedback && question.correctAnswers.some(ans => normalizeAnswer(ans) === normalizeAnswer(userAnswer || ''));

  const renderFeedbackIcon = () => {
    if (!showFeedback) return null;
    return isCorrect ? (
      <CheckCircle className="text-green-500 w-5 h-5 ml-2 flex-shrink-0" />
    ) : (
      <XCircle className="text-red-500 w-5 h-5 ml-2 flex-shrink-0" />
    );
  };

  const commonClasses = "w-full p-2 border rounded transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none " + 
    (showFeedback 
      ? (isCorrect ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300")
      : "bg-white border-gray-300");

  const renderInput = () => {
    switch (question.type) {
      case QuestionType.PARAGRAPH_MATCH:
      case QuestionType.TRUE_FALSE:
        return (
          <div className="flex flex-wrap gap-2 mt-2">
            {question.options?.map(opt => (
              <label key={opt} className={`flex items-center space-x-2 cursor-pointer p-2 rounded border transition-colors ${userAnswer === opt ? 'bg-blue-100 border-blue-400 font-semibold' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  value={opt}
                  checked={userAnswer === opt}
                  onChange={(e) => !showFeedback && onAnswerChange(question.id, e.target.value)}
                  disabled={showFeedback}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );

      case QuestionType.MULTIPLE_CHOICE:
        return (
          <div className="flex flex-col gap-2 mt-2">
            {question.options?.map(opt => (
              <label key={opt} className={`flex items-center space-x-3 cursor-pointer p-3 rounded border transition-colors ${userAnswer === opt ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  value={opt}
                  checked={userAnswer === opt}
                  onChange={(e) => !showFeedback && onAnswerChange(question.id, e.target.value)}
                  disabled={showFeedback}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                />
                <span className="text-gray-700 leading-snug">{opt}</span>
              </label>
            ))}
          </div>
        );
      
      case QuestionType.MATCHING:
        return (
           <div className="mt-1 flex items-center">
             <select 
               value={userAnswer || ''}
               onChange={(e) => onAnswerChange(question.id, e.target.value)}
               disabled={showFeedback}
               className={`${commonClasses} max-w-[100px] font-semibold text-center`}
             >
               <option value="">-</option>
               {question.options?.map(opt => (
                 <option key={opt} value={opt}>{opt}</option>
               ))}
             </select>
           </div>
        );

      case QuestionType.SENTENCE_COMPLETION:
        return (
          <div className="flex items-baseline flex-wrap gap-2 leading-8 mt-1">
            {question.prefix && <span>{question.prefix}</span>}
            <input
              type="text"
              value={userAnswer || ''}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              disabled={showFeedback}
              className={`${commonClasses} w-48 inline-block mx-1`}
              placeholder="Type answer..."
            />
            {question.suffix && <span>{question.suffix}</span>}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="mb-6 pb-4 border-b border-gray-100 last:border-0">
      <div className="flex items-start justify-between">
        <div className="w-full">
          <div className="flex items-center mb-1">
             <span className="font-bold text-blue-800 mr-2 min-w-[24px]">{question.id}.</span>
             <span className="text-sm font-medium text-gray-700">{question.prompt}</span>
          </div>
          {renderInput()}
        </div>
        {renderFeedbackIcon()}
      </div>
    </div>
  );
};