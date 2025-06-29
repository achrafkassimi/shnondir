import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 CareerSpark Connection Test');
console.log('==============================\n');

console.log('Environment Variables:');
console.log('VITE_SUPABASE_URL:', supabaseUrl ? '✓ Set' : '✗ Missing');
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✓ Set' : '✗ Missing');
console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓ Set' : '✗ Missing');

if (!supabaseUrl) {
  console.error('\n❌ VITE_SUPABASE_URL is missing');
  process.exit(1);
}

async function testAnonConnection() {
  if (!supabaseAnonKey) {
    console.log('\n⚠️ Skipping anon key test (not configured)');
    return false;
  }

  try {
    console.log('\n🔗 Testing anonymous connection...');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Anonymous connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Anonymous connection successful');
    return true;
  } catch (error) {
    console.error('❌ Anonymous connection error:', error.message);
    return false;
  }
}

async function testServiceConnection() {
  if (!supabaseServiceKey) {
    console.log('\n⚠️ Skipping service key test (not configured)');
    return false;
  }

  try {
    console.log('\n🔗 Testing service role connection...');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Service role connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Service role connection successful');
    return true;
  } catch (error) {
    console.error('❌ Service role connection error:', error.message);
    return false;
  }
}

async function testAuthAdmin() {
  if (!supabaseServiceKey) {
    console.log('\n⚠️ Skipping auth admin test (service key not configured)');
    return false;
  }

  try {
    console.log('\n👤 Testing auth admin access...');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('❌ Auth admin access failed:', error.message);
      return false;
    }
    
    console.log('✅ Auth admin access successful');
    console.log(`📊 Found ${data.users.length} existing users`);
    return true;
  } catch (error) {
    console.error('❌ Auth admin access error:', error.message);
    return false;
  }
}

async function main() {
  const anonOk = await testAnonConnection();
  const serviceOk = await testServiceConnection();
  const authOk = await testAuthAdmin();
  
  console.log('\n📋 Test Results:');
  console.log('Anonymous connection:', anonOk ? '✅ Pass' : '❌ Fail');
  console.log('Service role connection:', serviceOk ? '✅ Pass' : '❌ Fail');
  console.log('Auth admin access:', authOk ? '✅ Pass' : '❌ Fail');
  
  if (authOk) {
    console.log('\n🎉 All tests passed! You can proceed with admin setup.');
    console.log('Run: npm run setup-admin');
  } else {
    console.log('\n❌ Some tests failed. Please check your configuration.');
    console.log('\n🔧 Common issues:');
    console.log('1. Incorrect Supabase URL or keys');
    console.log('2. Supabase project not accessible');
    console.log('3. Service role key lacks admin permissions');
    console.log('4. Database tables not created (run migrations first)');
  }
}

main();