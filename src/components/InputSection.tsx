import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Loader2, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';
import VoiceInput from './VoiceInput';
import { isVoiceEnabled } from '../services/voiceService';

interface InputSectionProps {
  onAnalyze: (profile: UserProfile) => void;
  isAnalyzing: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isAnalyzing }) => {
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const [formData, setFormData] = useState({
    name: '',
    educationLevel: '',
    interests: '',
    experience: '',
    goals: ''
  });
  const [voiceTranscript, setVoiceTranscript] = useState('');

  // Always show voice option, but indicate if setup is needed
  const voiceAvailable = isVoiceEnabled();

  const handleVoiceTranscript = (transcript: string) => {
    setVoiceTranscript(transcript);
    
    // Auto-parse voice input into form fields
    parseVoiceInput(transcript);
  };

  const parseVoiceInput = (transcript: string) => {
    // Simple parsing logic - in production, this would use more sophisticated NLP
    const lowerTranscript = transcript.toLowerCase();
    
    // Extract name if mentioned
    const nameMatch = lowerTranscript.match(/my name is (\w+)|i'm (\w+)|i am (\w+)/);
    if (nameMatch) {
      const name = nameMatch[1] || nameMatch[2] || nameMatch[3];
      setFormData(prev => ({ ...prev, name: name.charAt(0).toUpperCase() + name.slice(1) }));
    }
    
    // Extract education level
    if (lowerTranscript.includes('bachelor') || lowerTranscript.includes('university')) {
      setFormData(prev => ({ ...prev, educationLevel: 'bachelor' }));
    } else if (lowerTranscript.includes('master')) {
      setFormData(prev => ({ ...prev, educationLevel: 'master' }));
    } else if (lowerTranscript.includes('high school')) {
      setFormData(prev => ({ ...prev, educationLevel: 'high-school' }));
    }
    
    // Extract interests
    const interestKeywords = ['interested in', 'passionate about', 'love', 'enjoy', 'like'];
    for (const keyword of interestKeywords) {
      if (lowerTranscript.includes(keyword)) {
        const afterKeyword = lowerTranscript.split(keyword)[1];
        if (afterKeyword) {
          const interests = afterKeyword.split(/[,.]/).slice(0, 3).join(', ').trim();
          setFormData(prev => ({ ...prev, interests }));
          break;
        }
      }
    }
    
    // Set the full transcript as experience/goals
    setFormData(prev => ({ 
      ...prev, 
      experience: transcript,
      goals: transcript 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profile: UserProfile = {
      name: formData.name,
      educationLevel: formData.educationLevel,
      interests: formData.interests.split(',').map(i => i.trim()).filter(Boolean),
      experience: formData.experience,
      goals: formData.goals
    };
    
    onAnalyze(profile);
  };

  const handleVoiceSubmit = () => {
    if (!voiceTranscript.trim()) return;
    
    const profile: UserProfile = {
      name: formData.name || 'User',
      educationLevel: formData.educationLevel || 'bachelor',
      interests: formData.interests ? formData.interests.split(',').map(i => i.trim()) : ['technology'],
      experience: voiceTranscript,
      goals: voiceTranscript
    };
    
    onAnalyze(profile);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            Tell Us About Yourself
          </h2>
          <p className="text-gray-600 text-lg">
            Share your background and we'll create a personalized career roadmap for you
          </p>
        </motion.div>
        
        <div className="card p-8">
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setInputMode('text')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  inputMode === 'text'
                    ? 'bg-white shadow-sm text-primary-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <MessageSquare className="h-5 w-5" />
                <span>Text Input</span>
              </button>
              <button
                onClick={() => setInputMode('voice')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  inputMode === 'voice'
                    ? 'bg-white shadow-sm text-primary-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <span>🎤 Voice Input</span>
                {!voiceAvailable && (
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    Setup Required
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Voice Setup Notice */}
          {inputMode === 'voice' && !voiceAvailable && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-blue-800 font-medium text-sm">🎤 Voice Input Setup</h3>
                  <p className="text-blue-700 text-sm mt-1">
                    To enable voice features, add your ElevenLabs API key to the environment variables. 
                    <br />
                    <strong>Steps:</strong>
                  </p>
                  <ol className="text-blue-700 text-sm mt-2 ml-4 list-decimal">
                    <li>Get your API key from <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="underline">ElevenLabs.io</a></li>
                    <li>Add <code className="bg-blue-100 px-1 rounded">VITE_ELEVENLABS_API_KEY=your_key</code> to your .env file</li>
                    <li>Restart the development server</li>
                  </ol>
                  <p className="text-blue-700 text-sm mt-2">
                    For now, you can use the text input below.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <AnimatePresence mode="wait">
            {inputMode === 'voice' ? (
              <motion.div
                key="voice"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-center py-12"
              >
                {voiceAvailable ? (
                  <>
                    <VoiceInput
                      onTranscript={handleVoiceTranscript}
                      placeholder="Click to tell us about your career goals"
                      className="mb-8"
                    />
                    
                    {voiceTranscript && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8"
                      >
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                          <h3 className="font-semibold text-blue-800 mb-2">What we heard:</h3>
                          <p className="text-blue-700">{voiceTranscript}</p>
                        </div>
                        
                        {/* Auto-parsed fields preview */}
                        {(formData.name || formData.educationLevel || formData.interests) && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                            <h3 className="font-semibold text-green-800 mb-3">Auto-detected information:</h3>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              {formData.name && (
                                <div>
                                  <span className="font-medium text-green-700">Name:</span>
                                  <p className="text-green-600">{formData.name}</p>
                                </div>
                              )}
                              {formData.educationLevel && (
                                <div>
                                  <span className="font-medium text-green-700">Education:</span>
                                  <p className="text-green-600">{formData.educationLevel}</p>
                                </div>
                              )}
                              {formData.interests && (
                                <div>
                                  <span className="font-medium text-green-700">Interests:</span>
                                  <p className="text-green-600">{formData.interests}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleVoiceSubmit}
                          disabled={isAnalyzing}
                          className="btn-primary flex items-center justify-center space-x-2 py-4 px-8"
                        >
                          {isAnalyzing ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" />
                              <span>Analyzing Your Profile...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5" />
                              <span>Get My Career Recommendations</span>
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 p-8 rounded-xl mb-6">
                      <div className="text-6xl mb-4">🎤</div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Voice Input Setup Required</h3>
                      <p className="text-gray-600">
                        Configure your ElevenLabs API key to enable voice features
                      </p>
                    </div>
                    <button
                      onClick={() => setInputMode('text')}
                      className="btn-primary"
                    >
                      Use Text Input Instead
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.form
                key="text"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Education Level
                    </label>
                    <select
                      value={formData.educationLevel}
                      onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                      className="input-field"
                      required
                    >
                      <option value="">Select your education level</option>
                      <option value="high-school">High School</option>
                      <option value="associate">Associate Degree</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                      <option value="phd">PhD</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interests & Passions
                  </label>
                  <input
                    type="text"
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    className="input-field"
                    placeholder="e.g., technology, design, healthcare, education (separate with commas)"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Experience
                  </label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="input-field resize-none"
                    rows={4}
                    placeholder="Tell us about your work experience, internships, projects, or relevant activities..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Career Goals
                  </label>
                  <textarea
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    className="input-field resize-none"
                    rows={4}
                    placeholder="What do you want to achieve in your career? What kind of work environment do you prefer?"
                    required
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full btn-primary flex items-center justify-center space-x-2 py-4"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Analyzing Your Profile...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Get My Career Recommendations</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default InputSection;