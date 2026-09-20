import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Edit3, Eye, CheckCircle, Globe, Mail, Phone, MapPin, Award, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

export default function ResumeBuilder() {
  const { user } = useAuthStore();
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [isPreview, setIsPreview] = useState(true);

  const handleDownload = () => {
    toast.loading("Preparing your professional resume for download...");
    setTimeout(() => {
      toast.dismiss();
      window.print();
      toast.success("Print dialog opened!");
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-5 sm:p-6 rounded-2xl border border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2.5">
            <FileText className="text-primary w-7 h-7 sm:w-8 sm:h-8" /> 
            <span>AI Verified Resume</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Transform your peer teaching and learning metrics into an authentic career portfolio.</p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
           <Button 
            variant="outline" 
            onClick={() => setIsPreview(!isPreview)}
            className="flex-1 sm:flex-none border-border text-foreground hover:bg-secondary text-xs sm:text-sm h-10 rounded-xl"
           >
             {isPreview ? <Edit3 className="w-3.5 h-3.5 mr-1.5" /> : <Eye className="w-3.5 h-3.5 mr-1.5" />}
             {isPreview ? 'Edit View' : 'Full Preview'}
           </Button>
           <Button 
            onClick={handleDownload}
            className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs sm:text-sm h-10 px-5 rounded-xl shadow-sm gap-1.5"
           >
             <Download className="w-3.5 h-3.5" /> Export PDF
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
        
        {/* Sidebar: Template Selector & AI Insights */}
        <div className="space-y-6 order-2 lg:order-1">
           <Card className="bg-card border-border rounded-2xl shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-bold text-foreground uppercase tracking-wider">Select Style</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {[
                  { id: 'modern', name: 'Modern Professional' },
                  { id: 'academic', name: 'Academic Peer Impact' },
                  { id: 'minimalist', name: 'Clean Minimal Tech' }
                ].map((t) => (
                  <button 
                    key={t.id}
                    onClick={() => setActiveTemplate(t.id)}
                    className={`w-full p-3.5 rounded-xl border transition-all text-left text-xs font-semibold ${
                      activeTemplate === t.id
                        ? 'border-primary bg-primary/10 text-primary shadow-sm' 
                        : 'border-border bg-secondary/40 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </CardContent>
           </Card>

           <Card className="bg-card border-border rounded-2xl shadow-sm p-5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> AI Portfolio Insights
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                "Highlight your <strong>{user?.skills_offered?.[0]?.name || 'JavaScript'}</strong> teaching stats—peer educators with 90%+ trust score get 3x more recruiters reachouts."
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast.success("AI highlight applied to resume summary!")}
                className="w-full text-xs text-primary border-primary/20 hover:bg-primary/10 rounded-xl"
              >
                Apply Highlight
              </Button>
           </Card>
        </div>

        {/* Main Resume Preview Canvas */}
        <div className="lg:col-span-3 order-1 lg:order-2 overflow-x-auto custom-scrollbar">
           <div className={`
             bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-200 min-w-[640px] max-w-[850px] mx-auto p-8 sm:p-12 transition-all
             ${isPreview ? 'scale-100' : 'opacity-90'}
           `}>
              
              {/* Resume Header */}
              <div className="flex justify-between items-start border-b-2 border-slate-200 pb-6 mb-6">
                 <div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">{user?.name || 'Peer Educator'}</h1>
                    <p className="text-base sm:text-lg text-indigo-600 font-semibold mt-1">Full Stack Developer & Verified Peer Educator</p>
                 </div>
                 <div className="text-right space-y-1 text-xs text-slate-500 font-medium">
                    <p className="flex items-center justify-end gap-1.5">{user?.email || 'contact@skillora.me'} <Mail className="w-3.5 h-3.5" /></p>
                    <p className="flex items-center justify-end gap-1.5">+91 98765 43210 <Phone className="w-3.5 h-3.5" /></p>
                    <p className="flex items-center justify-end gap-1.5">Mumbai, India <MapPin className="w-3.5 h-3.5" /></p>
                 </div>
              </div>

              {/* Summary */}
              <div className="mb-6">
                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-3">Professional Summary</h3>
                 <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                   Active developer and verified educator at <strong>{user?.college || 'Skillora Academic Network'}</strong> with hands-on experience in peer learning and technical training. Delivered over {user?.sessions_completed || 12} live sessions in fullstack and programming topics with an average student rating of 4.9/5.0.
                 </p>
              </div>

              <div className="grid grid-cols-2 gap-8 sm:gap-10">
                 
                 {/* Column 1 */}
                 <div className="space-y-6">
                    <div>
                       <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-3">Education</h3>
                       <div>
                          <p className="font-bold text-sm text-slate-900">{user?.college || 'University Engineering Campus'}</p>
                          <p className="text-xs text-slate-500">B.Tech in Computer Science & Engineering • 2023 - 2027</p>
                       </div>
                    </div>

                    <div>
                       <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-3">Peer Teaching Impact</h3>
                       <div className="space-y-3">
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                             <p className="text-xl font-black text-indigo-600">{user?.credits_earned || 2500} CR</p>
                             <p className="text-[11px] text-slate-500 font-semibold uppercase">Total Peer Tutoring Credits Earned</p>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                             <p className="text-xl font-black text-emerald-600">{user?.trust_score || 99}%</p>
                             <p className="text-[11px] text-slate-500 font-semibold uppercase">Global Peer Reliability Score</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Column 2 */}
                 <div className="space-y-6">
                    <div>
                       <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-3">Verified Skills</h3>
                       <div className="flex flex-wrap gap-1.5">
                          {user?.skills_offered?.length > 0 ? (
                            user.skills_offered.map((s, i) => (
                              <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold">
                                 <CheckCircle className="w-3 h-3 text-indigo-600" /> {s.name || s}
                              </span>
                            ))
                          ) : (
                            ['React', 'Node.js', 'Python', 'UI/UX'].map((s, i) => (
                              <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold">
                                 <CheckCircle className="w-3 h-3 text-indigo-600" /> {s}
                              </span>
                            ))
                          )}
                       </div>
                    </div>

                    <div>
                       <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-3">Mentorship Experience</h3>
                       <div className="space-y-3">
                          <div>
                             <p className="font-bold text-sm text-slate-900">Peer Educator & Code Mentor</p>
                             <p className="text-xs text-slate-500">Skillora Peer Network • 2026 - Present</p>
                             <ul className="text-xs text-slate-600 mt-2 list-disc list-inside space-y-1">
                                <li>Conducted {user?.sessions_completed || 12} live peer code reviews and tutorials.</li>
                                <li>Helped 8+ students master core programming fundamentals.</li>
                                <li>Maintained a continuous 4.9+ student satisfaction index.</li>
                             </ul>
                          </div>
                       </div>
                    </div>
                 </div>

              </div>

              {/* Resume Footer */}
              <div className="mt-12 pt-6 border-t border-slate-200 text-center">
                 <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                   Verified by Skillora Peer Identity Protocol • Tamper Evident
                 </p>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
}
