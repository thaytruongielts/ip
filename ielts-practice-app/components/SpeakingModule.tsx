import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Download, Clock, PlayCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { Timer } from './Timer';

// --- Types & Data ---

interface SpeakingStep {
  id: number;
  part: string;
  topic?: string;
  content: string;
  duration: number; // seconds
  type: 'question' | 'preparation' | 'cue_card';
}

const SPEAKING_STEPS: SpeakingStep[] = [
  // --- PART 1 (1 minute per question) ---
  // Topic 1
  { id: 1, part: 'Part 1', topic: 'Work or Study', content: 'Do you work or are you a student?', duration: 60, type: 'question' },
  { id: 2, part: 'Part 1', topic: 'Work or Study', content: 'What do you like most about your job/course?', duration: 60, type: 'question' },
  { id: 3, part: 'Part 1', topic: 'Work or Study', content: 'Is there anything you dislike about it?', duration: 60, type: 'question' },
  { id: 4, part: 'Part 1', topic: 'Work or Study', content: 'Do you plan to continue in this field in the future?', duration: 60, type: 'question' },
  // Topic 2
  { id: 5, part: 'Part 1', topic: 'Weekends', content: 'How do you usually spend your weekends?', duration: 60, type: 'question' },
  { id: 6, part: 'Part 1', topic: 'Weekends', content: 'Do you prefer to relax or go out on weekends?', duration: 60, type: 'question' },
  { id: 7, part: 'Part 1', topic: 'Weekends', content: 'What did you do last weekend?', duration: 60, type: 'question' },
  { id: 8, part: 'Part 1', topic: 'Weekends', content: 'Do you think weekends are important for people? Why?', duration: 60, type: 'question' },
  // Topic 3
  { id: 9, part: 'Part 1', topic: 'Sunglasses', content: 'Do you like wearing sunglasses?', duration: 60, type: 'question' },
  { id: 10, part: 'Part 1', topic: 'Sunglasses', content: 'Where do you usually buy sunglasses?', duration: 60, type: 'question' },
  { id: 11, part: 'Part 1', topic: 'Sunglasses', content: 'Have you ever lost a pair of sunglasses?', duration: 60, type: 'question' },
  { id: 12, part: 'Part 1', topic: 'Sunglasses', content: 'Do people in your country wear sunglasses often?', duration: 60, type: 'question' },

  // --- PART 2 ---
  // Preparation (1.5 mins)
  { 
    id: 13, 
    part: 'Part 2', 
    topic: 'Cue Card (Preparation)', 
    content: `Describe a piece of good advice that you gave to someone.\n\nYou should say:\n- Who you gave the advice to\n- What the advice was\n- Why you gave this advice\n- And explain how the person reacted to your advice.`, 
    duration: 90, 
    type: 'preparation' 
  },
  // Speaking (3 mins)
  { 
    id: 14, 
    part: 'Part 2', 
    topic: 'Cue Card (Speaking)', 
    content: `Describe a piece of good advice that you gave to someone.\n\nYou should say:\n- Who you gave the advice to\n- What the advice was\n- Why you gave this advice\n- And explain how the person reacted to your advice.`, 
    duration: 180, 
    type: 'cue_card' 
  },

  // --- PART 3 (1.5 minutes per question) ---
  // Parents and Advice
  { id: 15, part: 'Part 3', topic: 'Parents and Advice', content: 'Do you think parents should give their children advice? Why or why not?', duration: 90, type: 'question' },
  { id: 16, part: 'Part 3', topic: 'Parents and Advice', content: "At what age do children usually start resisting their parents' advice?", duration: 90, type: 'question' },
  { id: 17, part: 'Part 3', topic: 'Parents and Advice', content: 'Is the advice given by parents today different from the advice given in the past?', duration: 90, type: 'question' },
  // Professional Advice
  { id: 18, part: 'Part 3', topic: 'Professional Advice', content: 'In which situations do people usually seek advice from professionals (e.g., doctors, lawyers)?', duration: 90, type: 'question' },
  { id: 19, part: 'Part 3', topic: 'Professional Advice', content: 'Do you think people rely too much on online information instead of professional advice nowadays?', duration: 90, type: 'question' },
  { id: 20, part: 'Part 3', topic: 'Professional Advice', content: 'What qualities make a person a good advisor?', duration: 90, type: 'question' },
  // Peer Advice
  { id: 21, part: 'Part 3', topic: 'Peer Advice', content: 'Are friends better at giving advice than family members?', duration: 90, type: 'question' },
  { id: 22, part: 'Part 3', topic: 'Peer Advice', content: 'Can giving bad advice to a friend damage the friendship?', duration: 90, type: 'question' },
];

