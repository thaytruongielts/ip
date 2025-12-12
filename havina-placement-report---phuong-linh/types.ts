export enum SkillType {
  LISTENING = 'Listening',
  READING = 'Reading',
  WRITING = 'Writing',
  SPEAKING = 'Speaking'
}

export interface SkillScore {
  skill: SkillType;
  rawScore: string;
  bandScore: number;
  description: string;
  color: string; // Tailwind color class snippet, e.g., 'blue'
}

export interface StudentInfo {
  name: string;
  testDate: string;
  teacher: string;
  centerName: string;
}

export interface RoadmapStep {
  title: string;
  description: string;
  iconType: 'foundation' | 'reading' | 'listening' | 'memory';
}

export interface ReportData {
  student: StudentInfo;
  scores: SkillScore[];
  overallBand: number;
  overallAssessment: string;
  detailedComments: {
    skill: SkillType;
    comment: string;
  }[];
  roadmap: RoadmapStep[];
  recordingLink: string;
  testLink: string;
}