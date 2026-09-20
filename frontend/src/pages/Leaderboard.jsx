import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award, TrendingUp, Sparkles } from 'lucide-react';

export default function Leaderboard() {
  const topUsers = [
    { id: 1, name: 'Siddhesh Jain', credits: 1250, trust: 99, skills: ['Python', 'AI'], rank: 1 },
    { id: 2, name: 'Mrunali Patil', credits: 980, trust: 97, skills: ['UI/UX', 'Figma'], rank: 2 },
    { id: 3, name: 'Ayush Sharma', credits: 850, trust: 98, skills: ['React', 'Node'], rank: 3 },
    { id: 4, name: 'Rahul Verma', credits: 720, trust: 95, skills: ['Java', 'SQL'], rank: 4 },
    { id: 5, name: 'Ankita Das', credits: 680, trust: 96, skills: ['Digital Mrkt', 'SEO'], rank: 5 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center space-y-2 py-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-semibold border border-amber-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Skillora Honor Roll</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight flex items-center justify-center gap-2.5">
          <Trophy className="text-amber-500 w-8 h-8 sm:w-10 sm:h-10" /> 
          <span>Top Contributors</span>
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          The most helpful peer educators in the Skillora community based on lessons taught and trust rating.
        </p>
      </div>

      {/* Top 3 Podium (Responsive Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-8 pb-4 items-end">
        {/* Rank 2 */}
        <div className="order-2 sm:order-1 flex flex-col items-center">
           <PodiumItem 
            user={topUsers[1]} 
            height="sm:h-44" 
            rankLabel="2nd Place"
            medal={<Medal className="text-slate-400 w-6 h-6" />} 
            color="bg-slate-500/10" 
            border="border-slate-400/30"
          />
        </div>
        {/* Rank 1 */}
        <div className="order-1 sm:order-2 flex flex-col items-center sm:-mt-6">
           <PodiumItem 
            user={topUsers[0]} 
            height="sm:h-56" 
            rankLabel="1st Place Champion"
            medal={<Trophy className="text-amber-500 w-7 h-7" />} 
            color="bg-amber-500/10" 
            border="border-amber-500/50" 
            isLeader={true}
          />
        </div>
        {/* Rank 3 */}
        <div className="order-3 sm:order-3 flex flex-col items-center">
           <PodiumItem 
            user={topUsers[2]} 
            height="sm:h-36" 
            rankLabel="3rd Place"
            medal={<Award className="text-amber-700 w-6 h-6" />} 
            color="bg-amber-700/10" 
            border="border-amber-700/30"
          />
        </div>
      </div>

      {/* Rankings Table / List */}
      <Card className="bg-card border-border overflow-hidden rounded-2xl shadow-sm">
        <CardContent className="p-0">
          <div className="hidden sm:grid sm:grid-cols-12 p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border bg-secondary/30">
             <div className="col-span-1">Rank</div>
             <div className="col-span-6">Peer Educator</div>
             <div className="col-span-2 text-center">Trust Rating</div>
             <div className="col-span-3 text-right">Total Credits</div>
          </div>
          
          <div className="divide-y divide-border">
            {topUsers.map((u) => (
              <div 
                key={u.id} 
                className="flex flex-col sm:grid sm:grid-cols-12 p-3.5 sm:p-4 sm:items-center hover:bg-secondary/40 transition-colors gap-2 sm:gap-0"
              >
                 <div className="flex sm:block items-center justify-between sm:justify-start sm:col-span-1 font-mono font-bold text-sm sm:text-base text-muted-foreground">
                    <span className="sm:hidden text-xs uppercase font-sans font-semibold text-muted-foreground">Rank</span>
                    <span className="w-6 h-6 sm:w-auto sm:h-auto rounded-full bg-secondary sm:bg-transparent flex items-center justify-center font-bold text-foreground">
                      #{u.rank}
                    </span>
                 </div>

                 <div className="sm:col-span-6 flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border shrink-0">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`} />
                      <AvatarFallback>{u.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground leading-tight truncate">{u.name}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {u.skills.map(s => (
                          <span key={s} className="text-[10px] bg-secondary px-2 py-0.5 rounded-md text-muted-foreground font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                 </div>

                 <div className="flex sm:block justify-between items-center sm:col-span-2 sm:text-center pt-1 sm:pt-0">
                    <span className="sm:hidden text-xs text-muted-foreground">Trust Score:</span>
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-xs font-semibold">
                      {u.trust}% Trust
                    </Badge>
                 </div>

                 <div className="flex sm:block justify-between items-center sm:col-span-3 sm:text-right pt-1 sm:pt-0">
                    <span className="sm:hidden text-xs text-muted-foreground">Earnings:</span>
                    <div className="flex items-center sm:justify-end gap-1.5 text-foreground font-black text-sm sm:text-base">
                      {u.credits} <span className="text-xs text-muted-foreground font-normal">CR</span>
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PodiumItem({ user, height, medal, color, border = "border-border", rankLabel, isLeader = false }) {
  return (
    <div className={`w-full flex flex-col items-center space-y-3 p-4 rounded-2xl bg-card border ${border} shadow-sm ${isLeader ? 'ring-2 ring-amber-400/30' : ''}`}>
      <div className="relative">
         <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-2 border-border shadow-md">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
         </Avatar>
         <div className="absolute -bottom-1 -right-1 bg-card p-1 rounded-full shadow border border-border">
            {medal}
         </div>
      </div>
      <div className="text-center">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-0.5">{rankLabel}</span>
        <p className="text-sm sm:text-base font-bold text-foreground leading-tight truncate max-w-[160px]">{user.name}</p>
        <p className="text-lg sm:text-xl font-black text-primary mt-1">{user.credits} <span className="text-xs font-normal opacity-70">CR</span></p>
      </div>
    </div>
  );
}
