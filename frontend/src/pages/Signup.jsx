import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { User, BookOpen, GraduationCap, ArrowRight, ArrowLeft, Eye, EyeOff, Sparkles, CheckCircle2, Shield } from 'lucide-react';

export default function Signup() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skills_offered: '',
    skills_wanted: '',
    role: 'both',
    college: '',
    phone: '',
    language_preference: 'english'
  });

  const { signup, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Prepare data for backend
      const signupData = {
        ...formData,
        skills_offered: formData.skills_offered.split(',').map(s => ({ name: s.trim() })),
        skills_wanted: formData.skills_wanted.split(',').map(s => s.trim()),
      };

      const result = await signup(signupData);
      if (result.success) {
        toast.success('Account created! Welcome to Skillora.');
        navigate('/dashboard');
      } else {
        toast.error(result.message);
      }
    }
  };

  const stepsMeta = [
    { num: 1, title: 'Account', icon: User },
    { num: 2, title: 'Skills', icon: BookOpen },
    { num: 3, title: 'Profile', icon: GraduationCap },
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-xl">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Peer-to-Peer Learning Network
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Exchange skills, gain credits, and grow with thousands of student peers
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden backdrop-blur-sm">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          {/* Stepper Header */}
          <div className="relative mb-8">
            <div className="flex items-center justify-between">
              {stepsMeta.map((s, idx) => {
                const Icon = s.icon;
                const isCompleted = step > s.num;
                const isCurrent = step === s.num;

                return (
                  <div key={s.num} className="flex-1 flex flex-col items-center relative">
                    {/* Connecting Line */}
                    {idx < stepsMeta.length - 1 && (
                      <div 
                        className={`absolute top-4 left-1/2 w-full h-0.5 -z-0 transition-colors duration-300 ${
                          step > s.num ? 'bg-primary' : 'bg-border'
                        }`} 
                      />
                    )}
                    
                    <button
                      type="button"
                      onClick={() => s.num < step && setStep(s.num)}
                      disabled={s.num > step}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all relative z-10 ${
                        isCompleted
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : isCurrent
                          ? 'bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-md'
                          : 'bg-muted text-muted-foreground border border-border'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                    </button>
                    <span className={`text-xs mt-2 font-medium ${isCurrent ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleNext} className="space-y-5">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    placeholder="e.g. Alex Morgan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    placeholder="you@university.edu"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 pr-11 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                      placeholder="At least 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1">
                    <Shield className="w-3 h-3 text-emerald-500" /> Must contain at least 6 characters
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Skills & Role */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Skills You Offer <span className="normal-case font-normal text-muted-foreground">(comma separated)</span>
                  </label>
                  <input
                    type="text"
                    name="skills_offered"
                    value={formData.skills_offered}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    placeholder="e.g. Python, React, UI/UX Design, Public Speaking"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">
                    These are topics you feel confident explaining or tutoring.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Skills You Want to Learn <span className="normal-case font-normal text-muted-foreground">(comma separated)</span>
                  </label>
                  <input
                    type="text"
                    name="skills_wanted"
                    value={formData.skills_wanted}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    placeholder="e.g. Machine Learning, DSA, French, Video Editing"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">
                    We'll automatically match you with peers who teach these!
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Community Role
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'both', label: 'Both', desc: 'Teach & Learn' },
                      { id: 'teacher', label: 'Teacher', desc: 'Mentor Peers' },
                      { id: 'learner', label: 'Learner', desc: 'Acquire Skills' },
                    ].map(r => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, role: r.id })}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          formData.role === r.id
                            ? 'border-primary bg-primary/10 text-foreground ring-1 ring-primary'
                            : 'border-border bg-background hover:bg-muted/50 text-muted-foreground'
                        }`}
                      >
                        <div className="text-xs font-bold">{r.label}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{r.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: University & Language */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    College / University / Organization
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    placeholder="e.g. Stanford University, IIT Bombay, MIT"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                    placeholder="+1 555-0199 or +91 9876543210"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Preferred Session Language
                  </label>
                  <select
                    name="language_preference"
                    value={formData.language_preference}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition cursor-pointer"
                  >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="marathi">Marathi</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                  </select>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border/60">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-sm font-semibold text-foreground transition"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : step === 3 ? (
                  <>
                    Complete Registration <Sparkles className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Next Step <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer link */}
          <div className="mt-6 pt-5 border-t border-border/60 text-center">
            <p className="text-xs text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
