import React, { useState } from 'react';
import { PenTool, Mic } from 'lucide-react';
import { WritingModule } from './components/WritingModule';
import { SpeakingModule } from './components/SpeakingModule';

type Tab = 'task1' | 'task2' | 'speaking';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('task1');

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <nav className="bg-gray-900 text-white shadow-lg flex-none z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="font-bold text-xl tracking-tight">IELTS Practice Master</span>
            <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('task1')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'task1' 
                    ? 'bg-pink-600 text-white shadow' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <PenTool className="w-4 h-4 mr-2" />
                Writing Task 1
              </button>
              <button
                onClick={() => setActiveTab('task2')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'task2' 
                    ? 'bg-purple-600 text-white shadow' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <PenTool className="w-4 h-4 mr-2" />
                Writing Task 2
              </button>
              <button
                onClick={() => setActiveTab('speaking')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'speaking' 
                    ? 'bg-teal-600 text-white shadow' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Mic className="w-4 h-4 mr-2" />
                Speaking
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'task1' && (
          <WritingModule 
            title="Writing Task 1"
            durationSeconds={20 * 60}
            minWords={150}
            instructionText="You should spend about 20 minutes on this task."
            promptText="The chart below shows the number of girls per 100 boys enrolled in different levels of school education.
Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
            imageSrc="https://i.postimg.cc/7hKH3Nq2/task1.png"
            downloadFileName="IELTS_Task1_Essay.txt"
          />
        )}
        {activeTab === 'task2' && (
          <WritingModule 
            title="Writing Task 2"
            durationSeconds={40 * 60}
            minWords={250}
            instructionText="You should spend about 40 minutes on this task."
            promptText="People are having more and more sugar-based drinks. What are the reasons? What are the solutions to make people drink less."
            downloadFileName="IELTS_Task2_Essay.txt"
          />
        )}
        {activeTab === 'speaking' && (
          <SpeakingModule />
        )}
      </div>
    </div>
  );
};

export default App;