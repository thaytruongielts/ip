import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BookOpen, Award, CheckSquare, RefreshCw } from 'lucide-react';
import { STAGES, PARAGRAPHS, QUESTIONS } from '../constants';
import { Timer } from './Timer';
import { QuestionItem } from './QuestionItem';
import { calculateBandScore, calculateScore } from '../utils';

export const ReadingModule: React.FC = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(STAGES[0].durationSeconds);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const stage = STAGES[currentStageIndex];
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const initialAnswers: Record<number, string> = {};
    QUESTIONS.forEach(q => initialAnswers[q.id] = "");
    setUserAnswers(initialAnswers);
  }, []);

  useEffect(() => {
    if (!hasStarted || isFinished) return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextStage();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentStageIndex, hasStarted, isFinished]);

  const handleNextStage = () => {
    if (currentStageIndex < STAGES.length - 1) {
      const nextIndex = currentStageIndex + 1;
      setCurrentStageIndex(nextIndex);
      setTimeLeft(STAGES[nextIndex].durationSeconds);
      window.scrollTo(0, 0);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    setIsFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleAnswerChange = (id: number, value: string) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleRestart = () => {
    setIsFinished(false);
    setHasStarted(false);
    setCurrentStageIndex(0);
    setTimeLeft(STAGES[0].durationSeconds);
    const initialAnswers: Record<number, string> = {};
    QUESTIONS.forEach(q => initialAnswers[q.id] = "");
    setUserAnswers(initialAnswers);
  };

  const currentParagraphs = useMemo(() => {
    return PARAGRAPHS.filter(p => stage.paragraphIds.includes(p.id));
  }, [stage]);

  const rawScore = calculateScore(userAnswers, QUESTIONS);
  const bandScore = calculateBandScore(rawScore, QUESTIONS.length);

  if (!hasStarted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center border border-gray-100">
          <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Reading Test: M-Pesa</h2>
          <div className="text-left bg-blue-50 p-4 rounded-lg mb-6 text-sm text-gray-700">
             <ul className="list-disc list-inside space-y-2">
              <li>Read paragraphs individually (timed).</li>
              <li>Answer related questions (timed).</li>
              <li>Final review (5 mins).</li>
            </ul>
          </div>
          <button onClick={handleStart} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition">Start Reading</button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center p-4 bg-gray-50 min-h-full">
        <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden">
          <div className="bg-blue-600 p-8 text-white text-center">
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Reading Completed</h1>
          </div>
          <div className="grid grid-cols-2 gap-8 p-8 border-b border-gray-100">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <span className="block text-sm font-semibold text-gray-500 uppercase">Score</span>
              <span className="text-4xl font-bold text-blue-700">{rawScore} / {QUESTIONS.length}</span>
            </div>
            <div className="text-center p-6 bg-indigo-50 rounded-xl">
              <span className="block text-sm font-semibold text-gray-500 uppercase">Band</span>
              <span className="text-4xl font-bold text-indigo-700">{bandScore}</span>
            </div>
          </div>
          <div className="p-8">
            <div className="grid gap-4">
               {QUESTIONS.map(q => (
                 <div key={q.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <QuestionItem question={q} userAnswer={userAnswers[q.id]} onAnswerChange={() => {}} showFeedback={true} />
                 </div>
               ))}
            </div>
          </div>
          <div className="p-8 text-center bg-gray-50">
            <button onClick={handleRestart} className="inline-flex items-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition">
              <RefreshCw className="w-4 h-4 mr-2" /> Restart
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isReadingOnly = stage.type === 'reading_only';
  
  return (
    <div className="flex flex-col h-full bg-gray-100">
      <header className="bg-white shadow-sm flex-none px-6 py-3 flex items-center justify-between z-10">
        <div>
           <h2 className="font-bold text-gray-800">Reading: M-Pesa</h2>
           <p className="text-xs text-gray-500">{stage.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <Timer seconds={timeLeft} totalSeconds={stage.durationSeconds} />
          {stage.type === 'review' && (
             <button onClick={finishTest} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-semibold">Submit</button>
          )}
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden">
        <div className={`${isReadingOnly ? 'w-full max-w-3xl mx-auto' : 'w-1/2'} flex flex-col h-full bg-white border-r border-gray-200 overflow-y-auto p-8`}>
             <h1 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Money Transfers by Mobile</h1>
             {currentParagraphs.map(p => (
               <div key={p.id} className="mb-6">
                 <h3 className="font-bold text-blue-800 mb-2">Paragraph {p.id}</h3>
                 <p className="text-gray-800 leading-relaxed text-lg font-serif">{p.content}</p>
               </div>
             ))}
        </div>
        {!isReadingOnly && (
          <div className="w-1/2 flex flex-col h-full bg-gray-50 overflow-y-auto p-8">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                 {QUESTIONS.map(q => (
                   <QuestionItem key={q.id} question={q} userAnswer={userAnswers[q.id]} onAnswerChange={handleAnswerChange} showFeedback={false} />
                 ))}
             </div>
          </div>
        )}
      </main>
    </div>
  );
};