import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Checking environment variables...');
console.log('VITE_SUPABASE_URL:', supabaseUrl ? '✓ Set' : '✗ Missing');
console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓ Set' : '✗ Missing');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('\n❌ Missing required environment variables');
  console.error('Please ensure these are set in your .env file:');
  console.error('- VITE_SUPABASE_URL=your_supabase_project_url');
  console.error('- SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
  console.error('\nYou can find these in your Supabase project settings under API.');
  process.exit(1);
}

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testConnection() {
  try {
    console.log('\n🔗 Testing database connection...');
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    return false;
  }
}

async function checkExistingAdmin() {
  try {
    console.log('\n👤 Checking for existing admin user...');
    
    // Check if admin user already exists
    const { data: existingUser, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('❌ Error checking existing users:', error.message);
      return null;
    }
    
    const adminUser = existingUser.users.find(user => user.email === 'admin@careerspark.com');
    
    if (adminUser) {
      console.log('✅ Admin user already exists:', adminUser.email);
      console.log('User ID:', adminUser.id);
      return adminUser;
    }
    
    console.log('ℹ️ No existing admin user found');
    return null;
  } catch (error) {
    console.error('❌ Error checking existing admin:', error.message);
    return null;
  }
}

async function createAdminUser() {
  try {
    console.log('\n🔧 Creating admin user...');
    
    // Create the admin user with more detailed error handling
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@careerspark.com',
      password: 'Admin123!',
      email_confirm: true,
      user_metadata: {
        name: 'Admin User',
        role: 'admin'
      }
    });

    if (authError) {
      console.error('❌ Auth error details:', {
        message: authError.message,
        status: authError.status,
        statusText: authError.statusText
      });
      
      if (authError.message.includes('already registered') || authError.message.includes('already exists')) {
        console.log('ℹ️ Admin user already exists, skipping creation');
        return await checkExistingAdmin();
      }
      
      throw authError;
    }

    console.log('✅ Admin user created successfully');
    console.log('📧 Email:', authData.user.email);
    console.log('🆔 User ID:', authData.user.id);

    // Create user profile with better error handling
    console.log('\n👤 Creating user profile...');
    
    const { error: profileError } = await supabase
      .from('users')
      .upsert({
        id: authData.user.id,
        email: authData.user.email,
        name: 'Admin User',
        education_level: 'Graduate',
        location: 'Global',
        preferences: {
          role: 'admin',
          notifications: true,
          theme: 'light'
        }
      }, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      });

    if (profileError) {
      console.warn('⚠️ Warning: Could not create user profile:', profileError.message);
      console.warn('This might not affect login functionality');
    } else {
      console.log('✅ Admin user profile created successfully');
    }

    return authData.user;

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    
    // Provide more specific error guidance
    if (error.message.includes('JWT')) {
      console.error('\n💡 This appears to be an authentication issue.');
      console.error('Please check your SUPABASE_SERVICE_ROLE_KEY is correct.');
    } else if (error.message.includes('not found') || error.message.includes('404')) {
      console.error('\n💡 This appears to be a URL issue.');
      console.error('Please check your VITE_SUPABASE_URL is correct.');
    } else if (error.message.includes('permission') || error.message.includes('unauthorized')) {
      console.error('\n💡 This appears to be a permissions issue.');
      console.error('Please ensure your service role key has admin permissions.');
    }
    
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 CareerSpark Admin Setup');
    console.log('========================\n');
    
    // Test database connection first
    const connectionOk = await testConnection();
    if (!connectionOk) {
      console.error('\n❌ Cannot proceed without database connection');
      process.exit(1);
    }
    
    // Check for existing admin
    const existingAdmin = await checkExistingAdmin();
    
    if (existingAdmin) {
      console.log('\n✅ Setup complete! Admin user already exists.');
      console.log('\n📋 Login credentials:');
      console.log('Email: admin@careerspark.com');
      console.log('Password: Admin123!');
      console.log('\n🌐 You can now access the admin dashboard at:');
      console.log(`${supabaseUrl.replace('/rest/v1', '')}/?page=admin`);
      return;
    }
    
    // Create new admin user
    const newAdmin = await createAdminUser();
    
    if (newAdmin) {
      console.log('\n🎉 Setup complete! Admin user created successfully.');
      console.log('\n📋 Login credentials:');
      console.log('Email: admin@careerspark.com');
      console.log('Password: Admin123!');
      console.log('\n🌐 You can now access the admin dashboard at:');
      console.log(`${supabaseUrl.replace('/rest/v1', '')}/?page=admin`);
      console.log('\n💡 Next steps:');
      console.log('1. Start your development server: npm run dev');
      console.log('2. Navigate to the login page');
      console.log('3. Sign in with the admin credentials');
      console.log('4. Access the admin dashboard from the header menu');
    }

  } catch (error) {
    console.error('\n💥 Setup failed:', error.message);
    console.error('\n🔧 Troubleshooting steps:');
    console.error('1. Verify your .env file contains the correct Supabase credentials');
    console.error('2. Check that your Supabase project is active and accessible');
    console.error('3. Ensure the service role key has admin permissions');
    console.error('4. Try running the database migrations first');
    process.exit(1);
  }
}

// Run the setup
main();