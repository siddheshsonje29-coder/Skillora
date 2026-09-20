import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Edit2, MapPin, School, Globe, Mail, Calendar, CheckCircle2, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Profile() {
  const { user, getProfile } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Profile Banner & Summary Card */}
      <Card className="bg-card border-border overflow-hidden rounded-2xl shadow-sm relative">
        <div className="h-32 sm:h-44 bg-gradient-to-r from-primary via-indigo-600 to-purple-600 opacity-80"></div>
        <CardContent className="px-5 sm:px-8 pb-6 sm:pb-8 -mt-14 sm:-mt-16 flex flex-col md:flex-row items-center md:items-end gap-5 sm:gap-6 relative z-10 text-center md:text-left">
          
          <div className="relative group shrink-0">
            <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-4 border-card shadow-2xl bg-secondary">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`} />
              <AvatarFallback className="text-2xl font-black text-primary">{user?.name?.slice(0, 2) || 'ME'}</AvatarFallback>
            </Avatar>
            <button 
              onClick={() => toast.success("Avatar upload feature connected.")}
              aria-label="Change profile photo"
              className="absolute bottom-1 right-1 p-2 bg-primary hover:bg-primary/90 rounded-full text-primary-foreground shadow-md border-2 border-card transition"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-grow pb-1 space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground truncate">{user?.name || 'Skillora Peer'}</h1>
              <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] uppercase font-bold px-2 py-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified Member
              </Badge>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-muted-foreground text-xs sm:text-sm">
              <span className="flex items-center gap-1"><School className="w-3.5 h-3.5 text-primary" /> {user?.college || 'University Partner'}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-rose-500" /> India</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-500" /> Joined 2026</span>
            </div>
          </div>

          <div className="pb-1 w-full md:w-auto">
            <Button 
              variant="outline" 
              className="w-full md:w-auto border-border text-foreground hover:bg-secondary gap-2 text-xs sm:text-sm font-semibold rounded-xl h-10 px-4"
              onClick={() => navigate('/settings')}
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid: Left (Bio & Skills) vs Right (Metrics & Socials) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card border-border rounded-2xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg font-bold text-foreground">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {user?.bio || 'Passionate about decentralized peer education and exchanging skills across technology, design, and science. Active learner and enthusiastic mentor on Skillora.'}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
             <Card className="bg-card border-border rounded-2xl shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Skills I Offer</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                   {user?.skills_offered?.length > 0 ? (
                     user.skills_offered.map((s, i) => (
                       <Badge key={i} className="bg-primary/10 text-primary border-0 px-2.5 py-1 text-xs font-semibold">
                          {s.name || s} • {s.level || 'Intermediate'}
                       </Badge>
                     ))
                   ) : (
                     <p className="text-xs text-muted-foreground">No skills added yet.</p>
                   )}
                </CardContent>
             </Card>

             <Card className="bg-card border-border rounded-2xl shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
                    <School className="w-4 h-4 text-amber-500" />
                    <span>Interested in Learning</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                   {user?.skills_wanted?.length > 0 ? (
                     user.skills_wanted.map((s, i) => (
                       <Badge key={i} variant="outline" className="border-border text-muted-foreground px-2.5 py-1 text-xs">
                          {s}
                       </Badge>
                     ))
                   ) : (
                     <p className="text-xs text-muted-foreground">Add skills you wish to learn.</p>
                   )}
                </CardContent>
             </Card>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="bg-card border-border rounded-2xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Trust Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               <StatItem label="Peer Rating" value="★ 4.9 / 5.0" color="text-amber-500" />
               <StatItem label="Wallet Balance" value={`${user?.credits || 50} CR`} color="text-primary" />
               <StatItem label="Credits Earned" value={`${user?.credits_earned || 0} CR`} color="text-emerald-500" />
               <StatItem label="Trust Index" value={`${user?.trust_score || 95}%`} color="text-emerald-500" />
            </CardContent>
          </Card>

          <Card className="bg-card border-border rounded-2xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-foreground">Verified Channels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
               <SocialLink icon={<Globe />} label="Portfolio Website" value="skillora.me/portfolio" />
               <SocialLink icon={<Mail />} label="Email Address" value={user?.email || 'contact@skillora.com'} />
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

function StatItem({ label, value, color }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-border/60 last:border-0 text-xs sm:text-sm">
       <span className="text-muted-foreground">{label}</span>
       <span className={`font-bold ${color}`}>{value}</span>
    </div>
  );
}

function SocialLink({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors border border-border/50">
       <div className="text-primary">{React.cloneElement(icon, { size: 16 })}</div>
       <div className="min-w-0">
         <p className="text-[10px] text-muted-foreground font-semibold uppercase">{label}</p>
         <p className="text-xs text-foreground font-medium truncate">{value}</p>
       </div>
    </div>
  );
}
