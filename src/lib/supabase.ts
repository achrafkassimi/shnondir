import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase Configuration Error:');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? '✓ Set' : '✗ Missing');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✓ Set' : '✗ Missing');
  console.error('\n🔧 To fix this:');
  console.error('1. Check your .env file exists in the project root');
  console.error('2. Ensure these variables are set:');
  console.error('   VITE_SUPABASE_URL=your_supabase_project_url');
  console.error('   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key');
  console.error('3. Restart your development server');
}

// Create Supabase client with error handling
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'X-Client-Info': 'careerspark-web'
      }
    }
  }
);

// Test connection function with detailed error reporting
export const testSupabaseConnection = async () => {
  try {
    // Check if environment variables are properly set
    if (!supabaseUrl || !supabaseAnonKey || 
        supabaseUrl.includes('placeholder') || 
        supabaseAnonKey.includes('placeholder')) {
      console.error('❌ Supabase not configured properly');
      return false;
    }

    // Test basic connectivity
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase connection test failed:', error.message);
      
      // Provide specific error guidance
      if (error.message.includes('JWT')) {
        console.error('🔑 This appears to be an authentication issue. Check your VITE_SUPABASE_ANON_KEY.');
      } else if (error.message.includes('not found') || error.message.includes('404')) {
        console.error('🌐 This appears to be a URL issue. Check your VITE_SUPABASE_URL.');
      } else if (error.message.includes('CORS')) {
        console.error('🔒 This appears to be a CORS issue. Check your Supabase project settings.');
      }
      
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    return true;
  } catch (error: any) {
    console.error('❌ Supabase connection error:', error.message);
    return false;
  }
};

// Initialize connection test
if (typeof window !== 'undefined') {
  // Only run in browser environment
  setTimeout(() => {
    testSupabaseConnection();
  }, 1000);
}