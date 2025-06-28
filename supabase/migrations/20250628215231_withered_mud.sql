/*
  # Populate Training Data for Career Plan Generation

  1. Career Insights Data
    - Add comprehensive career information for various fields
    - Include salary ranges, growth rates, demand levels, and required skills
    - Cover technology, business, healthcare, education, and creative fields

  2. Learning Resources Data
    - Add curated learning resources for skill development
    - Include courses, tutorials, books, and tools
    - Map resources to specific skills with difficulty levels and ratings

  3. CV Templates Data
    - Add professional CV templates for different career paths
    - Include modern, classic, and creative template options

  4. Chatbot Knowledge Base
    - Add FAQ data for the chatbot to provide helpful career guidance
    - Include common questions about career planning, skills, and job search
*/

-- Insert Career Insights Data
INSERT INTO career_insights (career_title, industry, location, salary_min, salary_max, growth_rate, demand_level, required_skills, data_source) VALUES
-- Technology Careers
('Software Developer', 'Technology', 'Morocco', 35000, 80000, 15.5, 'very_high', ARRAY['JavaScript', 'Python', 'React', 'SQL', 'Git', 'Problem Solving'], 'Market Research 2024'),
('Data Scientist', 'Technology', 'Morocco', 45000, 90000, 18.2, 'very_high', ARRAY['Python', 'Machine Learning', 'SQL', 'Statistics', 'Tableau', 'R'], 'Market Research 2024'),
('UX/UI Designer', 'Technology', 'Morocco', 30000, 70000, 12.8, 'high', ARRAY['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'HTML/CSS', 'Design Thinking'], 'Market Research 2024'),
('DevOps Engineer', 'Technology', 'Morocco', 40000, 85000, 16.3, 'very_high', ARRAY['Docker', 'Kubernetes', 'AWS', 'Linux', 'CI/CD', 'Terraform'], 'Market Research 2024'),
('Cybersecurity Analyst', 'Technology', 'Morocco', 38000, 82000, 14.7, 'very_high', ARRAY['Network Security', 'Penetration Testing', 'CISSP', 'Incident Response', 'Risk Assessment', 'Compliance'], 'Market Research 2024'),
('Mobile App Developer', 'Technology', 'Morocco', 32000, 75000, 13.9, 'high', ARRAY['React Native', 'Flutter', 'Swift', 'Kotlin', 'Mobile UI/UX', 'API Integration'], 'Market Research 2024'),

-- Business & Finance Careers
('Digital Marketing Specialist', 'Marketing', 'Morocco', 25000, 60000, 11.5, 'high', ARRAY['SEO', 'Social Media', 'Google Analytics', 'Content Creation', 'Email Marketing', 'PPC'], 'Market Research 2024'),
('Product Manager', 'Business', 'Morocco', 50000, 95000, 13.2, 'high', ARRAY['Product Strategy', 'Agile', 'Market Research', 'Analytics', 'Leadership', 'Communication'], 'Market Research 2024'),
('Business Analyst', 'Business', 'Morocco', 35000, 70000, 10.8, 'medium', ARRAY['Excel', 'SQL', 'Business Intelligence', 'Process Mapping', 'Requirements Analysis', 'Stakeholder Management'], 'Market Research 2024'),
('Financial Analyst', 'Finance', 'Morocco', 40000, 75000, 9.5, 'medium', ARRAY['Financial Modeling', 'Excel', 'Bloomberg', 'Risk Analysis', 'Accounting', 'Investment Analysis'], 'Market Research 2024'),
('Project Manager', 'Business', 'Morocco', 45000, 80000, 8.7, 'medium', ARRAY['PMP', 'Agile', 'Scrum', 'Risk Management', 'Budget Management', 'Team Leadership'], 'Market Research 2024'),

-- Healthcare Careers
('Nurse', 'Healthcare', 'Morocco', 28000, 55000, 7.2, 'high', ARRAY['Patient Care', 'Medical Knowledge', 'Communication', 'Emergency Response', 'Documentation', 'Teamwork'], 'Market Research 2024'),
('Pharmacist', 'Healthcare', 'Morocco', 45000, 75000, 6.8, 'medium', ARRAY['Pharmaceutical Knowledge', 'Patient Counseling', 'Drug Interactions', 'Regulatory Compliance', 'Inventory Management', 'Communication'], 'Market Research 2024'),
('Physical Therapist', 'Healthcare', 'Morocco', 35000, 65000, 8.9, 'high', ARRAY['Anatomy', 'Rehabilitation Techniques', 'Patient Assessment', 'Treatment Planning', 'Manual Therapy', 'Communication'], 'Market Research 2024'),

-- Education Careers
('Teacher', 'Education', 'Morocco', 22000, 45000, 5.5, 'medium', ARRAY['Curriculum Development', 'Classroom Management', 'Educational Technology', 'Assessment', 'Communication', 'Patience'], 'Market Research 2024'),
('Training Specialist', 'Education', 'Morocco', 30000, 60000, 7.8, 'medium', ARRAY['Instructional Design', 'Adult Learning', 'Presentation Skills', 'E-Learning', 'Assessment', 'Communication'], 'Market Research 2024'),

-- Creative Careers
('Graphic Designer', 'Creative', 'Morocco', 25000, 55000, 6.2, 'medium', ARRAY['Adobe Creative Suite', 'Typography', 'Branding', 'Layout Design', 'Color Theory', 'Client Communication'], 'Market Research 2024'),
('Content Writer', 'Creative', 'Morocco', 20000, 50000, 8.1, 'medium', ARRAY['Writing', 'SEO', 'Research', 'Content Strategy', 'Social Media', 'Editing'], 'Market Research 2024'),
('Video Editor', 'Creative', 'Morocco', 28000, 60000, 9.3, 'medium', ARRAY['Adobe Premiere', 'After Effects', 'Color Grading', 'Audio Editing', 'Storytelling', 'Motion Graphics'], 'Market Research 2024')

ON CONFLICT (id) DO NOTHING;

-- Insert Learning Resources Data
INSERT INTO learning_resources (title, description, url, resource_type, provider, skill_tags, difficulty_level, duration_hours, price_type, rating, is_featured) VALUES
-- Programming & Development
('Complete JavaScript Course', 'Master JavaScript from basics to advanced concepts with hands-on projects', 'https://www.udemy.com/course/the-complete-javascript-course/', 'course', 'Udemy', ARRAY['JavaScript', 'Web Development', 'Programming'], 'beginner', 52, 'paid', 4.7, true),
('Python for Everybody', 'Learn Python programming from scratch with practical examples', 'https://www.coursera.org/specializations/python', 'course', 'Coursera', ARRAY['Python', 'Programming', 'Data Science'], 'beginner', 40, 'freemium', 4.8, true),
('React Documentation', 'Official React documentation and tutorials', 'https://react.dev/', 'tutorial', 'Meta', ARRAY['React', 'JavaScript', 'Frontend'], 'intermediate', 20, 'free', 4.9, true),
('SQL Tutorial', 'Interactive SQL tutorial for beginners', 'https://www.w3schools.com/sql/', 'tutorial', 'W3Schools', ARRAY['SQL', 'Database', 'Backend'], 'beginner', 15, 'free', 4.5, false),
('Git Version Control', 'Learn Git and GitHub for version control', 'https://git-scm.com/doc', 'tutorial', 'Git', ARRAY['Git', 'Version Control', 'Development'], 'beginner', 10, 'free', 4.6, false),

-- Data Science & Analytics
('Data Science Specialization', 'Complete data science program with R and Python', 'https://www.coursera.org/specializations/jhu-data-science', 'course', 'Johns Hopkins', ARRAY['Data Science', 'R', 'Python', 'Statistics'], 'intermediate', 120, 'paid', 4.6, true),
('Machine Learning Course', 'Stanford Machine Learning course by Andrew Ng', 'https://www.coursera.org/learn/machine-learning', 'course', 'Stanford', ARRAY['Machine Learning', 'Python', 'AI'], 'intermediate', 60, 'freemium', 4.9, true),
('Tableau Training', 'Learn data visualization with Tableau', 'https://www.tableau.com/learn/training', 'course', 'Tableau', ARRAY['Tableau', 'Data Visualization', 'Analytics'], 'beginner', 25, 'freemium', 4.4, false),
('Excel for Data Analysis', 'Advanced Excel techniques for data analysis', 'https://www.microsoft.com/en-us/microsoft-365/excel', 'course', 'Microsoft', ARRAY['Excel', 'Data Analysis', 'Business'], 'beginner', 20, 'paid', 4.3, false),

-- Design & UX
('UX Design Fundamentals', 'Complete guide to user experience design', 'https://www.interaction-design.org/', 'course', 'IxDF', ARRAY['UX Design', 'User Research', 'Prototyping'], 'beginner', 35, 'freemium', 4.5, true),
('Figma Masterclass', 'Learn Figma for UI/UX design', 'https://www.figma.com/academy/', 'tutorial', 'Figma', ARRAY['Figma', 'UI Design', 'Prototyping'], 'beginner', 15, 'free', 4.7, true),
('Adobe Creative Suite', 'Master Photoshop, Illustrator, and InDesign', 'https://www.adobe.com/creativecloud/learn.html', 'course', 'Adobe', ARRAY['Adobe Creative Suite', 'Graphic Design', 'Digital Art'], 'intermediate', 45, 'paid', 4.4, false),

-- Marketing & Business
('Digital Marketing Course', 'Complete digital marketing certification', 'https://www.google.com/skillshop/course/103', 'course', 'Google', ARRAY['Digital Marketing', 'SEO', 'PPC', 'Analytics'], 'beginner', 30, 'free', 4.6, true),
('SEO Fundamentals', 'Learn search engine optimization basics', 'https://moz.com/beginners-guide-to-seo', 'tutorial', 'Moz', ARRAY['SEO', 'Content Marketing', 'Web Analytics'], 'beginner', 12, 'free', 4.5, false),
('Social Media Marketing', 'Master social media marketing strategies', 'https://www.hootsuite.com/academy', 'course', 'Hootsuite', ARRAY['Social Media', 'Content Creation', 'Marketing'], 'beginner', 18, 'freemium', 4.3, false),
('Google Analytics', 'Learn web analytics with Google Analytics', 'https://analytics.google.com/analytics/academy/', 'course', 'Google', ARRAY['Google Analytics', 'Web Analytics', 'Data Analysis'], 'beginner', 16, 'free', 4.7, false),

-- Project Management & Leadership
('PMP Certification Prep', 'Prepare for Project Management Professional certification', 'https://www.pmi.org/', 'course', 'PMI', ARRAY['Project Management', 'PMP', 'Leadership'], 'intermediate', 50, 'paid', 4.5, false),
('Agile and Scrum', 'Learn Agile methodologies and Scrum framework', 'https://www.scrum.org/resources', 'course', 'Scrum.org', ARRAY['Agile', 'Scrum', 'Project Management'], 'beginner', 20, 'freemium', 4.6, false),
('Leadership Skills', 'Develop essential leadership and management skills', 'https://www.linkedin.com/learning/', 'course', 'LinkedIn Learning', ARRAY['Leadership', 'Management', 'Communication'], 'intermediate', 25, 'paid', 4.4, false),

-- Soft Skills
('Communication Skills', 'Improve verbal and written communication', 'https://www.coursera.org/learn/wharton-communication-skills', 'course', 'Wharton', ARRAY['Communication', 'Presentation', 'Writing'], 'beginner', 15, 'freemium', 4.5, false),
('Problem Solving', 'Develop critical thinking and problem-solving skills', 'https://www.edx.org/course/critical-thinking', 'course', 'edX', ARRAY['Problem Solving', 'Critical Thinking', 'Logic'], 'beginner', 12, 'free', 4.3, false),
('Time Management', 'Master productivity and time management techniques', 'https://www.skillshare.com/browse/productivity', 'course', 'Skillshare', ARRAY['Time Management', 'Productivity', 'Organization'], 'beginner', 8, 'paid', 4.2, false)

ON CONFLICT (id) DO NOTHING;

-- Insert CV Templates Data
INSERT INTO cv_templates (name, description, category, template_data, is_active) VALUES
('Modern Professional', 'Clean and modern CV template perfect for tech professionals', 'technology', '{
  "layout": "modern",
  "colors": {"primary": "#2563eb", "secondary": "#64748b"},
  "sections": ["header", "summary", "experience", "education", "skills", "projects"],
  "fonts": {"heading": "Inter", "body": "Inter"},
  "style": "minimal"
}', true),

('Creative Designer', 'Visually appealing template for creative professionals', 'creative', '{
  "layout": "creative",
  "colors": {"primary": "#7c3aed", "secondary": "#a855f7"},
  "sections": ["header", "portfolio", "experience", "education", "skills", "awards"],
  "fonts": {"heading": "Poppins", "body": "Open Sans"},
  "style": "colorful"
}', true),

('Business Executive', 'Professional template for business and management roles', 'business', '{
  "layout": "executive",
  "colors": {"primary": "#1f2937", "secondary": "#6b7280"},
  "sections": ["header", "summary", "experience", "education", "achievements", "skills"],
  "fonts": {"heading": "Roboto", "body": "Roboto"},
  "style": "formal"
}', true),

('Healthcare Professional', 'Clean template designed for healthcare workers', 'healthcare', '{
  "layout": "healthcare",
  "colors": {"primary": "#059669", "secondary": "#10b981"},
  "sections": ["header", "summary", "experience", "education", "certifications", "skills"],
  "fonts": {"heading": "Source Sans Pro", "body": "Source Sans Pro"},
  "style": "clean"
}', true),

('Academic Researcher', 'Comprehensive template for academic and research positions', 'education', '{
  "layout": "academic",
  "colors": {"primary": "#dc2626", "secondary": "#ef4444"},
  "sections": ["header", "summary", "education", "research", "publications", "experience", "skills"],
  "fonts": {"heading": "Merriweather", "body": "Source Serif Pro"},
  "style": "traditional"
}', true)

ON CONFLICT (id) DO NOTHING;

-- Insert Chatbot Knowledge Base
INSERT INTO chatbot_knowledge (category, question, answer, keywords, priority, is_active) VALUES
('career_planning', 'How do I choose the right career path?', 'Choosing the right career involves self-assessment of your interests, skills, values, and goals. Consider taking career assessments, researching different industries, talking to professionals in fields that interest you, and gaining experience through internships or volunteering. Our career analysis tool can help you discover paths that match your profile.', ARRAY['career choice', 'career path', 'career decision', 'choosing career'], 5, true),

('career_planning', 'What skills are most in demand in 2024?', 'The most in-demand skills for 2024 include: Technical skills like AI/Machine Learning, Cloud Computing, Cybersecurity, Data Analysis, and Software Development. Soft skills like Critical Thinking, Creativity, Leadership, Emotional Intelligence, and Adaptability are also highly valued. Digital literacy and remote work capabilities remain essential across all industries.', ARRAY['in-demand skills', 'skills 2024', 'job market', 'trending skills'], 5, true),

('job_search', 'How can I improve my CV/Resume?', 'To improve your CV: 1) Tailor it to each job application, 2) Use action verbs and quantify achievements, 3) Keep it concise (1-2 pages), 4) Include relevant keywords from job descriptions, 5) Ensure clean formatting and no typos, 6) Highlight your most relevant experience first, 7) Include a professional summary. Our CV generator can help create a professional CV tailored to your career goals.', ARRAY['CV improvement', 'resume tips', 'CV writing', 'resume writing'], 4, true),

('job_search', 'How do I prepare for job interviews?', 'Interview preparation tips: 1) Research the company and role thoroughly, 2) Practice common interview questions, 3) Prepare specific examples using the STAR method, 4) Dress appropriately, 5) Prepare thoughtful questions to ask, 6) Practice good body language, 7) Arrive early, 8) Follow up with a thank-you email. Mock interviews can help build confidence.', ARRAY['interview preparation', 'job interview', 'interview tips', 'interview questions'], 4, true),

('skills_development', 'How long does it take to learn programming?', 'Learning programming basics can take 3-6 months with consistent practice. To become job-ready typically takes 6-12 months of dedicated learning. Factors affecting timeline include: your background, time commitment (recommended 2-3 hours daily), chosen language, and learning method. Focus on building projects to demonstrate your skills to employers.', ARRAY['learn programming', 'coding bootcamp', 'programming timeline', 'software development'], 3, true),

('skills_development', 'What are the best ways to learn new skills?', 'Effective skill learning strategies: 1) Set clear, specific goals, 2) Use multiple learning methods (videos, books, practice), 3) Practice regularly and consistently, 4) Build real projects, 5) Join communities and find mentors, 6) Teach others what you learn, 7) Get feedback and iterate. Online platforms, bootcamps, and hands-on projects are particularly effective.', ARRAY['skill learning', 'learning methods', 'skill development', 'education'], 3, true),

('career_change', 'How do I change careers successfully?', 'Successful career change steps: 1) Assess your transferable skills, 2) Research your target industry thoroughly, 3) Identify skill gaps and create a learning plan, 4) Network with professionals in your target field, 5) Consider transitional roles, 6) Update your CV to highlight relevant experience, 7) Be prepared for potential salary adjustments initially. Career coaching can provide personalized guidance.', ARRAY['career change', 'career transition', 'switching careers', 'career pivot'], 4, true),

('salary_negotiation', 'How do I negotiate my salary?', 'Salary negotiation tips: 1) Research market rates for your role and location, 2) Document your achievements and value, 3) Practice your pitch, 4) Consider the total compensation package, 5) Be confident but respectful, 6) Have a specific number in mind, 7) Be prepared to walk away if needed. Timing is important - negotiate after receiving an offer, not during initial interviews.', ARRAY['salary negotiation', 'pay raise', 'compensation', 'salary increase'], 3, true),

('remote_work', 'How can I find remote work opportunities?', 'Finding remote work: 1) Use remote-specific job boards (Remote.co, We Work Remotely, FlexJobs), 2) Filter for remote options on traditional job sites, 3) Network with remote workers, 4) Develop strong digital communication skills, 5) Create a professional home office setup, 6) Highlight remote work experience, 7) Consider freelancing as a starting point. Many companies now offer hybrid or fully remote positions.', ARRAY['remote work', 'work from home', 'remote jobs', 'telecommuting'], 3, true),

('entrepreneurship', 'How do I start my own business?', 'Starting a business: 1) Validate your business idea with market research, 2) Create a business plan, 3) Secure funding (savings, loans, investors), 4) Choose a business structure, 5) Register your business and get necessary licenses, 6) Set up accounting and legal systems, 7) Build your product/service, 8) Develop a marketing strategy, 9) Launch and iterate based on feedback. Consider starting small and scaling gradually.', ARRAY['start business', 'entrepreneurship', 'business startup', 'small business'], 2, true)

ON CONFLICT (id) DO NOTHING;