export const SpeakingModule: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  
  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [completedRecordings, setCompletedRecordings] = useState<{stepId: number, url: string, label: string}[]>([]);
  
  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const currentStep = SPEAKING_STEPS[currentStepIndex];

  // Initialize step time
  useEffect(() => {
    if (hasStarted && !isFinished) {
      setTimeLeft(currentStep.duration);
      setAudioUrl(null); // Reset audio for new step
      setIsRecording(false);
      
      // Auto-start recording for Speaking parts if desired, 
      // but prompt implies buttons. We won't auto-start recording to be safe, 
      // but we auto-start the timer.
    }
  }, [currentStepIndex, hasStarted, isFinished]);

  // Timer Logic
  useEffect(() => {
    if (!hasStarted || isFinished) return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleStepComplete(); // Time is up, move next
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasStarted, isFinished, currentStepIndex, isRecording]); // Add dependencies to ensure closure captures latest state

  const handleStartTest = async () => {
    try {
      // Request permissions upfront
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasStarted(true);
      setCurrentStepIndex(0);
    } catch (err) {
      alert("Microphone permission is required for this test.");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Save to completed list for final review
        setCompletedRecordings(prev => {
          // Remove existing for this step if any
          const filtered = prev.filter(r => r.stepId !== currentStep.id);
          return [...filtered, { 
            stepId: currentStep.id, 
            url, 
            label: `${currentStep.part} - ${currentStep.topic}` 
          }];
        });

        // Stop all tracks to release mic
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleStepComplete = () => {
    // Stop recording if active
    if (isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    if (currentStepIndex < SPEAKING_STEPS.length - 1) {
      // Small delay to ensure state updates if needed, but mostly immediate transition
      setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 100); 
    } else {
      setIsFinished(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!hasStarted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center border border-gray-100">
          <Mic className="w-16 h-16 text-teal-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">IELTS Speaking Practice</h2>
          <div className="text-left bg-teal-50 p-4 rounded-lg mb-6 text-sm text-gray-700">
             <ul className="list-disc list-inside space-y-2">
              <li><strong>Part 1:</strong> Interview (1 min/question)</li>
              <li><strong>Part 2:</strong> Cue Card (1.5 min prep, 3 min speak)</li>
              <li><strong>Part 3:</strong> Discussion (1.5 min/question)</li>
              <li>Required: Microphone access</li>
            </ul>
          </div>
          <button 
            onClick={handleStartTest} 
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-md flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-5 h-5" /> Start Test
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full bg-gray-50 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full border border-gray-100">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Test Completed</h2>
            <p className="text-gray-600">Great job! Here are your recordings.</p>
          </div>

          <div className="space-y-4">
            {completedRecordings.length === 0 && <p className="text-center text-gray-500">No recordings found.</p>}
            {completedRecordings.map((rec, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <span className="font-bold text-gray-700 block">{rec.label}</span>
                  <span className="text-xs text-gray-500">Step ID: {rec.stepId}</span>
                </div>
                <div className="flex items-center gap-2">
                   <audio src={rec.url} controls className="h-8 w-48" />
                   <button 
                    onClick={() => handleDownload(rec.url, `IELTS_Speaking_Step_${rec.stepId}.webm`)}
                    className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 transition"
                    title="Download"
                   >
                     <Download className="w-4 h-4" />
                   </button>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => window.location.reload()} 
            className="mt-8 w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-xl transition"
          >
            Take New Test
          </button>
        </div>
      </div>
    );
  }

  const isPrep = currentStep.type === 'preparation';

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm flex-none px-6 py-4 flex items-center justify-between z-10 border-b border-gray-200">
        <div className="flex items-center gap-2">
           <Mic className="text-teal-600 w-6 h-6" />
           <div>
             <h2 className="font-bold text-gray-800 text-lg">{currentStep.part}: {currentStep.topic}</h2>
             <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
               Step {currentStepIndex + 1} of {SPEAKING_STEPS.length}
             </span>
           </div>
        </div>
        <Timer seconds={timeLeft} totalSeconds={currentStep.duration} />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
         <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            
            {/* Status Badge */}
            <div className="mb-6">
              {isPrep ? (
                <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                  <AlertCircle className="w-4 h-4" /> Preparation Time
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  <Mic className="w-4 h-4" /> Speaking Time
                </span>
              )}
            </div>

            {/* Question Content */}
            <div className="mb-10 min-h-[150px] flex items-center justify-center">
              <p className="text-2xl font-medium text-gray-800 whitespace-pre-wrap leading-relaxed">
                {currentStep.content}
              </p>
            </div>

            {/* Controls */}
            {!isPrep && (
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4">
                  {!isRecording ? (
                    <button 
                      onClick={startRecording}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg transition transform hover:scale-105"
                    >
                      <Mic className="w-6 h-6" /> Record Answer
                    </button>
                  ) : (
                    <button 
                      onClick={stopRecording}
                      className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg transition"
                    >
                      <Square className="w-6 h-6 fill-current" /> Stop Recording
                    </button>
                  )}
                </div>

                {/* Immediate Download (Only if recorded and stopped, but time hasn't run out/auto-advanced yet) */}
                {audioUrl && !isRecording && (
                   <div className="flex items-center gap-3 animate-fade-in bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                     <span className="text-sm text-green-600 font-semibold flex items-center gap-1">
                       <CheckCircle className="w-4 h-4" /> Recorded
                     </span>
                     <button 
                       onClick={() => handleDownload(audioUrl, `IELTS_Speaking_Step_${currentStep.id}.webm`)}
                       className="flex items-center gap-1 text-teal-600 hover:text-teal-800 font-semibold text-sm"
                     >
                       <Download className="w-4 h-4" /> Download Now
                     </button>
                   </div>
                )}
              </div>
            )}

            {isPrep && (
               <p className="text-gray-500 italic">Take notes. Recording will be available in the next step.</p>
            )}

            <div className="mt-8 text-xs text-gray-400">
               Next question in: {timeLeft}s
            </div>
         </div>
      </main>
    </div>
  );
};