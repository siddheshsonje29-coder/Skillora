import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles, Heart, Rocket, Coffee, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Careers() {
  const [selectedDept, setSelectedDept] = useState('All');

  const jobs = [
    { id: 1, title: 'AI Engineer (RAG Systems & Vector Search)', type: 'Full-time', location: 'Remote / Mumbai', dept: 'Engineering', exp: '2+ yrs exp' },
    { id: 2, title: 'Senior Product Designer (UX/UI & Design Systems)', type: 'Full-time', location: 'Remote', dept: 'Design', exp: '3+ yrs exp' },
    { id: 3, title: 'Community & Developer Relations Lead', type: 'Full-time', location: 'Bangalore / Hybrid', dept: 'Marketing', exp: '1+ yrs exp' },
    { id: 4, title: 'Fullstack Node.js & WebRTC Systems Architect', type: 'Full-time', location: 'Remote', dept: 'Engineering', exp: '4+ yrs exp' },
    { id: 5, title: 'Campus Evangelist Intern', type: 'Part-time', location: 'Multiple Universities', dept: 'Growth', exp: 'Current Student' },
  ];

  const depts = ['All', 'Engineering', 'Design', 'Marketing', 'Growth'];

  const filteredJobs = selectedDept === 'All' 
    ? jobs 
    : jobs.filter(j => j.dept === selectedDept);

  const handleApply = (title) => {
    toast.success(`Application initiated for "${title}". Directing to resume submission.`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16 animate-in fade-in slide-in-from-top-3 duration-500">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> We're Hiring Builders
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Join the <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Movement</span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Help us build the next chapter of peer-to-peer knowledge exchange. We're a remote-first team of students, engineers, and educators solving real problems.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Benefit 
          icon={<Rocket className="w-5 h-5 text-primary" />}
          cardTitle="Hyper Innovation" 
          desc="Work directly with cutting-edge real-time WebRTC, vector embeddings, and decentralized smart ledgers." 
        />
        <Benefit 
          icon={<Coffee className="w-5 h-5 text-amber-500" />}
          cardTitle="Remote & Asynchronous" 
          desc="Work from wherever you produce your best thinking. We prioritize clear output and creative autonomy over arbitrary hours." 
        />
        <Benefit 
          icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
          cardTitle="Equity & Ownership" 
          desc="Every team member shares directly in the upside of the decentralized platform and community treasury." 
        />
      </div>

      {/* Open Positions */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Open Roles</h2>
            <p className="text-xs text-muted-foreground">Showing {filteredJobs.length} available opportunities</p>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {depts.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDept(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedDept === d
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredJobs.map((job) => (
            <Card 
              key={job.id} 
              className="bg-card border-border/80 hover:border-primary/50 transition-all rounded-2xl shadow-sm hover:shadow-md cursor-pointer group"
              onClick={() => handleApply(job.title)}
            >
              <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <Badge variant="outline" className="border-border text-muted-foreground text-[10px] uppercase font-semibold">
                      {job.type}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground/80" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-muted-foreground/80" /> {job.dept}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground/80" /> {job.exp}
                    </span>
                  </div>
                </div>

                <div className="sm:shrink-0 w-full sm:w-auto">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto border-border text-foreground group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all rounded-xl text-xs font-semibold gap-1.5"
                  >
                    Apply Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Benefit({ icon, cardTitle, desc }) {
  return (
    <div className="p-6 bg-card border border-border/80 rounded-2xl space-y-3 shadow-sm">
      <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-foreground font-bold text-base">{cardTitle}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
