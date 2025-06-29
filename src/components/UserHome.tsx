import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  Star,
  Clock,
  Award,
  Target,
  MessageSquare,
  Play,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface UserHomeProps {
  user: any;
  onCreateNew: () => void;
  onViewDashboard: () => void;
}

const UserHome: React.FC<UserHomeProps> = ({ user, onCreateNew, onViewDashboard }) => {
  const [userStats, setUserStats] = useState({
    totalPlans: 0,
    completedTasks: 0,
    currentStreak: 0,
    totalProgress: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch user's career plans
      const { data: plans } = await supabase
        .from('career_plans')
        .select('*')
        .eq('user_id', user.id);

      // Fetch user progress
      const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      // Calculate stats
      const totalPlans = plans?.length || 0;
      const completedTasks = progress?.filter(p => p.completed).length || 0;
      const totalProgress = totalPlans > 0 
        ? Math.round(plans.reduce((sum, plan) => sum + (plan.progress_percentage || 0), 0) / totalPlans)
        : 0;

      setUserStats({
        totalPlans,
        completedTasks,
        currentStreak: 7, // Mock data
        totalProgress
      });

      // Mock recent activity
      setRecentActivity([
        {
          type: 'task_completed',
          title: 'Completed JavaScript Fundamentals',
          time: '2 hours ago',
          icon: CheckCircle,
          color: 'text-green-600'
        },
        {
          type: 'plan_created',
          title: 'Created new career plan for Data Science',
          time: '1 day ago',
          icon: Target,
          color: 'text-blue-600'
        },
        {
          type: 'milestone_reached',
          title: 'Reached 50% progress on learning plan',
          time: '3 days ago',
          icon: Award,
          color: 'text-purple-600'
        }
      ]);

      // Mock recommendations
      setRecommendations([
        {
          title: 'Complete React Tutorial',
          description: 'Continue your frontend development journey',
          progress: 60,
          timeLeft: '2 weeks',
          priority: 'high'
        },
        {
          title: 'Practice Data Structures',
          description: 'Strengthen your programming fundamentals',
          progress: 30,
          timeLeft: '1 month',
          priority: 'medium'
        }
      ]);

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleViewDashboard = () => {
    // Open dashboard in new tab to preserve current session
    const dashboardUrl = `${window.location.origin}/?page=dashboard`;
    window.open(dashboardUrl, '_blank');
  };

  const quickActions = [
    {
      title: 'Create New Plan',
      description: 'Start a fresh career exploration',
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      action: onCreateNew
    },
    {
      title: 'View Dashboard',
      description: 'See all your career plans',
      icon: BarChart3,
      color: 'from-green-500 to-green-600',
      action: handleViewDashboard,
      external: true
    },
    {
      title: 'Chat with AI',
      description: 'Get instant career guidance',
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
      action: () => {}
    },
    {
      title: 'Watch Success Stories',
      description: 'Get inspired by others',
      icon: Play,
      color: 'from-orange-500 to-orange-600',
      action: () => {}
    }
  ];

  const learningResources = [
    {
      title: 'JavaScript Mastery Course',
      provider: 'freeCodeCamp',
      duration: '40 hours',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'UX Design Fundamentals',
      provider: 'Coursera',
      duration: '25 hours',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Data Science with Python',
      provider: 'Kaggle Learn',
      duration: '30 hours',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Header */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user.user_metadata?.name || user.email?.split('@')[0]}! 👋
              </h1>
              <p className="text-white/90 text-lg">
                Ready to continue your career journey? Here's what's happening today.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-medium">Current Streak</span>
                </div>
                <div className="text-2xl font-bold">{userStats.currentStreak} days</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Progress</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { label: 'Career Plans', value: userStats.totalPlans, icon: Target, color: 'text-blue-600' },
                  { label: 'Tasks Completed', value: userStats.completedTasks, icon: CheckCircle, color: 'text-green-600' },
                  { label: 'Current Streak', value: `${userStats.currentStreak} days`, icon: Award, color: 'text-purple-600' },
                  { label: 'Overall Progress', value: `${userStats.totalProgress}%`, icon: TrendingUp, color: 'text-orange-600' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className={`inline-flex p-2 rounded-lg bg-gray-50 mb-3`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.action}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-all duration-200 group"
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${action.color} text-white mb-4`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{action.title}</h3>
                        <p className="text-gray-600 text-sm">{action.description}</p>
                      </div>
                      {action.external && (
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Current Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended for You</h2>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{rec.title}</h3>
                        <p className="text-gray-600">{rec.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        rec.priority === 'high' 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {rec.priority} priority
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{rec.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${rec.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{rec.timeLeft}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Learning Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended Learning</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {learningResources.map((resource, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{resource.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{resource.provider}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{resource.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-gray-600">{resource.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-1.5 rounded-full bg-gray-50`}>
                      <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors">
                View All Activity
              </button>
            </motion.div>

            {/* Weekly Goal */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">This Week's Goal</h3>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">5/7</div>
                <p className="text-gray-600 text-sm mb-4">Learning sessions completed</p>
                <div className="w-full bg-white rounded-full h-3 mb-4">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-300" style={{ width: '71%' }}></div>
                </div>
                <p className="text-xs text-gray-600">2 more sessions to reach your weekly goal!</p>
              </div>
            </motion.div>

            {/* Success Story */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Success Story</h3>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Success story"
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                  <div className="bg-white/90 p-2 rounded-full">
                    <Play className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
              </div>
              <h4 className="font-medium text-gray-800 mb-2">From Student to Software Engineer</h4>
              <p className="text-sm text-gray-600 mb-3">Watch how Youssef transformed his career in 8 months</p>
              <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors">
                <span>Watch Story</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;