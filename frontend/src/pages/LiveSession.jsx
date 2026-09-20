import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Share2, Settings, Users, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';

export default function LiveSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Peer Tutor', text: 'Welcome to our Skillora live session! Let me know when you are ready to start.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const res = await api.get('/sessions');
        const session = res.data?.find(s => s._id === id);
        if (session) {
          setSessionData(session);
        }
      } catch (err) {
        console.error("Error fetching session details", err);
      }
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.warn("Could not access camera/mic:", err.message);
      }
    };

    fetchSessionDetails();
    startCamera();
    
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [id]);

  const toggleVideo = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !!isVideoOff;
      });
    }
    setIsVideoOff(!isVideoOff);
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !!isMuted;
      });
    }
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { sender: user?.name || 'You', text: chatInput.trim() }]);
    setChatInput('');
  };

  const peer = sessionData?.teacher_id?._id === user?._id 
    ? sessionData?.learner_id 
    : sessionData?.teacher_id;

  return (
    <div className="fixed inset-0 bg-[#07070C] z-50 flex flex-col text-white select-none">
      
      {/* Session Header */}
      <div className="p-3 sm:p-4 flex items-center justify-between bg-black/60 backdrop-blur-xl border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <Badge className="bg-destructive text-white border-0 animate-pulse text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
            LIVE
          </Badge>
          <div>
            <h2 className="text-xs sm:text-sm font-bold leading-tight">{sessionData?.skill || 'Skillora Classroom'}</h2>
            <p className="text-[11px] text-white/60 truncate max-w-[160px] sm:max-w-xs">
              {sessionData?.teacher_id?._id === user?._id 
                ? `Teaching ${peer?.name || 'Peer'}` 
                : `Learning from ${peer?.name || 'Peer'}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex items-center gap-1.5 text-white/70 text-xs">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>2 in room</span>
          </div>
          <div className="font-mono text-xs sm:text-sm font-bold bg-white/10 px-2.5 py-1 rounded-lg">
            {formatTime(timer)}
          </div>
        </div>

        <div className="flex items-center gap-1">
           <Button 
            variant="ghost" 
            size="icon" 
            className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8 rounded-lg"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'Skillora Live Session', url: window.location.href }).catch(() => {});
              } else {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Room link copied to clipboard!");
              }
            }}
           >
             <Share2 className="w-4 h-4" />
           </Button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-grow p-3 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 items-center justify-center max-w-6xl mx-auto w-full overflow-hidden">
        
        {/* Remote Peer Screen */}
        <div className="relative aspect-video sm:aspect-[4/3] md:aspect-video bg-[#121220] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Avatar className="h-20 w-20 sm:h-28 sm:w-28 border-4 border-primary/40 shadow-xl">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${peer?.name || 'Peer'}`} />
              <AvatarFallback className="bg-primary/20 text-primary font-bold text-xl">{peer?.name?.slice(0, 2) || 'P'}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-white/70 font-medium">Peer Connected</span>
          </div>

          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/70 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs text-white font-semibold">
              {peer?.name || 'Peer'}
            </span>
          </div>
        </div>

        {/* Local Participant Preview */}
        <div className="relative aspect-video sm:aspect-[4/3] md:aspect-video bg-[#0E0E18] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
          <video 
            ref={videoRef} 
            autoPlay 
            muted 
            playsInline 
            className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`}
          />
          {isVideoOff && (
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-20 w-20 sm:h-28 sm:w-28 border-4 border-white/15 bg-white/5">
                <AvatarFallback className="bg-white/10 text-white font-bold text-xl">{user?.name?.slice(0, 2) || 'ME'}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-white/50">Camera Off</span>
            </div>
          )}
          
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/70 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-md">
            <span className="text-xs text-white font-semibold">You</span>
            {isMuted && <MicOff className="w-3.5 h-3.5 text-destructive" />}
          </div>
        </div>

      </div>

      {/* Floating Controls Bar */}
      <div className="p-4 sm:p-6 pb-6 sm:pb-8 flex justify-center items-center gap-3 sm:gap-4 bg-gradient-to-t from-black via-black/80 to-transparent shrink-0">
        <Button 
          variant={isMuted ? "destructive" : "secondary"} 
          size="icon" 
          aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all shadow-md ${!isMuted ? 'bg-white/10 text-white hover:bg-white/20 border border-white/15' : ''}`}
          onClick={toggleAudio}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </Button>

        <Button 
          variant={isVideoOff ? "destructive" : "secondary"} 
          size="icon" 
          aria-label={isVideoOff ? "Turn camera on" : "Turn camera off"}
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all shadow-md ${!isVideoOff ? 'bg-white/10 text-white hover:bg-white/20 border border-white/15' : ''}`}
          onClick={toggleVideo}
        >
          {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
        </Button>

        <div className="w-px h-8 bg-white/15 mx-1"></div>

        <Button 
          variant={showChat ? "secondary" : "ghost"} 
          size="icon" 
          aria-label="Toggle session chat"
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all shadow-md ${showChat ? 'bg-primary text-white' : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'}`}
          onClick={() => setShowChat(!showChat)}
        >
          <MessageSquare className="w-5 h-5" />
        </Button>

        <Button 
          variant="destructive" 
          size="icon" 
          aria-label="End call"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg shadow-destructive/30"
          onClick={async () => {
            if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
            try {
              await api.patch(`/sessions/${id}`, { status: 'completed' });
              toast.success("Session completed! Credits exchanged.");
            } catch (err) {
              console.error("Error ending session", err);
            }
            navigate('/sessions');
          }}
        >
          <PhoneOff className="w-5 h-5" />
        </Button>
      </div>

      {/* Floating Session Chat Drawer */}
      {showChat && (
        <div className="fixed sm:absolute top-16 right-0 sm:right-4 bottom-24 sm:bottom-28 w-full sm:w-80 bg-card/95 backdrop-blur-2xl border border-white/15 rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl z-20 animate-in slide-in-from-bottom sm:slide-in-from-right-4 duration-200">
          <div className="p-3.5 border-b border-border flex items-center justify-between bg-secondary/50">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Session Chat</h3>
            <button 
              onClick={() => setShowChat(false)}
              className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-grow p-3 space-y-2.5 overflow-y-auto custom-scrollbar">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className="bg-secondary/70 p-2.5 rounded-xl border border-border">
                <p className="text-[10px] text-primary font-bold">{msg.sender}</p>
                <p className="text-xs text-foreground mt-0.5">{msg.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendChat} className="p-3 border-t border-border flex gap-2">
            <input 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Send message to peer..." 
              className="flex-grow bg-secondary border border-border rounded-xl px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" 
            />
            <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8 px-3 rounded-lg">
              Send
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
