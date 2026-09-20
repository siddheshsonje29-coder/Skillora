import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Star, MessageSquare, Calendar, CheckCircle2, Sparkles, X, School } from 'lucide-react';
import api from '../lib/api';
import { toast } from 'react-hot-toast';

export default function Matches() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [showBooking, setShowBooking] = useState(false);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    const q = searchParams.get('search') || '';
    if (q !== searchQuery) setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/matches${searchQuery ? `?search=${searchQuery}` : ''}`);
        setMatches(res.data || []);
      } catch (err) {
        console.error("Error fetching matches", err);
        toast.error("Failed to load potential matches");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchMatches();
    }, 400);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setSearchParams(val ? { search: val } : {}, { replace: true });
  };

  const filteredMatches = matches.filter(match => {
    if (verifiedOnly && !match.is_verified) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header & Search / Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 bg-card p-5 sm:p-6 rounded-2xl border border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <span>Find Your Peer Match</span>
            <Sparkles className="w-5 h-5 text-primary" />
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Smart matching based on skills you want to learn and teach.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="relative flex-grow sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by skill, name or college..." 
              className="pl-9 bg-secondary/70 border-border text-foreground rounded-xl focus-visible:ring-primary h-10 text-sm"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Button 
            variant="outline"
            className={`rounded-xl border-border gap-2 transition-all h-10 text-xs sm:text-sm font-semibold shrink-0 ${
              verifiedOnly 
                ? 'bg-primary/10 border-primary/40 text-primary' 
                : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setVerifiedOnly(!verifiedOnly)}
          >
            <CheckCircle2 className={`w-4 h-4 ${verifiedOnly ? 'text-primary fill-primary/10' : ''}`} />
            Verified Only
          </Button>
        </div>
      </div>

      {/* Grid of Matches */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="bg-card border-border h-64 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredMatches.map((match, idx) => (
            <Card key={idx} className="bg-card border-border hover:border-primary/50 transition-all duration-200 group flex flex-col rounded-2xl shadow-sm hover:shadow-md overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-3.5 pb-3">
                <Avatar className="h-12 w-12 border-2 border-border group-hover:border-primary/50 transition-colors">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${match.name}`} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">{match.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <p className="font-bold text-foreground text-base truncate">{match.name}</p>
                      {match.is_verified && (
                        <CheckCircle2 className="w-4 h-4 text-primary fill-primary/10 shrink-0" title="Verified Peer" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold shrink-0 bg-amber-500/10 px-1.5 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{match.rating || 4.8}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 truncate mt-0.5">
                    <School className="w-3 h-3 shrink-0" />
                    <span className="truncate">{match.college || 'College Peer'}</span>
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-3.5 flex-grow py-2">
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold text-primary uppercase tracking-wider">Teaches</p>
                  <div className="flex flex-wrap gap-1.5">
                    {match.skills_offered?.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-0 text-xs py-0.5 font-medium">
                        {skill.name || skill}
                        {skill.creditValue && <span className="ml-1 opacity-70">({skill.creditValue} CR)</span>}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">Wants to Learn</p>
                  <div className="flex flex-wrap gap-1.5">
                    {match.skills_wanted?.map((skill, i) => (
                      <Badge key={i} variant="outline" className="text-muted-foreground border-border text-xs py-0.5">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="grid grid-cols-2 gap-2.5 pt-3 pb-4 border-t border-border mt-auto">
                <Button 
                  variant="outline" 
                  className="border-border text-foreground hover:bg-secondary gap-1.5 text-xs font-semibold h-9 rounded-xl"
                  onClick={() => navigate('/chat')}
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Message
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 text-xs font-semibold h-9 rounded-xl shadow-sm"
                  onClick={() => {
                    setSelectedPeer(match);
                    setShowBooking(true);
                  }}
                >
                  <Calendar className="w-3.5 h-3.5" /> Book Session
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-card border-border p-8 sm:p-12 text-center rounded-2xl">
          <p className="text-muted-foreground text-sm sm:text-base">No matches found matching your filters. Try adding more skills to your profile!</p>
          <Button 
            className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-semibold rounded-xl" 
            onClick={() => navigate('/profile')}
          >
            Update My Skills
          </Button>
        </Card>
      )}

      {/* Booking Modal Dialog */}
      {showBooking && selectedPeer && (
        <BookingModal 
          peer={selectedPeer} 
          onClose={() => setShowBooking(false)} 
        />
      )}
    </div>
  );
}

function BookingModal({ peer, onClose }) {
  const [bookingData, setBookingData] = useState({
    skill: peer?.skills_offered?.[0]?.name || peer?.skills_offered?.[0] || 'Peer Tutoring',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM'
  });

  const currentSkillObj = peer?.skills_offered?.find(s => (s.name || s) === bookingData.skill);
  const currentCost = currentSkillObj?.creditValue || 20;

  const handleConfirm = async () => {
    const tid = toast.loading(`Booking session with ${peer.name}...`);
    try {
      const scheduled_at = new Date(`${bookingData.date} ${bookingData.time}`);
      await api.post('/sessions', {
        teacher_id: peer._id,
        skill: bookingData.skill,
        scheduled_at: scheduled_at.toISOString(),
        credit_cost: currentCost
      });
      toast.success(`Success! Session booked for ${bookingData.date} at ${bookingData.time}`, { id: tid });
      onClose();
    } catch (err) {
      console.error("Booking error", err);
      toast.error(err.response?.data?.message || "Failed to book session", { id: tid });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="w-full max-w-md bg-card border-border shadow-2xl animate-in zoom-in-95 duration-200 rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-border pb-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Calendar className="text-primary w-5 h-5" /> Book Session
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Scheduling 1-on-1 with {peer.name}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        
        <CardContent className="py-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Select Skill</label>
            <select 
              className="w-full bg-secondary border border-border rounded-xl px-3.5 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
              value={bookingData.skill}
              onChange={(e) => setBookingData({...bookingData, skill: e.target.value})}
            >
              {peer.skills_offered?.map((s, i) => (
                <option key={i} value={s.name || s}>{s.name || s}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</label>
              <input 
                type="date" 
                className="w-full bg-secondary border border-border rounded-xl px-3.5 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
                value={bookingData.date}
                onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Time Slot</label>
              <select 
                className="w-full bg-secondary border border-border rounded-xl px-3.5 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
                value={bookingData.time}
                onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
              >
                <option>09:00 AM</option>
                <option>10:00 AM</option>
                <option>02:00 PM</option>
                <option>04:00 PM</option>
                <option>06:00 PM</option>
              </select>
            </div>
          </div>

          <div className="p-3.5 bg-primary/10 rounded-xl border border-primary/20 flex justify-between items-center text-sm">
             <span className="text-muted-foreground">Session Credit Cost:</span>
             <span className="font-bold text-primary text-base">{currentCost} CR</span>
          </div>
        </CardContent>

        <CardFooter className="grid grid-cols-2 gap-3 pt-0 pb-5">
          <Button variant="outline" onClick={onClose} className="border-border text-foreground hover:bg-secondary rounded-xl text-xs sm:text-sm">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs sm:text-sm font-semibold">
            Confirm Booking
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
