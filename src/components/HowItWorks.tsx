import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Brain, Lightbulb, Rocket } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Share Your Story',
      description: 'Tell us about your education, interests, experience, and career goals through voice or text input.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our advanced AI analyzes your profile against thousands of career paths and market trends.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Lightbulb,
      title: 'Get Recommendations',
      description: 'Receive personalized career paths, skill recommendations, and a custom learning plan.',
      color: 'from-orange-400 to-orange-600'
    },
    {
      icon: Rocket,
      title: 'Start Your Journey',
      description: 'Download your custom CV template and begin following your personalized roadmap to success.',
      color: 'from-green-400 to-green-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            How CareerSpark Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Four simple steps to discover your perfect career path and create a personalized action plan
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 via-orange-200 to-green-200 transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative text-center"
              >
                <div className="relative z-10">
                  <div className={`inline-flex p-6 rounded-full bg-gradient-to-br ${step.color} mb-6 shadow-lg`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="absolute -top-2 -right-2 bg-white border-2 border-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-600 shadow-md">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100 rounded-xl p-8">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Ready to Discover Your Path?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of students and professionals who have found their direction with CareerSpark
            </p>
            <button className="btn-primary">
              Start Your Career Journey
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;