import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, RefreshCw, MessageSquare, ChevronDown } from 'lucide-react';
import { ChatMessage } from '../types/produce';
import { sendSommelierChat } from '../api/client';

interface FreshBotWidgetProps {
  contextProduce?: string;
  embedded?: boolean;
}

export const FreshBotWidget: React.FC<FreshBotWidgetProps> = ({ contextProduce, embedded = false }) => {
  const [isOpen, setIsOpen] = useState(embedded);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: contextProduce 
        ? `👋 Hi! I'm FreshBot, your produce sommelier. Ask me anything about selecting, ripeness testing, or cooking **${contextProduce}**!`
        : `👋 Hi! I'm FreshBot, your in-store AI Produce Sommelier. Standing in the grocery aisle? Ask me how to pick the best produce today!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      const aiReply = await sendSommelierChat(newHistory, contextProduce);
      setMessages((prev) => [...prev, aiReply]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'ai',
          text: '⚠️ I had trouble connecting to the Gemini engine. Tip: Look for firmness at the stem end and vivid uniform color!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = contextProduce 
    ? [
        `How do I store ${contextProduce} to last longer?`,
        `How to tell if this ${contextProduce} is overripe?`,
        `Best alternative for ${contextProduce}?`
      ]
    : [
        'How to pick a sweet ripe melon?',
        'Which tomato variety is best for marinara?',
        'How to store bell peppers so they stay crisp?'
      ];

  const content = (
    <div className={`flex flex-col h-full bg-slate-900 border border-slate-800 ${embedded ? 'rounded-xl overflow-hidden shadow-xl' : 'rounded-2xl shadow-2xl overflow-hidden'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-lime-950 via-slate-900 to-emerald-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500/20 border border-lime-500/40 flex items-center justify-center text-lime-400">
            <Bot className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              FreshBot Sommelier
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h3>
            <p className="text-[10px] text-slate-400">AI In-Store Produce Advisor</p>
          </div>
        </div>
        {!embedded && (
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[250px] max-h-[400px]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'ai' && (
              <div className="w-6 h-6 rounded-md bg-lime-500/20 text-lime-400 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-lime-600 to-emerald-600 text-slate-950 font-medium'
                  : 'bg-slate-800/90 text-slate-200 border border-slate-700/60'
              }`}
            >
              <div className="whitespace-pre-line">{m.text}</div>
              <div className={`text-[9px] mt-1 text-right ${m.sender === 'user' ? 'text-slate-900/70' : 'text-slate-500'}`}>
                {m.timestamp}
              </div>
            </div>
            {m.sender === 'user' && (
              <div className="w-6 h-6 rounded-md bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-lime-400/80 bg-slate-800/40 p-2.5 rounded-lg w-fit">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>FreshBot is analyzing produce agronomics...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick suggestions */}
      <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            onClick={() => { setInput(q); }}
            className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-lime-300 hover:bg-slate-700 transition-colors shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input box */}
      <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask FreshBot produce questions..."
          className="flex-1 bg-slate-950 border border-slate-800 focus:border-lime-500/80 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2 rounded-lg bg-lime-500 text-slate-950 hover:bg-lime-400 disabled:opacity-50 transition-colors font-bold"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-lime-600 to-emerald-600 text-slate-950 font-bold text-xs shadow-glow-lime hover:scale-105 transition-all duration-200"
        >
          <Bot className="w-5 h-5" />
          <span>Ask FreshBot AI</span>
          <span className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping"></span>
        </button>
      )}

      {/* Floating Modal Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md">
          {content}
        </div>
      )}
    </>
  );
};
