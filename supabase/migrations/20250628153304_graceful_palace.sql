/*
  # Seed chatbot knowledge base with career guidance content
*/

INSERT INTO chatbot_knowledge (category, question, answer, keywords, priority) VALUES
-- Career Guidance
('career_guidance', 'What career should I choose?', 'Choosing a career depends on your interests, skills, education, and goals. I can help you explore different options! Tell me about your background, what subjects you enjoy, and what kind of work environment appeals to you. Would you like to take our career assessment to get personalized recommendations?', ARRAY['career', 'choose', 'path', 'guidance'], 5),

('career_guidance', 'I''m feeling lost about my future', 'It''s completely normal to feel uncertain about your career path - many people experience this! The good news is that careers aren''t set in stone, and there are many ways to explore your options. Let''s start by understanding your interests and strengths. What subjects did you enjoy in school? What activities make you lose track of time?', ARRAY['lost', 'uncertain', 'confused', 'future'], 5),

('career_guidance', 'How do I know if a career is right for me?', 'Great question! A career might be right for you if it aligns with your interests, utilizes your strengths, matches your values, and offers the lifestyle you want. Consider factors like: work-life balance, salary expectations, growth opportunities, and daily tasks. Would you like me to help you evaluate a specific career path?', ARRAY['right career', 'suitable', 'match', 'fit'], 4),

-- Skills and Learning
('skills_learning', 'What skills should I learn?', 'The skills you should learn depend on your career goals! However, some universally valuable skills include: communication, problem-solving, digital literacy, and adaptability. For specific careers, I can recommend technical skills. What field interests you most? Technology, business, healthcare, or something else?', ARRAY['skills', 'learn', 'develop', 'improve'], 4),

('skills_learning', 'How long does it take to learn programming?', 'Learning programming basics can take 3-6 months with consistent practice. To become job-ready typically takes 6-12 months of dedicated learning. The timeline depends on your background, learning pace, and target role. I recommend starting with HTML/CSS, then JavaScript or Python. Would you like a personalized learning plan?', ARRAY['programming', 'coding', 'development', 'learn'], 4),

('skills_learning', 'Best free resources to learn new skills?', 'There are many excellent free resources! Here are my top recommendations: freeCodeCamp (programming), Coursera (various subjects), Khan Academy (fundamentals), YouTube (tutorials), and Codecademy (coding). For specific skills, I can provide more targeted suggestions. What skill are you interested in learning?', ARRAY['free', 'resources', 'learning', 'courses'], 3),

-- Job Search
('job_search', 'How do I write a good CV?', 'A great CV should be clear, concise, and tailored to the job. Key elements: contact info, professional summary, work experience (with achievements), education, and relevant skills. Keep it 1-2 pages, use action verbs, and quantify achievements when possible. I can help you create a CV template based on your target career!', ARRAY['cv', 'resume', 'write', 'create'], 4),

('job_search', 'How to prepare for job interviews?', 'Interview preparation involves: researching the company, practicing common questions, preparing your own questions, and planning your outfit. Use the STAR method (Situation, Task, Action, Result) for behavioral questions. Practice with mock interviews and prepare specific examples of your achievements. Would you like help with interview questions for a specific role?', ARRAY['interview', 'prepare', 'questions', 'tips'], 4),

('job_search', 'Where to find job opportunities in Morocco?', 'In Morocco, you can find jobs through: LinkedIn, Rekrute.com, Emploi.ma, Bayt.com, and company websites directly. Networking is also crucial - attend industry events, join professional groups, and connect with alumni. Consider both local companies and international firms with offices in Casablanca, Rabat, or other major cities.', ARRAY['jobs', 'morocco', 'opportunities', 'employment'], 4),

-- Education
('education', 'Should I go to university?', 'University can be valuable for many careers, but it''s not the only path to success. Consider factors like: your career goals, financial situation, learning style, and industry requirements. Some fields require degrees (medicine, law), while others value skills and experience (tech, entrepreneurship). What career field interests you most?', ARRAY['university', 'college', 'degree', 'education'], 3),

('education', 'What should I study?', 'Your field of study should align with your interests, career goals, and market demand. Popular fields with good prospects include: Computer Science, Business, Engineering, Healthcare, and Digital Marketing. Consider what subjects you enjoy and what problems you''d like to solve. Would you like help exploring specific programs?', ARRAY['study', 'major', 'field', 'program'], 3),

-- Motivation and Support
('motivation', 'I feel overwhelmed by career choices', 'Feeling overwhelmed is completely normal when facing important decisions! Remember that you don''t have to figure everything out at once. Start by exploring your interests and trying new things. Career paths can evolve, and many successful people have changed directions. Let''s break this down into smaller, manageable steps. What''s one area you''d like to explore first?', ARRAY['overwhelmed', 'stressed', 'anxious', 'pressure'], 5),

('motivation', 'I''m worried I''m too old to change careers', 'It''s never too late to change careers! Many people successfully transition at different life stages. Your experience and maturity can actually be advantages. Focus on transferable skills, consider gradual transitions, and remember that lifelong learning is normal now. What new direction interests you?', ARRAY['too old', 'career change', 'transition', 'age'], 4),

-- Platform Features
('platform', 'How does CareerSpark work?', 'CareerSpark is your AI-powered career assistant! Here''s how it works: 1) Tell us about your background and interests, 2) Get personalized career recommendations, 3) Receive skill development plans, 4) Access learning resources, 5) Track your progress. You can use voice or text input, and save multiple career plans. Ready to get started?', ARRAY['how it works', 'features', 'careerspark'], 5),

('platform', 'Can I save my career plans?', 'Yes! You can save unlimited career plans by creating a free account. This lets you: compare different paths, track your learning progress, update your information, and access your plans from any device. Would you like to create an account or explore as a guest first?', ARRAY['save', 'account', 'plans', 'register'], 3),

-- General Help
('general', 'What can you help me with?', 'I''m here to help with all aspects of your career journey! I can assist with: career exploration, skill development planning, job search strategies, CV writing, interview preparation, education decisions, and motivation. I can also guide you through using CareerSpark''s features. What would you like to explore today?', ARRAY['help', 'assist', 'support', 'what can you do'], 5);