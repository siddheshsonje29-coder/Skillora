import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Wallet, ArrowUpRight, ArrowDownLeft, ShieldCheck, Sparkles, Zap, ArrowRight, Award } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Credits() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const transactions = [
    { id: 1, type: 'earned', amount: 50, from: 'Siddhesh Jain', skill: 'Python Lesson', date: 'Oct 12' },
    { id: 2, type: 'spent', amount: 20, to: 'Ayush Sharma', skill: 'React Basics', date: 'Oct 10' },
    { id: 3, type: 'earned', amount: 10, from: 'Skillora System', detail: 'Daily Attendance Bonus', date: 'Oct 09' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-5 sm:p-6 rounded-2xl border border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <Wallet className="w-7 h-7 text-primary" />
            <span>Credit Wallet</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Earn credits by teaching peers; spend them to unlock new skills.</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-xs sm:text-sm h-10 px-4 shrink-0 shadow-sm"
          onClick={() => navigate('/matches')}
        >
          Spend Credits <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </div>

      {/* Main Wallet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Total Balance Card */}
        <Card className="bg-gradient-to-br from-primary via-indigo-600 to-indigo-700 text-white border-0 shadow-xl shadow-primary/20 relative overflow-hidden rounded-2xl flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Wallet className="w-40 h-40" />
          </div>
          
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-white/90">Available Balance</CardTitle>
            <CardDescription className="text-white/70 text-xs">Credits available for booking lessons</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 pt-2">
            <div className="text-5xl sm:text-6xl font-black tracking-tight">
              {user?.credits || 50} <span className="text-lg sm:text-xl font-normal opacity-80">CR</span>
            </div>

            <div className="space-y-2 bg-white/10 p-3.5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="flex justify-between text-xs text-white/90 font-medium">
                <span>Monthly Teaching Target</span>
                <span>80% Reached</span>
              </div>
              <Progress value={80} className="h-2 bg-white/20" />
              <p className="text-[11px] text-white/70">Complete 1 more lesson to unlock a 25 CR community reward bonus.</p>
            </div>
          </CardContent>
        </Card>

        {/* Bonus & Multipliers Column */}
        <div className="space-y-4 flex flex-col justify-between">
          <Card className="bg-card border-border hover:border-amber-500/40 transition-colors rounded-2xl shadow-sm">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">Trust Score</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Increases with each completed session</p>
                </div>
              </div>
              <div className="text-2xl font-black text-amber-500">{user?.trust_score || 98}%</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border hover:border-emerald-500/40 transition-colors rounded-2xl shadow-sm">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">Skill Demand Multiplier</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Earn 1.2x credits for high-demand topics</p>
                </div>
              </div>
              <div className="text-2xl font-black text-emerald-500">x1.2</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:border-primary/40 transition-colors rounded-2xl shadow-sm">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">Peer Tutor Tier</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Gold Educator (Top 10% on Skillora)</p>
                </div>
              </div>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">Level 3</span>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Transaction History Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
            <Zap className="text-amber-500 w-5 h-5" /> 
            <span>Recent Credit Activity</span>
          </h2>
          <span className="text-xs text-muted-foreground">Showing last 3 transactions</span>
        </div>
        
        <div className="space-y-3">
          {transactions.map((tx) => (
            <Card key={tx.id} className="bg-card border-border hover:bg-secondary/40 transition-all rounded-xl shadow-sm">
              <CardContent className="p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    tx.type === 'earned' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'
                  }`}>
                    {tx.type === 'earned' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-tight">{tx.skill || tx.detail}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {tx.type === 'earned' ? `From ${tx.from}` : `To ${tx.to}`} • {tx.date}
                    </p>
                  </div>
                </div>
                
                <div className={`font-mono font-bold text-sm sm:text-base shrink-0 ${
                  tx.type === 'earned' ? 'text-emerald-500' : 'text-destructive'
                }`}>
                  {tx.type === 'earned' ? '+' : '-'}{tx.amount} CR
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
