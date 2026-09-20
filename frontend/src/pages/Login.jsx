import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex justify-center items-center py-12 sm:py-20 px-4 sm:px-6 min-h-[80vh] animate-in fade-in duration-300">
      <div className="bg-card p-6 sm:p-8 rounded-3xl border border-border w-full max-w-md shadow-xl">
        
        <div className="text-center mb-6 sm:mb-8 space-y-1.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-indigo-500 text-white flex items-center justify-center font-black text-xl mx-auto shadow-md shadow-primary/20 mb-3">
            S
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Welcome Back</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Sign in to exchange skills with peers worldwide</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-secondary/70 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                placeholder="siddhesh@skillora.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Password</label>
              <a href="#" onClick={(e) => { e.preventDefault(); toast("Password reset link is connected to email service."); }} className="text-xs text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-secondary/70 border border-border rounded-xl pl-10 pr-11 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl shadow-md shadow-primary/20 flex justify-center items-center gap-2 transition disabled:opacity-50 text-sm sm:text-base h-11"
          >
            {loading ? 'Signing in...' : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Quick-Fill Section */}
        <div className="mt-6 bg-secondary/50 border border-border rounded-2xl p-4 space-y-2.5">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Demo Accounts (Click to auto-fill):</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button 
              type="button"
              onClick={() => { setEmail('siddhesh@skillora.com'); setPassword('password123'); }}
              className="px-2.5 py-2 bg-card hover:bg-secondary border border-border rounded-xl text-foreground font-medium text-left transition truncate shadow-2xl shadow-primary/5"
            >
              👤 Siddhesh
            </button>
            <button 
              type="button"
              onClick={() => { setEmail('ayush@skillora.com'); setPassword('password123'); }}
              className="px-2.5 py-2 bg-card hover:bg-secondary border border-border rounded-xl text-foreground font-medium text-left transition truncate shadow-2xl shadow-primary/5"
            >
              👤 Ayush
            </button>
            <button 
              type="button"
              onClick={() => { setEmail('aravind@skillora.com'); setPassword('password123'); }}
              className="px-2.5 py-2 bg-card hover:bg-secondary border border-border rounded-xl text-foreground font-medium text-left transition truncate shadow-2xl shadow-primary/5"
            >
              👤 Aravind
            </button>
            <button 
              type="button"
              onClick={() => { setEmail('mrunali@skillora.com'); setPassword('password123'); }}
              className="px-2.5 py-2 bg-card hover:bg-secondary border border-border rounded-xl text-foreground font-medium text-left transition truncate shadow-2xl shadow-primary/5"
            >
              👤 Mrunali
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground">Default password for demo accounts: <code className="text-primary font-mono font-semibold">password123</code></p>
        </div>

        <div className="mt-6 border-t border-border pt-5 text-center">
          <p className="text-muted-foreground text-xs sm:text-sm">
            Don't have an account? <Link to="/signup" className="text-primary font-semibold hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
