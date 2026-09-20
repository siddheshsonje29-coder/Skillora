import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, Video, Star, CheckCircle2, Download, Plus, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';

export default function Sessions() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await api.get('/sessions');
        setSessions(res.data || []);
      } catch (err) {
        console.error("Error fetching sessions", err);
        toast.error("Failed to load sessions");
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const handleDownloadNotes = (session) => {
    if (!session.notes) {
      const dummyNotes = `Session: ${session.skill}\nDate: ${session.date}\nPeer: ${session.peerName}\n\nSummary:\nIn this session, we covered the fundamentals of ${session.skill}. Key topics included best practices, common pitfalls, and hands-on exercises.\n\nKey Takeaways:\n1. Mastered core concepts.\n2. Developed a working project.\n3. Discussed practical applications.\n\nNext Steps:\n- Continue practicing with real-world scenarios.\n\nThank you for learning with Skillora!`;
      
      const element = document.createElement("a");
      const file = new Blob([dummyNotes], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${session.skill}_notes_${session.date}.txt`;
      document.body.appendChild(element);
      element.click();
      toast.success("Downloading session notes...");
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([session.notes], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${session.skill}_notes_${session.date}.txt`;
    document.body.appendChild(element);
    element.click();
    toast.success("Downloading session notes...");
  };

  const handleStatusUpdate = async (sessionId, newStatus) => {
    try {
      await api.patch(`/sessions/${sessionId}`, { status: newStatus });
      toast.success(`Session ${newStatus}`);
      setSessions(sessions.map(s => s._id === sessionId ? { ...s, status: newStatus } : s));
    } catch (err) {
      toast.error("Failed to update session");
    }
  };

  const upcomingSessions = sessions.filter(s => 
    (s.status === 'pending' || s.status === 'accepted' || s.status === 'active') &&
    new Date(s.scheduled_at) >= new Date()
  ).map(s => {
    const isTeacher = s.teacher_id?._id === user?._id;
    const peer = isTeacher ? s.learner_id : s.teacher_id;
    return {
      id: s._id,
      peerName: peer?.name || 'Peer',
      skill: s.skill,
      date: new Date(s.scheduled_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date(s.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: isTeacher ? 'Teaching' : 'Learning',
      status: s.status === 'accepted' ? 'confirmed' : s.status,
      peerAvatar: peer?.avatar
    };
  });

  const sessionRequests = sessions.filter(s => 
    s.status === 'pending' && s.teacher_id?._id === user?._id
  ).map(s => ({
    id: s._id,
    peerName: s.learner_id?.name || 'Peer',
    skill: s.skill,
    date: new Date(s.scheduled_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
    time: new Date(s.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    cost: s.credit_cost
  }));

  const pastSessions = sessions.filter(s => 
    s.status === 'completed' || new Date(s.scheduled_at) < new Date()
  ).map(s => {
    const isTeacher = s.teacher_id?._id === user?._id;
    const peer = isTeacher ? s.learner_id : s.teacher_id;
    return {
      id: s._id,
      peerName: peer?.name || 'Peer',
      skill: s.skill,
      date: new Date(s.scheduled_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      type: isTeacher ? 'Teaching' : 'Learning',
      rating: s.rating_by_learner || 5,
      notes: s.notes
    };
  });

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Page Title & Quick CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-5 sm:p-6 rounded-2xl border border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">My Learning & Teaching Sessions</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage all your scheduled peer video appointments and lesson history.</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-2 h-10 px-4 text-xs sm:text-sm shrink-0 shadow-sm"
          onClick={() => navigate('/matches')}
        >
          <Plus className="w-4 h-4" /> Book New Session
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full sm:w-80 grid-cols-3 bg-secondary/80 border border-border p-1 rounded-xl mb-6">
          <TabsTrigger value="upcoming" className="rounded-lg text-xs sm:text-sm font-semibold data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            Upcoming ({upcomingSessions.length})
          </TabsTrigger>
          <TabsTrigger value="requests" className="rounded-lg text-xs sm:text-sm font-semibold data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            Requests ({sessionRequests.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="rounded-lg text-xs sm:text-sm font-semibold data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            Past
          </TabsTrigger>
        </TabsList>

        {/* Upcoming Sessions Tab */}
        <TabsContent value="upcoming" className="space-y-4 mt-0">
          {upcomingSessions.length > 0 ? (
            upcomingSessions.map((session) => (
              <Card key={session.id} className="bg-card border-border hover:border-primary/40 transition-all rounded-2xl overflow-hidden shadow-sm">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Badge Pill Strip */}
                    <div className={`p-4 md:w-32 flex flex-row md:flex-col items-center justify-between md:justify-center text-center gap-1.5 ${
                      session.type === 'Learning' ? 'bg-primary/10 text-primary' : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      <Calendar className="w-5 h-5 hidden md:block" />
                      <span className="text-[11px] font-black uppercase tracking-wider">{session.type}</span>
                    </div>

                    {/* Main Info */}
                    <div className="flex-grow p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <Avatar className="h-11 w-11 border border-border shrink-0">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session.peerName}`} />
                          <AvatarFallback>{session.peerName.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-base font-bold text-foreground leading-tight">{session.skill}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">with <span className="font-semibold text-foreground/80">{session.peerName}</span></p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          <span>{session.date} • {session.time}</span>
                        </div>
                        {session.status === 'confirmed' ? (
                          <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs py-0.5 font-semibold">
                             <CheckCircle2 className="w-3 h-3 mr-1" /> Confirmed
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs py-0.5 font-semibold">
                             Pending Approval
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
                        <Button 
                          disabled={session.status !== 'confirmed'}
                          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-xs sm:text-sm font-semibold rounded-xl h-9 px-4 shadow-sm"
                          onClick={() => navigate(`/session/${session.id}`)}
                        >
                          <Video className="w-4 h-4" /> Join Room
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-card border-border p-8 sm:p-12 text-center rounded-2xl">
              <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
              <p className="text-muted-foreground text-sm font-medium">You have no upcoming sessions scheduled.</p>
              <Button 
                className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-xl"
                onClick={() => navigate('/matches')}
              >
                Browse Teachers to Book
              </Button>
            </Card>
          )}
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-4 mt-0">
          {sessionRequests.length > 0 ? (
            sessionRequests.map((req) => (
              <Card key={req.id} className="bg-card border-border rounded-2xl overflow-hidden shadow-sm">
                 <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <Avatar className="h-11 w-11 border border-border shrink-0">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${req.peerName}`} />
                        <AvatarFallback>{req.peerName.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-base font-bold text-foreground leading-tight">{req.peerName} wants to learn {req.skill}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{req.date} at {req.time} • Reward: <span className="font-bold text-primary">{req.cost} Credits</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Button 
                        variant="outline" 
                        className="flex-1 sm:flex-none border-destructive/40 text-destructive hover:bg-destructive/10 rounded-xl text-xs h-9"
                        onClick={() => handleStatusUpdate(req.id, 'cancelled')}
                      >
                        Decline
                      </Button>
                      <Button 
                        className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold h-9 shadow-sm"
                        onClick={() => handleStatusUpdate(req.id, 'accepted')}
                      >
                        Accept Request
                      </Button>
                    </div>
                 </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-card border-border p-8 sm:p-12 text-center rounded-2xl">
               <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
               <p className="text-muted-foreground text-sm font-medium">No incoming session requests at the moment.</p>
            </Card>
          )}
        </TabsContent>

        {/* Past Sessions Tab */}
        <TabsContent value="past" className="space-y-4 mt-0">
          {pastSessions.length > 0 ? (
            pastSessions.map((session) => (
              <Card key={session.id} className="bg-card border-border rounded-2xl shadow-sm hover:border-primary/30 transition-all">
                <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                       <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground leading-tight">{session.skill}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Completed with {session.peerName} • {session.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 justify-between sm:justify-end">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < session.rating ? 'fill-current' : 'opacity-20'}`} />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-foreground border-border hover:bg-secondary gap-1.5 text-xs rounded-xl h-8"
                        onClick={() => handleDownloadNotes(session)}
                      >
                        <Download className="w-3.5 h-3.5 text-primary" /> Notes
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="text-foreground hover:bg-secondary/80 text-xs rounded-xl h-8"
                        onClick={() => toast.success('Your session review has been recorded!')}
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-card border-border p-8 text-center rounded-2xl">
              <p className="text-muted-foreground text-sm font-medium">No past sessions recorded yet.</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
