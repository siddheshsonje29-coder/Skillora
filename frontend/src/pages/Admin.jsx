import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Activity, Wallet, ShieldAlert, CheckCircle2, Search, ArrowUpRight, Server } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Admin() {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { title: 'Total Registered Peers', value: '1,428', change: '+12% this week', icon: <Users className="text-primary w-5 h-5" /> },
    { title: 'Active Live Sessions', value: '64', change: '8 WebRTC rooms open', icon: <Activity className="text-emerald-500 w-5 h-5" /> },
    { title: 'Circulating Credits', value: '78,450 CR', change: 'Zero monetary fees', icon: <Wallet className="text-purple-500 w-5 h-5" /> },
    { title: 'Platform Status', value: '100% Operational', change: 'DB & Socket.IO active', icon: <Server className="text-blue-500 w-5 h-5" /> },
  ];

  const recentUsers = [
    { id: 1, name: 'Siddhesh Jain', college: 'BITS Pilani', role: 'Teacher & Learner', credits: 1250, status: 'Active', verified: true },
    { id: 2, name: 'Ayush Sharma', college: 'IIT Bombay', role: 'Teacher & Learner', credits: 850, status: 'Active', verified: true },
    { id: 3, name: 'Aravind Iyer', college: 'IIT Madras', role: 'Teacher & Learner', credits: 420, status: 'Active', verified: true },
    { id: 4, name: 'Mrunali Patil', college: 'NID Ahmedabad', role: 'Teacher & Learner', credits: 980, status: 'Active', verified: true },
    { id: 5, name: 'Sneha Rao', college: 'NIT Trichy', role: 'Learner', credits: 50, status: 'New', verified: false },
  ];

  const filtered = recentUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-5 sm:p-6 rounded-2xl border border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase">
              Admin Gateway
            </Badge>
            <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Monitoring
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Platform Command Center</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Real-time metrics, user management, and platform health.</p>
        </div>

        <Button 
          onClick={() => toast.success("System health check passed: All services healthy.")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-xs sm:text-sm h-10 px-4 shrink-0 shadow-sm"
        >
          Run Diagnostics
        </Button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, idx) => (
          <Card key={idx} className="bg-card border-border p-5 rounded-2xl shadow-sm hover:border-primary/40 transition-colors">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{s.title}</p>
                <p className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">{s.value}</p>
              </div>
              <div className="p-2.5 bg-secondary rounded-xl">
                {s.icon}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
              <span>{s.change}</span>
            </p>
          </Card>
        ))}
      </div>

      {/* User Management Section */}
      <Card className="bg-card border-border rounded-2xl shadow-sm overflow-hidden">
        <CardHeader className="p-4 sm:p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-bold text-foreground">Community Members</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">Inspect verified peer accounts and status.</CardDescription>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search member or college..." 
              className="w-full bg-secondary border border-border text-foreground text-xs sm:text-sm rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-secondary/40 text-muted-foreground uppercase text-[11px] font-bold border-b border-border">
                <tr>
                  <th className="p-3.5 sm:p-4">Member</th>
                  <th className="p-3.5 sm:p-4">Campus / College</th>
                  <th className="p-3.5 sm:p-4">Role</th>
                  <th className="p-3.5 sm:p-4">Credits</th>
                  <th className="p-3.5 sm:p-4">Verification</th>
                  <th className="p-3.5 sm:p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-secondary/40 transition-colors">
                    <td className="p-3.5 sm:p-4 font-semibold">{u.name}</td>
                    <td className="p-3.5 sm:p-4 text-muted-foreground">{u.college}</td>
                    <td className="p-3.5 sm:p-4">{u.role}</td>
                    <td className="p-3.5 sm:p-4 font-bold text-primary">{u.credits} CR</td>
                    <td className="p-3.5 sm:p-4">
                      {u.verified ? (
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[10px] font-bold flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground border-border text-[10px]">
                          Pending
                        </Badge>
                      )}
                    </td>
                    <td className="p-3.5 sm:p-4 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-xs text-primary hover:bg-primary/10 rounded-lg h-7 px-2.5"
                        onClick={() => toast.success(`Viewing details for ${u.name}`)}
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
