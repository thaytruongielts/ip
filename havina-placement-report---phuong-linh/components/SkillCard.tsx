import React from 'react';
import { SkillScore, SkillType } from '../types';
import { Ear, BookOpen, PenTool, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SkillCardProps {
  skillData: SkillScore;
  comment: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ skillData, comment }) => {
  const getIcon = (skill: SkillType) => {
    switch (skill) {
      case SkillType.LISTENING: return <Ear className="w-5 h-5 text-blue-600" />;
      case SkillType.READING: return <BookOpen className="w-5 h-5 text-red-500" />;
      case SkillType.WRITING: return <PenTool className="w-5 h-5 text-amber-500" />;
      default: return <CheckCircle2 className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBorderColor = (skill: SkillType) => {
    switch (skill) {
      case SkillType.LISTENING: return 'border-l-blue-500';
      case SkillType.READING: return 'border-l-red-500';
      case SkillType.WRITING: return 'border-l-amber-500';
      default: return 'border-l-gray-300';
    }
  };

  const getBadgeColor = (skill: SkillType) => {
    switch (skill) {
        case SkillType.LISTENING: return 'bg-blue-100 text-blue-800';
        case SkillType.READING: return 'bg-red-100 text-red-800';
        case SkillType.WRITING: return 'bg-amber-100 text-amber-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-100 p-5 border-l-4 ${getBorderColor(skillData.skill)} hover:shadow-md transition-shadow duration-300`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg bg-slate-50`}>
            {getIcon(skillData.skill)}
          </div>
          <div>
            <h4 className="font-bold text-slate-800">{skillData.skill}</h4>
            <p className="text-xs text-slate-500 font-medium">Raw: {skillData.rawScore}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${getBadgeColor(skillData.skill)}`}>
          Band {skillData.bandScore}
        </div>
      </div>
      
      <div className="space-y-2">
          {skillData.bandScore < 2.0 && (
             <div className="flex items-center gap-2 text-xs font-semibold text-red-600 bg-red-50 p-2 rounded">
                <AlertCircle size={14} />
                <span>Cần cải thiện gấp</span>
             </div>
          )}
        <p className="text-slate-600 text-sm leading-relaxed text-justify">
          {comment}
        </p>
      </div>
    </div>
  );
};

export default SkillCard;