/*
  # Seed data for CareerSpark

  1. CV Templates
  2. Learning Resources
  3. Career Insights
  4. Sample data for testing
*/

-- Insert CV Templates
INSERT INTO cv_templates (name, description, category, template_data, preview_url) VALUES
('Modern Tech Resume', 'Clean, modern template perfect for software developers and tech professionals', 'technology', 
 '{"sections": ["header", "summary", "experience", "skills", "projects", "education"], "style": "modern", "colors": ["#2563eb", "#1e40af"]}', 
 '/templates/modern-tech-preview.jpg'),
 
('Creative Designer CV', 'Visually appealing template for designers and creative professionals', 'design', 
 '{"sections": ["header", "portfolio", "experience", "skills", "education"], "style": "creative", "colors": ["#7c3aed", "#5b21b6"]}', 
 '/templates/creative-designer-preview.jpg'),
 
('Business Professional', 'Traditional, professional template for business and finance roles', 'business', 
 '{"sections": ["header", "summary", "experience", "education", "skills", "certifications"], "style": "traditional", "colors": ["#059669", "#047857"]}', 
 '/templates/business-professional-preview.jpg'),
 
('Healthcare Specialist', 'Professional template tailored for healthcare and medical professionals', 'healthcare', 
 '{"sections": ["header", "summary", "experience", "education", "certifications", "skills"], "style": "professional", "colors": ["#dc2626", "#b91c1c"]}', 
 '/templates/healthcare-specialist-preview.jpg');

