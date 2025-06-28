import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import AnalyticsSection from './components/AnalyticsSection';
import InputSection from './components/InputSection';
import ResultsSection from './components/ResultsSection';
import Dashboard from './components/Dashboard';
import UserHome from './components/UserHome';
import About from './components/About';
import Blog from './components/Blog';
import AuthModal from './components/AuthModal';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import { UserProfile, CareerPlan } from './types';
import { supabase } from './lib/supabase';
import { saveCareerPlan } from './services/careerService';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'blog' | 'input' | 'results' | 'dashboard' | 'user-home'>('home');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [careerPlan, setCareerPlan] = useState<CareerPlan | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setCurrentPage('user-home');
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setCurrentPage('user-home');
      } else {
        setCurrentPage('home');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (user) {
      setCurrentPage('input');
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAnalyze = async (profile: UserProfile) => {
    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (user) {
        // Save to database if user is logged in
        const savedPlan = await saveCareerPlan(user.id, profile);
        setCareerPlan(savedPlan);
      } else {
        // Generate mock data for guest users
        const { 
          generateMockCareerRecommendations, 
          generateMockSkillRecommendations, 
          generateMockLearningPlan 
        } = await import('./services/mockData');
        
        const careerRecommendations = generateMockCareerRecommendations(profile.interests);
        const skillRecommendations = generateMockSkillRecommendations();
        const learningPlan = generateMockLearningPlan();
        
        const newCareerPlan: CareerPlan = {
          userProfile: profile,
          careerRecommendations,
          skillRecommendations,
          learningPlan,
          createdAt: new Date().toISOString()
        };
        
        setCareerPlan(newCareerPlan);
      }
      
      setCurrentPage('results');
    } catch (error) {
      console.error('Error analyzing profile:', error);
      alert('There was an error analyzing your profile. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentPage('home');
    setCareerPlan(null);
  };

  const handleCreateNew = () => {
    setCurrentPage('input');
    setCareerPlan(null);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // User state will be updated by the auth listener
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page as any);
    setIsMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CareerSpark...</p>
        </div>
      </div>
    );
  }

  // Dashboard view for authenticated users
  if (currentPage === 'dashboard' && user) {
    return (
      <>
        <Dashboard 
          user={user} 
          onCreateNew={handleCreateNew}
          onSignOut={handleSignOut}
        />
        <Chatbot user={user} />
      </>
    );
  }

  // User home view for authenticated users
  if (currentPage === 'user-home' && user) {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen}
          user={user}
          onSignOut={handleSignOut}
          onAuthClick={() => setShowAuthModal(true)}
          currentPage={currentPage}
          onNavigate={handleNavigation}
        />
        <div className="pt-16">
          <UserHome 
            user={user}
            onCreateNew={handleCreateNew}
            onViewDashboard={() => setCurrentPage('dashboard')}
          />
        </div>
        <Footer />
        <Chatbot user={user} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        user={user}
        onSignOut={handleSignOut}
        onAuthClick={() => setShowAuthModal(true)}
        currentPage={currentPage}
        onNavigate={handleNavigation}
      />
      
      <main>
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onGetStarted={handleGetStarted} />
              <Features />
              <HowItWorks />
              <AnalyticsSection />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-16"
            >
              <About />
            </motion.div>
          )}

          {currentPage === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-16"
            >
              <Blog />
            </motion.div>
          )}

          {currentPage === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-16"
            >
              <InputSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            </motion.div>
          )}

          {currentPage === 'results' && careerPlan && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="pt-16"
            >
              <ResultsSection 
                careerPlan={careerPlan} 
                onTryAnother={handleCreateNew}
                user={user}
                onSavePlan={() => setShowAuthModal(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
      
      <Chatbot user={user} />
    </div>
  );
}

export default App;