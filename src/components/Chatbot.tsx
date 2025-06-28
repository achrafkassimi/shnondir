import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Loader2,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import VoiceInput from './VoiceInput';
import { textToSpeech, playAudio, isVoiceEnabled } from '../services/voiceService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: any;
}

interface ChatbotProps {
  user?: any;
}

const Chatbot: React.FC<ChatbotProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      // Add welcome message when chat opens
      if (messages.length === 0) {
        const welcomeMessage: Message = {
          id: 'welcome',
          role: 'assistant',
          content: `Hello! 👋 I'm your AI career assistant at CareerSpark. I'm here to help you navigate your career journey!\n\nI can help you with:\n• 🎯 Career exploration and planning\n• 📚 Skill development recommendations\n• 💼 Job search strategies\n• 🎓 Education decisions\n• 📝 CV and interview tips\n\nWhat would you like to explore today?`,
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
        
        // Auto-speak welcome message if voice is enabled
        if (voiceEnabled && isVoiceEnabled()) {
          speakMessage(welcomeMessage.content);
        }
      }
      
      // Focus input
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const speakMessage = async (text: string) => {
    if (!voiceEnabled || !isVoiceEnabled() || isPlaying) return;

    setIsPlaying(true);
    try {
      const result = await textToSpeech(text);
      if (result.success && result.audioData) {
        await playAudio(result.audioData, result.mimeType);
      }
    } catch (error) {
      console.error('Speech synthesis error:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Try to use the backend chatbot function first
      let response;
      try {
        response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chatbot`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: textToSend,
            conversationId,
            userId: user?.id
          }),
        });

        if (!response.ok) throw new Error('Backend unavailable');

        const data = await response.json();
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
          metadata: data.metadata
        };

        setMessages(prev => [...prev, assistantMessage]);
        setConversationId(data.conversationId);

        // Auto-speak response if voice is enabled
        if (voiceEnabled && isVoiceEnabled()) {
          speakMessage(data.response);
        }
      } catch (backendError) {
        console.log('Backend unavailable, using fallback responses');
        
        // Fallback to local AI responses
        const fallbackResponse = generateFallbackResponse(textToSend);
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: fallbackResponse,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);

        // Auto-speak response if voice is enabled
        if (voiceEnabled && isVoiceEnabled()) {
          speakMessage(fallbackResponse);
        }
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. However, I can still help you! Try asking me about career paths, skills to learn, or how to get started with CareerSpark's features.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Career planning responses
    if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('work')) {
      return "Great question about careers! 🎯 CareerSpark can help you discover your perfect career path. Here's what I recommend:\n\n• **Take our assessment** - Click 'Start Your Journey' to get personalized recommendations\n• **Explore trending careers** - Software development, data science, and UX design are in high demand\n• **Consider your interests** - What activities make you lose track of time?\n\nWhat specific career area interests you most?";
    }
    
    // Skills and learning
    if (lowerMessage.includes('skill') || lowerMessage.includes('learn') || lowerMessage.includes('study')) {
      return "Excellent! Continuous learning is key to career success. 📚 Here are some high-demand skills:\n\n**Tech Skills:**\n• JavaScript & Python programming\n• Data analysis & visualization\n• Digital marketing & SEO\n\n**Soft Skills:**\n• Communication & leadership\n• Problem-solving\n• Project management\n\nWhich area would you like to focus on? I can suggest specific learning resources!";
    }
    
    // Getting started
    if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('how')) {
      return "Perfect! Let's get you started on your career journey! 🚀\n\n**Here's how CareerSpark works:**\n1. **Share your background** - Tell us about your education and interests\n2. **Get AI recommendations** - Receive 2-3 personalized career paths\n3. **Follow your plan** - Get a 4-week learning roadmap\n4. **Track progress** - Use our dashboard to stay motivated\n\nReady to begin? Click 'Start Your Journey' or tell me about your background right here!";
    }
    
    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 Welcome to CareerSpark! I'm your AI career assistant, and I'm excited to help you discover your perfect career path.\n\n**I can help you with:**\n• Finding careers that match your interests\n• Creating personalized learning plans\n• Skill development recommendations\n• Job search strategies\n• CV and interview preparation\n\nWhat brings you here today? Are you exploring career options, looking to change careers, or wanting to develop new skills?";
    }
    
    // CV and resume help
    if (lowerMessage.includes('cv') || lowerMessage.includes('resume') || lowerMessage.includes('interview')) {
      return "Great question about CVs and interviews! 📄 Here's how I can help:\n\n**CV Tips:**\n• Tailor your CV to each job application\n• Highlight relevant skills and achievements\n• Use action verbs and quantify results\n• Keep it concise (1-2 pages max)\n\n**Interview Prep:**\n• Research the company and role\n• Prepare STAR method examples\n• Practice common questions\n• Prepare thoughtful questions to ask\n\nWould you like specific advice for a particular career field?";
    }
    
    // Default helpful response
    return "Thanks for reaching out! 😊 I'm here to help with your career journey. While I might not have a specific answer to that question, I can definitely assist you with:\n\n🎯 **Career Exploration** - Discover paths that match your interests\n📚 **Skill Development** - Learn what skills to focus on\n💼 **Job Search Help** - Tips for applications and interviews\n🎓 **Education Guidance** - Whether to pursue further studies\n\nWhat specific aspect of your career would you like to explore? Or feel free to take our quick assessment to get personalized recommendations!";
  };

  const handleVoiceTranscript = (transcript: string) => {
    setInputMessage(transcript);
    // Auto-send voice messages
    setTimeout(() => sendMessage(transcript), 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (content: string) => {
    // Convert markdown-like formatting to JSX
    return content.split('\n').map((line, index) => {
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <div key={index} className="flex items-start space-x-2 my-1">
            <span className="text-primary-500 mt-1">•</span>
            <span>{line.substring(2)}</span>
          </div>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <div key={index} className="font-semibold my-1">
            {line.substring(2, line.length - 2)}
          </div>
        );
      }
      return line ? <div key={index} className="my-1">{line}</div> : <br key={index} />;
    });
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        height: isMinimized ? 'auto' : '600px'
      }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col ${
        isMinimized ? 'w-80' : 'w-96 h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-full">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Career Assistant</h3>
            <p className="text-xs text-gray-600 flex items-center space-x-2">
              <span>Always here to help</span>
              {isVoiceEnabled() && (
                <span className="flex items-center space-x-1">
                  <span>•</span>
                  <span>🎤 Voice enabled</span>
                </span>
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isVoiceEnabled() && (
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-1 rounded-full transition-colors ${
                voiceEnabled ? 'text-primary-600 hover:bg-primary-50' : 'text-gray-400 hover:bg-gray-100'
              }`}
              title={voiceEnabled ? 'Disable voice responses' : 'Enable voice responses'}
            >
              {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          )}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`p-2 rounded-full flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-primary-500' 
                        : 'bg-gradient-to-r from-secondary-100 to-primary-100'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-primary-600" />
                      )}
                    </div>
                    
                    <div className={`p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-50 text-gray-800'
                    }`}>
                      <div className="text-sm">
                        {message.role === 'assistant' ? formatMessage(message.content) : message.content}
                      </div>
                      <div className={`text-xs mt-1 flex items-center justify-between ${
                        message.role === 'user' ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        <span>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.role === 'assistant' && isVoiceEnabled() && (
                          <button
                            onClick={() => speakMessage(message.content)}
                            disabled={isPlaying}
                            className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Play audio"
                          >
                            <Volume2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-secondary-100 to-primary-100 p-2 rounded-full">
                    <Bot className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary-500" />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Voice Input Section */}
          {showVoiceInput && isVoiceEnabled() && (
            <div className="px-4 py-2 border-t border-gray-100">
              <VoiceInput
                onTranscript={handleVoiceTranscript}
                placeholder="Speak your question..."
                className="w-full"
              />
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about your career..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  disabled={isLoading}
                />
                {isVoiceEnabled() && (
                  <button
                    onClick={() => setShowVoiceInput(!showVoiceInput)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                      showVoiceInput 
                        ? 'text-primary-500 bg-primary-50' 
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                    }`}
                    title="Toggle voice input"
                  >
                    🎤
                  </button>
                )}
              </div>
              
              <button
                onClick={() => sendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-3 rounded-xl hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            
            <div className="mt-2 text-xs text-gray-500 text-center">
              💡 Try asking: "What career should I choose?" or "Help me plan my learning"
              {isVoiceEnabled() && <span> • 🎤 Voice input available</span>}
            </div>
          </div>
        </>
      )}

      {isMinimized && (
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {messages.length > 1 ? `${messages.length - 1} messages` : 'Ready to chat'}
            </span>
            <div className="flex items-center space-x-2">
              {isLoading && <Loader2 className="h-4 w-4 animate-spin text-primary-500" />}
              {isPlaying && <Volume2 className="h-4 w-4 text-purple-500" />}
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Chatbot;