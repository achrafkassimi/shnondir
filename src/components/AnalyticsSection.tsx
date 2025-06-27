import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, TrendingUp, BookOpen, Globe } from 'lucide-react';

const AnalyticsSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      label: 'Plans Generated',
      value: '2,847',
      change: '+12%',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: TrendingUp,
      label: 'Popular Career Track',
      value: 'Software Development',
      change: '34% of users',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: BookOpen,
      label: 'Most Requested Skill',
      value: 'JavaScript',
      change: '28% of plans',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Globe,
      label: 'Success Rate',
      value: '89%',
      change: 'User satisfaction',
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  const popularCareers = [
    { name: 'Software Developer', percentage: 34, color: 'bg-blue-500' },
    { name: 'Data Scientist', percentage: 22, color: 'bg-green-500' },
    { name: 'UX/UI Designer', percentage: 18, color: 'bg-purple-500' },
    { name: 'Digital Marketing', percentage: 15, color: 'bg-orange-500' },
    { name: 'Product Manager', percentage: 11, color: 'bg-red-500' }
  ];

  const moroccanExamples = [
    { city: 'Casablanca', field: 'Finance & Banking', growth: '+15%' },
    { city: 'Rabat', field: 'Government & Public Service', growth: '+8%' },
    { city: 'Marrakech', field: 'Tourism & Hospitality', growth: '+12%' },
    { city: 'Tangier', field: 'Manufacturing & Logistics', growth: '+18%' }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            Career Insights & Analytics
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover trending career paths and see how CareerSpark is helping thousands find their direction
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 text-center"
            >
              <div className={`inline-flex p-3 rounded-xl ${stat.color} mb-4`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className="text-green-600 text-xs font-medium">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Popular Career Tracks */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card p-8"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 text-primary-500 mr-2" />
              Most Popular Career Tracks
            </h3>
            
            <div className="space-y-4">
              {popularCareers.map((career, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{career.name}</span>
                      <span className="text-sm text-gray-500">{career.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${career.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-2 rounded-full ${career.color}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Regional Insights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card p-8"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Globe className="h-6 w-6 text-secondary-500 mr-2" />
              Regional Career Opportunities (Morocco)
            </h3>
            
            <div className="space-y-4">
              {moroccanExamples.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-semibold text-gray-800">{example.city}</h4>
                    <p className="text-sm text-gray-600">{example.field}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-green-600 font-medium text-sm">{example.growth}</span>
                    <p className="text-xs text-gray-500">growth</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Local Insight:</strong> Morocco's growing tech sector in Casablanca and Rabat 
                offers excellent opportunities for software developers and digital professionals.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100 rounded-xl p-8">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Join the Success Stories
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Be part of the thousands who have found their career direction with CareerSpark. 
              Your success story could be next!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Start Your Journey
              </button>
              <button className="btn-secondary">
                📹 Watch Success Stories
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalyticsSection;