import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Mic, 
  MessageSquare, 
  TrendingUp, 
  BookOpen, 
  Download,
  Video,
  Users
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced algorithms analyze your background, interests, and goals to provide personalized career recommendations.',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Mic,
      title: 'Voice Input',
      description: 'Simply speak about your career aspirations and let our voice recognition technology capture your story.',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: MessageSquare,
      title: 'Text Input',
      description: 'Prefer typing? Share your details through our intuitive form and get the same personalized experience.',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: TrendingUp,
      title: 'Career Path Recommendations',
      description: 'Get 2-3 carefully curated career paths that match your profile, complete with salary insights and growth projections.',
      color: 'text-orange-600 bg-orange-100'
    },
    {
      icon: BookOpen,
      title: 'Skill Development Plans',
      description: 'Discover the most valuable skills for your chosen path and get curated learning resources to develop them.',
      color: 'text-red-600 bg-red-100'
    },
    {
      icon: Download,
      title: 'Custom CV Templates',
      description: 'Download professional CV templates tailored to your target career, with industry-specific formatting and sections.',
      color: 'text-indigo-600 bg-indigo-100'
    },
    {
      icon: Video,
      title: 'Video Coaching',
      description: 'Receive personalized video explanations of your career plan from our AI-powered virtual coach.',
      color: 'text-pink-600 bg-pink-100'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with others on similar career journeys and share experiences, tips, and encouragement.',
      color: 'text-teal-600 bg-teal-100'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and guidance you need to make confident career decisions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card p-6 text-center hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;