import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, ArrowLeft, MoreVertical, Phone, Video, Search, CheckCheck } from 'lucide-react';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001');

export default function Chat() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState([
    { id: 1, senderId: 'bot', text: 'Welcome to Skillora Peer Chat! Select a contact to discuss skills or schedule lessons.', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [searchContact, setSearchContact] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => socket.off('message');
  }, []);

  const [selectedContact, setSelectedContact] = useState({ 
    id: '1', 
    name: 'Ayush Sharma', 
    status: 'online', 
    avatar: 'Ayush',
    skill: 'React & Frontend' 
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      senderId: user?.id || 'me',
      text: inputText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMessage]);
    socket.emit('sendMessage', newMessage);
    setInputText('');

    // Simulated peer response
    setTimeout(() => {
      const responseMessage = {
        id: Date.now() + 1,
        senderId: 'other',
        text: `Hey ${user?.name || 'there'}! Thanks for reaching out. Let's schedule a session on Skillora to exchange knowledge!`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 1500);
  };

  const contacts = [
    { id: '1', name: 'Ayush Sharma', status: 'online', lastMsg: 'I can help with React & Next.js!', skill: 'React Expert', time: '2m ago' },
    { id: '2', name: 'Siddhesh Jain', status: 'online', lastMsg: 'See you tomorrow for the Python session.', skill: 'Python & AI', time: '1h ago' },
    { id: '3', name: 'Mrunali Patil', status: 'offline', lastMsg: 'Thanks for the Figma critique!', skill: 'UI/UX Design', time: 'Yesterday' }
  ];

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchContact.toLowerCase()) ||
    c.skill.toLowerCase().includes(searchContact.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-64px)] bg-background overflow-hidden transition-colors duration-200">
      
      {/* Sidebar: Contact List (Hidden on mobile if chat is open) */}
      <div className={`
        w-full md:w-80 lg:w-96 border-r border-border flex flex-col bg-card shrink-0 transition-all
        ${showMobileChat ? 'hidden md:flex' : 'flex'}
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Messages</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Active peer discussions</p>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>

        {/* Contact Search Input */}
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search conversations..."
              value={searchContact}
              onChange={(e) => setSearchContact(e.target.value)}
              className="w-full bg-secondary text-sm rounded-xl pl-9 pr-3 py-2 text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-grow overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {filteredContacts.map((contact) => {
            const isSelected = selectedContact?.id === contact.id;
            return (
              <div 
                key={contact.id} 
                onClick={() => {
                  setSelectedContact({ ...contact, avatar: contact.name.split(' ')[0] });
                  setShowMobileChat(true);
                }}
                className={`
                  flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border
                  ${isSelected 
                    ? 'bg-primary/10 border-primary/30 text-foreground' 
                    : 'bg-transparent border-transparent hover:bg-secondary/60 text-foreground'
                  }
                `}
              >
                <div className="relative shrink-0">
                  <Avatar className="h-11 w-11 border border-border">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`} />
                    <AvatarFallback>{contact.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  {contact.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-card rounded-full"></div>
                  )}
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="text-sm font-semibold truncate">{contact.name}</p>
                    <span className="text-[10px] text-muted-foreground shrink-0">{contact.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{contact.lastMsg}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Conversation Pane (Hidden on mobile unless a contact is active) */}
      <div className={`
        flex-col flex-grow bg-background transition-all
        ${showMobileChat ? 'flex' : 'hidden md:flex'}
      `}>
        {/* Chat Header */}
        <div className="p-3 sm:p-4 border-b border-border flex items-center justify-between bg-card">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Mobile Back Button */}
            <button 
              onClick={() => setShowMobileChat(false)}
              className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition"
              aria-label="Back to contacts"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="relative">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedContact?.name || 'User'}`} />
                <AvatarFallback>{selectedContact?.name?.slice(0, 2) || 'U'}</AvatarFallback>
              </Avatar>
              {selectedContact?.status === 'online' && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-card rounded-full"></div>
              )}
            </div>

            <div>
              <p className="text-sm font-bold text-foreground leading-tight">{selectedContact?.name}</p>
              <p className={`text-[11px] ${selectedContact?.status === 'online' ? 'text-emerald-500 font-medium' : 'text-muted-foreground'}`}>
                {selectedContact?.status === 'online' ? 'Active now' : 'Offline'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
             <Button 
              variant="outline" 
              size="sm"
              className="text-foreground border-border hover:bg-secondary gap-1.5 text-xs h-8 rounded-lg"
              onClick={() => toast.success(`Calling ${selectedContact?.name}...`)}
             >
               <Phone className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Audio</span>
             </Button>
             <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 text-xs h-8 rounded-lg font-semibold"
              onClick={() => toast.success(`Starting video call with ${selectedContact?.name}...`)}
             >
               <Video className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Video Call</span>
             </Button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-3.5 custom-scrollbar">
          {messages.map((msg) => {
            const isMe = msg.senderId === user?.id || msg.senderId === 'me';
            return (
              <div 
                key={msg.id} 
                className={`flex items-end gap-2 group ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <Avatar className="h-7 w-7 mb-1 shrink-0 border border-border">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedContact?.name}`} />
                    <AvatarFallback>{selectedContact?.name?.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                )}

                <div className={`max-w-[85%] sm:max-w-[70%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  isMe 
                    ? 'bg-primary text-primary-foreground rounded-br-none' 
                    : 'bg-card text-foreground rounded-bl-none border border-border'
                }`}>
                  <p>{msg.text}</p>
                  <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isMe ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}>
                    <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {isMe && <CheckCheck className="w-3 h-3" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Bar */}
        <div className="p-3 sm:p-4 border-t border-border bg-card">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${selectedContact?.name || 'peer'}...`}
              className="bg-secondary/70 border-border text-foreground text-sm rounded-xl focus-visible:ring-primary h-11"
            />
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 px-4 sm:px-5 rounded-xl font-semibold gap-2 shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
