import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AIAssistant from './components/layout/AIAssistant';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Matches from './pages/Matches';
import Sessions from './pages/Sessions';
import Chat from './pages/Chat';
import Credits from './pages/Credits';
import LiveSession from './pages/LiveSession';
import Leaderboard from './pages/Leaderboard';
import Premium from './pages/Premium';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Verification from './pages/Verification';
import StudyGroups from './pages/StudyGroups';
import ResumeBuilder from './pages/ResumeBuilder';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  const { isAuthenticated, user, getProfile } = useAuthStore();

  useEffect(() => {
    // Apply theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }

    if (isAuthenticated && !user) {
      getProfile();
    }
  }, [isAuthenticated, user, getProfile]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/session/:id" element={<LiveSession />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/groups" element={<StudyGroups />} />
            <Route path="/resume" element={<ResumeBuilder />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <AIAssistant />
        <Toaster position="top-right" toastOptions={{ className: 'bg-[#1A1A2E] text-white border border-[#2D2D44]' }} />
      </div>
    </BrowserRouter>
  );
}

export default App;
