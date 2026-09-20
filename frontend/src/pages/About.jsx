import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Globe, Heart, Shield, Users, Zap, BookOpen, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16 animate-in fade-in slide-in-from-bottom-3 duration-500">
      {/* Hero Section */}
      <div className="text-center space-y-5 max-w-3xl mx-auto py-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Democratizing Education
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.15]">
          Democratizing <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Knowledge</span> For Every Student.
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          Skillora is a decentralized peer-to-peer exchange where human capability and curiosity are the primary currency. We connect learners and teachers in an ecosystem powered by mutual growth, verified trust, and AI.
        </p>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'Active Students', value: '25,000+', icon: Users, color: 'text-blue-500' },
          { label: 'Hours Learned', value: '180,000+', icon: BookOpen, color: 'text-emerald-500' },
          { label: 'Skills Exchanged', value: '650+', icon: Zap, color: 'text-amber-500' },
          { label: 'Average Rating', value: '4.95 / 5', icon: Award, color: 'text-primary' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-card border border-border/70 rounded-2xl p-5 text-center shadow-sm">
              <div className={`w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center mx-auto mb-2.5 ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border/80 p-6 sm:p-8 rounded-2xl shadow-sm space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          <div className="p-3 bg-primary/10 rounded-xl w-fit">
            <Sparkles className="text-primary w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            To eliminate financial barriers to higher-level skills by enabling anyone to earn credits teaching what they already understand, and spend them learning something new. Every student has both expertise to share and new heights to reach.
          </p>
        </Card>

        <Card className="bg-card border-border/80 p-6 sm:p-8 rounded-2xl shadow-sm space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="p-3 bg-emerald-500/10 rounded-xl w-fit">
            <Globe className="text-emerald-500 w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            A borderless academic universe where practical skill mastery is recognized globally, merit is verified through peer assessment, and top-tier mentorship is universally available regardless of background or financial standing.
          </p>
        </Card>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Core Values</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            The principles guiding our product decisions, matching algorithms, and community standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ValueItem 
            icon={<Heart className="w-5 h-5 text-rose-500" />} 
            title="Community First" 
            desc="We design collaborative peer tools that empower students and independent learners, not walled gardens." 
          />
          <ValueItem 
            icon={<Shield className="w-5 h-5 text-blue-500" />} 
            title="Trust & Transparency" 
            desc="Every skill is verified through peer reviews, certifications, and real-time interactive assessments." 
          />
          <ValueItem 
            icon={<Sparkles className="w-5 h-5 text-primary" />} 
            title="Continuous Growth" 
            desc="Learning is not a finite destination; it is an enduring journey unlocked by reciprocal teaching." 
          />
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-primary/15 via-purple-500/10 to-transparent border border-primary/20 rounded-3xl p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Ready to start trading your knowledge?</h3>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Join thousands of university peers already swapping programming, design, language, and math tutoring.
        </p>
        <div className="pt-2">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 transition"
          >
            Join Skillora Today <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ValueItem({ icon, title, desc }) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border/80 hover:border-primary/40 transition-all space-y-3 shadow-sm">
      <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-base font-bold text-foreground">{title}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
