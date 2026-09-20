import { toast } from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Star, Shield, Sparkles } from 'lucide-react';

export default function Premium() {
  const plans = [
    {
      name: 'Free Starter',
      price: '0',
      description: 'Ideal for getting started with peer skill exchange.',
      features: ['50 Starter Credits', 'Standard Peer Matching', 'WebRTC Video & Audio Rooms', 'Public Community Groups'],
      buttonText: 'Current Plan',
      premium: false
    },
    {
      name: 'Pro Learner',
      price: '199',
      description: 'For dedicated students and active peer educators.',
      features: ['200 Monthly Credits', 'AI Priority Smart Matching', 'HD Video Classroom Sessions', 'Verified Peer Educator Badge', 'Unlimited Study Group Invites'],
      buttonText: 'Upgrade to Pro',
      premium: true,
      popular: true
    },
    {
      name: 'Elite Scholar',
      price: '499',
      description: 'The ultimate skill mastery and tutoring experience.',
      features: ['Unlimited Credits', 'Instant Priority Matchmaking', 'Recorded Session Playbacks', 'Elite Workshops & Masterclasses', '24/7 Priority Support', 'Profile Spotlight'],
      buttonText: 'Go Elite',
      premium: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 space-y-10 sm:space-y-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto pt-2">
        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold">
          SKILLORA MEMBERSHIP
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          Supercharge Your Peer Learning.
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Join thousands of university peers who are unlocking their full potential through verified mentorship and priority matchmaking.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {plans.map((plan, idx) => (
          <Card 
            key={idx} 
            className={`relative flex flex-col bg-card border-border overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-lg ${
              plan.popular ? 'border-primary shadow-xl shadow-primary/10 ring-2 ring-primary/30' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-black px-3.5 py-1 uppercase tracking-wider rounded-bl-xl shadow-sm">
                Most Popular
              </div>
            )}

            <CardHeader className="p-6 sm:p-8 pb-4">
              <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
                {plan.name}
              </CardTitle>
              <div className="flex items-baseline gap-1 mt-3 mb-2">
                <span className="text-4xl font-black text-foreground">₹{plan.price}</span>
                <span className="text-xs text-muted-foreground font-medium">/month</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed min-h-[40px]">{plan.description}</p>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 pt-2 flex-grow border-t border-border/60">
              <ul className="space-y-3 pt-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                    <div className={`mt-0.5 p-0.5 rounded-full shrink-0 ${
                      plan.premium ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="p-6 sm:p-8 pt-0">
               <Button 
                disabled={plan.name === 'Free Starter'}
                onClick={() => {
                  if (plan.premium) {
                    const tid = toast.loading(`Connecting to payment gateway for ${plan.name}...`);
                    setTimeout(() => {
                      toast.success(`Payment verified! You are now a ${plan.name} member.`, { id: tid });
                    }, 1800);
                  }
                }}
                className={`w-full py-5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20' 
                    : 'bg-secondary hover:bg-secondary/80 text-foreground border border-border disabled:opacity-50'
                }`}
               >
                 {plan.buttonText}
               </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Benefits Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
        <FeatureCard 
          icon={<Zap className="text-amber-500 w-5 h-5" />} 
          title="Instant Matchmaking" 
          desc="Skip queues and connect directly with verified experts in your field." 
        />
        <FeatureCard 
          icon={<Star className="text-purple-500 w-5 h-5" />} 
          title="Verified Status Badge" 
          desc="Build credibility with a badge showing your validated certifications." 
        />
        <FeatureCard 
          icon={<Shield className="text-blue-500 w-5 h-5" />} 
          title="Encrypted Sessions" 
          desc="Private, peer-to-peer encrypted WebRTC video rooms." 
        />
        <FeatureCard 
          icon={<Sparkles className="text-emerald-500 w-5 h-5" />} 
          title="Community Perks" 
          desc="Access exclusive study circles, workshops, and mentor office hours." 
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <Card className="bg-card border-border p-5 rounded-2xl shadow-sm hover:border-primary/40 transition-colors">
      <div className="p-2.5 bg-secondary rounded-xl w-fit mb-3">
        {icon}
      </div>
      <h3 className="font-bold text-sm text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
    </Card>
  );
}
