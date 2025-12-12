import React from 'react';
import { 
  Printer, 
  Download, 
  MapPin, 
  Calendar, 
  User, 
  Award, 
  TrendingUp, 
  Target,
  ExternalLink,
  BookMarked,
  Headphones,
  GraduationCap,
  Brain,
  FileText
} from 'lucide-react';
import ScoreChart from './components/ScoreChart';
import SkillCard from './components/SkillCard';
import { ReportData, SkillType } from './types';

// Hardcoded data based on user request
const reportData: ReportData = {
  student: {
    name: "Phương Linh",
    testDate: "Thứ Tư, 10/12",
    teacher: "Thầy Trường",
    centerName: "HAVINA TAM DƯƠNG"
  },
  overallBand: 2.0,
  overallAssessment: "Bạn Phương Linh đang ở trình độ Beginner (Sơ cấp). Bạn có tiềm năng về kỹ năng Nghe nhưng đang bị mất gốc kiến thức nền tảng (từ vựng và ngữ pháp) dẫn đến việc không thể Đọc hiểu và Viết câu hoàn chỉnh.",
  scores: [
    {
      skill: SkillType.LISTENING,
      rawScore: "4/10",
      bandScore: 4.0,
      description: "Đúng 4/10 câu (ngay lần nghe đầu tiên)",
      color: "blue"
    },
    {
      skill: SkillType.READING,
      rawScore: "0/? (Chưa có câu đúng)",
      bandScore: 1.0,
      description: "Chưa có câu trả lời đúng",
      color: "red"
    },
    {
      skill: SkillType.WRITING,
      rawScore: "Task 1",
      bandScore: 3.5,
      description: "Task 1",
      color: "amber"
    }
  ],
  detailedComments: [
    {
      skill: SkillType.LISTENING,
      comment: "Đây là kỹ năng tốt nhất của bạn ở thời điểm hiện tại. Việc làm đúng 4/10 câu ngay lần nghe đầu tiên cho thấy bạn có khả năng bắt từ khóa (keywords) và phản xạ âm thanh ở mức cơ bản khá tốt."
    },
    {
      skill: SkillType.WRITING,
      comment: "Ở mức 3.5, bạn Phương Linh đã có ý thức về việc hình thành câu và hiểu đề bài, tuy nhiên vốn từ vựng còn hạn chế và ngữ pháp chưa chuẩn xác, dẫn đến việc diễn đạt chưa trọn vẹn ý tưởng."
    },
    {
      skill: SkillType.READING,
      comment: "Đây là điểm yếu lớn nhất cần khắc phục ngay lập tức. Kết quả chưa có câu đúng (Band 1.0) phản ánh việc bạn đang thiếu hụt nghiêm trọng vốn từ vựng nền tảng và chưa nắm được các cấu trúc ngữ pháp để hiểu nội dung văn bản."
    }
  ],
  roadmap: [
    {
      title: "Giai đoạn 1: Lấy lại gốc",
      description: "Tập trung toàn lực vào Ngữ pháp cơ bản và Xây dựng vốn từ vựng thông dụng. Chưa nên vội luyện đề thi IELTS ngay.",
      iconType: "foundation"
    },
    {
      title: "Cải thiện Reading",
      description: "Bắt đầu đọc các đoạn văn ngắn, đơn giản để làm quen với mặt chữ và cấu trúc câu.",
      iconType: "reading"
    },
    {
      title: "Duy trì Listening",
      description: "Phát huy thế mạnh nghe để hỗ trợ việc học từ vựng và phát âm.",
      iconType: "listening"
    },
    {
      title: "Phương pháp Siêu trí nhớ",
      description: "Học từ vựng IELTS theo phương pháp siêu trí nhớ để tăng tốc độ ghi nhớ, mở rộng vốn từ và phản xạ nhanh.",
      iconType: "memory"
    }
  ],
  recordingLink: "https://drive.google.com/drive/folders/1MqOg8VN51eu_zvc0V_NGdjiRBcbpCUTx?usp=sharing",
  testLink: "https://tes-beta-peach.vercel.app/"
};

