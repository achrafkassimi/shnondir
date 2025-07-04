import React from 'react';
import { Sparkles, Menu, X, User, LogOut, Home, BookOpen, Users, MessageSquare, ExternalLink, LogIn, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  user?: any;
  onSignOut: () => void;
  onAuthClick: () => void;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  user, 
  onSignOut, 
  onAuthClick,
  currentPage = 'home',
  onNavigate = () => {}
}) => {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Users },
    { id: 'blog', label: 'Blog', icon: BookOpen }
  ];

  const handleNavigation = (pageId: string) => {
    onNavigate(pageId);
    setIsMenuOpen(false);
  };

  const handleDashboardClick = () => {
    // Open dashboard in new tab to preserve current session
    const dashboardUrl = `${window.location.origin}/?page=dashboard`;
    window.open(dashboardUrl, '_blank');
    setIsMenuOpen(false);
  };

  const handleAdminClick = () => {
    // Open admin dashboard in new tab
    const adminUrl = `${window.location.origin}/?page=admin`;
    window.open(adminUrl, '_blank');
    setIsMenuOpen(false);
  };

  // Check if user is admin
  const isAdmin = user?.user_metadata?.role === 'admin' || user?.email === 'admin@careerspark.com';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text">CareerSpark</h1>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === item.id
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
            
            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <button
                    onClick={handleAdminClick}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50 group"
                    title="Open Admin Dashboard in new tab"
                  >
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">Admin</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}
                <button
                  onClick={handleDashboardClick}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 group"
                  title="Open Dashboard in new tab"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">Dashboard</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button 
                  onClick={onSignOut}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={onAuthClick} 
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="text-sm font-medium">Sign In</span>
                </button>
                <button onClick={onAuthClick} className="btn-primary">
                  Get Started
                </button>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center space-x-3 w-full px-3 py-3 rounded-lg transition-all duration-200 ${
                    currentPage === item.id
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              
              {/* Mobile User Menu */}
              {user ? (
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  {isAdmin && (
                    <button
                      onClick={handleAdminClick}
                      className="flex items-center space-x-3 w-full px-3 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors rounded-lg group"
                    >
                      <Shield className="h-5 w-5" />
                      <span className="font-medium">Admin Dashboard</span>
                      <ExternalLink className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  )}
                  <button
                    onClick={handleDashboardClick}
                    className="flex items-center space-x-3 w-full px-3 py-3 text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors rounded-lg group"
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">Dashboard</span>
                    <ExternalLink className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button 
                    onClick={onSignOut}
                    className="flex items-center space-x-3 w-full px-3 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors rounded-lg"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <button 
                    onClick={onAuthClick}
                    className="flex items-center space-x-3 w-full px-3 py-3 text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <LogIn className="h-5 w-5" />
                    <span className="font-medium">Sign In</span>
                  </button>
                  <button onClick={onAuthClick} className="btn-primary w-full">
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;