import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Search, Sparkles, CheckCircle2, Star, Users, 
  BookOpen, Video, Award, Shield, ArrowUpRight, Compass, Flame, Play
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/matches?skill=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/matches');
    }
  };

  const categories = [
    {
      title: 'UI/UX Design',
      tagline: 'Figma, Design Systems & Mobile UX',
      image: '/assets/categories/ui_ux.jpg',
      query: 'UI/UX',
      badge: 'Popular',
      mentors: '140+ Mentors'
    },
    {
      title: 'Fullstack & AI',
      tagline: 'React, Node.js, Python & LLMs',
      image: '/assets/categories/coding.jpg',
      query: 'Python',
      badge: 'Trending',
      mentors: '280+ Mentors'
    },
    {
      title: 'Digital Illustration',
      tagline: 'Procreate, Vector Art & Character Design',
      image: '/assets/categories/illustration.jpg',
      query: 'Design',
      badge: 'Creative',
      mentors: '95+ Mentors'
    },
    {
      title: 'Film & Video Editing',
      tagline: 'Premiere Pro, DaVinci & Motion Graphics',
      image: '/assets/categories/video.jpg',
      query: 'Video',
      badge: 'New',
      mentors: '110+ Mentors'
    },
    {
      title: 'Freelance & Career',
      tagline: 'Client Acquisition, Resumes & Tech Interviews',
      image: '/assets/categories/freelance.jpg',
      query: 'Career',
      badge: 'Essential',
      mentors: '175+ Mentors'
    },
  ];

  const featuredMentors = [
    {
      name: 'Siddhesh Jain',
      role: 'Fullstack Engineer & AI Builder',
      college: 'BITS Pilani',
      rating: 4.95,
      sessions: 42,
      skills: ['React', 'Node.js', 'Python', 'WebRTC'],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces&auto=format&q=80',
      rate: '20 CR/hr'
    },
    {
      name: 'Mrunali Patil',
      role: 'Lead Product & Interaction Designer',
      college: 'NID Ahmedabad',
      rating: 5.0,
      sessions: 58,
      skills: ['Figma', 'UX Research', 'Design Systems'],
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=faces&auto=format&q=80',
      rate: '25 CR/hr'
    },
    {
      name: 'Ayush Sharma',
      role: 'Frontend Architect & OSS Contributor',
      college: 'IIT Bombay',
      rating: 4.9,
      sessions: 36,
      skills: ['Next.js', 'TypeScript', 'TailwindCSS'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&auto=format&q=80',
      rate: '20 CR/hr'
    },
    {
      name: 'Aravind Iyer',
      role: 'ML Researcher & Data Scientist',
      college: 'IIT Madras',
      rating: 4.88,
      sessions: 49,
      skills: ['PyTorch', 'Computer Vision', 'FastAPI'],
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces&auto=format&q=80',
      rate: '30 CR/hr'
    }
  ];

  const popularTags = ['Python', 'Figma', 'React', 'Machine Learning', 'Public Speaking', 'UI/UX', 'Video Editing'];

  return (
    <div className="flex flex-col animate-in fade-in duration-300">
      
      {/* 1. HERO SECTION WITH FLANKING SIDE ELEMENTS (REFERENCE STYLE) */}
      <section className="relative px-4 sm:px-6 pt-10 pb-16 md:pt-14 md:pb-20 overflow-hidden border-b border-border/70">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/15 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

        {/* ========================================================================= */}
        {/* LEFT FLANKING ELEMENTS (Hidden on mobile/tablet, positioned cleanly on desktop) */}
        {/* ========================================================================= */}
        <div className="hidden xl:flex flex-col gap-6 absolute left-3 2xl:left-10 top-12 w-[260px] pointer-events-none z-20">
          {/* Top-Left: Mini Code & Match Editor */}
          <div className="animate-float-slow bg-card/95 backdrop-blur-md border border-border/90 rounded-2xl p-3.5 shadow-xl pointer-events-auto transform -rotate-2 hover:rotate-0 transition-transform duration-300">
            {/* Window Dots */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/60 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">match_engine.py</span>
            </div>
            {/* Code lines */}
            <div className="font-mono text-[10.5px] leading-relaxed text-muted-foreground space-y-0.5">
              <p><span className="text-purple-400">def</span> <span className="text-blue-400">match_peer</span>(user):</p>
              <p className="pl-2.5 text-emerald-400"># ⚡ 98% Skill Synergy</p>
              <p className="pl-2.5">mentor = <span className="text-amber-400">"Siddhesh"</span></p>
              <p className="pl-2.5">credits = <span className="text-emerald-400">+25</span> <span className="text-muted-foreground">// peer fee</span></p>
              <p className="pl-2.5"><span className="text-purple-400">return</span> live_room.<span className="text-primary">connect</span>()</p>
            </div>
            {/* Match pill badge */}
            <div className="mt-2.5 pt-2 border-t border-border/60 flex items-center justify-between text-[11px]">
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Pair Match Ready
              </span>
              <span className="text-primary font-bold">25 CR/hr</span>
            </div>
          </div>

          {/* Bottom-Left: Live Video Classroom Tile */}
          <div className="animate-float-reverse bg-card/95 backdrop-blur-md border border-border/90 rounded-2xl p-3.5 shadow-xl pointer-events-auto transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center justify-between text-xs mb-2.5">
              <span className="inline-flex items-center gap-1.5 font-bold text-rose-500 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> Live Classroom
              </span>
              <span className="font-mono text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md">24:15</span>
            </div>
            {/* Avatars side-by-side */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces&q=80"
                  alt="Student"
                  className="w-11 h-11 rounded-xl object-cover ring-2 ring-primary/40"
                />
                <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-white text-[8px] font-bold">✓</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-0.5 text-primary mb-0.5">
                  <span className="w-0.5 h-3 bg-primary animate-pulse" />
                  <span className="w-0.5 h-5 bg-primary animate-pulse delay-75" />
                  <span className="w-0.5 h-2 bg-primary animate-pulse delay-150" />
                  <span className="w-0.5 h-4 bg-primary animate-pulse delay-100" />
                </div>
                <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Audio</span>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80"
                  alt="Peer"
                  className="w-11 h-11 rounded-xl object-cover ring-2 ring-emerald-500/40"
                />
              </div>
            </div>
            <p className="text-[10.5px] text-center font-medium text-muted-foreground">
              Screen share & live sandbox active
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT FLANKING ELEMENTS (Hidden on mobile/tablet, positioned cleanly on desktop) */}
        {/* ========================================================================= */}
        <div className="hidden xl:flex flex-col gap-6 absolute right-3 2xl:right-10 top-12 w-[260px] pointer-events-none z-20">
          {/* Top-Right: Figma / Product Design Canvas Card */}
          <div className="animate-float-reverse bg-card/95 backdrop-blur-md border border-border/90 rounded-2xl p-3.5 shadow-xl pointer-events-auto transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center justify-between text-xs pb-2 mb-2 border-b border-border/60">
              <span className="text-[11px] font-bold text-purple-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Figma Canvas 2.0
              </span>
              <span className="text-[10px] text-muted-foreground">AutoLayout</span>
            </div>
            {/* Visual Mini Artboard */}
            <div className="relative h-20 bg-muted/70 rounded-xl p-2 overflow-hidden border border-border/50">
              <div className="w-16 h-4 bg-primary/25 rounded mb-1.5" />
              <div className="w-32 h-2.5 bg-muted-foreground/25 rounded-sm mb-1" />
              <div className="w-24 h-2.5 bg-muted-foreground/20 rounded-sm" />
              {/* Floating cursors */}
              <div className="absolute right-3 bottom-3 flex items-center gap-1 bg-purple-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                <span>↖ Mrunali</span>
              </div>
              <div className="absolute left-6 top-2.5 flex items-center gap-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                <span>↖ Ayush</span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10.5px] text-muted-foreground font-medium">
              <span>Interactive UI Mentoring</span>
              <span className="text-emerald-500 font-bold">5.0 ★ (58)</span>
            </div>
          </div>

          {/* Bottom-Right: Circular Wallet & Credit Transfer Card */}
          <div className="animate-float-slow bg-card/95 backdrop-blur-md border border-border/90 rounded-2xl p-3.5 shadow-xl pointer-events-auto transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-black text-base border border-amber-500/20 shadow-sm shrink-0">
                CR
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground truncate">+50 Credits Transferred</p>
                <p className="text-[10.5px] text-muted-foreground truncate">Intro to LLMs Session</p>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-border/60 flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground text-[10.5px]">BITS Pilani Verified</span>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px]">Instant</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTER MAIN HERO CONTENT */}
        {/* ========================================================================= */}
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5 px-2">
          
          {/* Eyebrow Tag Styled exactly like reference */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-card/90 text-primary border border-primary/30 text-[11px] font-bold tracking-wider uppercase shadow-sm">
            <span>✦ ALGORITHMIC PEER KNOWLEDGE CONCIERGE ✦</span>
          </div>

          {/* Main Headline with organic styled underline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-foreground leading-[1.12]">
            Real peer-to-peer <br />
            learning experiences. <br />
            <span className="text-muted-foreground font-extrabold text-2xl sm:text-4xl lg:text-[2.6rem]">Packed around your </span>
            <span className="relative inline-block mt-0.5">
              <span className="bg-gradient-to-r from-primary via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                exact skills.
              </span>
              {/* Organic Hand-Drawn SVG Underline */}
              <svg 
                className="absolute left-0 -bottom-2 w-full h-3.5 text-amber-500" 
                viewBox="0 0 300 14" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M2.5 9.5C75 2.5 225 2.5 297.5 9.5C215 5.5 85 5.5 2.5 9.5Z" 
                  fill="currentColor" 
                />
              </svg>
            </span>
          </h1>

          {/* Subhead Bullet Points */}
          <p className="max-w-xl mx-auto text-muted-foreground text-sm sm:text-base leading-relaxed pt-0.5">
            Tell us your available window, target skills, and semester goals. Skillora evaluates peer synergy, mutual availability, and subject ratings to build sessions that actually work.
          </p>

          {/* Interactive Search Bar */}
          <div className="max-w-xl mx-auto pt-1">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills or mentors (e.g. Python, Figma, React)..."
                className="w-full bg-card/90 backdrop-blur-md border border-border/90 rounded-full pl-11 pr-28 sm:pr-32 py-3.5 text-foreground placeholder:text-muted-foreground text-xs sm:text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full text-xs shadow-md transition"
              >
                Search
              </button>
            </form>

            {/* Quick Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-xs">
              <span className="text-muted-foreground font-medium text-[11px] mr-1">Trending:</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => navigate(`/matches?skill=${encodeURIComponent(tag)}`)}
                  className="px-2.5 py-0.5 rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary border border-border/60 transition text-muted-foreground font-medium text-[11px]"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons with Hand-drawn Annotation matching reference */}
          <div className="pt-4 relative flex flex-col sm:flex-row justify-center items-center gap-3">
            
            {/* Primary Action Button with Annotation Arrow */}
            <div className="relative inline-block w-full sm:w-auto">
              {/* Playful Handwritten Annotation Arrow (Hidden on small screens) */}
              <div className="hidden lg:flex absolute -left-28 top-1/2 -translate-y-1/2 items-center gap-1 text-amber-500 select-none pointer-events-none">
                <span className="font-serif italic font-semibold text-xs tracking-tight">Takes 30s</span>
                <svg className="w-8 h-6 text-amber-500 -rotate-6" viewBox="0 0 36 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10 C 12 6, 22 6, 32 10" />
                  <path d="M26 4 L 33 10 L 26 16" />
                </svg>
              </div>

              <Link
                to="/signup"
                className="w-full sm:w-auto px-7 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm"
              >
                Start Learning Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Secondary Badge Chip (Matching reference style) */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-card border border-border/80 text-muted-foreground text-xs font-medium shadow-sm">
              <span className="text-amber-500 font-bold">⚡</span>
              <span>Have 30 mins between lectures? Teach a peer & earn 25 CR.</span>
            </div>

          </div>

          {/* Trust stats pill */}
          <div className="pt-3 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-muted-foreground text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 
              <span>25,000+ Active Students</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary"></span> 
              <span>100% Peer-to-Peer Credits</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> 
              <span>Top University Campuses</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. REAL-WORLD CATEGORY SHOWCASE (SKILLSHARE STYLE PHOTO STRIP) */}
      <section className="py-14 sm:py-20 bg-background border-b border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest mb-1.5">
                <Flame className="w-4 h-4 text-amber-500" /> Explore Disciplines
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Top Categories Students Are Learning
              </h2>
            </div>
            <Link 
              to="/matches" 
              className="text-xs sm:text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              Browse all 600+ skills <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Photographic Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/matches?skill=${encodeURIComponent(cat.query)}`)}
                className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-colors" />

                {/* Badge top right */}
                <div className="absolute top-3.5 right-3.5 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm">
                    {cat.badge}
                  </span>
                </div>

                {/* Card Content at bottom */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-10 space-y-1.5">
                  <span className="text-[11px] font-semibold text-emerald-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {cat.mentors}
                  </span>
                  <h3 className="text-xl font-black text-white leading-tight drop-shadow-sm group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-snug line-clamp-2">
                    {cat.tagline}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                    <span>Explore mentors</span>
                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED LIVE PEER MENTORS */}
      <section className="py-16 sm:py-24 bg-card/40 border-b border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest">
              <Users className="w-4 h-4" /> Peer Mentor Network
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Connect 1-on-1 With Top Rated Mentors
            </h2>
            <p className="text-sm text-muted-foreground">
              Book live interactive video classrooms with experienced students from premier universities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMentors.map((m, i) => (
              <div
                key={i}
                className="bg-card border border-border/80 hover:border-primary/50 transition-all duration-300 rounded-2xl p-4 shadow-sm hover:shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  {/* Top Portrait Image with Floating Badges */}
                  <div className="relative w-full h-52 rounded-xl overflow-hidden bg-muted">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Subtle dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Rating Pill (Top Left) */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{m.rating}</span>
                      <span className="text-gray-300 font-normal text-[10px]">({m.sessions})</span>
                    </div>

                    {/* Floating College Pill (Top Right) */}
                    <div className="absolute top-2.5 right-2.5 z-10 px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-md text-white text-[11px] font-bold shadow-md">
                      {m.college}
                    </div>

                    {/* Status indicator */}
                    <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5 text-white text-xs font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] drop-shadow-sm font-semibold">Available for 1-on-1</span>
                    </div>
                  </div>

                  {/* Mentor Info */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-extrabold text-foreground group-hover:text-primary transition-colors">
                        {m.name}
                      </h4>
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground font-medium line-clamp-1">
                      {m.role}
                    </p>
                  </div>

                  {/* Skills Offered */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {m.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-secondary/80 text-foreground border border-border/70 text-[11px] font-semibold rounded-lg"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with Rate & Action */}
                <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block leading-none mb-1">Session Rate</span>
                    <span className="text-base font-black text-primary">{m.rate}</span>
                  </div>
                  <Link
                    to={`/matches?skill=${encodeURIComponent(m.skills[0])}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold shadow-md shadow-primary/20 transition-all hover:translate-x-0.5"
                  >
                    Book Session <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW PEER EXCHANGE OPERATES (3 STEPS) */}
      <section className="py-16 sm:py-24 border-b border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">How Skillora Operates</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Three simple steps to start exchanging skills using our circular credit model.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border/80 hover:border-primary/50 transition duration-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 text-primary">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">1. Set Up Your Profile</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                List the skills you want to learn and subjects you can teach. You receive 100 starter credits automatically upon joining.
              </p>
            </div>
            
            <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border/80 hover:border-amber-500/50 transition duration-200 shadow-sm relative">
              <div className="absolute top-4 right-4 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                AI Powered
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-5 text-amber-500">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">2. Get Smart Matched</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Our smart matching engine pairs you with peers based on reciprocal skill overlap, availability, verified ratings, and campus affinity.
              </p>
            </div>
            
            <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border/80 hover:border-emerald-500/50 transition duration-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5 text-emerald-500">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">3. Learn, Teach & Earn</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Join 1-on-1 live WebRTC video classrooms. Earn credits whenever you teach; spend your balance to learn from other top peers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MISSION & METRICS */}
      <section className="py-16 sm:py-24 border-b border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-5">
            <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10 text-xs font-semibold">
              OUR MISSION
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Built for the <span className="text-primary">next generation</span> of collaborative learners.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Skillora was born from a simple belief: high-quality learning shouldn't be locked behind paywalls when university students already possess immense knowledge to share with each other. We built a circular learning economy where everyone grows.
            </p>
            <div className="pt-2">
              <Link to="/about" className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1">
                Learn more about our platform mission →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border/80 text-center shadow-sm">
              <p className="text-3xl sm:text-5xl font-black text-primary">180k+</p>
              <p className="text-xs text-muted-foreground uppercase font-bold mt-2">Hours Taught</p>
            </div>
            <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border/80 text-center shadow-sm">
              <p className="text-3xl sm:text-5xl font-black text-emerald-500">99.4%</p>
              <p className="text-xs text-muted-foreground uppercase font-bold mt-2">Peer Satisfaction</p>
            </div>
            <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border/80 text-center shadow-sm">
              <p className="text-3xl sm:text-5xl font-black text-purple-500">4.95/5</p>
              <p className="text-xs text-muted-foreground uppercase font-bold mt-2">Average Rating</p>
            </div>
            <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border/80 text-center shadow-sm">
              <p className="text-3xl sm:text-5xl font-black text-amber-500">100 CR</p>
              <p className="text-xs text-muted-foreground uppercase font-bold mt-2">Starter Bonus</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA BANNER */}
      <section className="py-16 sm:py-24 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-gradient-to-br from-primary/15 via-indigo-500/10 to-transparent p-8 sm:p-12 rounded-3xl border border-border shadow-md space-y-5">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Ready to learn without expensive course fees?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              Join the student-led knowledge economy. Sign up now and receive 100 free credits to book your first live lesson.
            </p>
            <div className="pt-2">
              <Link 
                to="/signup" 
                className="inline-flex px-8 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold shadow-lg shadow-primary/25 transition items-center gap-2 text-sm sm:text-base"
              >
                Create Free Account <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
