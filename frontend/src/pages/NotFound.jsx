import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Compass, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* 404 Display */}
      <div className="relative select-none">
        <div className="text-[120px] sm:text-[160px] font-black text-primary/10 tracking-widest leading-none">
          404
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-2 shadow-lg">
            <Compass className="w-7 h-7 animate-spin-slow" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Page Not Found
          </h2>
        </div>
      </div>
      
      <p className="text-muted-foreground max-w-md text-sm sm:text-base leading-relaxed">
        The destination you navigated to might have been moved, renamed, or is temporarily out of service. Let's redirect you back to your learning space.
      </p>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button 
          variant="outline" 
          className="border-border text-foreground hover:bg-muted px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Button>
        <Link to="/">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-md shadow-primary/25">
            <Home className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </div>

      {/* Connectivity badge */}
      <div className="pt-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-card rounded-full text-xs text-muted-foreground border border-border/80 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Skillora Network Operational
        </div>
      </div>
    </div>
  );
}
