'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext';
import { IoSend, IoArrowBack } from 'react-icons/io5';
import { useRouter, usePathname } from 'next/navigation';
import { FiUser } from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface SuggestedMessage {
  title: string;
  subtitle: string;
}

const suggestedMessages: SuggestedMessage[] = [
  {
    title: 'Tell me about',
    subtitle: 'your packages'
  },
  {
    title: 'What services',
    subtitle: 'do you offer?'
  },
  {
    title: 'Tell me about',
    subtitle: 'Unnati package'
  },
  {
    title: 'Tell me about',
    subtitle: 'Shuruwat package'
  }
];

export default function AiChat() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const shouldRefresh = localStorage.getItem('refreshAiChat');
    if (shouldRefresh === 'true') {
      localStorage.removeItem('refreshAiChat');
      router.refresh();
    }
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [router]);

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' } as Message]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedMessage = (message: SuggestedMessage) => {
    setInput(`${message.title} ${message.subtitle}`);
  };

  if (isPageLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
          <p className="text-white/60 text-sm">Loading AI Chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-black">
      {/* Header */}
      <div className="flex-none bg-black/80 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 h-[70px] flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <IoArrowBack className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400/10">
              <RiRobot2Line className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-white font-medium">3rdshade AI</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-4 sm:p-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)]">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg"></div>
                  <div className={`${isMobile ? 'w-12 h-12' : 'w-14 h-14'} bg-black flex items-center justify-center rounded-full border-2 border-blue-400/50 relative z-10`}>
                    <RiRobot2Line className={`${isMobile ? 'w-6 h-6' : 'w-7 h-7'} text-blue-400`} />
                  </div>
                </div>
              </div>
              <p className="text-white/80 text-center mb-4 max-w-2xl text-sm sm:text-base">
                Welcome to 3rdshade AI Assistant! I'm here to help you with information about our digital technology services, including our Unnati and Shuruwat packages, along with our comprehensive service offerings.
              </p>
              <p className="text-white/60 text-center mb-8 sm:mb-12 text-sm">
                How can I assist you today?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
                {suggestedMessages.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedMessage(msg)}
                    className="p-4 rounded-lg border border-white/10 hover:border-blue-400/50 hover:bg-blue-400/5 transition-all duration-200 text-left group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <p className="text-white group-hover:text-blue-400 transition-colors text-sm sm:text-base relative z-10">{msg.title}</p>
                    <p className="text-white/60 text-xs sm:text-sm relative z-10">{msg.subtitle}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 pb-20">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`${isMobile ? 'w-12 h-12' : 'w-12 h-12'} shrink-0 flex items-center justify-center rounded-full relative ${
                      message.role === 'user' 
                        ? 'bg-white/10 text-white' 
                        : 'bg-blue-400/10 text-blue-400 border border-blue-400/20'
                    }`}>
                      {message.role === 'user' ? (
                        <FiUser className="w-6 h-6" />
                      ) : (
                        <RiRobot2Line className="w-6 h-6" />
                      )}
                      {message.role === 'assistant' && (
                        <div className="absolute inset-0 bg-blue-400/5 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-grow pt-2">
                      <p className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-blue-400/60 flex items-center gap-2"
                >
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <span className="text-sm text-white/40">AI is thinking...</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      <div className="flex-none bg-black/80 backdrop-blur-sm border-t border-white/10 p-3 sm:p-4">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
            className="flex-grow bg-white/10 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-sm sm:text-base placeholder-white/40"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 text-white/60 hover:text-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white/10 rounded-lg hover:bg-blue-400/10"
          >
            <IoSend className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
