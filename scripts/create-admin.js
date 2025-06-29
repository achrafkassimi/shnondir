// Script to create admin user via Supabase
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- VITE_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    // Create admin user using Supabase Admin API
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'admin@careerspark.com',
      password: 'Admin123!',
      email_confirm: true,
      user_metadata: {
        name: 'CareerSpark Admin',
        role: 'admin'
      }
    });

    if (error) {
      throw error;
    }

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@careerspark.com');
    console.log('🔑 Password: Admin123!');
    console.log('👤 User ID:', data.user.id);
    
    // Also create entry in public.users table
    const { error: profileError } = await supabase
      .from('users')
      .upsert({
        id: data.user.id,
        email: 'admin@careerspark.com',
        name: 'CareerSpark Admin'
      });

    if (profileError) {
      console.warn('⚠️ Warning: Could not create user profile:', profileError.message);
    } else {
      console.log('✅ User profile created successfully!');
    }

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    
    if (error.message.includes('already registered')) {
      console.log('\n💡 Admin user already exists. You can use:');
      console.log('📧 Email: admin@careerspark.com');
      console.log('🔑 Password: Admin123!');
    }
  }
}

// Run the script
createAdminUser();