import React from 'react';
import { Sparkles, Menu, X, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  user?: any;
  onSignOut: () => void;
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  user, 
  onSignOut, 
  onAuthClick 
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text">CareerSpark</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition-colors">How it Works</a>
            <a href="#about" className="text-gray-600 hover:text-primary-600 transition-colors">About</a>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user.user_metadata?.name || user.email}</span>
                </div>
                <button 
                  onClick={onSignOut}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            ) : (
              <button onClick={onAuthClick} className="btn-primary">
                Get Started
              </button>
            )}
          </nav>
          
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-primary-600 transition-colors">Features</a>
              <a href="#how-it-works" className="block text-gray-600 hover:text-primary-600 transition-colors">How it Works</a>
              <a href="#about" className="block text-gray-600 hover:text-primary-600 transition-colors">About</a>
              
              {user ? (
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{user.user_metadata?.name || user.email}</span>
                  </div>
                  <button 
                    onClick={onSignOut}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              ) : (
                <button onClick={onAuthClick} className="btn-primary w-full">
                  Get Started
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;