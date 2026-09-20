import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  Bell, 
  Search, 
  UserCircle, 
  LogOut, 
  Settings as SettingsIcon, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Sparkles,
  Wallet,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuthStore();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  
  const notifRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const notifications = [
    { id: 1, text: 'Ayush Sharma sent you a message', time: '2m ago', unread: true },
    { id: 2, text: 'Your Python session was confirmed', time: '1h ago', unread: false },
    { id: 3, text: 'You earned 50 credits for teaching', time: '5h ago', unread: false },
  ];

  // Sync theme
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowNotifications(false);
  }, [location.pathname]);

  // Click outside to close notifications
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/matches', label: 'Matches' },
    { to: '/sessions', label: 'Sessions' },
    { to: '/chat', label: 'Chat' },
    { to: '/groups', label: 'Groups' },
    { to: '/resume', label: 'Resume' },
    { to: '/credits', label: 'Credits', badge: user?.credits !== undefined ? `${user.credits} CR` : null },
    { to: '/premium', label: 'Premium', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-indigo-400 flex items-center justify-center text-white font-black text-lg shadow-md shadow-primary/25 group-hover:scale-105 transition-transform">
              S
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-primary">Skill</span>
              <span className="text-foreground">ora</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          {isAuthenticated && (
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                if (link.highlight) {
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) => `
                        ml-1 px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm
                        ${isActive 
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white ring-2 ring-amber-400/40' 
                          : 'bg-gradient-to-r from-amber-500/90 to-rose-500/90 hover:from-amber-500 hover:to-rose-500 text-white'
                        }
                      `}
                    >
                      <Sparkles className="w-3 h-3" />
                      {link.label}
                    </NavLink>
                  );
                }
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) => `
                      px-3 py-1.5 rounded-lg transition-all text-sm font-medium flex items-center gap-1.5
                      ${isActive 
                        ? 'bg-primary/10 text-primary font-semibold' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                      }
                    `}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 font-bold border border-amber-500/20">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2.5">
          
          {isAuthenticated ? (
            <>
              {/* Desktop Search Bar */}
              <form 
                className="relative hidden md:block"
                onSubmit={(e) => {
                  e.preventDefault();
                  const query = e.target.search.value;
                  if (query.trim()) {
                    navigate(`/matches?search=${encodeURIComponent(query.trim())}`);
                    e.target.search.value = '';
                  }
                }}
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  name="search"
                  type="text" 
                  placeholder="Search skills or peers..." 
                  className="bg-secondary/70 hover:bg-secondary border border-border text-sm rounded-full pl-9 pr-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-foreground placeholder:text-muted-foreground w-48 xl:w-60 transition-all" 
                />
              </form>

              {/* Theme Switcher Button */}
              <button
                type="button"
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
              </button>

              {/* Notifications Button & Dropdown */}
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="View notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-background"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-3.5 border-b border-border flex justify-between items-center bg-secondary/40">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                      </div>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="text-[11px] text-primary hover:underline font-medium"
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-border custom-scrollbar">
                      {notifications.map((n) => (
                        <div 
                          key={n.id} 
                          className={`p-3.5 hover:bg-secondary/60 transition-colors cursor-pointer ${n.unread ? 'bg-primary/5' : ''}`}
                        >
                          <p className="text-xs text-foreground leading-snug">{n.text}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2.5 text-center border-t border-border bg-secondary/30">
                      <button 
                        onClick={() => { setShowNotifications(false); navigate('/dashboard'); }}
                        className="text-xs text-muted-foreground hover:text-foreground font-medium transition"
                      >
                        View all activity
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile, Settings & Logout (Desktop) */}
              <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-border">
                <Link 
                  to="/profile"
                  title="Profile"
                  className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <UserCircle className="w-6 h-6" />
                </Link>
                <Link 
                  to="/settings"
                  title="Settings"
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <SettingsIcon className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    navigate('/');
                  }} 
                  title="Log out"
                  className="p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus:outline-none"
                aria-label="Open navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
              </button>
              <Link 
                to="/login" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 transition"
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full transition shadow-md shadow-primary/20"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isAuthenticated && mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="lg:hidden border-b border-border bg-card/95 backdrop-blur-2xl px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200"
        >
          {/* Mobile User Summary Banner */}
          <div className="mb-4 p-3.5 rounded-xl bg-secondary/60 border border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                {user?.name?.slice(0, 2).toUpperCase() || 'ME'}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground truncate max-w-[140px]">{user?.name || 'My Account'}</p>
                <p className="text-[11px] text-muted-foreground truncate max-w-[140px]">{user?.email || 'Student'}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground uppercase font-bold block">Balance</span>
              <span className="text-sm font-black text-primary">{user?.credits || 0} CR</span>
            </div>
          </div>

          {/* Mobile Search Form */}
          <form 
            className="relative mb-4"
            onSubmit={(e) => {
              e.preventDefault();
              const query = e.target.mobileSearch.value;
              if (query.trim()) {
                navigate(`/matches?search=${encodeURIComponent(query.trim())}`);
                setMobileMenuOpen(false);
              }
            }}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              name="mobileSearch"
              type="text" 
              placeholder="Search skills, users, groups..." 
              className="w-full bg-secondary border border-border text-sm rounded-xl pl-9 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" 
            />
          </form>

          {/* Navigation Links Grid */}
          <nav className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    p-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between border
                    ${isActive 
                      ? 'bg-primary/10 text-primary border-primary/30 font-semibold' 
                      : 'bg-secondary/40 text-muted-foreground border-transparent hover:text-foreground hover:bg-secondary'
                    }
                  `}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500 font-bold">
                      {link.badge}
                    </span>
                  )}
                  {link.highlight && (
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile Footer Links (Profile, Settings, Logout) */}
          <div className="pt-3 border-t border-border flex items-center justify-between text-sm">
            <Link 
              to="/profile" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground py-1"
            >
              <UserCircle className="w-4 h-4" />
              <span>Profile</span>
            </Link>
            <Link 
              to="/settings" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground py-1"
            >
              <SettingsIcon className="w-4 h-4" />
              <span>Settings</span>
            </Link>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                logout();
                navigate('/');
              }}
              className="flex items-center gap-1.5 text-destructive hover:opacity-80 py-1 font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
