/*
  # Chatbot Knowledge Base Setup

  1. New Tables
    - `chatbot_knowledge`
      - `id` (uuid, primary key)
      - `category` (text)
      - `question` (text)
      - `answer` (text)
      - `keywords` (text array)
      - `priority` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `chatbot_knowledge` table
    - Add policy for public read access to active knowledge

  3. Sample Data
    - Insert comprehensive career guidance knowledge base
*/

-- Create chatbot_knowledge table if it doesn't exist
CREATE TABLE IF NOT EXISTS chatbot_knowledge (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  question text NOT NULL,
  answer text NOT NULL,
  keywords text[] DEFAULT '{}',
  priority integer DEFAULT 1,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_class c 
    JOIN pg_namespace n ON n.oid = c.relnamespace 
    WHERE c.relname = 'chatbot_knowledge' 
    AND n.nspname = 'public' 
    AND c.relrowsecurity = true
  ) THEN
    ALTER TABLE chatbot_knowledge ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Drop existing policy if it exists and recreate it
DROP POLICY IF EXISTS "Anyone can view active knowledge" ON chatbot_knowledge;

CREATE POLICY "Anyone can view active knowledge"
  ON chatbot_knowledge
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create index for keyword searches if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_chatbot_keywords 
  ON chatbot_knowledge USING gin (keywords);

-- Create or replace the trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists and recreate it
DROP TRIGGER IF EXISTS update_chatbot_knowledge_updated_at ON chatbot_knowledge;

CREATE TRIGGER update_chatbot_knowledge_updated_at
    BEFORE UPDATE ON chatbot_knowledge
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Clear existing data and insert fresh knowledge base
DELETE FROM chatbot_knowledge WHERE category IN (
  'career_exploration', 'skill_development', 'job_search', 'cv_resume', 
  'interview_prep', 'education', 'salary_negotiation', 'remote_work', 
  'career_change', 'networking'
);

