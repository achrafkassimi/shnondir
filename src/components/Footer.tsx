import React from 'react';
import { Sparkles, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">CareerSpark</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering students and professionals to discover their perfect career path 
              through AI-powered guidance and personalized recommendations.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>using</span>
              <a 
                href="https://bolt.new" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center space-x-1"
              >
                <span>Bolt.new</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNavigation('home')} className="text-gray-400 hover:text-white transition-colors">Features</button></li>
              <li><button onClick={() => handleNavigation('about')} className="text-gray-400 hover:text-white transition-colors">About</button></li>
              <li><button onClick={() => handleNavigation('blog')} className="text-gray-400 hover:text-white transition-colors">Blog</button></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNavigation('terms')} className="text-gray-400 hover:text-white transition-colors">Terms of Service</button></li>
              <li><button onClick={() => handleNavigation('privacy')} className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => handleNavigation('cookies')} className="text-gray-400 hover:text-white transition-colors">Cookie Policy</button></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 CareerSpark. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button onClick={() => handleNavigation('terms')} className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </button>
              <button onClick={() => handleNavigation('privacy')} className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </button>
              <button onClick={() => handleNavigation('cookies')} className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </button>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">🚀 Try CareerSpark Now</h4>
            <p className="text-gray-400 text-sm mb-3">
              Experience the power of AI-driven career guidance. Get personalized recommendations in minutes!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => handleNavigation('input')}
                className="inline-flex items-center justify-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors text-sm"
              >
                Start Assessment
              </button>
              <a 
                href="#video" 
                className="inline-flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
              >
                📹 Video Walkthrough
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;