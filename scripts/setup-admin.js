import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  console.error('Please ensure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
  process.exit(1);
}

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    // Create the admin user
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
      if (authError.message.includes('already registered')) {
        console.log('Admin user already exists');
        return;
      }
      throw authError;
    }

    console.log('Admin user created successfully:', authData.user.email);

    // Create user profile
    const { error: profileError } = await supabase
      .from('users')
      .insert({
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
      });

    if (profileError) {
      console.warn('Could not create user profile:', profileError.message);
    } else {
      console.log('Admin user profile created successfully');
    }

    console.log('\n✅ Setup complete!');
    console.log('You can now login with:');
    console.log('Email: admin@careerspark.com');
    console.log('Password: Admin123!');

  } catch (error) {
    console.error('Error creating admin user:', error.message);
    process.exit(1);
  }
}

createAdminUser();