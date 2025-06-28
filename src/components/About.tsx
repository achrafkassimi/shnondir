import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Award, 
  Heart, 
  Globe, 
  Sparkles,
  TrendingUp,
  BookOpen,
  MessageSquare,
  Star
} from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Students Helped', value: '10,000+', color: 'text-blue-600' },
    { icon: TrendingUp, label: 'Career Plans Created', value: '25,000+', color: 'text-green-600' },
    { icon: Award, label: 'Success Rate', value: '89%', color: 'text-purple-600' },
    { icon: Globe, label: 'Countries Served', value: '15+', color: 'text-orange-600' }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'AI Research Director',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Former Google AI researcher with 10+ years in machine learning and career analytics.'
    },
    {
      name: 'Ahmed Benali',
      role: 'Career Psychology Expert',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Licensed career counselor specializing in MENA region job markets and cultural adaptation.'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Product Design Lead',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'UX designer passionate about making career guidance accessible to everyone worldwide.'
    },
    {
      name: 'David Kim',
      role: 'Engineering Manager',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Full-stack engineer building scalable AI systems for personalized career recommendations.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Empathy First',
      description: 'We understand that career decisions are deeply personal and can feel overwhelming. Our approach is always supportive and encouraging.'
    },
    {
      icon: Target,
      title: 'Personalized Guidance',
      description: 'No two career journeys are the same. We provide tailored recommendations based on your unique background, interests, and goals.'
    },
    {
      icon: Globe,
      title: 'Global Accessibility',
      description: 'Career guidance should be available to everyone, everywhere. We support multiple languages and regional job markets.'
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'We leverage cutting-edge AI technology to provide insights that were previously only available to expensive career consultants.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
              About CareerSpark
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize career guidance and help millions of people 
              find their perfect career path through the power of AI and human expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex p-4 rounded-full bg-gray-50 mb-4`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Career guidance has traditionally been expensive and inaccessible to many. 
                We believe everyone deserves personalized career advice, regardless of their 
                background or financial situation.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                CareerSpark combines artificial intelligence with human expertise to provide 
                world-class career guidance at scale. Our platform analyzes your unique profile 
                and provides recommendations that are both data-driven and deeply personal.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 border-2 border-white"></div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">Trusted by thousands worldwide</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Star className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">4.9/5 Rating</p>
                    <p className="text-sm text-gray-600">From 5,000+ users</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold gradient-text mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These core principles guide everything we do at CareerSpark
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-primary-100 to-secondary-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold gradient-text mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Passionate experts from diverse backgrounds working together to revolutionize career guidance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 text-center mb-3 font-medium">{member.role}</p>
                <p className="text-gray-600 text-sm text-center leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Career Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of students and professionals who have found their direction with CareerSpark
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg">
                Start Free Assessment
              </button>
              <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-200">
                Watch Demo Video
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;