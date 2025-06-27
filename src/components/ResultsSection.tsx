import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  Download, 
  Star, 
  Clock, 
  DollarSign,
  Play,
  User,
  RefreshCw,
  Save,
  Mail,
  FileText
} from 'lucide-react';
import { CareerPlan } from '../types';

interface ResultsSectionProps {
  careerPlan: CareerPlan;
  onTryAnother: () => void;
  user?: any;
  onSavePlan: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  careerPlan, 
  onTryAnother, 
  user, 
  onSavePlan 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const handleDownloadCV = () => {
    alert('CV template download will be implemented with the backend integration!');
  };

  const handleEmailPlan = () => {
    const subject = encodeURIComponent('My CareerSpark Career Plan');
    const body = encodeURIComponent(`
Hi there!

I just created my personalized career plan with CareerSpark. Here are my recommended career paths:

${careerPlan.careerRecommendations.map((career, index) => 
  `${index + 1}. ${career.title} (${career.matchPercentage}% match)
     ${career.description}
     Salary: ${career.averageSalary}
     Growth: ${career.growthRate}
`).join('\n')}

Check out CareerSpark at: ${window.location.origin}

Best regards,
${careerPlan.userProfile.name}
    `);
    
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleDownloadPDF = () => {
    // This would integrate with a PDF generation service
    alert('PDF download feature will be implemented with backend integration!');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            Your Personalized Career Plan
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            You've got this! Here's your customized roadmap to career success, {careerPlan.userProfile.name}
          </p>
          
          {!user && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-blue-800 text-sm">
                💡 <strong>Save your plan:</strong> Create a free account to save this plan, track your progress, and generate new ones anytime!
              </p>
              <button 
                onClick={onSavePlan}
                className="mt-2 btn-primary text-sm"
              >
                <Save className="h-4 w-4 mr-1" />
                Save This Plan
              </button>
            </div>
          )}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Video Assistant Section */}
          <motion.div variants={itemVariants} className="card p-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-primary-100 to-secondary-100 p-4 rounded-full">
                <User className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Meet Your AI Career Coach
            </h3>
            <p className="text-gray-600 mb-6">
              Watch your personalized video explanation of your career plan
            </p>
            
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl aspect-video flex items-center justify-center mb-6 relative overflow-hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-500 hover:bg-primary-600 text-white p-6 rounded-full shadow-lg transition-all duration-200 z-10"
              >
                <Play className="h-12 w-12" />
              </motion.button>
              
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10"></div>
              <div className="absolute top-4 left-4 w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="absolute top-4 left-10 w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="absolute top-4 left-16 w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="font-medium text-blue-800 mb-2">🎥 Tavus Integration Ready!</p>
              <p className="text-blue-700 text-sm">
                Connect your Tavus API to enable personalized video coaching for each user's career plan.
              </p>
            </div>
          </motion.div>

          {/* Career Recommendations */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 text-primary-500 mr-2" />
              Your Perfect Career Matches
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerPlan.careerRecommendations.map((career, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="card p-6 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                      {career.title}
                    </h4>
                    <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      <Star className="h-4 w-4 mr-1" />
                      {career.matchPercentage}%
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {career.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                      <span>{career.averageSalary}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                      <span>{career.growthRate} growth</span>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Key Skills:</h5>
                    <div className="flex flex-wrap gap-1">
                      {career.requiredSkills.slice(0, 3).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {career.requiredSkills.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{career.requiredSkills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Recommendations */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BookOpen className="h-6 w-6 text-secondary-500 mr-2" />
              Skills to Master Next
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerPlan.skillRecommendations.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="card p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-800">{skill.skill}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      skill.importance === 'High' 
                        ? 'bg-red-100 text-red-800'
                        : skill.importance === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {skill.importance}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{skill.timeToLearn}</span>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Learning Resources:</h5>
                    <ul className="space-y-1">
                      {skill.resources.map((resource, resourceIndex) => (
                        <li key={resourceIndex} className="text-sm text-primary-600 hover:text-primary-800 cursor-pointer transition-colors">
                          • {resource}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Learning Plan */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Calendar className="h-6 w-6 text-accent-500 mr-2" />
              Your 4-Week Action Plan
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {careerPlan.learningPlan.map((week, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="card p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-accent-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {week.week}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">{week.focus}</h4>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">This Week's Goals:</h5>
                    <ul className="space-y-1">
                      {week.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Recommended Resources:</h5>
                    <ul className="space-y-1">
                      {week.resources.map((resource, resourceIndex) => (
                        <li key={resourceIndex} className="text-sm text-primary-600 hover:text-primary-800 cursor-pointer transition-colors">
                          • {resource}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
            {/* Download CV Section */}
            <div className="card p-8 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-accent-100 to-primary-100 p-4 rounded-full">
                  <Download className="h-8 w-8 text-accent-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Your Custom CV Template
              </h3>
              <p className="text-gray-600 mb-6">
                Download a professional CV template tailored to your chosen career path.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadCV}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Download CV Template</span>
              </motion.button>
            </div>

            {/* Share & Export Section */}
            <div className="card p-8 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-secondary-100 to-primary-100 p-4 rounded-full">
                  <FileText className="h-8 w-8 text-secondary-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Share Your Plan
              </h3>
              <p className="text-gray-600 mb-6">
                Export your career plan or share it with mentors and friends.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadPDF}
                  className="btn-secondary inline-flex items-center space-x-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>Download PDF</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEmailPlan}
                  className="btn-secondary inline-flex items-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Plan</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Try Another Plan */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Want to Explore More Options?
              </h3>
              <p className="text-gray-600 mb-6">
                Generate alternative career paths or refine your current plan with different inputs.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onTryAnother}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Try Another Plan</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;