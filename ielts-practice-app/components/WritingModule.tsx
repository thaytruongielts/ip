import React, { useState, useEffect, useRef } from 'react';
import { PenTool, Download, Clock } from 'lucide-react';
import { Timer } from './Timer';

interface WritingModuleProps {
  title: string;
  durationSeconds: number;
  minWords: number;
  instructionText: string;
  promptText: string;
  imageSrc?: string;
  downloadFileName: string;
}

export const WritingModule: React.FC<WritingModuleProps> = ({
  title,
  durationSeconds,
  minWords,
  instructionText,
  promptText,
  imageSrc,
  downloadFileName
}) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [essayText, setEssayText] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Reset state when props change (i.e. switching tasks)
  useEffect(() => {
    setHasStarted(false);
    setTimeLeft(durationSeconds);
    setEssayText("");
    setIsFinished(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [title, durationSeconds]);

  useEffect(() => {
    if (!hasStarted || isFinished) return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasStarted, isFinished]);

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleDownload = () => {
    const content = `${title}
    
Instructions:
${instructionText}

Prompt:
${promptText}
${imageSrc ? `(Image Source: ${imageSrc})` : ''}

---------------------------------------------------
Student Response:
---------------------------------------------------

${essayText}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = downloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const wordCount = essayText.trim().split(/\s+/).filter(w => w.length > 0).length;

  if (!hasStarted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center border border-gray-100">
          <PenTool className="w-16 h-16 text-pink-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
          <div className="text-left bg-pink-50 p-4 rounded-lg mb-6 text-sm text-gray-700">
             <ul className="list-disc list-inside space-y-2">
              <li>Time allowed: <strong>{Math.floor(durationSeconds / 60)} minutes</strong>.</li>
              <li>Write at least <strong>{minWords} words</strong>.</li>
            </ul>
          </div>
          <button 
            onClick={handleStart} 
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-md"
          >
            Start Writing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm flex-none px-6 py-3 flex items-center justify-between z-10 border-b border-gray-200">
        <div className="flex items-center gap-2">
           <PenTool className="text-pink-600 w-5 h-5" />
           <h2 className="font-bold text-gray-800">{title}</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className={`px-3 py-1 rounded-md text-sm font-semibold ${wordCount < minWords ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
            {wordCount} / {minWords} words
          </div>
          <Timer seconds={timeLeft} totalSeconds={durationSeconds} />
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded text-sm font-semibold transition"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </header>

      {/* Main Content Split View */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Left: Prompt */}
        <div className="w-1/2 overflow-y-auto p-6 bg-white border-r border-gray-200">
          <div className="max-w-2xl mx-auto">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-blue-900 mb-2">Instructions</h3>
              <p className="text-sm text-blue-800 whitespace-pre-wrap">
                {instructionText}
              </p>
            </div>
            
            <p className="mb-4 text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
              {promptText}
            </p>

            {imageSrc && (
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6">
                <img 
                  src={imageSrc} 
                  alt="Task Reference" 
                  className="w-full h-auto object-contain bg-white"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: Editor */}
        <div className="w-1/2 flex flex-col bg-gray-50">
          <div className="flex-1 p-6">
             <textarea
               className="w-full h-full p-6 text-lg leading-relaxed text-gray-800 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none outline-none transition"
               placeholder="Start typing your essay here..."
               value={essayText}
               onChange={(e) => setEssayText(e.target.value)}
               spellCheck="false"
               disabled={isFinished}
             />
          </div>
          {isFinished && (
            <div className="px-6 pb-6">
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center justify-between">
                <span className="font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5" /> Time is up!
                </span>
                <span className="text-sm">Please download your work to save it.</span>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};