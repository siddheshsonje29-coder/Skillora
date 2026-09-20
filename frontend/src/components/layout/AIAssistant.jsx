import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, X, Send, Brain } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Hello! I'm Skillora AI. How can I help you learn or teach today?" }
  ]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();
  const scrollRef = useRef(null);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') {
      setSuggestions(['How to earn more credits?', 'Find a React partner?', 'Set a learning goal']);
    } else if (path === '/matches') {
      setSuggestions(['Who is best for Node.js?', 'How does matching work?', 'Filter by rating']);
    } else if (path === '/credits') {
      setSuggestions(['How to redeem credits?', 'Trust score rules', 'Recent activity']);
    } else {
      setSuggestions(['Tell me about Skillora', 'How to start teaching?', 'Member benefits']);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text) => {
    const msg = text || input;
    if (!msg.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      let botText = "That's a great question! I'm analyzing your profile to give you tailored peer learning advice.";
      if (msg.toLowerCase().includes('credit')) {
        botText = "You earn credits by teaching peers in 1-on-1 sessions. Currently, high-demand skills like UI/UX and React offer higher credit multipliers!";
      } else if (msg.toLowerCase().includes('react')) {
        botText = "I found top-rated React peers available now. Check out the Matches tab to schedule a session!";
      } else if (msg.toLowerCase().includes('start') || msg.toLowerCase().includes('teach')) {
        botText = "To start teaching, list your skills on your Profile, head to the Matches page, and accept session requests!";
      }
      
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botText }]);
    }, 800);
  };

  return (
    <div id="ai-assistant" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          aria-label="Open Skillora AI Assistant"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-primary to-indigo-500 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center p-0 group border-2 border-background ring-4 ring-primary/20"
        >
          <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
        </button>
      ) : (
        <Card className="w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-card/95 backdrop-blur-2xl border-border shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
          <CardHeader className="bg-gradient-to-r from-primary to-indigo-600 p-4 flex flex-row items-center justify-between border-0 text-white">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-white/20 rounded-xl backdrop-blur-sm">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-base font-bold">Skillora AI</CardTitle>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-white/80 font-medium">Peer Learning Assistant</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              aria-label="Close AI Assistant"
              className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </CardHeader>

          <CardContent className="p-0 flex flex-col">
            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="h-72 sm:h-80 overflow-y-auto p-4 space-y-3 bg-secondary/30 custom-scrollbar"
            >
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.type === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-none shadow-sm' 
                      : 'bg-secondary text-foreground rounded-tl-none border border-border/60 shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions Chips */}
            <div className="px-3 py-2.5 flex flex-wrap gap-1.5 border-t border-border bg-card">
              {suggestions.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSend(s)}
                  className="text-[11px] px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-colors truncate max-w-full"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input area */}
            <div className="p-3 border-t border-border bg-card">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..." 
                  className="bg-secondary/70 border-border text-foreground text-sm rounded-xl focus-visible:ring-primary h-10"
                />
                <Button 
                  type="submit"
                  size="icon"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shrink-0 h-10 w-10"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
