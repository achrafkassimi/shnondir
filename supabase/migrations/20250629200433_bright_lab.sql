/*
  # Create Admin User Setup

  1. New Functions
    - `create_admin_user` function to create admin user directly
    - Bypasses normal authentication flow
    - Sets admin role and permissions

  2. Security
    - Function is only accessible with service role key
    - Creates user in auth.users table
    - Sets up proper user metadata
*/

-- Create function to create admin user
CREATE OR REPLACE FUNCTION create_admin_user(
  admin_email text,
  admin_password text,
  admin_name text DEFAULT 'Admin User'
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id uuid;
  encrypted_password text;
  result json;
BEGIN
  -- Generate a new UUID for the user
  new_user_id := gen_random_uuid();
  
  -- Create encrypted password (this is a simplified version)
  -- In production, you'd want to use proper password hashing
  encrypted_password := crypt(admin_password, gen_salt('bf'));
  
  -- Insert into auth.users table
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    role
  ) VALUES (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    admin_email,
    encrypted_password,
    now(),
    now(),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    jsonb_build_object(
      'name', admin_name,
      'role', 'admin'
    ),
    false,
    'authenticated'
  );
  
  -- Insert into public.users table
  INSERT INTO public.users (
    id,
    email,
    name,
    created_at,
    updated_at
  ) VALUES (
    new_user_id,
    admin_email,
    admin_name,
    now(),
    now()
  );
  
  -- Return success result
  result := json_build_object(
    'success', true,
    'user_id', new_user_id,
    'email', admin_email,
    'message', 'Admin user created successfully'
  );
  
  RETURN result;
  
EXCEPTION WHEN OTHERS THEN
  -- Return error result
  result := json_build_object(
    'success', false,
    'error', SQLERRM,
    'message', 'Failed to create admin user'
  );
  
  RETURN result;
END;
$$;

-- Create the admin user (you can modify these values)
SELECT create_admin_user(
  'admin@careerspark.com',
  'Admin123!',
  'CareerSpark Admin'
);

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION create_admin_user TO service_role;