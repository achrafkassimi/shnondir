import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, MessageSquare, Send, Loader2 } from 'lucide-react';
import { UserProfile } from '../types';

interface InputSectionProps {
  onAnalyze: (profile: UserProfile) => void;
  isAnalyzing: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isAnalyzing }) => {
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    educationLevel: '',
    interests: '',
    experience: '',
    goals: ''
  });

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      // Stop recording logic here
    } else {
      setIsRecording(true);
      // Start recording logic here
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profile: UserProfile = {
      name: formData.name,
      educationLevel: formData.educationLevel,
      interests: formData.interests.split(',').map(i => i.trim()),
      experience: formData.experience,
      goals: formData.goals
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
                <Mic className="h-5 w-5" />
                <span>Voice Input</span>
              </button>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {inputMode === 'voice' ? (
              <motion.div
                key="voice"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-center py-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVoiceToggle}
                  className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200'
                      : 'bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-200'
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="h-12 w-12 text-white" />
                  ) : (
                    <Mic className="h-12 w-12 text-white" />
                  )}
                </motion.button>
                
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {isRecording ? 'Recording...' : 'Ready to Listen'}
                  </h3>
                  <p className="text-gray-600">
                    {isRecording 
                      ? 'Tell us about your education, interests, experience, and career goals'
                      : 'Click the microphone to start recording your career story'
                    }
                  </p>
                  
                  {isRecording && (
                    <div className="flex justify-center mt-4">
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-8 bg-primary-500 rounded-full"
                            animate={{
                              scaleY: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 text-sm text-gray-500">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="font-medium text-blue-800 mb-2">Voice Input Integration Note:</p>
                    <p className="text-blue-700">
                      To enable voice recording, you'll need to set up the ElevenLabs API. 
                      The interface is ready - just add your API credentials!
                    </p>
                  </div>
                </div>
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