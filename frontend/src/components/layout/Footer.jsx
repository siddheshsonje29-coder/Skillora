import { Link } from 'react-router-dom';
import { Heart, Sparkles, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur-md text-muted-foreground text-sm mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-indigo-400 flex items-center justify-center text-white font-black text-base shadow-sm">
                S
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-primary">Skill</span>
                <span className="text-foreground">ora</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              Skillora is a decentralized, AI-powered peer learning network where your expertise is your currency. Learn what you want by teaching what you know.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[11px] font-medium border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                WebRTC Active
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-medium border border-primary/20">
                <Sparkles className="w-3 h-3" />
                AI Matched
              </span>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/matches" className="hover:text-primary transition-colors">Find Matches</Link></li>
              <li><Link to="/groups" className="hover:text-primary transition-colors">Study Groups</Link></li>
              <li><Link to="/leaderboard" className="hover:text-primary transition-colors">Top Teachers</Link></li>
              <li><Link to="/credits" className="hover:text-primary transition-colors">Credit Wallet</Link></li>
              <li><Link to="/premium" className="hover:text-primary transition-colors">Premium Plans</Link></li>
            </ul>
          </div>

          {/* Platform / Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/resume" className="hover:text-primary transition-colors">AI Resume Builder</Link></li>
              <li><Link to="/verification" className="hover:text-primary transition-colors">Skill Verification</Link></li>
              <li><Link to="/chat" className="hover:text-primary transition-colors">Live Peer Chat</Link></li>
              <li><Link to="/sessions" className="hover:text-primary transition-colors">Video Classroom</Link></li>
              <li><Link to="/admin" className="hover:text-primary transition-colors">Platform Status</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Mission</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Join Team</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><span className="text-muted-foreground/80 cursor-default">Privacy & Terms</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Skillora Inc. Empowering learners and teachers worldwide.
          </p>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for peer education</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
