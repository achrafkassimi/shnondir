import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { supabase, testSupabaseConnection } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [showSetupInstructions, setShowSetupInstructions] = useState(false);

  useEffect(() => {
    if (isOpen) {
      checkConnection();
      // Pre-fill with admin credentials for testing
      if (import.meta.env.DEV) {
        setFormData({
          email: 'admin@careerspark.com',
          password: 'Admin123!',
          name: ''
        });
      }
    }
  }, [isOpen]);

  const checkConnection = async () => {
    setConnectionStatus('checking');
    const isConnected = await testSupabaseConnection();
    setConnectionStatus(isConnected ? 'connected' : 'error');
    
    if (!isConnected) {
      setShowSetupInstructions(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShowSetupInstructions(false);

    // Check if Supabase is properly configured
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setError('Supabase is not properly configured. Please check your environment variables.');
      setShowSetupInstructions(true);
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            if (formData.email === 'admin@careerspark.com' && import.meta.env.DEV) {
              setError('Admin user not found. Please run the setup script first.');
              setShowSetupInstructions(true);
            } else {
              setError('Invalid email or password. Please check your credentials and try again.');
            }
          } else {
            setError(error.message);
          }
          throw error;
        }

        // Create user profile if it doesn't exist
        if (data.user) {
          const { error: profileError } = await supabase
            .from('users')
            .upsert({
              id: data.user.id,
              email: data.user.email,
              name: data.user.user_metadata?.name || formData.name || 'User'
            }, { onConflict: 'id' });

          if (profileError) {
            console.warn('Could not create/update user profile:', profileError);
          }
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
            }
          }
        });
        
        if (error) throw error;

        if (data.user && !data.session) {
          setError('Please check your email for a confirmation link before signing in.');
          setLoading(false);
          return;
        }
      }
      
      onAuthSuccess();
      onClose();
    } catch (error: any) {
      console.error('Auth error:', error);
      if (!error.message.includes('Invalid login credentials')) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold gradient-text mb-2">
              {isLogin ? 'Welcome Back' : 'Join CareerSpark'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to access your career plans' : 'Create your account to save your progress'}
            </p>
          </div>

          {/* Connection Status */}
          {connectionStatus === 'checking' && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                <p className="text-blue-700 text-sm">Checking connection...</p>
              </div>
            </div>
          )}

          {connectionStatus === 'connected' && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <p className="text-green-700 text-sm">Connected to Supabase</p>
              </div>
            </div>
          )}

          {connectionStatus === 'error' && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                <p className="text-red-700 text-sm">
                  Connection error. Please check your Supabase configuration.
                </p>
              </div>
            </div>
          )}

          {/* Setup Instructions */}
          {showSetupInstructions && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-yellow-700 text-sm font-medium mb-2">Supabase Setup Required</p>
                  <div className="text-yellow-600 text-xs space-y-2">
                    <p><strong>Step 1:</strong> Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline inline-flex items-center">supabase.com <ExternalLink className="h-3 w-3 ml-1" /></a></p>
                    <p><strong>Step 2:</strong> Get your project URL and anon key from Settings → API</p>
                    <p><strong>Step 3:</strong> Create a <code className="bg-yellow-100 px-1 rounded">.env</code> file in your project root:</p>
                    <div className="bg-yellow-100 p-2 rounded text-xs font-mono">
                      VITE_SUPABASE_URL=your_project_url<br/>
                      VITE_SUPABASE_ANON_KEY=your_anon_key<br/>
                      SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
                    </div>
                    <p><strong>Step 4:</strong> Run the database migrations and setup script:</p>
                    <div className="bg-yellow-100 p-2 rounded text-xs font-mono">
                      npm run setup-admin
                    </div>
                    <p><strong>Step 5:</strong> Restart your development server</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Development Helper */}
          {import.meta.env.DEV && connectionStatus === 'connected' && !showSetupInstructions && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm font-medium">Development Mode</p>
              <p className="text-blue-600 text-xs mt-1">
                Default admin credentials: admin@careerspark.com / Admin123!
              </p>
              <p className="text-blue-600 text-xs">
                If login fails, run: <code className="font-mono bg-blue-100 px-1 rounded">npm run setup-admin</code>
              </p>
            </div>
          )}

          {/* Only show form if connected */}
          {connectionStatus === 'connected' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field pl-10"
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field pl-10"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input-field pl-10 pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>
          )}

          {connectionStatus === 'connected' && (
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary-600 hover:text-primary-700 font-medium ml-1"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          )}

          {connectionStatus === 'error' && (
            <div className="mt-6 text-center">
              <button
                onClick={checkConnection}
                className="btn-secondary text-sm"
              >
                Retry Connection
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;