-- Insert comprehensive knowledge base
INSERT INTO chatbot_knowledge (category, question, answer, keywords, priority) VALUES
('career_exploration', 'What career should I choose?', 'Choosing a career is an exciting journey! Here are some steps to help you decide:

• **Assess your interests** - What activities make you lose track of time?
• **Identify your strengths** - What are you naturally good at?
• **Consider your values** - What''s important to you in work?
• **Research opportunities** - What careers are growing in your area?

Would you like to take our career assessment to get personalized recommendations?', ARRAY['career', 'choose', 'decide', 'what career'], 10),

('skill_development', 'What skills should I learn?', 'The best skills to learn depend on your career goals! Here are some universally valuable skills:

**Tech Skills:**
• Programming (Python, JavaScript)
• Data analysis
• Digital marketing
• Cloud computing

**Soft Skills:**
• Communication
• Problem-solving
• Leadership
• Adaptability

What field interests you most? I can suggest specific skills for that area!', ARRAY['skills', 'learn', 'develop', 'what skills'], 9),

('job_search', 'How do I find a job?', 'Great question! Here''s a step-by-step approach to job searching:

**1. Prepare Your Materials**
• Update your CV/resume
• Write compelling cover letters
• Build a professional online presence

**2. Search Strategically**
• Use job boards (LinkedIn, Indeed)
• Network with professionals
• Apply directly to companies

**3. Ace the Interview**
• Research the company
• Practice common questions
• Prepare thoughtful questions

Need help with any specific part of this process?', ARRAY['job', 'find job', 'job search', 'employment'], 8),

('cv_resume', 'How do I write a good CV?', 'A great CV tells your professional story clearly! Here are the key elements:

**Structure:**
• Contact information
• Professional summary
• Work experience (reverse chronological)
• Education
• Skills
• Additional sections (projects, certifications)

**Tips:**
• Tailor it to each job
• Use action verbs
• Quantify achievements
• Keep it 1-2 pages
• Proofread carefully

Would you like help creating a CV for a specific career path?', ARRAY['cv', 'resume', 'write cv', 'curriculum vitae'], 7),

('interview_prep', 'How do I prepare for interviews?', 'Interview preparation is key to success! Here''s how to get ready:

**Before the Interview:**
• Research the company and role
• Practice common questions
• Prepare STAR method examples
• Plan your outfit and route

**During the Interview:**
• Arrive 10-15 minutes early
• Make eye contact and smile
• Listen actively
• Ask thoughtful questions

**Common Questions to Practice:**
• Tell me about yourself
• Why do you want this job?
• What are your strengths/weaknesses?
• Where do you see yourself in 5 years?

Want tips for specific types of interviews?', ARRAY['interview', 'interview prep', 'job interview', 'prepare interview'], 7),

('education', 'Should I go to university?', 'The decision to pursue higher education depends on your goals and circumstances:

**University might be right if:**
• Your target career requires a degree
• You enjoy academic learning
• You want to explore different subjects
• You value the university experience

**Alternatives to consider:**
• Professional certifications
• Bootcamps and intensive courses
• Apprenticeships
• Online learning platforms
• Starting work and learning on the job

**Questions to ask yourself:**
• What career do I want?
• What are the requirements?
• What''s my financial situation?
• How do I learn best?

What specific career are you considering? I can help you understand the typical requirements.', ARRAY['university', 'college', 'education', 'degree', 'study'], 6),

('salary_negotiation', 'How do I negotiate salary?', 'Salary negotiation is an important skill! Here''s how to approach it:

**Before Negotiating:**
• Research market rates for your role
• Document your achievements
• Know your minimum acceptable offer
• Consider the total compensation package

**During Negotiation:**
• Express enthusiasm for the role first
• Present your research professionally
• Focus on value you bring
• Be prepared to discuss benefits too

**Tips:**
• Don''t accept the first offer immediately
• Ask for time to consider if needed
• Be professional and positive
• Get the final offer in writing

Remember: most employers expect some negotiation!', ARRAY['salary', 'negotiate', 'pay', 'compensation', 'money'], 5),

('remote_work', 'How do I find remote work?', 'Remote work opportunities are growing! Here''s how to find them:

**Best Remote Job Boards:**
• Remote.co
• We Work Remotely
• FlexJobs
• AngelList (for startups)
• LinkedIn (filter for remote)

**Skills for Remote Success:**
• Strong communication
• Self-discipline
• Time management
• Tech proficiency
• Collaboration tools knowledge

**Application Tips:**
• Highlight remote work experience
• Emphasize communication skills
• Show you have a proper workspace
• Demonstrate self-motivation

What type of remote work interests you most?', ARRAY['remote work', 'work from home', 'remote job', 'telecommute'], 5),

('career_change', 'How do I change careers?', 'Career changes can be exciting and rewarding! Here''s a strategic approach:

**1. Self-Assessment**
• Identify what you want to change
• Clarify your new career goals
• Assess transferable skills

**2. Research & Plan**
• Explore your target industry
• Identify skill gaps
• Network with professionals
• Consider gradual transitions

**3. Skill Development**
• Take relevant courses
• Gain experience through projects
• Volunteer in your target field
• Build a portfolio

**4. Make the Transition**
• Update your CV for the new field
• Leverage your network
• Consider entry-level positions
• Be patient with the process

What career are you considering moving into?', ARRAY['career change', 'switch careers', 'new career', 'transition'], 6),

('networking', 'How do I network effectively?', 'Networking is about building genuine relationships! Here''s how to do it well:

**Online Networking:**
• Optimize your LinkedIn profile
• Join professional groups
• Share valuable content
• Comment thoughtfully on posts
• Reach out with personalized messages

**Offline Networking:**
• Attend industry events
• Join professional associations
• Participate in meetups
• Volunteer for causes you care about
• Ask for informational interviews

**Networking Mindset:**
• Focus on helping others first
• Be genuine and authentic
• Follow up consistently
• Maintain relationships long-term
• Quality over quantity

Remember: networking is about mutual benefit, not just asking for favors!', ARRAY['networking', 'network', 'professional connections', 'linkedin'], 5);