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
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { UserProfile, CareerPlan } from './types';
import { supabase } from './lib/supabase';
import { saveCareerPlan } from './services/careerService';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<'landing' | 'input' | 'results' | 'dashboard'>('landing');
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
        setCurrentStep('dashboard');
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setCurrentStep('dashboard');
      } else {
        setCurrentStep('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (user) {
      setCurrentStep('input');
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
      
      setCurrentStep('results');
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
    } catch (error) {
      console.error('Error analyzing profile:', error);
      alert('There was an error analyzing your profile. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentStep('landing');
    setCareerPlan(null);
  };

  const handleCreateNew = () => {
    setCurrentStep('input');
    setCareerPlan(null);
    setTimeout(() => {
      document.getElementById('input-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // User state will be updated by the auth listener
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

  if (currentStep === 'dashboard' && user) {
    return (
      <Dashboard 
        user={user} 
        onCreateNew={handleCreateNew}
        onSignOut={handleSignOut}
      />
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
      />
      
      <main>
        <AnimatePresence mode="wait">
          {currentStep === 'landing' && (
            <motion.div
              key="landing"
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
        </AnimatePresence>
        
        {(currentStep === 'input' || currentStep === 'results') && (
          <div className="pt-16">
            <div id="input-section">
              <InputSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            </div>
            
            {currentStep === 'results' && careerPlan && (
              <motion.div
                id="results-section"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <ResultsSection 
                  careerPlan={careerPlan} 
                  onTryAnother={handleCreateNew}
                  user={user}
                  onSavePlan={() => setShowAuthModal(true)}
                />
              </motion.div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;