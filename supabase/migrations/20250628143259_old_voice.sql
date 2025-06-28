/*
  # Create users table and enhanced schema

  1. New Tables
    - `users` - Extended user profiles
    - `career_plans` - Enhanced career plans with more fields
    - `user_progress` - Track learning progress
    - `analytics` - Store analytics data
    - `cv_templates` - Store CV template data
    - `learning_resources` - Curated learning resources

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies
    - Create indexes for performance

  3. Functions
    - Trigger functions for updated_at
    - Analytics aggregation functions
*/

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text,
  avatar_url text,
  education_level text,
  location text,
  preferences jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enhanced career_plans table
DROP TABLE IF EXISTS career_plans;
CREATE TABLE career_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL DEFAULT 'My Career Plan',
  user_profile jsonb NOT NULL,
  career_recommendations jsonb NOT NULL DEFAULT '[]'::jsonb,
  skill_recommendations jsonb NOT NULL DEFAULT '[]'::jsonb,
  learning_plan jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  is_favorite boolean DEFAULT false,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User progress tracking
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  career_plan_id uuid REFERENCES career_plans(id) ON DELETE CASCADE NOT NULL,
  task_id text NOT NULL,
  task_type text NOT NULL CHECK (task_type IN ('learning', 'skill', 'project', 'milestone')),
  completed boolean DEFAULT false,
  completed_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(career_plan_id, task_id)
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  event_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  session_id text,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- CV Templates
CREATE TABLE IF NOT EXISTS cv_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  template_data jsonb NOT NULL,
  preview_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Learning Resources
CREATE TABLE IF NOT EXISTS learning_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  url text NOT NULL,
  resource_type text NOT NULL CHECK (resource_type IN ('course', 'tutorial', 'book', 'video', 'article', 'tool')),
  provider text,
  skill_tags text[] DEFAULT '{}',
  difficulty_level text CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  duration_hours integer,
  price_type text DEFAULT 'free' CHECK (price_type IN ('free', 'paid', 'freemium')),
  rating decimal(3,2),
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Career insights and trends
CREATE TABLE IF NOT EXISTS career_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_title text NOT NULL,
  industry text,
  location text,
  salary_min integer,
  salary_max integer,
  growth_rate decimal(5,2),
  demand_level text CHECK (demand_level IN ('low', 'medium', 'high', 'very_high')),
  required_skills text[] DEFAULT '{}',
  data_source text,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_insights ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

-- Career plans policies
CREATE POLICY "Users can view own career plans"
  ON career_plans FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own career plans"
  ON career_plans FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own career plans"
  ON career_plans FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own career plans"
  ON career_plans FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- User progress policies
CREATE POLICY "Users can manage own progress"
  ON user_progress FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Analytics policies (insert only for authenticated users)
CREATE POLICY "Users can insert analytics"
  ON analytics FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can view analytics"
  ON analytics FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- CV templates policies (read-only for users)
CREATE POLICY "Anyone can view active CV templates"
  ON cv_templates FOR SELECT TO authenticated
  USING (is_active = true);

-- Learning resources policies (read-only for users)
CREATE POLICY "Anyone can view learning resources"
  ON learning_resources FOR SELECT TO authenticated
  USING (true);

-- Career insights policies (read-only for users)
CREATE POLICY "Anyone can view career insights"
  ON career_insights FOR SELECT TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_career_plans_user_id ON career_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_career_plans_created_at ON career_plans(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_career_plans_status ON career_plans(status);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_career_plan_id ON user_progress(career_plan_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_learning_resources_skill_tags ON learning_resources USING GIN(skill_tags);
CREATE INDEX IF NOT EXISTS idx_career_insights_career_title ON career_insights(career_title);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_career_plans_updated_at
  BEFORE UPDATE ON career_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cv_templates_updated_at
  BEFORE UPDATE ON cv_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_resources_updated_at
  BEFORE UPDATE ON learning_resources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();