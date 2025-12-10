import React, { useState } from 'react';
import { Headphones, Award, CheckSquare, RefreshCw } from 'lucide-react';
import { LISTENING_QUESTIONS, MATCHING_OPTIONS } from '../constants';
import { QuestionItem } from './QuestionItem';
import { calculateBandScore, calculateScore } from '../utils';

export const ListeningModule: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  
  const handleAnswerChange = (id: number, value: string) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
  };

  const finishTest = () => {
    setIsFinished(true);
  };

  const handleRestart = () => {
    setIsFinished(false);
    setUserAnswers({});
  };

  const rawScore = calculateScore(userAnswers, LISTENING_QUESTIONS);
  const bandScore = calculateBandScore(rawScore, LISTENING_QUESTIONS.length);

  const questionsPart1 = LISTENING_QUESTIONS.filter(q => q.id <= 6);
  const questionsPart2 = LISTENING_QUESTIONS.filter(q => q.id >= 7);

  if (isFinished) {
    return (
      <div className="flex flex-col items-center p-4 bg-gray-50 min-h-full">
        <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden">
          <div className="bg-purple-600 p-8 text-white text-center">
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Listening Completed</h1>
          </div>
          <div className="grid grid-cols-2 gap-8 p-8 border-b border-gray-100">
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <span className="block text-sm font-semibold text-gray-500 uppercase">Score</span>
              <span className="text-4xl font-bold text-purple-700">{rawScore} / {LISTENING_QUESTIONS.length}</span>
            </div>
            <div className="text-center p-6 bg-indigo-50 rounded-xl">
              <span className="block text-sm font-semibold text-gray-500 uppercase">Band</span>
              <span className="text-4xl font-bold text-indigo-700">{bandScore}</span>
            </div>
          </div>
          <div className="p-8">
            <div className="grid gap-4">
               {LISTENING_QUESTIONS.map(q => (
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

  return (
    <div className="flex flex-col h-full bg-gray-100 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full p-6 space-y-6">
        
        {/* Audio Section */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg w-full">
          <iframe 
            width="100%" 
            height="300" 
            scrolling="no" 
            frameBorder="no" 
            allow="autoplay" 
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2227128047&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          />
          <div style={{fontSize: '10px', color: '#cccccc', lineBreak: 'anywhere', wordBreak: 'normal', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif', fontWeight: 100, padding: '4px'}}>
            <a href="https://soundcloud.com/th-y-tr-ng-ielts" title="Thầy Trường IELTS" target="_blank" rel="noreferrer" style={{color: '#cccccc', textDecoration: 'none'}}>Thầy Trường IELTS</a> · <a href="https://soundcloud.com/th-y-tr-ng-ielts/part-3-water-hyacinth" title="Part 3 Water hyacinth" target="_blank" rel="noreferrer" style={{color: '#cccccc', textDecoration: 'none'}}>Part 3 Water hyacinth</a>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
             <Headphones className="text-purple-600" />
             <h2 className="text-xl font-bold text-gray-800">Listening Questions</h2>
          </div>
          <p className="text-gray-600">Listen to the audio and answer questions 1-10 below.</p>
        </div>

        {/* Questions Form */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
           {/* Part 1: Q1-6 */}
           {questionsPart1.map(q => (
             <QuestionItem 
                key={q.id} 
                question={q} 
                userAnswer={userAnswers[q.id]} 
                onAnswerChange={handleAnswerChange} 
                showFeedback={false} 
             />
           ))}

           {/* Legend for Matching (inserted before Q7) */}
           <div className="my-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-4 border-b border-blue-200 pb-2">Questions 7-10: Match benefits to items</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                {MATCHING_OPTIONS.map(opt => (
                  <li key={opt.id} className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2 w-5 text-center flex-shrink-0 bg-white rounded border border-blue-200">{opt.id}</span> 
                    <span>{opt.text}</span>
                  </li>
                ))}
              </ul>
           </div>

           {/* Part 2: Q7-10 */}
           {questionsPart2.map(q => (
             <QuestionItem 
                key={q.id} 
                question={q} 
                userAnswer={userAnswers[q.id]} 
                onAnswerChange={handleAnswerChange} 
                showFeedback={false} 
             />
           ))}
           
           <div className="mt-8 pt-6 border-t border-gray-100">
             <button 
               onClick={finishTest}
               className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition transform hover:-translate-y-1"
             >
               Submit Answers
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};