const App: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12 print:bg-white print:pb-0">
      
      {/* Navigation / Actions Bar - Hidden in Print */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 print:hidden">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="font-bold text-slate-700 text-lg flex items-center gap-2">
            <GraduationCap className="text-blue-600" />
            <span className="hidden sm:inline">HAVINA REPORT</span>
          </div>
          <div className="flex gap-2">
             <a 
              href={reportData.testLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-200"
            >
              <FileText size={16} />
              <span className="hidden sm:inline">Xem bài làm</span>
            </a>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              <Printer size={16} />
              <span className="hidden sm:inline">In báo cáo</span>
            </button>
            <a 
              href={reportData.recordingLink} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Recording</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-8 print:p-0">
        
        {/* Report Header */}
        <div className="bg-white rounded-t-2xl shadow-sm border-x border-t border-slate-200 p-8 text-center relative overflow-hidden print:shadow-none print:border-none">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500"></div>
          <h1 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">Kính gửi Trung tâm Anh ngữ</h1>
          <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-6 uppercase tracking-tight">{reportData.student.centerName}</h2>
          <div className="inline-block px-6 py-2 bg-blue-50 text-blue-800 rounded-full text-sm font-bold border border-blue-100">
            BÁO CÁO KẾT QUẢ KIỂM TRA ĐẦU VÀO
          </div>
        </div>

        {/* Student Info Grid */}
        <div className="bg-slate-900 text-white p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 print:bg-slate-900 print:text-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <User size={24} className="text-blue-300" />
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Học viên</p>
              <p className="text-xl font-bold">{reportData.student.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <Calendar size={24} className="text-blue-300" />
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Ngày kiểm tra</p>
              <p className="text-lg font-medium">{reportData.student.testDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <GraduationCap size={24} className="text-blue-300" />
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Giáo viên phụ trách</p>
              <p className="text-lg font-medium">{reportData.student.teacher}</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white shadow-sm border-x border-b border-slate-200 rounded-b-2xl p-6 md:p-8 space-y-10 print:shadow-none print:border-none">
          
          {/* Section 1: Overview & Chart */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">1</div>
              <h3 className="text-xl font-bold text-slate-800">Tổng quan & Điểm số</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Overall Score Card */}
              <div className="lg:col-span-1">
                <div className="h-full bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-blue-100 font-medium mb-1">Trình độ ước lược</p>
                    <h4 className="text-lg font-semibold opacity-90">Overall Band</h4>
                  </div>
                  
                  <div className="relative z-10 my-6 text-center">
                    <span className="text-7xl font-bold tracking-tighter">{reportData.overallBand.toFixed(1)}</span>
                    <div className="text-blue-200 font-medium mt-2">Beginner (Sơ cấp)</div>
                  </div>

                  <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-lg p-4 text-sm leading-relaxed border border-white/20">
                    <p>{reportData.overallAssessment}</p>
                  </div>

                  {/* Decorative circles */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
                </div>
              </div>

              {/* Chart */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                 <ScoreChart scores={reportData.scores} />
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 2: Detailed Skills */}
          <section>
             <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">2</div>
              <h3 className="text-xl font-bold text-slate-800">Chi tiết & Nhận xét chuyên môn</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reportData.scores.map((score) => {
                const comment = reportData.detailedComments.find(c => c.skill === score.skill)?.comment || "Chưa có nhận xét.";
                return (
                  <SkillCard 
                    key={score.skill} 
                    skillData={score} 
                    comment={comment} 
                  />
                );
              })}
            </div>
          </section>

           <hr className="border-slate-100" />

          {/* Section 3: Roadmap */}
          <section className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold">3</div>
              <h3 className="text-xl font-bold text-slate-800">Đề xuất lộ trình học tập</h3>
            </div>

            <div className="space-y-6">
              {reportData.roadmap.map((step, index) => (
                <div key={index} className="flex gap-4 md:gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                        index === 0 ? 'bg-amber-500 text-white' : 'bg-white text-slate-500 border border-slate-200'
                     }`}>
                        {step.iconType === 'foundation' && <Target size={24} />}
                        {step.iconType === 'reading' && <BookMarked size={24} />}
                        {step.iconType === 'listening' && <Headphones size={24} />}
                        {step.iconType === 'memory' && <Brain size={24} />}
                     </div>
                     {index !== reportData.roadmap.length - 1 && (
                       <div className="w-0.5 h-full bg-slate-200 mt-2 min-h-[40px]"></div>
                     )}
                  </div>
                  <div className="pb-6">
                    <h4 className={`text-lg font-bold mb-1 ${index === 0 ? 'text-amber-600' : 'text-slate-700'}`}>
                      {step.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed bg-white p-4 rounded-lg border border-slate-100 shadow-sm inline-block w-full">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Documents Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 print:hidden">
            {/* Recording Link */}
            <a 
              href={reportData.recordingLink}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 bg-white border-2 border-slate-100 hover:border-blue-500 hover:shadow-lg px-6 py-4 rounded-xl transition-all duration-300 w-full"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                <ExternalLink size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Video</p>
                <p className="font-semibold text-slate-800 group-hover:text-blue-600">Zoom Recording</p>
              </div>
            </a>
            
            {/* Test Link */}
             <a 
              href={reportData.testLink}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 bg-white border-2 border-slate-100 hover:border-indigo-500 hover:shadow-lg px-6 py-4 rounded-xl transition-all duration-300 w-full"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <FileText size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bài làm</p>
                <p className="font-semibold text-slate-800 group-hover:text-indigo-600">Xem lại bài test online</p>
              </div>
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-slate-400 text-sm pb-8 print:hidden">
          <p>© 2023 Havina Language Academy. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default App;