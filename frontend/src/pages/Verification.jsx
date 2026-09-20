import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Shield, Upload, Link as LinkIcon, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

export default function Verification() {
  const { user } = useAuthStore();
  const [form, setForm] = useState({
    skillName: '',
    description: '',
    proofLinks: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.skillName || !form.description) {
      return toast.error("Please choose a skill and provide a brief experience summary");
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Verification request submitted! Admin review completes in 24-48 hours.");
      setIsSubmitting(false);
      setForm({ skillName: '', description: '', proofLinks: '' });
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center space-y-2 py-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
          <Shield className="w-3.5 h-3.5" />
          <span>Trust & Validation</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Peer Skill Verification
        </h1>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Validate your skills through work proof, GitHub repositories, or certificates to earn the verified educator badge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Verification Form */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border rounded-2xl shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl font-bold text-foreground">Submit Skill for Review</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                Provide verifiable evidence of your proficiency in this discipline.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Skill to Verify</label>
                  <select 
                    className="w-full bg-secondary border border-border text-foreground text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
                    value={form.skillName}
                    onChange={(e) => setForm({...form, skillName: e.target.value})}
                  >
                    <option value="">Select an offered skill</option>
                    {user?.skills_offered?.map((s, i) => (
                      <option key={i} value={s.name || s}>{s.name || s}</option>
                    ))}
                    <option value="General Web Development">General Web Development</option>
                    <option value="Python & AI">Python & AI</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Experience & Project Overview</label>
                  <Textarea 
                    placeholder="Describe your background, years of experience, and key projects built..."
                    className="bg-secondary/70 border-border text-foreground text-sm rounded-xl min-h-[110px] focus-visible:ring-primary"
                    value={form.description}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Proof Links (GitHub / Live URL / Portfolio)</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="https://github.com/username/project"
                      className="pl-9 bg-secondary/70 border-border text-foreground text-sm rounded-xl focus-visible:ring-primary h-11"
                      value={form.proofLinks}
                      onChange={(e) => setForm({...form, proofLinks: e.target.value})}
                    />
                  </div>
                </div>

                {/* Upload Certificate Dropzone */}
                <div className="p-4 bg-secondary/40 border-2 border-dashed border-border rounded-xl flex items-center gap-3.5 hover:border-primary/40 transition-colors">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary shrink-0">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground">Attach Credential / Certificate</p>
                    <p className="text-[11px] text-muted-foreground">PDF, PNG, or JPG up to 10MB</p>
                    <input type="file" className="text-xs text-muted-foreground mt-1.5 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:bg-primary/10 file:text-primary file:font-semibold" />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 text-sm sm:text-base rounded-xl shadow-md shadow-primary/20 transition-all h-12"
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Verification Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Benefits & Status */}
        <div className="space-y-6">
          <Card className="bg-card border-border rounded-2xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Why Get Verified?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-muted-foreground">Receive the blue checkmark badge across your profile and match cards.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-muted-foreground">Rank in top 10% search results for incoming learner match requests.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-muted-foreground">Qualify for higher credit rates (up to 40 CR/hour).</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border rounded-2xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base font-bold text-foreground">Application Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-secondary/50 border border-border rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-foreground">React & Web Development</p>
                  <p className="text-[10px] text-muted-foreground">Under review by Peer Council</p>
                </div>
                <Badge className="bg-amber-500/10 text-amber-500 border-0 text-[10px] font-bold">In Review</Badge>
              </div>
              <div className="p-3 bg-secondary/50 border border-border rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-foreground">UI/UX Design Systems</p>
                  <p className="text-[10px] text-muted-foreground">Verified on Oct 10</p>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[10px] font-bold">Approved</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
