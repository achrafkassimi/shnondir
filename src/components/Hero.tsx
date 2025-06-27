import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mic, MessageSquare, Sparkles } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span className="text-white text-sm font-medium">AI-Powered Career Guidance</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Career Path
            </span>
          </h1>
          
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Feeling lost about your career? Our AI-powered assistant analyzes your background, 
            interests, and goals to provide personalized recommendations and learning plans.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="flex items-center space-x-2 bg-white text-gray-800 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-xl"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
            
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-2">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <Mic className="h-5 w-5" />
                </div>
                <span className="text-sm">Voice Input</span>
              </div>
              <div className="w-px h-6 bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="text-sm">Text Input</span>
              </div>
            </div>
          </div>
          
          <div className="pt-12">
            <p className="text-gray-300 text-sm mb-4">Trusted by thousands of students and professionals</p>
            <div className="flex justify-center items-center space-x-8 opacity-70">
              <div className="text-white text-xs">🎓 Students</div>
              <div className="text-white text-xs">💼 Professionals</div>
              <div className="text-white text-xs">🚀 Career Changers</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;