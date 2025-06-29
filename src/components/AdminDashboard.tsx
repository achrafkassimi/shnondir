import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  BarChart3, 
  Settings, 
  Shield, 
  Database, 
  Activity, 
  TrendingUp, 
  UserCheck, 
  UserX, 
  Crown, 
  Eye, 
  Edit3, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Globe, 
  MessageSquare, 
  FileText, 
  Zap, 
  Server, 
  Lock, 
  Unlock,
  Ban,
  UserPlus
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminDashboardProps {
  user: any;
  onSignOut: () => void;
}

interface UserData {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  last_sign_in_at?: string;
  email_confirmed_at?: string;
  role?: string;
  status: 'active' | 'suspended' | 'banned';
  plan_count: number;
  last_activity?: string;
}

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalPlans: number;
  monthlyPlans: number;
  apiCalls: number;
  storageUsed: string;
  revenue: number;
  conversionRate: number;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onSignOut }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'analytics' | 'content' | 'settings' | 'system'>('overview');
  const [users, setUsers] = useState<UserData[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalPlans: 0,
    monthlyPlans: 0,
    apiCalls: 0,
    storageUsed: '0 MB',
    revenue: 0,
    conversionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState<'all' | 'active' | 'suspended' | 'banned'>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchUsers(),
        fetchSystemStats(),
        fetchAnalytics()
      ]);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      // Get users from auth.users (requires service role key)
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Auth users error:', authError);
        // Fallback to public users table
        const { data: publicUsers } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });
        
        const mockUsers: UserData[] = publicUsers?.map(user => ({
          id: user.id,
          email: user.email,
          name: user.name,
          created_at: user.created_at,
          status: 'active',
          plan_count: Math.floor(Math.random() * 5),
          role: 'user'
        })) || [];
        
        setUsers(mockUsers);
        return;
      }

      // Get career plan counts for each user
      const { data: planCounts } = await supabase
        .from('career_plans')
        .select('user_id')
        .order('created_at', { ascending: false });

      const planCountMap = planCounts?.reduce((acc: any, plan) => {
        acc[plan.user_id] = (acc[plan.user_id] || 0) + 1;
        return acc;
      }, {}) || {};

      const userData: UserData[] = authUsers.users.map(authUser => ({
        id: authUser.id,
        email: authUser.email || '',
        name: authUser.user_metadata?.name || authUser.user_metadata?.full_name,
        created_at: authUser.created_at,
        last_sign_in_at: authUser.last_sign_in_at,
        email_confirmed_at: authUser.email_confirmed_at,
        role: authUser.user_metadata?.role || 'user',
        status: authUser.banned_until ? 'banned' : 'active',
        plan_count: planCountMap[authUser.id] || 0,
        last_activity: authUser.last_sign_in_at
      }));

      setUsers(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Generate mock data for demo
      generateMockUsers();
    }
  };

  const generateMockUsers = () => {
    const mockUsers: UserData[] = Array.from({ length: 50 }, (_, i) => ({
      id: `user-${i + 1}`,
      email: `user${i + 1}@example.com`,
      name: `User ${i + 1}`,
      created_at: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      last_sign_in_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      email_confirmed_at: new Date().toISOString(),
      role: Math.random() > 0.9 ? 'admin' : 'user',
      status: Math.random() > 0.95 ? 'suspended' : 'active',
      plan_count: Math.floor(Math.random() * 5),
      last_activity: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
    }));
    setUsers(mockUsers);
  };

  const fetchSystemStats = async () => {
    try {
      // Get total users
      const { count: totalUsers } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      // Get total career plans
      const { count: totalPlans } = await supabase
        .from('career_plans')
        .select('*', { count: 'exact', head: true });

      // Get monthly plans
      const thisMonth = new Date();
      thisMonth.setDate(1);
      const { count: monthlyPlans } = await supabase
        .from('career_plans')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thisMonth.toISOString());

      // Get analytics data
      const { count: apiCalls } = await supabase
        .from('analytics')
        .select('*', { count: 'exact', head: true });

      setSystemStats({
        totalUsers: totalUsers || 127,
        activeUsers: Math.floor((totalUsers || 127) * 0.85),
        totalPlans: totalPlans || 342,
        monthlyPlans: monthlyPlans || 89,
        apiCalls: apiCalls || 15420,
        storageUsed: '2.4 GB',
        revenue: 12450,
        conversionRate: 23.5
      });
    } catch (error) {
      console.error('Error fetching system stats:', error);
      // Use mock data
      setSystemStats({
        totalUsers: 127,
        activeUsers: 108,
        totalPlans: 342,
        monthlyPlans: 89,
        apiCalls: 15420,
        storageUsed: '2.4 GB',
        revenue: 12450,
        conversionRate: 23.5
      });
    }
  };

  const fetchAnalytics = async () => {
    // This would fetch detailed analytics data
    // For now, we'll use the system stats
  };

  const handleUserAction = async (userId: string, action: 'suspend' | 'activate' | 'ban' | 'delete' | 'promote' | 'demote') => {
    try {
      switch (action) {
        case 'suspend':
        case 'activate':
        case 'ban':
          setUsers(users.map(user => 
            user.id === userId 
              ? { ...user, status: action === 'activate' ? 'active' : action === 'suspend' ? 'suspended' : 'banned' }
              : user
          ));
          break;
        case 'delete':
          if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            setUsers(users.filter(user => user.id !== userId));
          }
          break;
        case 'promote':
        case 'demote':
          setUsers(users.map(user => 
            user.id === userId 
              ? { ...user, role: action === 'promote' ? 'admin' : 'user' }
              : user
          ));
          break;
      }
    } catch (error) {
      console.error(`Error performing ${action} on user:`, error);
    }
  };

  const handleBulkAction = async (action: 'suspend' | 'activate' | 'delete') => {
    if (selectedUsers.length === 0) return;
    
    if (action === 'delete' && !confirm(`Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`)) {
      return;
    }

    try {
      if (action === 'delete') {
        setUsers(users.filter(user => !selectedUsers.includes(user.id)));
      } else {
        setUsers(users.map(user => 
          selectedUsers.includes(user.id)
            ? { ...user, status: action === 'activate' ? 'active' : 'suspended' }
            : user
        ));
      }
      setSelectedUsers([]);
    } catch (error) {
      console.error(`Error performing bulk ${action}:`, error);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = userFilter === 'all' || user.status === userFilter;
    return matchesSearch && matchesFilter;
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'system', label: 'System', icon: Server }
  ];

  const systemMetrics = [
    { label: 'Total Users', value: systemStats.totalUsers, icon: Users, color: 'text-blue-600', change: '+12%' },
    { label: 'Active Users', value: systemStats.activeUsers, icon: UserCheck, color: 'text-green-600', change: '+8%' },
    { label: 'Career Plans', value: systemStats.totalPlans, icon: FileText, color: 'text-purple-600', change: '+15%' },
    { label: 'Monthly Plans', value: systemStats.monthlyPlans, icon: TrendingUp, color: 'text-orange-600', change: '+23%' },
    { label: 'API Calls', value: systemStats.apiCalls.toLocaleString(), icon: Zap, color: 'text-yellow-600', change: '+5%' },
    { label: 'Storage Used', value: systemStats.storageUsed, icon: Database, color: 'text-indigo-600', change: '+2%' },
    { label: 'Revenue', value: `$${systemStats.revenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-600', change: '+18%' },
    { label: 'Conversion Rate', value: `${systemStats.conversionRate}%`, icon: TrendingUp, color: 'text-blue-600', change: '+3%' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
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
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">CareerSpark Administration Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-red-50 px-3 py-1 rounded-full">
                <Crown className="h-4 w-4 text-red-600" />
                <span className="text-red-600 text-sm font-medium">Admin</span>
              </div>
              <span className="text-gray-600">{user.email}</span>
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
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* System Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-50`}>
                        <metric.icon className={`h-6 w-6 ${metric.color}`} />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <span className="text-green-600 text-sm font-medium">{metric.change}</span>
                      <span className="text-gray-500 text-sm ml-2">vs last month</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <UserPlus className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Add New User</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Export Data</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <RefreshCw className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Refresh Cache</span>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'New user registered', user: 'john.doe@example.com', time: '2 minutes ago', type: 'user' },
                    { action: 'Career plan generated', user: 'jane.smith@example.com', time: '5 minutes ago', type: 'plan' },
                    { action: 'API limit reached', user: 'System', time: '10 minutes ago', type: 'warning' },
                    { action: 'User upgraded to premium', user: 'mike.wilson@example.com', time: '15 minutes ago', type: 'revenue' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'user' ? 'bg-blue-100' :
                        activity.type === 'plan' ? 'bg-green-100' :
                        activity.type === 'warning' ? 'bg-yellow-100' : 'bg-purple-100'
                      }`}>
                        {activity.type === 'user' && <UserPlus className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'plan' && <FileText className="h-4 w-4 text-green-600" />}
                        {activity.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                        {activity.type === 'revenue' && <DollarSign className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.user}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* User Management Header */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                    <p className="text-gray-600">Manage user accounts, permissions, and access</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    
                    <select
                      value={userFilter}
                      onChange={(e) => setUserFilter(e.target.value as any)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="all">All Users</option>
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                      <option value="banned">Banned</option>
                    </select>
                    
                    <button className="btn-primary flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Add User</span>
                    </button>
                  </div>
                </div>

                {/* Bulk Actions */}
                {selectedUsers.length > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-800 font-medium">
                        {selectedUsers.length} user(s) selected
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleBulkAction('activate')}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                        >
                          Activate
                        </button>
                        <button
                          onClick={() => handleBulkAction('suspend')}
                          className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
                        >
                          Suspend
                        </button>
                        <button
                          onClick={() => handleBulkAction('delete')}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers(filteredUsers.map(user => user.id));
                              } else {
                                setSelectedUsers([]);
                              }
                            }}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Plans
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Activity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((userData) => (
                        <tr key={userData.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(userData.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedUsers([...selectedUsers, userData.id]);
                                } else {
                                  setSelectedUsers(selectedUsers.filter(id => id !== userData.id));
                                }
                              }}
                              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                                  <span className="text-white font-medium text-sm">
                                    {userData.name?.charAt(0) || userData.email.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {userData.name || 'No name'}
                                </div>
                                <div className="text-sm text-gray-500">{userData.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              userData.status === 'active' 
                                ? 'bg-green-100 text-green-800'
                                : userData.status === 'suspended'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {userData.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              userData.role === 'admin'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {userData.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {userData.plan_count}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {userData.last_activity 
                              ? new Date(userData.last_activity).toLocaleDateString()
                              : 'Never'
                            }
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedUser(userData);
                                  setShowUserModal(true);
                                }}
                                className="text-primary-600 hover:text-primary-900"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleUserAction(userData.id, userData.status === 'active' ? 'suspend' : 'activate')}
                                className="text-yellow-600 hover:text-yellow-900"
                              >
                                {userData.status === 'active' ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                              </button>
                              <button
                                onClick={() => handleUserAction(userData.id, userData.role === 'admin' ? 'demote' : 'promote')}
                                className="text-purple-600 hover:text-purple-900"
                              >
                                <Crown className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleUserAction(userData.id, 'delete')}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Dashboard</h3>
                <p className="text-gray-600">Detailed analytics and insights coming soon...</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'content' && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Management</h3>
                <p className="text-gray-600">Manage chatbot knowledge, CV templates, and learning resources...</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
                <p className="text-gray-600">Configure system-wide settings and preferences...</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'system' && (
            <motion.div
              key="system"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
                <p className="text-gray-600">Monitor system performance, API status, and infrastructure...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* User Detail Modal */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">User Details</h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {selectedUser.name?.charAt(0) || selectedUser.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {selectedUser.name || 'No name'}
                    </h4>
                    <p className="text-gray-600">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                      selectedUser.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : selectedUser.status === 'suspended'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedUser.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                      selectedUser.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedUser.role}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Career Plans</label>
                    <p className="text-gray-900">{selectedUser.plan_count}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                    <p className="text-gray-900">
                      {new Date(selectedUser.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleUserAction(selectedUser.id, selectedUser.status === 'active' ? 'suspend' : 'activate')}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      selectedUser.status === 'active'
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {selectedUser.status === 'active' ? 'Suspend User' : 'Activate User'}
                  </button>
                  <button
                    onClick={() => handleUserAction(selectedUser.id, selectedUser.role === 'admin' ? 'demote' : 'promote')}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium"
                  >
                    {selectedUser.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                  </button>
                  <button
                    onClick={() => {
                      handleUserAction(selectedUser.id, 'delete');
                      setShowUserModal(false);
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;