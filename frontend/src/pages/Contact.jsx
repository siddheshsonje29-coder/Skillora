import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageCircle, MapPin, Send, Globe, Share2, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSend = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitted(true);
    toast.success("Message received! Our team will get back to you within 24 hours.");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12 animate-in fade-in slide-in-from-right-3 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Side: Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Support & Inquiries
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Get in <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Have questions regarding peer matching, skill verification, or platform features? Our community team is here around the clock.
            </p>
          </div>

          <div className="space-y-3.5">
            <ContactInfo 
              icon={<Mail className="text-primary w-5 h-5" />} 
              title="Direct Email" 
              value="support@skillora.com" 
              desc="Average response time < 4 hours"
            />
            <ContactInfo 
              icon={<MessageCircle className="text-emerald-500 w-5 h-5" />} 
              title="Discord Community" 
              value="discord.gg/skillora" 
              desc="Join 12,000+ peer mentors live"
            />
            <ContactInfo 
              icon={<MapPin className="text-rose-500 w-5 h-5" />} 
              title="Main Innovation Hub" 
              value="Skillora House, BKC, Mumbai 400051" 
              desc="Open for university partnerships"
            />
          </div>

          {/* Social Channels */}
          <div className="pt-4 border-t border-border/60">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Official Channels
            </p>
            <div className="flex gap-2.5">
              {[
                { icon: Globe, label: 'Website' },
                { icon: Share2, label: 'Twitter' },
                { icon: Mail, label: 'Newsletter' },
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <button 
                    key={idx}
                    type="button"
                    className="p-2.5 bg-muted/60 hover:bg-muted border border-border/80 rounded-xl text-muted-foreground hover:text-foreground transition-all flex items-center gap-2 text-xs font-medium"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7">
          <Card className="bg-card border border-border/80 shadow-xl rounded-2xl overflow-hidden backdrop-blur-sm">
            <CardHeader className="p-6 sm:p-8 pb-4">
              <CardTitle className="text-2xl font-bold text-foreground">Send a Message</CardTitle>
              <CardDescription className="text-muted-foreground text-xs sm:text-sm">
                Fill out the form below and we'll reply directly to your inbox.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 pt-2">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Thank you for reaching out!</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    We've received your note and assigned a team member to assist you promptly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                    }}
                    className="border-border rounded-xl text-xs font-semibold"
                  >
                    Send Another Note
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSend} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <Input 
                        placeholder="e.g. Alex Morgan" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-background border-border text-foreground rounded-xl py-2.5 text-sm" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <Input 
                        placeholder="alex@university.edu" 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-background border-border text-foreground rounded-xl py-2.5 text-sm" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Subject
                    </label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-background border border-border text-foreground text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition cursor-pointer"
                    >
                      <option>General Inquiry</option>
                      <option>Skill Verification & Certificate</option>
                      <option>Credit Balance & Multipliers</option>
                      <option>Campus Ambassador Program</option>
                      <option>Report an Issue / Bug</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <Textarea 
                      placeholder="How can our community guides assist you?" 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-background border-border text-foreground rounded-xl min-h-[140px] text-sm" 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-semibold shadow-md shadow-primary/20 transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ icon, title, value, desc }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border/80 shadow-sm">
      <div className="shrink-0 p-2.5 rounded-xl bg-muted/60">{icon}</div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
        <p className="text-foreground font-semibold text-sm mt-0.5">{value}</p>
        {desc && <p className="text-[11px] text-muted-foreground mt-0.5">{desc}</p>}
      </div>
    </div>
  );
}
