import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  Download, 
  Plus,
  CheckCircle,
  Circle,
  Edit3,
  Trash2,
  BarChart3
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CareerPlan } from '../types';

interface DashboardProps {
  user: any;
  onCreateNew: () => void;
  onSignOut: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onCreateNew, onSignOut }) => {
  const [careerPlans, setCareerPlans] = useState<CareerPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<CareerPlan | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchCareerPlans();
  }, []);

  const fetchCareerPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('career_plans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCareerPlans(data || []);
      if (data && data.length > 0) {
        setSelectedPlan(data[0]);
      }
    } catch (error) {
      console.error('Error fetching career plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const deletePlan = async (planId: string) => {
    try {
      const { error } = await supabase
        .from('career_plans')
        .delete()
        .eq('id', planId);

      if (error) throw error;
      
      setCareerPlans(plans => plans.filter(plan => plan.id !== planId));
      if (selectedPlan?.id === planId) {
        setSelectedPlan(careerPlans.length > 1 ? careerPlans[0] : null);
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold gradient-text">CareerSpark Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user.user_metadata?.name || user.email}</span>
              <button
                onClick={onSignOut}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary-100 p-2 rounded-full">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Your Profile</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Career Plans</span>
                  <span className="font-medium">{careerPlans.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Completed Tasks</span>
                  <span className="font-medium">{completedTasks.size}</span>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Your Plans</h3>
              <div className="space-y-2">
                {careerPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedPlan?.id === plan.id
                        ? 'bg-primary-50 border border-primary-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-800 truncate">
                      {plan.user_profile?.name || 'Career Plan'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(plan.created_at || '').toLocaleDateString()}
                    </div>
                  </button>
                ))}
                
                <button
                  onClick={onCreateNew}
                  className="w-full flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-sm font-medium">Create New Plan</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedPlan ? (
              <div className="space-y-8">
                {/* Plan Overview */}
                <div className="card p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Career Plan for {selectedPlan.user_profile?.name}
                      </h2>
                      <p className="text-gray-600">
                        Created on {new Date(selectedPlan.created_at || '').toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit3 className="h-5 w-5 text-gray-600" />
                      </button>
                      <button 
                        onClick={() => deletePlan(selectedPlan.id!)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-2">
                        <TrendingUp className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-800">Career Paths</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        {selectedPlan.career_recommendations?.length || 0}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-2">
                        <BookOpen className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-800">Skills to Learn</h3>
                      <p className="text-2xl font-bold text-green-600">
                        {selectedPlan.skill_recommendations?.length || 0}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-2">
                        <Calendar className="h-6 w-6 text-orange-600" />
                      </div>
                      <h3 className="font-semibold text-gray-800">Learning Weeks</h3>
                      <p className="text-2xl font-bold text-orange-600">
                        {selectedPlan.learning_plan?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Learning Progress */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <Calendar className="h-6 w-6 text-primary-500 mr-2" />
                    Learning Progress
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {selectedPlan.learning_plan?.map((week, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <div className="bg-primary-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                            {week.week}
                          </div>
                          <h4 className="font-semibold text-gray-800">{week.focus}</h4>
                        </div>
                        
                        <div className="space-y-2">
                          {week.tasks?.map((task, taskIndex) => {
                            const taskId = `${index}-${taskIndex}`;
                            const isCompleted = completedTasks.has(taskId);
                            
                            return (
                              <button
                                key={taskIndex}
                                onClick={() => toggleTask(taskId)}
                                className="flex items-start space-x-2 text-left w-full hover:bg-gray-50 p-2 rounded transition-colors"
                              >
                                {isCompleted ? (
                                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                ) : (
                                  <Circle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                )}
                                <span className={`text-sm ${isCompleted ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                  {task}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Recommendations */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <TrendingUp className="h-6 w-6 text-secondary-500 mr-2" />
                    Your Career Paths
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {selectedPlan.career_recommendations?.map((career, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-gray-800">{career.title}</h4>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            {career.match_percentage}% match
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{career.description}</p>
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center mb-1">
                            <span className="font-medium">Salary:</span>
                            <span className="ml-2">{career.average_salary}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium">Growth:</span>
                            <span className="ml-2">{career.growth_rate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="btn-primary flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Download CV Template</span>
                  </button>
                  
                  <button 
                    onClick={onCreateNew}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Try Another Plan</span>
                  </button>
                  
                  <button className="btn-secondary flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>View Analytics</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="card p-12 text-center">
                <div className="bg-gray-100 p-6 rounded-full w-fit mx-auto mb-6">
                  <BookOpen className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">No Career Plans Yet</h3>
                <p className="text-gray-600 mb-6">
                  Create your first career plan to get personalized recommendations and learning paths.
                </p>
                <button onClick={onCreateNew} className="btn-primary">
                  Create Your First Plan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;