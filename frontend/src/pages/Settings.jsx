import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Bell, Shield, Wallet, Moon, Sun, Globe, Save, Lock, Smartphone, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';

export default function Settings() {
  const { user } = useAuthStore();
  const [activeSection, setActiveSection] = useState('profile');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [notifs, setNotifs] = useState({
    email: true,
    push: true,
    summary: false
  });

  const handleSave = () => {
    toast.success("Preferences and account settings saved!");
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    toast.success(`Switched to ${newTheme} mode`);
  };

  const navItems = [
    { id: 'profile', label: 'Public Profile', icon: <User /> },
    { id: 'appearance', label: 'Appearance & UI', icon: <Moon /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell /> },
    { id: 'security', label: 'Security & Auth', icon: <Shield /> },
    { id: 'credits', label: 'Wallet & Billing', icon: <Wallet /> },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="bg-card p-5 sm:p-6 rounded-2xl border border-border">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Account & Preferences</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure your personal profile, security, and interface appearance.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        
        {/* Navigation Tabs (Horizontal on mobile, vertical sidebar on desktop) */}
        <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 gap-2 lg:w-60 shrink-0 custom-scrollbar">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`
                flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all text-xs sm:text-sm font-semibold shrink-0 lg:w-full text-left
                ${activeSection === item.id 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'bg-card lg:bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground border lg:border-transparent border-border'
                }
              `}
            >
              {React.cloneElement(item.icon, { className: 'w-4 h-4 shrink-0' })}
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Settings Card */}
        <div className="flex-grow min-w-0">
          <Card className="bg-card border-border shadow-sm rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
                {activeSection === 'profile' && 'Public Profile Information'}
                {activeSection === 'appearance' && 'Interface & Theme Customization'}
                {activeSection === 'notifications' && 'Notification Preferences'}
                {activeSection === 'security' && 'Security & Password'}
                {activeSection === 'credits' && 'Wallet, Credits & Billing'}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                Update how your information is displayed across the platform.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
                        <Input defaultValue={user?.name || 'Siddhesh Jain'} className="bg-secondary/70 border-border text-foreground text-sm rounded-xl h-11" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">College / Institution</label>
                        <Input defaultValue={user?.college || 'BITS Pilani'} className="bg-secondary/70 border-border text-foreground text-sm rounded-xl h-11" />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
                        <Input defaultValue={user?.email || 'siddhesh@skillora.com'} disabled className="bg-secondary/40 border-border text-muted-foreground text-sm rounded-xl h-11" />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Personal Portfolio / Website</label>
                        <div className="relative">
                           <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                           <Input placeholder="https://myportfolio.dev" className="pl-9 bg-secondary/70 border-border text-foreground text-sm rounded-xl h-11" />
                        </div>
                     </div>
                  </div>
                </div>
              )}

              {/* Appearance Section */}
              {activeSection === 'appearance' && (
                <div className="space-y-4">
                  <p className="text-xs text-muted-foreground">Select your preferred interface color style. Changes take effect instantly.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => handleThemeChange('dark')}
                      className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                        theme === 'dark' 
                          ? 'border-primary bg-primary/10 shadow-sm' 
                          : 'border-border bg-secondary/40 hover:bg-secondary'
                      }`}
                    >
                      <div className="p-3 bg-[#0B0B12] rounded-xl text-amber-400 border border-white/10">
                        <Moon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Dark Space Mode</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Recommended deep indigo & violet</p>
                      </div>
                      {theme === 'dark' && <Check className="w-5 h-5 text-primary ml-auto" />}
                    </button>

                    <button 
                      type="button"
                      onClick={() => handleThemeChange('light')}
                      className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                        theme === 'light' 
                          ? 'border-primary bg-primary/10 shadow-sm' 
                          : 'border-border bg-secondary/40 hover:bg-secondary'
                      }`}
                    >
                      <div className="p-3 bg-white rounded-xl text-amber-500 border border-slate-200 shadow-sm">
                        <Sun className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Clean Light Mode</p>
                        <p className="text-xs text-muted-foreground mt-0.5">High contrast crisp white & slate</p>
                      </div>
                      {theme === 'light' && <Check className="w-5 h-5 text-primary ml-auto" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Section */}
              {activeSection === 'notifications' && (
                <div className="space-y-3">
                  <NotificationToggle 
                    title="Email notifications for incoming messages" 
                    desc="Receive alerts when peers message you about skill exchanges"
                    checked={notifs.email} 
                    onChange={() => setNotifs(prev => ({ ...prev, email: !prev.email }))}
                  />
                  <NotificationToggle 
                    title="Real-time push notifications for sessions" 
                    desc="Receive lesson start reminders 10 minutes prior"
                    checked={notifs.push} 
                    onChange={() => setNotifs(prev => ({ ...prev, push: !prev.push }))}
                  />
                  <NotificationToggle 
                    title="Monthly credit & community digest" 
                    desc="Summary of credits earned and top learning cohorts"
                    checked={notifs.summary} 
                    onChange={() => setNotifs(prev => ({ ...prev, summary: !prev.summary }))}
                  />
                </div>
              )}

              {/* Security Section */}
              {activeSection === 'security' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-secondary/40 border border-border space-y-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                      <Lock className="w-4 h-4 text-primary" />
                      <span>Change Password</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input type="password" placeholder="Current password" className="bg-secondary border-border text-sm rounded-xl h-10" />
                      <Input type="password" placeholder="New password" className="bg-secondary border-border text-sm rounded-xl h-10" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/40 border border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-foreground">Two-Factor Authentication (2FA)</p>
                        <p className="text-[11px] text-muted-foreground">Secure your account with SMS or Authenticator</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-border text-xs rounded-xl h-8">
                      Enable
                    </Button>
                  </div>
                </div>
              )}

              {/* Credits & Billing Section */}
              {activeSection === 'credits' && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-primary/10 via-indigo-500/10 to-transparent border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-primary uppercase tracking-wider">Active Balance</p>
                      <p className="text-3xl font-black text-foreground mt-1">{user?.credits || 50} CR</p>
                      <p className="text-xs text-muted-foreground mt-0.5">50 credits provided on registration</p>
                    </div>
                    <Button onClick={() => toast.success("Redirecting to Credit Shop...")} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-xs sm:text-sm h-10">
                      Refill Credits
                    </Button>
                  </div>
                </div>
              )}

              {/* Save Footer */}
              <div className="pt-4 border-t border-border flex justify-end">
                <Button 
                  onClick={handleSave} 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 rounded-xl text-xs sm:text-sm h-10 shadow-sm gap-2"
                >
                  <Save className="w-4 h-4" /> Save Preferences
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

function NotificationToggle({ title, desc, checked, onChange }) {
  return (
    <div 
      onClick={onChange}
      className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-secondary/40 hover:bg-secondary/60 transition-colors border border-border cursor-pointer select-none"
    >
      <div className="pr-4">
        <p className="text-xs sm:text-sm font-semibold text-foreground leading-tight">{title}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <div className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${checked ? 'bg-primary' : 'bg-muted border border-border'}`}>
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${checked ? 'left-6' : 'left-1'}`}></div>
      </div>
    </div>
  );
}
