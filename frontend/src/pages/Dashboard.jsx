import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, Star, Wallet, Calendar, Sparkles, Plus, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../lib/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const { user, getProfile } = useAuthStore();
  const [matches, setMatches] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getProfile();
      try {
        const [matchRes, sessionRes, statsRes] = await Promise.all([
          api.get('/matches'),
          api.get('/sessions'),
          api.get('/users/stats')
        ]);
        setMatches(matchRes.data || []);
        setSessions(sessionRes.data || []);
        setStats(statsRes.data || null);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-16 bg-card rounded-2xl border border-border"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-card rounded-2xl border border-border"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 bg-card rounded-2xl border border-border"></div>
          <div className="h-80 bg-card rounded-2xl border border-border"></div>
        </div>
      </div>
    );
  }

  const upcomingSessions = sessions.filter(s => 
    (s.status === 'accepted' || s.status === 'active') &&
    new Date(s.scheduled_at) >= new Date(Date.now() - 3600000)
  ).slice(0, 3);

  const creditHistory = stats?.creditHistory || [
    { name: 'Mon', earned: 0, spent: 0 },
    { name: 'Tue', earned: 0, spent: 0 },
    { name: 'Wed', earned: 0, spent: 0 },
    { name: 'Thu', earned: 0, spent: 0 },
    { name: 'Fri', earned: 0, spent: 0 },
    { name: 'Sat', earned: 0, spent: 0 },
    { name: 'Sun', earned: 0, spent: 0 },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Header Profile & Wallet Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-5 sm:p-6 rounded-2xl border border-border shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Welcome back, <span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">{user?.name || 'Peer Learner'}</span>!
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Here is your learning & teaching activity overview.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Card className="bg-gradient-to-br from-primary to-indigo-600 text-primary-foreground border-0 shadow-lg shadow-primary/20 w-full sm:w-auto">
            <CardContent className="p-3.5 sm:p-4 flex items-center gap-3.5">
              <div className="p-2.5 bg-white/20 rounded-xl">
                <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-white/80">Wallet Balance</p>
                <p className="text-xl sm:text-2xl font-black text-white">{user?.credits || 0} <span className="text-xs font-normal">CR</span></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs Filter */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full sm:w-96 grid-cols-3 bg-secondary/80 border border-border rounded-xl p-1 mb-6">
          <TabsTrigger value="overview" className="rounded-lg text-muted-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all text-xs sm:text-sm font-semibold">
            Overview
          </TabsTrigger>
          <TabsTrigger value="learning" className="rounded-lg text-muted-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all text-xs sm:text-sm font-semibold">
            Learning
          </TabsTrigger>
          <TabsTrigger value="teaching" className="rounded-lg text-muted-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all text-xs sm:text-sm font-semibold">
            Teaching
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 sm:space-y-8 mt-0">
          
          {/* 4 Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatsCard 
              title="Trust Score" 
              value={`${user?.trust_score || 0}%`} 
              icon={<Star className="w-5 h-5 text-amber-500" />} 
              subtitle="Community verified rating" 
            />
            <StatsCard 
              title="Sessions Completed" 
              value={stats?.sessionsCompleted || user?.sessions_completed || 0} 
              icon={<Calendar className="w-5 h-5 text-blue-500" />} 
              subtitle="Total completed lessons" 
            />
            <StatsCard 
              title="Credits Earned" 
              value={stats?.totalEarned || user?.credits_earned || 0} 
              icon={<Sparkles className="w-5 h-5 text-purple-500" />} 
              subtitle="Earned from teaching" 
            />
            <StatsCard 
              title="Credits Spent" 
              value={stats?.totalSpent || user?.credits_spent || 0} 
              icon={<Wallet className="w-5 h-5 text-rose-500" />} 
              subtitle="Invested in learning" 
            />
          </div>

          {/* Chart & Upcoming Sessions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Credit Flow Chart */}
            <Card className="lg:col-span-2 shadow-sm border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-bold text-foreground">
                  <Wallet className="w-5 h-5 text-primary" /> Weekly Credit Flow
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[280px] sm:h-[320px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={creditHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12, opacity: 0.6 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12, opacity: 0.6 }} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} 
                      contentStyle={{ 
                        backgroundColor: 'var(--card)', 
                        borderColor: 'var(--border)', 
                        borderRadius: '0.75rem',
                        color: 'var(--foreground)',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
                      }} 
                    />
                    <Bar dataKey="earned" fill="#6366F1" radius={[4, 4, 0, 0]} name="Earned" />
                    <Bar dataKey="spent" fill="#EF4444" radius={[4, 4, 0, 0]} name="Spent" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Upcoming Sessions Sidebar Card */}
            <div className="space-y-6">
              <Card className="shadow-sm border-border bg-card overflow-hidden">
                <CardHeader className="border-b border-border/70 py-4">
                  <CardTitle className="text-base font-bold flex items-center justify-between text-foreground">
                    <div className="flex items-center gap-2">
                       <Calendar className="w-4 h-4 text-emerald-500" />
                       <span>Upcoming Sessions</span>
                    </div>
                    {upcomingSessions.length > 0 && (
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-0 text-xs">
                        {upcomingSessions.length}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {upcomingSessions.length > 0 ? (
                    <div className="divide-y divide-border">
                      {upcomingSessions.map((session, i) => {
                        const isTeacher = session.teacher_id?._id === user?._id;
                        const peer = isTeacher ? session.learner_id : session.teacher_id;
                        return (
                          <div key={i} className="p-4 hover:bg-secondary/40 transition-colors">
                            <div className="flex justify-between items-start mb-2.5">
                              <div className="flex items-center gap-2.5">
                                <Avatar className="h-8 w-8 border border-border">
                                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${peer?.name || 'User'}`} />
                                  <AvatarFallback>{peer?.name?.slice(0, 2) || 'U'}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-semibold text-foreground leading-tight">{session.skill}</p>
                                  <p className="text-[11px] text-muted-foreground">with {peer?.name || 'Peer'} • {isTeacher ? 'Teaching' : 'Learning'}</p>
                                </div>
                              </div>
                              <Badge variant="outline" className="border-primary/30 text-primary text-[10px] uppercase font-bold">
                                {session.status}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50">
                               <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{new Date(session.scheduled_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at {new Date(session.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                               </div>
                               <Button 
                                size="sm" 
                                className="h-7 text-xs bg-primary hover:bg-primary/90 text-primary-foreground px-3 rounded-lg"
                                onClick={() => navigate(`/session/${session._id}`)}
                               >
                                 Join Room
                               </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                       <p className="text-xs text-muted-foreground">No upcoming sessions scheduled.</p>
                       <Button 
                        variant="link" 
                        size="sm" 
                        className="text-primary mt-1 text-xs" 
                        onClick={() => navigate('/sessions')}
                       >
                         Manage Sessions →
                       </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Smart Matches Preview Card */}
              <Card className="shadow-sm border-border bg-card">
                <CardHeader className="py-4 border-b border-border/70">
                  <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                    <Brain className="w-4 h-4 text-primary" />
                    <span>Smart Matches</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {matches.length > 0 ? matches.slice(0, 3).map((match, i) => (
                    <div 
                      key={i} 
                      className="flex justify-between items-center p-2.5 rounded-xl hover:bg-secondary/60 transition-colors cursor-pointer border border-transparent hover:border-border"
                      onClick={() => navigate('/chat')}
                    >
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-9 w-9 border border-border">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                            {match.name?.slice(0, 2) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="text-xs font-semibold text-foreground">{match.name}</p>
                            {match.is_verified && <CheckCircle2 className="w-3 h-3 text-primary fill-primary/10" />}
                          </div>
                          <p className="text-[11px] text-muted-foreground">
                            {match.skills_offered?.[0]?.name || 'Skill'} • ★ {match.rating || 4.8}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-secondary text-foreground text-xs font-semibold">
                        {match.skills_offered?.[0]?.creditValue || 10} CR
                      </Badge>
                    </div>
                  )) : (
                    <p className="text-center text-muted-foreground py-3 text-xs">No matches found yet. Add more skills to your profile!</p>
                  )}
                  
                  <Button 
                    className="w-full mt-2 bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold rounded-xl border border-border shadow-none" 
                    variant="outline"
                    onClick={() => navigate('/matches')}
                  >
                    View All Matches <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>
        </TabsContent>

        {/* Learning Tab Content */}
        <TabsContent value="learning" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {user?.skills_wanted?.map((skill, i) => (
              <Card key={i} className="bg-card border-border hover:border-primary/40 transition-all group overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-3.5 pb-3">
                  <div className="p-2.5 bg-primary/10 rounded-xl group-hover:scale-105 transition-transform">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-base text-foreground font-bold">{skill}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3.5">
                   <div className="space-y-1.5">
                     <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Matching Progress</span>
                        <span className="font-semibold">{20 + (i * 15)}%</span>
                     </div>
                     <Progress value={20 + (i * 15)} className="h-1.5" />
                   </div>
                   <Button 
                    variant="ghost" 
                    className="w-full text-xs text-primary hover:bg-primary/10 justify-between h-8"
                    onClick={() => navigate(`/matches?search=${encodeURIComponent(skill)}`)}
                   >
                      <span>Explore Teachers</span>
                      <Calendar className="w-3.5 h-3.5" />
                   </Button>
                </CardContent>
              </Card>
            ))}
            <Card 
              onClick={() => navigate('/profile')}
              className="bg-card/40 border-dashed border-2 border-border flex flex-col items-center justify-center p-6 gap-3 hover:bg-secondary/40 cursor-pointer transition-colors group rounded-2xl"
            >
                <div className="p-3 bg-secondary rounded-full group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-foreground">Add New Skill to Learn</p>
            </Card>
          </div>
        </TabsContent>

        {/* Teaching Tab Content */}
        <TabsContent value="teaching" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {user?.skills_offered?.map((skill, i) => (
              <Card key={i} className="bg-card border-border hover:border-emerald-500/40 transition-all group overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-3.5 pb-3">
                  <div className="p-2.5 bg-emerald-500/10 rounded-xl group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base text-foreground font-bold">{skill.name}</CardTitle>
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[10px] uppercase font-bold">
                        {skill.level}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                   <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1 text-amber-500">
                         <Star className="w-3.5 h-3.5 fill-current" />
                         <span className="font-bold">4.9</span>
                      </div>
                      <p className="text-muted-foreground">{skill.sessionsCompleted || 0} sessions taught</p>
                   </div>
                   <div className="flex gap-1.5 pt-1">
                      <Badge variant="outline" className="border-border text-muted-foreground text-[10px]">Verified Peer</Badge>
                      <Badge variant="outline" className="border-border text-muted-foreground text-[10px]">{skill.creditValue || 20} CR/hr</Badge>
                   </div>
                </CardContent>
              </Card>
            ))}
            <Card 
              onClick={() => navigate('/profile')}
              className="bg-card/40 border-dashed border-2 border-border flex flex-col items-center justify-center p-6 gap-3 hover:bg-secondary/40 cursor-pointer transition-colors group rounded-2xl"
            >
                <div className="p-3 bg-secondary rounded-full group-hover:scale-105 transition-transform">
                  <Plus className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-foreground">Offer Another Skill</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatsCard({ title, value, subtitle, icon }) {
  return (
    <Card className="relative overflow-hidden group hover:-translate-y-0.5 transition-all border-border shadow-sm hover:shadow-md bg-card">
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
            <p className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">{value}</p>
          </div>
          <div className="p-2.5 bg-secondary rounded-xl">
            {icon}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
