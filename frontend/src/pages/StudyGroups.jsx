import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Plus, ArrowLeft, Files, Info, MessageSquare, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function StudyGroups() {
  const [activeGroup, setActiveGroup] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Amelia Jones', text: 'Does anyone have practical notes on React Context API vs Zustand?' },
    { sender: 'Rohan Mehta', text: 'Yes! I just uploaded a comparison sheet to our files section.' }
  ]);

  const mockGroups = [
    { id: 1, name: 'Web Dev Wizards', topic: 'React & Node', members: 42, max: 50, description: 'Deep dive into fullstack development with MERN stack, state management, and real-world apps.', activity: 'High' },
    { id: 2, name: 'Python Explorers', topic: 'Data Science', members: 28, max: 50, description: 'Learning NumPy, Pandas, Matplotlib, and scikit-learn collaboratively.', activity: 'Medium' },
    { id: 3, name: 'UI/UX Collective', topic: 'Figma Design', members: 50, max: 50, description: 'Collaborative design critiques, design systems, and weekly portfolio feedback.', status: 'full', activity: 'High' },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { sender: 'You', text: chatInput.trim() }]);
    setChatInput('');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-5 sm:p-6 rounded-2xl border border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2.5">
            <Users className="text-primary w-7 h-7 sm:w-8 sm:h-8" /> 
            <span>Peer Study Groups</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Join or collaborate in interactive study cohorts with peers.</p>
        </div>
        
        <Button 
          onClick={() => toast.success("Study group creation is open! Fill in your group details.")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-xs sm:text-sm h-10 px-4 shrink-0 shadow-sm gap-2"
        >
          <Plus className="w-4 h-4" /> Create New Group
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Main Content: Group Listing or Selected Group Feed */}
        <div className="lg:col-span-2 space-y-6">
          {!activeGroup ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {mockGroups.map((group) => (
                <Card key={group.id} className="bg-card border-border hover:border-primary/50 transition-all rounded-2xl shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden group">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-2 mb-2">
                       <Badge className="bg-primary/10 text-primary border-0 text-xs font-semibold py-0.5">{group.topic}</Badge>
                       {group.status === 'full' && <Badge className="bg-destructive/10 text-destructive border-0 text-xs">Full Cohort</Badge>}
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{group.name}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">{group.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="py-2">
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
                       <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                          <Users className="w-3.5 h-3.5" />
                          <span>{group.members}/{group.max} members</span>
                       </div>
                       <div className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                          <span>{group.activity} Activity</span>
                       </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-3 pb-4">
                    <Button 
                      onClick={() => setActiveGroup(group)}
                      disabled={group.status === 'full'}
                      className={`w-full rounded-xl text-xs font-semibold h-9 transition-all ${
                        group.status === 'full' 
                          ? 'bg-secondary text-muted-foreground opacity-50' 
                          : 'bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground border border-border'
                      }`}
                    >
                      {group.status === 'full' ? 'Cohort Full' : 'Open Study Circle'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card border-border h-[560px] sm:h-[600px] flex flex-col rounded-2xl shadow-md overflow-hidden">
               <CardHeader className="border-b border-border py-3.5 px-4 sm:px-6 bg-secondary/30">
                 <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                       <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setActiveGroup(null)} 
                        className="p-1.5 h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
                       >
                         <ArrowLeft className="w-4 h-4" />
                       </Button>
                       <div className="truncate">
                         <CardTitle className="text-base font-bold text-foreground truncate">{activeGroup.name}</CardTitle>
                         <p className="text-[11px] text-muted-foreground">{activeGroup.members} peers active in cohort</p>
                       </div>
                    </div>
                    
                    <div className="flex gap-1.5 shrink-0">
                       <Button 
                        variant="outline" 
                        size="icon" 
                        className="border-border text-foreground h-8 w-8 rounded-lg hover:bg-secondary"
                        onClick={() => toast.success("Shared resource files: 4 documents available.")}
                       >
                         <Files className="w-4 h-4" />
                       </Button>
                       <Button 
                        variant="destructive" 
                        size="sm"
                        className="text-xs h-8 rounded-lg px-2.5" 
                        onClick={() => setActiveGroup(null)}
                       >
                         Leave
                       </Button>
                    </div>
                 </div>
               </CardHeader>

               <CardContent className="flex-grow p-4 sm:p-6 space-y-4 overflow-y-auto custom-scrollbar">
                  <div className="bg-primary/5 p-3.5 rounded-xl border border-primary/20">
                     <p className="text-xs font-bold text-primary mb-0.5 flex items-center gap-1.5">
                       <Info className="w-3.5 h-3.5" /> Group Notice
                     </p>
                     <p className="text-xs text-foreground/90 leading-relaxed">
                       Next live group workshop scheduled for Sunday at 6:00 PM IST. Please review repository notes beforehand.
                     </p>
                  </div>

                  <div className="space-y-3">
                    {messages.map((m, idx) => (
                      <div key={idx} className="flex gap-2.5">
                        <Avatar className="w-7 h-7 shrink-0 border border-border">
                          <AvatarFallback className="text-[10px] font-bold bg-primary/20 text-primary">
                            {m.sender.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-secondary/60 border border-border p-3 rounded-2xl rounded-tl-none max-w-[85%]">
                          <p className="text-[10px] font-bold text-primary mb-0.5">{m.sender}</p>
                          <p className="text-xs text-foreground leading-relaxed">{m.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </CardContent>

               <CardFooter className="p-3 sm:p-4 border-t border-border bg-card">
                  <form onSubmit={handleSendMessage} className="flex gap-2 w-full">
                     <input 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Share a thought or ask the group..." 
                      className="flex-grow bg-secondary border border-border rounded-xl px-3.5 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40" 
                     />
                     <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-xs px-4 h-9 shadow-sm">
                       Send
                     </Button>
                  </form>
               </CardFooter>
            </Card>
          )}
        </div>

        {/* Sidebar: Recommendations & Stats */}
        <div className="space-y-6">
           <Card className="bg-card border-border rounded-2xl shadow-sm">
             <CardHeader className="pb-3">
               <CardTitle className="text-sm font-bold text-foreground uppercase tracking-wider">Recommended Circles</CardTitle>
             </CardHeader>
             <CardContent className="space-y-2.5">
                {['JavaScript Deep Dive', 'System Design Patterns', 'Digital Product Growth'].map((t, i) => (
                  <div 
                    key={i} 
                    onClick={() => toast.success(`Joined interest group for ${t}`)}
                    className="flex justify-between items-center p-2.5 rounded-xl hover:bg-secondary/60 transition-colors cursor-pointer border border-transparent hover:border-border group"
                  >
                     <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                           <Users className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{t}</p>
                     </div>
                     <Plus className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                ))}
             </CardContent>
           </Card>

           <Card className="bg-card border-border rounded-2xl shadow-sm p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                 <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Peer Collaboration Hub</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Groups with 5+ active weekly members finish skill goals 2.5x faster on Skillora.
              </p>
           </Card>
        </div>
      </div>
    </div>
  );
}
