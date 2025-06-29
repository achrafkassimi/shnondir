import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  ArrowRight, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Lightbulb,
  Mail,
  Send,
  CheckCircle
} from 'lucide-react';

const Blog: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    
    // Simulate subscription process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubscribed(true);
    setIsSubmitting(false);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setSubscribed(false), 3000);
  };

  const featuredPost = {
    title: "The Future of AI in Career Development: What Students Need to Know",
    excerpt: "Artificial Intelligence is revolutionizing how we approach career planning. From personalized recommendations to skill gap analysis, discover how AI tools like CareerSpark are helping students make smarter career decisions.",
    author: "Dr. Sarah Chen",
    date: "January 15, 2025",
    readTime: "8 min read",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Technology"
  };

  const blogPosts = [
    {
      title: "5 High-Demand Skills Every Graduate Should Learn in 2025",
      excerpt: "The job market is evolving rapidly. Here are the most in-demand skills that will give you a competitive edge in today's economy.",
      author: "Ahmed Benali",
      date: "January 12, 2025",
      readTime: "6 min read",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Skills"
    },
    {
      title: "From Student to Professional: A Complete Career Transition Guide",
      excerpt: "Making the leap from university to your first job can be overwhelming. This comprehensive guide will help you navigate the transition successfully.",
      author: "Maria Rodriguez",
      date: "January 10, 2025",
      readTime: "10 min read",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Career Advice"
    },
    {
      title: "Remote Work Revolution: How to Build a Successful Remote Career",
      excerpt: "Remote work is here to stay. Learn how to position yourself for remote opportunities and thrive in a distributed work environment.",
      author: "David Kim",
      date: "January 8, 2025",
      readTime: "7 min read",
      image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Remote Work"
    },
    {
      title: "Networking in the Digital Age: Building Professional Relationships Online",
      excerpt: "Traditional networking has evolved. Discover effective strategies for building meaningful professional relationships in our connected world.",
      author: "Fatima Al-Zahra",
      date: "January 5, 2025",
      readTime: "5 min read",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Networking"
    },
    {
      title: "The Psychology of Career Decision Making: Understanding Your Motivations",
      excerpt: "Why do we choose certain careers? Explore the psychological factors that influence career decisions and how to make choices aligned with your values.",
      author: "Dr. Youssef Mansouri",
      date: "January 3, 2025",
      readTime: "9 min read",
      image: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Psychology"
    },
    {
      title: "Entrepreneurship vs Employment: Choosing Your Path in Morocco",
      excerpt: "Should you start your own business or join an established company? We explore the pros and cons of each path in the Moroccan context.",
      author: "Rachid Benali",
      date: "December 30, 2024",
      readTime: "8 min read",
      image: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Entrepreneurship"
    }
  ];

  const categories = [
    { name: 'All', count: 25, icon: BookOpen },
    { name: 'Career Advice', count: 8, icon: TrendingUp },
    { name: 'Skills', count: 6, icon: Lightbulb },
    { name: 'Technology', count: 5, icon: Users },
    { name: 'Remote Work', count: 4, icon: Users },
    { name: 'Networking', count: 2, icon: Users }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
              Career Insights & Guidance
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Expert advice, industry insights, and practical tips to help you navigate your career journey successfully
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <div className="card p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon className="h-4 w-4 text-primary-600" />
                      <span className="text-gray-700">{category.name}</span>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="card p-6">
              <div className="text-center mb-4">
                <div className="bg-primary-100 p-3 rounded-full w-fit mx-auto mb-3">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Stay Updated</h3>
                <p className="text-gray-600 text-sm">
                  Get the latest success stories, career tips, and industry insights delivered to your inbox
                </p>
              </div>

              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h4 className="font-semibold text-green-800 mb-1">Successfully Subscribed!</h4>
                  <p className="text-green-600 text-sm">Thank you for joining our community.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card overflow-hidden mb-12"
            >
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <User className="h-4 w-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1">
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <span className="font-medium">{post.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="btn-primary">
                Load More Articles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;