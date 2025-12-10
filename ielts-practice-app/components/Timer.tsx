import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  seconds: number;
  totalSeconds: number;
}

export const Timer: React.FC<TimerProps> = ({ seconds, totalSeconds }) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const percentage = (seconds / totalSeconds) * 100;
  const isWarning = seconds < 30;

  return (
    <div className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-lg transition-colors duration-300 ${isWarning ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-700'}`}>
      <Clock size={20} />
      <span>{formatTime(seconds)}</span>
      <div className="absolute bottom-0 left-0 h-1 bg-current opacity-30 transition-all duration-1000 ease-linear" style={{ width: `${percentage}%` }} />
    </div>
  );
};