-- Insert Learning Resources
INSERT INTO learning_resources (title, description, url, resource_type, provider, skill_tags, difficulty_level, duration_hours, price_type, rating, is_featured) VALUES
-- Programming Resources
('Complete JavaScript Course', 'Comprehensive JavaScript course from basics to advanced concepts', 'https://www.udemy.com/course/the-complete-javascript-course/', 'course', 'Udemy', ARRAY['javascript', 'programming', 'web-development'], 'beginner', 69, 'paid', 4.7, true),
('freeCodeCamp JavaScript', 'Free interactive JavaScript curriculum with projects', 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', 'course', 'freeCodeCamp', ARRAY['javascript', 'programming'], 'beginner', 300, 'free', 4.8, true),
('React Official Tutorial', 'Official React documentation and tutorial', 'https://react.dev/learn', 'tutorial', 'Meta', ARRAY['react', 'javascript', 'frontend'], 'intermediate', 20, 'free', 4.9, true),
('Python for Everybody', 'University of Michigan Python course on Coursera', 'https://www.coursera.org/specializations/python', 'course', 'Coursera', ARRAY['python', 'programming'], 'beginner', 120, 'freemium', 4.8, true),

-- Design Resources
('UI/UX Design Fundamentals', 'Complete guide to user interface and experience design', 'https://www.coursera.org/learn/ui-ux-design', 'course', 'Coursera', ARRAY['ui-design', 'ux-design', 'figma'], 'beginner', 40, 'freemium', 4.6, true),
('Figma Masterclass', 'Complete Figma course for UI/UX designers', 'https://www.youtube.com/watch?v=FTlczfBs-Vg', 'video', 'YouTube', ARRAY['figma', 'ui-design'], 'beginner', 8, 'free', 4.7, false),
('Adobe Creative Suite', 'Comprehensive Adobe Creative Cloud training', 'https://helpx.adobe.com/creative-cloud/tutorials.html', 'tutorial', 'Adobe', ARRAY['photoshop', 'illustrator', 'design'], 'intermediate', 50, 'free', 4.5, false),

-- Data Science Resources
('Data Science with Python', 'Complete data science bootcamp with Python', 'https://www.kaggle.com/learn/python', 'course', 'Kaggle', ARRAY['python', 'data-science', 'pandas'], 'intermediate', 30, 'free', 4.7, true),
('Machine Learning Course', 'Andrew Ng''s famous machine learning course', 'https://www.coursera.org/learn/machine-learning', 'course', 'Coursera', ARRAY['machine-learning', 'python', 'ai'], 'intermediate', 60, 'freemium', 4.9, true),
('SQL for Data Analysis', 'Learn SQL for data analysis and database management', 'https://www.codecademy.com/learn/sql', 'course', 'Codecademy', ARRAY['sql', 'database', 'data-analysis'], 'beginner', 25, 'freemium', 4.6, false),

-- Business Resources
('Digital Marketing Fundamentals', 'Complete digital marketing course covering all channels', 'https://www.google.com/skillshop/course/digital-marketing', 'course', 'Google', ARRAY['digital-marketing', 'seo', 'social-media'], 'beginner', 40, 'free', 4.5, true),
('Project Management Professional', 'PMP certification preparation course', 'https://www.pmi.org/learning/training-development', 'course', 'PMI', ARRAY['project-management', 'leadership'], 'intermediate', 80, 'paid', 4.7, false),
('Excel for Business', 'Advanced Excel skills for business professionals', 'https://www.coursera.org/learn/excel-basics-data-analysis-ibm', 'course', 'Coursera', ARRAY['excel', 'data-analysis', 'business'], 'beginner', 20, 'freemium', 4.4, false);

-- Insert Career Insights
INSERT INTO career_insights (career_title, industry, location, salary_min, salary_max, growth_rate, demand_level, required_skills, data_source) VALUES
-- Technology Careers
('Software Developer', 'Technology', 'Morocco', 180000, 350000, 22.0, 'very_high', ARRAY['JavaScript', 'Python', 'React', 'Node.js', 'SQL'], 'Labor Market Analysis 2024'),
('Data Scientist', 'Technology', 'Morocco', 220000, 400000, 31.0, 'very_high', ARRAY['Python', 'R', 'Machine Learning', 'SQL', 'Statistics'], 'Labor Market Analysis 2024'),
('UX/UI Designer', 'Technology', 'Morocco', 160000, 280000, 13.0, 'high', ARRAY['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'], 'Labor Market Analysis 2024'),
('Cybersecurity Analyst', 'Technology', 'Morocco', 200000, 380000, 35.0, 'very_high', ARRAY['Network Security', 'Incident Response', 'Risk Assessment'], 'Labor Market Analysis 2024'),

-- Business Careers
('Digital Marketing Specialist', 'Marketing', 'Morocco', 120000, 220000, 19.0, 'high', ARRAY['Google Analytics', 'SEO', 'Social Media', 'Content Marketing'], 'Labor Market Analysis 2024'),
('Product Manager', 'Business', 'Morocco', 250000, 450000, 19.0, 'high', ARRAY['Product Strategy', 'Agile', 'Analytics', 'Leadership'], 'Labor Market Analysis 2024'),
('Business Analyst', 'Business', 'Morocco', 150000, 280000, 14.0, 'medium', ARRAY['Excel', 'SQL', 'Business Intelligence', 'Process Analysis'], 'Labor Market Analysis 2024'),

-- Healthcare Careers
('Registered Nurse', 'Healthcare', 'Morocco', 140000, 250000, 7.0, 'high', ARRAY['Patient Care', 'Medical Knowledge', 'Communication'], 'Healthcare Ministry 2024'),
('Physical Therapist', 'Healthcare', 'Morocco', 160000, 280000, 18.0, 'high', ARRAY['Rehabilitation', 'Anatomy', 'Patient Assessment'], 'Healthcare Ministry 2024'),

-- Finance Careers
('Financial Analyst', 'Finance', 'Morocco', 180000, 320000, 6.0, 'medium', ARRAY['Excel', 'Financial Modeling', 'Analysis', 'Reporting'], 'Banking Association 2024'),
('Accountant', 'Finance', 'Morocco', 120000, 200000, 4.0, 'medium', ARRAY['Accounting', 'Tax Preparation', 'Financial Reporting'], 'Banking Association 2024');

-- Insert sample analytics data
INSERT INTO analytics (event_type, event_data, session_id) VALUES
('career_plan_generated', '{"career_paths": ["Software Developer", "Data Scientist"], "user_interests": ["technology", "programming"]}', 'session_001'),
('skill_recommendation_viewed', '{"skill": "JavaScript", "importance": "High"}', 'session_002'),
('cv_template_downloaded', '{"template": "Modern Tech Resume", "career_path": "Software Developer"}', 'session_003'),
('learning_plan_started', '{"plan_duration": "4_weeks", "focus_area": "Web Development"}', 'session_004'),
('career_plan_generated', '{"career_paths": ["UX Designer", "Product Manager"], "user_interests": ["design", "user_experience"]}', 'session_005');