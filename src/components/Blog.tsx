import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Search,
  Filter,
  Star,
  Play,
  BookOpen,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Posts', count: 24 },
    { id: 'success-stories', label: 'Success Stories', count: 8 },
    { id: 'career-tips', label: 'Career Tips', count: 10 },
    { id: 'industry-insights', label: 'Industry Insights', count: 6 }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: 'From Confused Student to Software Engineer: Youssef\'s Journey',
      excerpt: 'How a 22-year-old from Casablanca used CareerSpark to transition from business studies to becoming a full-stack developer at a tech startup.',
      category: 'success-stories',
      author: 'Sarah Chen',
      date: '2025-01-15',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      video: true
    },
    {
      id: 2,
      title: 'The Complete Guide to Career Change in Your 30s',
      excerpt: 'Practical strategies and real success stories from professionals who successfully pivoted their careers later in life.',
      category: 'career-tips',
      author: 'Ahmed Benali',
      date: '2025-01-12',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    },
    {
      id: 3,
      title: 'Morocco\'s Tech Boom: Opportunities for New Graduates',
      excerpt: 'An in-depth look at the growing technology sector in Morocco and how students can position themselves for success.',
      category: 'industry-insights',
      author: 'Maria Rodriguez',
      date: '2025-01-10',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true
    }
  ];

  const successStories = [
    {
      id: 4,
      title: 'From Pharmacy to UX Design: Fatima\'s Creative Transformation',
      excerpt: 'A pharmacist\'s journey to becoming a UX designer at an international agency in Rabat.',
      category: 'success-stories',
      author: 'David Kim',
      date: '2025-01-08',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      video: true,
      stats: { salary: '+150%', time: '8 months', satisfaction: '9.5/10' }
    },
    {
      id: 5,
      title: 'Breaking into Data Science: Omar\'s Self-Taught Success',
      excerpt: 'How a marketing graduate taught himself data science and landed a role at a fintech company.',
      category: 'success-stories',
      author: 'Sarah Chen',
      date: '2025-01-05',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      video: true,
      stats: { salary: '+200%', time: '12 months', satisfaction: '10/10' }
    },
    {
      id: 6,
      title: 'From Teacher to Product Manager: Aicha\'s Strategic Pivot',
      excerpt: 'A high school teacher\'s transition to product management in the education technology sector.',
      category: 'success-stories',
      author: 'Ahmed Benali',
      date: '2025-01-03',
      readTime: '9 min read',
      image: 'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { salary: '+120%', time: '10 months', satisfaction: '9/10' }
    }
  ];

  const regularPosts = [
    {
      id: 7,
      title: '10 Essential Skills Every Professional Needs in 2025',
      excerpt: 'The most in-demand skills across industries and how to develop them effectively.',
      category: 'career-tips',
      author: 'Maria Rodriguez',
      date: '2025-01-01',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/3184341/pexels-photo-3184341.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 8,
      title: 'Remote Work Opportunities in the MENA Region',
      excerpt: 'How to find and secure remote positions with international companies.',
      category: 'industry-insights',
      author: 'David Kim',
      date: '2024-12-28',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/3184342/pexels-photo-3184342.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 9,
      title: 'Networking Strategies for Introverted Professionals',
      excerpt: 'Practical tips for building professional relationships when you prefer smaller interactions.',
      category: 'career-tips',
      author: 'Sarah Chen',
      date: '2024-12-25',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/3184343/pexels-photo-3184343.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const allPosts = [...featuredPosts, ...successStories, ...regularPosts];

  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              Career Insights & Success Stories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Real stories from real people who transformed their careers, plus expert insights 
              to help you navigate your own professional journey.
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Success Story Video */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold gradient-text mb-4">Featured Success Story</h2>
            <p className="text-gray-600 text-lg">Watch how CareerSpark helped transform a career</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-video flex items-center justify-center overflow-hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-500 hover:bg-primary-600 text-white p-8 rounded-full shadow-2xl transition-all duration-200 z-10"
              >
                <Play className="h-16 w-16" />
              </motion.button>
              
              {/* Video Thumbnail */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20"></div>
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Success story thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              
              {/* Video Info Overlay */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold text-gray-800">Youssef's Journey to Tech</h3>
                <p className="text-sm text-gray-600">From Business Student to Software Engineer</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>12:34</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>4.9/5</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold gradient-text mb-4">Success Stories</h2>
            <p className="text-gray-600 text-lg">Real transformations from our community</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {story.video && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 p-3 rounded-full">
                        <Play className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Success Story
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{story.excerpt}</p>
                  
                  {story.stats && (
                    <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{story.stats.salary}</div>
                        <div className="text-xs text-gray-500">Salary Increase</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{story.stats.time}</div>
                        <div className="text-xs text-gray-500">Transition Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">{story.stats.satisfaction}</div>
                        <div className="text-xs text-gray-500">Satisfaction</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{story.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(story.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors">
                    <span>Read Full Story</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold gradient-text mb-4">Featured Articles</h2>
            <p className="text-gray-600 text-lg">Expert insights and career guidance</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.featured && (
                    <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                  {post.video && (
                    <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                      <Play className="h-4 w-4 text-primary-600" />
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {categories.find(c => c.id === post.category)?.label}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  
                  <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold gradient-text mb-4">All Articles</h2>
            <p className="text-gray-600 text-lg">
              {filteredPosts.length} articles found
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.label}`}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.video && (
                    <div className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full">
                      <Play className="h-3 w-3 text-primary-600" />
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {categories.find(c => c.id === post.category)?.label}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with Career Insights
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get the latest success stories, career tips, and industry insights delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-white/70 text-sm mt-4">
              Join 5,000+ professionals. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;