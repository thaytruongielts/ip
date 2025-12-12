import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { SkillScore } from '../types';

interface ScoreChartProps {
  scores: SkillScore[];
}

const ScoreChart: React.FC<ScoreChartProps> = ({ scores }) => {
  // Transformation for Recharts
  const data = scores.map(s => ({
    subject: s.skill,
    A: s.bandScore,
    fullMark: 9, // IELTS max score
  }));

  return (
    <div className="w-full h-64 md:h-80 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center justify-center">
      <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Biểu đồ kỹ năng (Skill Radar)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
          <PolarRadiusAxis angle={30} domain={[0, 9]} tick={false} axisLine={false} />
          <Radar
            name="Band Score"
            dataKey="A"
            stroke="#2563eb"
            strokeWidth={3}
            fill="#3b82f6"
            fillOpacity={0.3}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#1e293b', fontWeight: 'bold' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreChart;