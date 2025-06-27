/*
  # Create career plans table

  1. New Tables
    - `career_plans`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `user_profile` (jsonb, stores user profile data)
      - `career_recommendations` (jsonb, stores career recommendations)
      - `skill_recommendations` (jsonb, stores skill recommendations)
      - `learning_plan` (jsonb, stores learning plan)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `career_plans` table
    - Add policies for authenticated users to manage their own career plans
*/

CREATE TABLE IF NOT EXISTS career_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_profile jsonb NOT NULL,
  career_recommendations jsonb NOT NULL DEFAULT '[]'::jsonb,
  skill_recommendations jsonb NOT NULL DEFAULT '[]'::jsonb,
  learning_plan jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE career_plans ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own career plans"
  ON career_plans
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own career plans"
  ON career_plans
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own career plans"
  ON career_plans
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own career plans"
  ON career_plans
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_career_plans_updated_at
  BEFORE UPDATE ON career_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();