/*
  # Chatbot Knowledge Base Setup

  1. New Tables
    - `chatbot_knowledge`
      - `id` (uuid, primary key)
      - `category` (text) - Knowledge category
      - `question` (text) - Sample question
      - `answer` (text) - Response content
      - `keywords` (text[]) - Search keywords
      - `priority` (integer) - Response priority
      - `is_active` (boolean) - Active status
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `chatbot_knowledge` table
    - Add policy for authenticated users to view active knowledge

  3. Indexes
    - GIN index on keywords for fast searching

  4. Sample Data
    - Comprehensive knowledge base covering career topics
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

-- Enable RLS
ALTER TABLE chatbot_knowledge ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists and create new one
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chatbot_knowledge' 
    AND policyname = 'Anyone can view active knowledge'
  ) THEN
    DROP POLICY "Anyone can view active knowledge" ON chatbot_knowledge;
  END IF;
END $$;

CREATE POLICY "Anyone can view active knowledge"
  ON chatbot_knowledge
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create index for keyword searches
CREATE INDEX IF NOT EXISTS idx_chatbot_keywords 
  ON chatbot_knowledge USING gin (keywords);

-- Insert comprehensive knowledge base (only if table is empty)
INSERT INTO chatbot_knowledge (category, question, answer, keywords, priority)
SELECT * FROM (VALUES
  ('career_exploration', 'What career should I choose?', 'Choosing a career is an exciting journey! Here are some steps to help you decide:\n\n• **Assess your interests** - What activities make you lose track of time?\n• **Identify your strengths** - What are you naturally good at?\n• **Consider your values** - What''s important to you in work?\n• **Research opportunities** - What careers are growing in your area?\n\nWould you like to take our career assessment to get personalized recommendations?', ARRAY['career', 'choose', 'decide', 'what career'], 10),

  ('skill_development', 'What skills should I learn?', 'The best skills to learn depend on your career goals! Here are some universally valuable skills:\n\n**Tech Skills:**\n• Programming (Python, JavaScript)\n• Data analysis\n• Digital marketing\n• Cloud computing\n\n**Soft Skills:**\n• Communication\n• Problem-solving\n• Leadership\n• Adaptability\n\nWhat field interests you most? I can suggest specific skills for that area!', ARRAY['skills', 'learn', 'develop', 'what skills'], 9),

  ('job_search', 'How do I find a job?', 'Great question! Here''s a step-by-step approach to job searching:\n\n**1. Prepare Your Materials**\n• Update your CV/resume\n• Write compelling cover letters\n• Build a professional online presence\n\n**2. Search Strategically**\n• Use job boards (LinkedIn, Indeed)\n• Network with professionals\n• Apply directly to companies\n\n**3. Ace the Interview**\n• Research the company\n• Practice common questions\n• Prepare thoughtful questions\n\nNeed help with any specific part of this process?', ARRAY['job', 'find job', 'job search', 'employment'], 8),

  ('cv_resume', 'How do I write a good CV?', 'A great CV tells your professional story clearly! Here are the key elements:\n\n**Structure:**\n• Contact information\n• Professional summary\n• Work experience (reverse chronological)\n• Education\n• Skills\n• Additional sections (projects, certifications)\n\n**Tips:**\n• Tailor it to each job\n• Use action verbs\n• Quantify achievements\n• Keep it 1-2 pages\n• Proofread carefully\n\nWould you like help creating a CV for a specific career path?', ARRAY['cv', 'resume', 'write cv', 'curriculum vitae'], 7),

  ('interview_prep', 'How do I prepare for interviews?', 'Interview preparation is key to success! Here''s how to get ready:\n\n**Before the Interview:**\n• Research the company and role\n• Practice common questions\n• Prepare STAR method examples\n• Plan your outfit and route\n\n**During the Interview:**\n• Arrive 10-15 minutes early\n• Make eye contact and smile\n• Listen actively\n• Ask thoughtful questions\n\n**Common Questions to Practice:**\n• Tell me about yourself\n• Why do you want this job?\n• What are your strengths/weaknesses?\n• Where do you see yourself in 5 years?\n\nWant tips for specific types of interviews?', ARRAY['interview', 'interview prep', 'job interview', 'prepare interview'], 7),

  ('education', 'Should I go to university?', 'The decision to pursue higher education depends on your goals and circumstances:\n\n**University might be right if:**\n• Your target career requires a degree\n• You enjoy academic learning\n• You want to explore different subjects\n• You value the university experience\n\n**Alternatives to consider:**\n• Professional certifications\n• Bootcamps and intensive courses\n• Apprenticeships\n• Online learning platforms\n• Starting work and learning on the job\n\n**Questions to ask yourself:**\n• What career do I want?\n• What are the requirements?\n• What''s my financial situation?\n• How do I learn best?\n\nWhat specific career are you considering? I can help you understand the typical requirements.', ARRAY['university', 'college', 'education', 'degree', 'study'], 6),

  ('salary_negotiation', 'How do I negotiate salary?', 'Salary negotiation is an important skill! Here''s how to approach it:\n\n**Before Negotiating:**\n• Research market rates for your role\n• Document your achievements\n• Know your minimum acceptable offer\n• Consider the total compensation package\n\n**During Negotiation:**\n• Express enthusiasm for the role first\n• Present your research professionally\n• Focus on value you bring\n• Be prepared to discuss benefits too\n\n**Tips:**\n• Don''t accept the first offer immediately\n• Ask for time to consider if needed\n• Be professional and positive\n• Get the final offer in writing\n\nRemember: most employers expect some negotiation!', ARRAY['salary', 'negotiate', 'pay', 'compensation', 'money'], 5),

  ('remote_work', 'How do I find remote work?', 'Remote work opportunities are growing! Here''s how to find them:\n\n**Best Remote Job Boards:**\n• Remote.co\n• We Work Remotely\n• FlexJobs\n• AngelList (for startups)\n• LinkedIn (filter for remote)\n\n**Skills for Remote Success:**\n• Strong communication\n• Self-discipline\n• Time management\n• Tech proficiency\n• Collaboration tools knowledge\n\n**Application Tips:**\n• Highlight remote work experience\n• Emphasize communication skills\n• Show you have a proper workspace\n• Demonstrate self-motivation\n\nWhat type of remote work interests you most?', ARRAY['remote work', 'work from home', 'remote job', 'telecommute'], 5),

  ('career_change', 'How do I change careers?', 'Career changes can be exciting and rewarding! Here''s a strategic approach:\n\n**1. Self-Assessment**\n• Identify what you want to change\n• Clarify your new career goals\n• Assess transferable skills\n\n**2. Research & Plan**\n• Explore your target industry\n• Identify skill gaps\n• Network with professionals\n• Consider gradual transitions\n\n**3. Skill Development**\n• Take relevant courses\n• Gain experience through projects\n• Volunteer in your target field\n• Build a portfolio\n\n**4. Make the Transition**\n• Update your CV for the new field\n• Leverage your network\n• Consider entry-level positions\n• Be patient with the process\n\nWhat career are you considering moving into?', ARRAY['career change', 'switch careers', 'new career', 'transition'], 6),

  ('networking', 'How do I network effectively?', 'Networking is about building genuine relationships! Here''s how to do it well:\n\n**Online Networking:**\n• Optimize your LinkedIn profile\n• Join professional groups\n• Share valuable content\n• Comment thoughtfully on posts\n• Reach out with personalized messages\n\n**Offline Networking:**\n• Attend industry events\n• Join professional associations\n• Participate in meetups\n• Volunteer for causes you care about\n• Ask for informational interviews\n\n**Networking Mindset:**\n• Focus on helping others first\n• Be genuine and authentic\n• Follow up consistently\n• Maintain relationships long-term\n• Quality over quantity\n\nRemember: networking is about mutual benefit, not just asking for favors!', ARRAY['networking', 'network', 'professional connections', 'linkedin'], 5)
) AS v(category, question, answer, keywords, priority)
WHERE NOT EXISTS (SELECT 1 FROM chatbot_knowledge LIMIT 1);

-- Create or replace trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at (drop if exists first)
DROP TRIGGER IF EXISTS update_chatbot_knowledge_updated_at ON chatbot_knowledge;
CREATE TRIGGER update_chatbot_knowledge_updated_at
    BEFORE UPDATE ON chatbot_knowledge
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();