import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Search,
  Filter,
  Star,
  Play,
  BookOpen,
  TrendingUp,
  Users,
  Award,
  ArrowLeft,
  Eye,
  Heart,
  Share2,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Link,
  ChevronRight
} from 'lucide-react';

const Blog: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'success-stories' | 'featured-articles' | 'all-articles' | 'article'>('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const categories = [
    { id: 'all', label: 'All Posts', count: 24 },
    { id: 'success-stories', label: 'Success Stories', count: 8 },
    { id: 'career-tips', label: 'Career Tips', count: 10 },
    { id: 'industry-insights', label: 'Industry Insights', count: 6 }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: 'From Confused Student to Software Engineer: Youssef\'s Journey',
      excerpt: 'How a 22-year-old from Casablanca used CareerSpark to transition from business studies to becoming a full-stack developer at a tech startup.',
      content: `
# From Confused Student to Software Engineer: Youssef's Journey

*How a 22-year-old from Casablanca used CareerSpark to transition from business studies to becoming a full-stack developer at a tech startup.*

## The Beginning: Lost in Business School

Youssef Benali was in his third year of business administration at Hassan II University in Casablanca when he realized something was terribly wrong. Despite good grades and family expectations, he felt completely disconnected from his studies.

"I was sitting in a marketing class, and the professor was talking about consumer behavior," Youssef recalls. "But all I could think about was this coding tutorial I had watched the night before. I realized I was more excited about a 20-minute YouTube video than anything I'd learned in three years of business school."

## The Discovery: Finding CareerSpark

The turning point came during a particularly stressful exam period. Youssef was scrolling through social media when he came across an ad for CareerSpark. Initially skeptical, he decided to give it a try during a study break.

"I thought, 'What's the worst that could happen?' I was already feeling lost, so maybe an AI could help me figure things out," he says with a laugh.

## The Assessment: Uncovering Hidden Passions

The CareerSpark assessment took Youssef about 20 minutes to complete. He answered questions about his interests, strengths, and goals, being completely honest about his dissatisfaction with business school.

The results were eye-opening:
- **Top Career Match**: Software Developer (94% match)
- **Second Match**: Data Scientist (87% match)  
- **Third Match**: Product Manager (82% match)

"I couldn't believe it," Youssef says. "The AI had identified exactly what I was feeling but couldn't put into words. I loved problem-solving, I was naturally good with logic, and I had always been fascinated by how apps and websites worked."

## The Plan: A Roadmap to Success

CareerSpark didn't just identify potential careers—it provided a detailed 4-week learning plan to get started:

### Week 1: Foundation Building
- HTML/CSS fundamentals
- Setting up development environment
- Joining coding communities

### Week 2: JavaScript Basics
- Variables, functions, and control structures
- DOM manipulation
- First interactive projects

### Week 3: Modern Development
- ES6+ features
- Git version control
- Package managers (npm)

### Week 4: Framework Introduction
- React basics
- Building a portfolio project
- Deployment strategies

## The Journey: From Zero to Hero

Youssef threw himself into the learning plan with unprecedented enthusiasm. He would wake up at 5 AM to code before classes, spend lunch breaks watching tutorials, and dedicate entire weekends to projects.

"For the first time in years, I was excited to learn," he explains. "Every small victory—getting a button to work, making an API call, deploying my first website—felt like a huge accomplishment."

### Month 1-2: Building Foundations
- Completed freeCodeCamp's Responsive Web Design certification
- Built 5 small projects including a calculator and weather app
- Started contributing to open-source projects

### Month 3-4: Advanced Skills
- Learned React and Node.js
- Built a full-stack e-commerce application
- Created a professional portfolio website

### Month 5-6: Job Preparation
- Practiced coding interviews on LeetCode
- Networked with developers on LinkedIn
- Applied to junior developer positions

## The Breakthrough: Landing the Dream Job

Six months after starting his coding journey, Youssef received an offer from a fintech startup in Casablanca. The position: Junior Full-Stack Developer with a salary 150% higher than what he could have expected with a business degree.

"The interview was challenging, but I felt prepared," Youssef recalls. "I could demonstrate real projects, explain my code, and show genuine passion for the field. The hiring manager later told me that my enthusiasm and self-directed learning impressed them more than candidates with computer science degrees."

## The Results: Transformation Complete

Today, 18 months later, Youssef is thriving in his role:

- **Salary Increase**: 150% higher than business graduate average
- **Job Satisfaction**: 9.5/10 (compared to 3/10 in business school)
- **Career Growth**: Promoted to Mid-Level Developer after 12 months
- **Work-Life Balance**: Remote work flexibility and engaging projects

## Lessons Learned: Advice for Others

Youssef's advice for students feeling lost in their current path:

### 1. Trust Your Instincts
"If you're not excited about what you're studying, that's a signal worth paying attention to. Don't ignore it because of external expectations."

### 2. Take Action
"Assessment tools like CareerSpark are great, but they're just the beginning. You have to be willing to put in the work to make a change."

### 3. Embrace the Learning Process
"I went from knowing nothing about coding to building real applications in six months. If you're consistent and passionate, you can learn anything."

### 4. Build a Portfolio
"Employers want to see what you can do, not just what you know. Build projects that demonstrate your skills and passion."

### 5. Network Actively
"The Moroccan tech community is incredibly supportive. Don't be afraid to reach out to developers on LinkedIn or attend local meetups."

## The Ripple Effect: Inspiring Others

Youssef's transformation has inspired several of his former classmates to explore tech careers. He now mentors students through online communities and has even given talks at his former university about alternative career paths.

"I want other students to know that it's never too late to change direction," he says. "If a business student from Casablanca can become a software engineer in six months, anyone can pursue their passion with the right guidance and determination."

## Looking Forward: Future Goals

Youssef isn't stopping here. His future plans include:
- Learning machine learning and AI development
- Starting a tech blog to share knowledge
- Eventually launching his own startup
- Contributing to Morocco's growing tech ecosystem

## Conclusion: The Power of AI-Guided Career Change

Youssef's story demonstrates the transformative power of personalized career guidance. What started as a 20-minute assessment on CareerSpark led to a complete life transformation—from a disengaged business student to a passionate software engineer.

"CareerSpark didn't just help me find a career," Youssef reflects. "It helped me find myself. For the first time, I'm excited about my future and confident in my path forward."

*Ready to start your own transformation? Take the CareerSpark assessment and discover your perfect career match today.*
      `,
      category: 'success-stories',
      author: 'Sarah Chen',
      date: '2025-01-15',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      video: true,
      views: 2847,
      likes: 156,
      comments: 23,
      tags: ['success-story', 'career-change', 'software-development', 'morocco']
    },
    {
      id: 2,
      title: 'The Complete Guide to Career Change in Your 30s',
      excerpt: 'Practical strategies and real success stories from professionals who successfully pivoted their careers later in life.',
      content: `
# The Complete Guide to Career Change in Your 30s

*Practical strategies and real success stories from professionals who successfully pivoted their careers later in life.*

## Introduction: It's Never Too Late

Turning 30 often brings a moment of reflection. You might find yourself asking: "Is this really what I want to do for the rest of my career?" If you're feeling stuck, unfulfilled, or simply curious about other possibilities, you're not alone.

Career changes in your 30s are not only possible—they're increasingly common. This comprehensive guide will walk you through everything you need to know to make a successful transition.

## Why Career Changes in Your 30s Make Sense

### 1. Self-Awareness
By your 30s, you have a clearer understanding of your values, strengths, and what truly motivates you.

### 2. Experience Base
You've built transferable skills and professional experience that can be leveraged in new fields.

### 3. Network Development
You've established professional relationships that can support your transition.

### 4. Financial Stability
Many people in their 30s have more financial cushion to take calculated risks.

## Common Challenges and How to Overcome Them

### Challenge 1: Financial Responsibilities
**Solution**: Create a transition budget and consider gradual career shifts rather than sudden changes.

### Challenge 2: Imposter Syndrome
**Solution**: Focus on transferable skills and remember that your diverse experience is an asset.

### Challenge 3: Starting Over
**Solution**: Reframe it as "building upon" rather than "starting over."

## The 8-Step Career Change Process

### Step 1: Self-Assessment
- Identify your values and priorities
- Assess your skills and strengths
- Clarify what you want to change about your current situation

### Step 2: Explore Options
- Research potential career paths
- Conduct informational interviews
- Shadow professionals in fields of interest

### Step 3: Skill Gap Analysis
- Identify required skills for your target career
- Assess what you already have
- Create a learning plan for missing skills

### Step 4: Build New Skills
- Take online courses
- Attend workshops and conferences
- Volunteer in your target field

### Step 5: Network Strategically
- Join professional associations
- Attend industry events
- Connect with professionals on LinkedIn

### Step 6: Gain Experience
- Take on relevant projects in your current role
- Freelance or consult in your target field
- Volunteer for relevant organizations

### Step 7: Update Your Brand
- Revise your resume and LinkedIn profile
- Create a portfolio showcasing relevant work
- Develop your personal brand story

### Step 8: Make the Transition
- Apply strategically to target roles
- Prepare for interviews that address your career change
- Negotiate offers that account for your transition

## Real Success Stories

### Maria's Story: Teacher to UX Designer
**Age**: 32
**Transition Time**: 14 months
**Strategy**: Evening UX bootcamp while teaching, built portfolio through volunteer projects

### Ahmed's Story: Accountant to Digital Marketing Manager
**Age**: 35
**Transition Time**: 8 months
**Strategy**: Earned Google certifications, managed social media for local businesses

### Fatima's Story: Nurse to Healthcare Technology Consultant
**Age**: 31
**Transition Time**: 18 months
**Strategy**: Leveraged healthcare expertise, learned technology skills through online courses

## Industry-Specific Transition Strategies

### Moving into Technology
- Focus on coding bootcamps or online certifications
- Build a portfolio of projects
- Contribute to open-source projects

### Moving into Healthcare
- Consider roles that leverage your existing skills
- Pursue relevant certifications
- Volunteer at healthcare organizations

### Moving into Education
- Substitute teach or tutor to gain experience
- Pursue teaching certifications
- Develop curriculum or training materials

### Moving into Consulting
- Leverage your industry expertise
- Develop business development skills
- Start with freelance projects

## Financial Planning for Career Change

### Create a Transition Budget
- Calculate 6-12 months of expenses
- Factor in potential salary reduction
- Include costs for education/training

### Consider Gradual Transitions
- Reduce hours in current role while building new skills
- Take on freelance work in your target field
- Negotiate a sabbatical for intensive training

### Explore Funding Options
- Employer tuition reimbursement
- Professional development loans
- Scholarships for career changers

## Overcoming Age Bias

### Highlight Your Advantages
- Maturity and professionalism
- Strong work ethic
- Leadership experience
- Diverse perspective

### Stay Current
- Learn new technologies
- Understand industry trends
- Adapt your communication style

### Network Strategically
- Connect with hiring managers directly
- Leverage alumni networks
- Work with recruiters who value experience

## Timeline and Milestones

### Months 1-3: Exploration and Planning
- Complete self-assessment
- Research career options
- Begin networking

### Months 4-9: Skill Building and Experience
- Develop new skills
- Gain relevant experience
- Build portfolio

### Months 10-12: Job Search and Transition
- Apply to target roles
- Interview and negotiate
- Make the transition

## Common Mistakes to Avoid

### 1. Rushing the Process
Take time to thoroughly research and prepare for your new career.

### 2. Ignoring Transferable Skills
Don't underestimate the value of your existing experience.

### 3. Neglecting to Network
Relationships are crucial for career transitions.

### 4. Focusing Only on Salary
Consider growth potential, work-life balance, and job satisfaction.

### 5. Not Having a Financial Plan
Ensure you can support yourself during the transition.

## Resources for Career Changers

### Online Learning Platforms
- Coursera
- Udemy
- LinkedIn Learning
- edX

### Professional Development
- Industry conferences
- Professional associations
- Mentorship programs
- Career coaching

### Networking Opportunities
- LinkedIn groups
- Local meetups
- Alumni networks
- Industry events

## Conclusion: Your Second Act Awaits

Changing careers in your 30s isn't just possible—it can be the best decision you ever make. With proper planning, strategic skill development, and persistent networking, you can successfully transition to a career that aligns with your values and goals.

Remember, your 30s bring unique advantages to career change: self-awareness, experience, and often the financial stability to take calculated risks. Don't let age hold you back from pursuing your professional dreams.

*Ready to start your career change journey? CareerSpark can help you identify the perfect career path and create a personalized transition plan.*
      `,
      category: 'career-tips',
      author: 'Ahmed Benali',
      date: '2025-01-12',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      views: 1923,
      likes: 89,
      comments: 15,
      tags: ['career-change', 'career-tips', 'professional-development']
    },
    {
      id: 3,
      title: 'Morocco\'s Tech Boom: Opportunities for New Graduates',
      excerpt: 'An in-depth look at the growing technology sector in Morocco and how students can position themselves for success.',
      content: `
# Morocco's Tech Boom: Opportunities for New Graduates

*An in-depth look at the growing technology sector in Morocco and how students can position themselves for success.*

## Introduction: The Digital Kingdom

Morocco is experiencing an unprecedented technological transformation. From the bustling tech hubs of Casablanca and Rabat to emerging innovation centers in Marrakech and Tangier, the Kingdom is positioning itself as a major player in the global digital economy.

For new graduates, this presents an extraordinary opportunity to build careers in one of the world's most dynamic and fastest-growing sectors.

## The Numbers: Morocco's Tech Growth

### Market Size and Growth
- **$1.2 billion**: Current size of Morocco's IT market
- **8.5%**: Annual growth rate (2020-2025)
- **50,000+**: Tech professionals currently employed
- **15,000**: New tech jobs created annually

### Investment and Infrastructure
- **$2 billion**: Government investment in digital infrastructure (2021-2025)
- **20+**: International tech companies with offices in Morocco
- **100+**: Active startups in major cities
- **5**: Dedicated tech parks and innovation hubs

## Key Growth Sectors

### 1. Software Development
**Opportunities**: Web development, mobile apps, enterprise software
**Skills in Demand**: JavaScript, Python, React, Node.js, cloud technologies
**Average Salary**: 180,000 - 350,000 MAD annually

### 2. Data Science and AI
**Opportunities**: Business intelligence, machine learning, data analytics
**Skills in Demand**: Python, R, SQL, machine learning frameworks
**Average Salary**: 220,000 - 400,000 MAD annually

### 3. Cybersecurity
**Opportunities**: Network security, ethical hacking, compliance
**Skills in Demand**: Security frameworks, penetration testing, risk assessment
**Average Salary**: 200,000 - 380,000 MAD annually

### 4. Digital Marketing
**Opportunities**: SEO, social media, content marketing, e-commerce
**Skills in Demand**: Google Analytics, social media platforms, content creation
**Average Salary**: 120,000 - 220,000 MAD annually

### 5. UX/UI Design
**Opportunities**: Web design, mobile app design, user research
**Skills in Demand**: Figma, Adobe Creative Suite, user research methods
**Average Salary**: 160,000 - 280,000 MAD annually

## Major Tech Hubs in Morocco

### Casablanca: The Economic Capital
- **Casablanca Finance City**: Hub for fintech and financial services
- **Technopark**: Morocco's first technology park
- **Major Companies**: Attijariwafa Bank Digital, BMCE Bank Digital, OCP Group

### Rabat: The Innovation Center
- **Rabat Technopolis**: Government-backed tech hub
- **University Partnerships**: Strong connections with Mohammed V University
- **Focus Areas**: Government tech, e-governance, smart city solutions

### Marrakech: The Creative Hub
- **Emerging Startup Scene**: Growing number of creative and tourism tech startups
- **International Presence**: Several European companies have established offices
- **Specializations**: Tourism tech, creative industries, e-commerce

### Tangier: The Gateway to Europe
- **Strategic Location**: Close proximity to European markets
- **Manufacturing Tech**: Industry 4.0 and smart manufacturing
- **Logistics Tech**: Port and supply chain technologies

## Government Initiatives Supporting Tech Growth

### Digital Morocco 2025 Strategy
- **Objective**: Transform Morocco into a regional digital hub
- **Investment**: $2 billion in digital infrastructure
- **Goals**: Create 125,000 new jobs in digital sectors

### Mohammed VI Polytechnic University (UM6P)
- **Focus**: Research and innovation in technology
- **Programs**: AI, data science, renewable energy tech
- **Industry Partnerships**: Collaborations with global tech companies

### Startup Support Programs
- **Maroc Numeric Fund**: Government funding for tech startups
- **Innov Invest**: Support for innovative technology projects
- **Tax Incentives**: Reduced taxes for tech companies and startups

## International Companies in Morocco

### Global Tech Giants
- **Microsoft**: Regional headquarters in Casablanca
- **IBM**: Development center and client services
- **Oracle**: Local presence and partner ecosystem
- **SAP**: Implementation and consulting services

### European Companies
- **Capgemini**: Large development center in Rabat
- **Sopra Steria**: Software development and consulting
- **Atos**: IT services and digital transformation
- **Accenture**: Consulting and technology services

### Emerging Partnerships
- **Chinese Tech Companies**: Growing presence in infrastructure
- **Indian IT Services**: Offshore development centers
- **African Tech Hubs**: Regional expansion and collaboration

## Skills in High Demand

### Programming Languages
1. **JavaScript**: Essential for web development
2. **Python**: Data science, AI, and backend development
3. **Java**: Enterprise applications and Android development
4. **PHP**: Web development and e-commerce platforms
5. **C#**: Microsoft ecosystem and enterprise applications

### Frameworks and Technologies
1. **React/Angular**: Frontend web development
2. **Node.js**: Backend JavaScript development
3. **Django/Flask**: Python web frameworks
4. **Spring**: Java enterprise development
5. **Laravel**: PHP web development

### Emerging Technologies
1. **Artificial Intelligence**: Machine learning and deep learning
2. **Blockchain**: Cryptocurrency and smart contracts
3. **IoT**: Internet of Things and smart devices
4. **Cloud Computing**: AWS, Azure, Google Cloud
5. **DevOps**: Automation and deployment pipelines

## Education and Training Opportunities

### Universities with Strong Tech Programs
- **Mohammed V University**: Computer Science and Engineering
- **Hassan II University**: Information Technology and Software Engineering
- **Al Akhawayn University**: Computer Science and Business Technology
- **ENSIAS**: National School of Computer Science and Systems Analysis

### Private Training Institutes
- **1337 School**: Coding bootcamp (42 Network)
- **YNOV Campus**: Digital technology and innovation
- **ESTEM**: Engineering and technology
- **Sup'Management**: Business and technology

### Online Learning Platforms
- **Coursera**: University partnerships and professional certificates
- **Udacity**: Nanodegree programs in tech skills
- **edX**: MIT and Harvard online courses
- **Pluralsight**: Technology skill development

## Salary Expectations and Career Progression

### Entry-Level Positions (0-2 years)
- **Junior Developer**: 120,000 - 180,000 MAD
- **Junior Data Analyst**: 140,000 - 200,000 MAD
- **Junior UX Designer**: 100,000 - 160,000 MAD
- **Digital Marketing Assistant**: 80,000 - 120,000 MAD

### Mid-Level Positions (3-5 years)
- **Software Developer**: 200,000 - 300,000 MAD
- **Data Scientist**: 250,000 - 350,000 MAD
- **Senior UX Designer**: 220,000 - 320,000 MAD
- **Digital Marketing Manager**: 180,000 - 280,000 MAD

### Senior-Level Positions (5+ years)
- **Senior Developer/Architect**: 350,000 - 500,000 MAD
- **Lead Data Scientist**: 400,000 - 600,000 MAD
- **Design Director**: 380,000 - 550,000 MAD
- **Digital Marketing Director**: 350,000 - 500,000 MAD

## How to Position Yourself for Success

### 1. Build a Strong Foundation
- Master fundamental programming concepts
- Understand software development lifecycle
- Learn version control (Git) and collaboration tools

### 2. Specialize in High-Demand Areas
- Choose a specialization based on market demand
- Develop deep expertise in your chosen area
- Stay updated with latest technologies and trends

### 3. Build a Portfolio
- Create projects that demonstrate your skills
- Contribute to open-source projects
- Build a professional website and GitHub profile

### 4. Network Actively
- Join local tech communities and meetups
- Attend conferences and workshops
- Connect with professionals on LinkedIn

### 5. Gain Practical Experience
- Apply for internships at tech companies
- Freelance on small projects
- Participate in hackathons and coding competitions

### 6. Develop Soft Skills
- Communication and presentation skills
- Project management and teamwork
- Problem-solving and critical thinking

## Challenges and How to Overcome Them

### Challenge 1: Skills Gap
**Solution**: Continuous learning and practical application of new technologies

### Challenge 2: Language Barriers
**Solution**: Improve English proficiency and learn French for international opportunities

### Challenge 3: Limited Experience
**Solution**: Build projects, contribute to open source, and seek internships

### Challenge 4: Competition
**Solution**: Specialize in niche areas and develop unique skill combinations

## Future Outlook: What's Next?

### Emerging Opportunities
- **Green Tech**: Renewable energy and sustainability solutions
- **FinTech**: Digital banking and payment solutions
- **HealthTech**: Digital health and telemedicine
- **EdTech**: Online learning and educational technology
- **AgriTech**: Smart farming and agricultural innovation

### Government Support
- Continued investment in digital infrastructure
- Support for tech education and training
- Incentives for international tech companies
- Development of smart city initiatives

### Regional Expansion
- Morocco as a gateway to African markets
- Partnerships with European tech companies
- Growing startup ecosystem and venture capital

## Conclusion: Your Tech Future Starts Now

Morocco's tech boom represents a generational opportunity for new graduates. With the right skills, mindset, and preparation, you can build a rewarding career in one of the world's most exciting and dynamic industries.

The key is to start now: learn in-demand skills, build a portfolio, network with professionals, and stay curious about emerging technologies. The future of Morocco's digital economy is bright, and there's never been a better time to be part of it.

*Ready to launch your tech career in Morocco? CareerSpark can help you identify the best opportunities and create a personalized learning plan to get you there.*
      `,
      category: 'industry-insights',
      author: 'Maria Rodriguez',
      date: '2025-01-10',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      views: 3156,
      likes: 201,
      comments: 34,
      tags: ['morocco', 'tech-industry', 'career-opportunities', 'graduates']
    }
  ];

  const successStories = [
    {
      id: 4,
      title: 'From Pharmacy to UX Design: Fatima\'s Creative Transformation',
      excerpt: 'A pharmacist\'s journey to becoming a UX designer at an international agency in Rabat.',
      content: `
# From Pharmacy to UX Design: Fatima's Creative Transformation

*A pharmacist's journey to becoming a UX designer at an international agency in Rabat.*

## The Unexpected Beginning

Fatima El Mansouri never imagined that her background in pharmacy would lead her to become one of Morocco's most sought-after UX designers. Today, she leads the design team at a prestigious international digital agency in Rabat, but her journey to this point was anything but conventional.

## The Realization: More Than Medicine

After five years working as a clinical pharmacist in Casablanca, Fatima found herself increasingly drawn to the digital tools and interfaces she used daily. While her colleagues focused on medications and patient care, she was fascinated by the user experience of the pharmacy management software.

"I kept thinking about how we could make these systems more intuitive," Fatima recalls. "I would sketch out interface improvements during my breaks and imagine better ways to organize information for both pharmacists and patients."

## The Spark: A Design Workshop

The turning point came when Fatima attended a weekend workshop on digital health solutions. The event included a session on user experience design, and she was immediately captivated.

"For the first time, I saw a field that combined my analytical thinking from pharmacy with my creative instincts," she explains. "I realized that good design could actually improve healthcare outcomes by making systems more user-friendly."

## The Assessment: Discovering Hidden Talents

Encouraged by the workshop, Fatima decided to take the CareerSpark assessment to explore her options. The results revealed a strong match for UX design (91%) and product management (85%).

The assessment highlighted her strengths:
- Strong analytical and problem-solving skills
- Attention to detail and systematic thinking
- Empathy and user-focused mindset
- Communication and presentation abilities

## The Plan: Strategic Career Transition

CareerSpark provided Fatima with a comprehensive transition plan:

### Phase 1: Foundation Building (Months 1-3)
- Learn design fundamentals and principles
- Master design tools (Figma, Adobe Creative Suite)
- Study user research methodologies
- Build first portfolio projects

### Phase 2: Skill Development (Months 4-6)
- Complete UX design certification
- Conduct user research projects
- Create case studies and portfolio
- Network with design professionals

### Phase 3: Experience Gaining (Months 7-8)
- Freelance on small design projects
- Volunteer for non-profit organizations
- Participate in design challenges
- Refine portfolio and personal brand

## The Journey: From Pills to Pixels

Fatima approached her career transition with the same methodical precision she had applied to pharmacy. She created a detailed study schedule and stuck to it religiously.

### Months 1-3: Learning the Fundamentals
- **Morning routine**: 2 hours of design study before work
- **Evening practice**: 1 hour of hands-on design work
- **Weekends**: Intensive portfolio building sessions
- **Key achievements**: Completed Google UX Design Certificate

### Months 4-6: Building Real Skills
- **User research**: Conducted interviews with pharmacy staff about software usability
- **Design projects**: Redesigned the pharmacy's patient information system (as a case study)
- **Networking**: Joined Moroccan UX/UI designers Facebook group
- **Mentorship**: Connected with a senior designer in Rabat for guidance

### Months 7-8: Gaining Experience
- **Freelance work**: Designed a mobile app for a local healthcare startup
- **Volunteer project**: Created a website for a medical charity
- **Portfolio development**: Built a comprehensive online portfolio showcasing 5 major projects

## The Breakthrough: Landing the Dream Role

Eight months after starting her transition, Fatima applied for a UX Designer position at a digital agency in Rabat. Her unique background in healthcare proved to be a significant advantage.

"During the interview, they were impressed by my systematic approach to problem-solving and my deep understanding of user needs in healthcare contexts," Fatima explains. "My pharmacy background gave me credibility when discussing user research and empathy for complex workflows."

## The Results: A Complete Transformation

Today, Fatima leads a team of 6 designers and has worked on projects for major international clients:

- **Salary increase**: 150% higher than her pharmacy salary
- **Job satisfaction**: 9.5/10 (compared to 6/10 in pharmacy)
- **Work-life balance**: Flexible remote work and creative freedom
- **Career growth**: Promoted to Senior UX Designer within 12 months

## Key Projects and Achievements

### Healthcare App Redesign
Led the UX redesign of a telemedicine platform used by over 100,000 patients across North Africa.

### E-commerce Platform
Designed the user experience for Morocco's largest online pharmacy, improving conversion rates by 40%.

### Government Digital Services
Collaborated on improving the user experience of Morocco's digital health services portal.

## Lessons Learned: Advice for Career Changers

### 1. Leverage Your Unique Background
"Don't see your previous career as irrelevant. My pharmacy background gives me insights into healthcare UX that pure designers might miss."

### 2. Be Strategic About Learning
"I didn't try to learn everything at once. I focused on building a strong foundation first, then specialized in areas that matched my interests."

### 3. Build a Portfolio That Tells Your Story
"My portfolio doesn't hide my pharmacy background—it showcases how those skills translate to design thinking."

### 4. Network Authentically
"I joined design communities not just to find jobs, but to learn and contribute. Genuine relationships led to opportunities."

### 5. Embrace the Learning Curve
"There were moments when I felt overwhelmed, but I reminded myself that every expert was once a beginner."

## The Ripple Effect: Inspiring Others

Fatima's success has inspired several healthcare professionals to explore design careers. She now mentors career changers and speaks at universities about alternative career paths for healthcare graduates.

"I want other healthcare professionals to know that their skills are valuable in many fields," she says. "Empathy, attention to detail, and systematic thinking are exactly what good UX design requires."

## Future Goals: Expanding Impact

Fatima's ambitions extend beyond her current role:

### Short-term (1-2 years)
- Launch a design consultancy focused on healthcare UX
- Develop design thinking workshops for healthcare professionals
- Contribute to open-source healthcare design projects

### Long-term (3-5 years)
- Establish Morocco's first UX research lab for healthcare
- Write a book about career transitions in the digital age
- Mentor the next generation of Moroccan designers

## The Broader Impact: Healthcare Meets Design

Fatima's work is contributing to a broader transformation in how healthcare technology is designed in Morocco and across Africa. Her unique perspective helps create digital health solutions that truly serve users' needs.

"Good design in healthcare isn't just about making things look pretty," she explains. "It's about creating interfaces that can literally save lives by helping healthcare workers be more efficient and reducing errors."

## Conclusion: The Power of Strategic Career Change

Fatima's transformation from pharmacist to UX designer demonstrates that with the right strategy, support, and determination, it's possible to successfully transition between seemingly unrelated fields.

Her story shows that career change isn't about abandoning your past—it's about building upon your existing strengths while developing new skills that align with your passions and the market's needs.

*Ready to explore your own career transformation? CareerSpark can help you identify opportunities that leverage your unique background and create a personalized transition plan.*
      `,
      category: 'success-stories',
      author: 'David Kim',
      date: '2025-01-08',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      video: true,
      stats: { salary: '+150%', time: '8 months', satisfaction: '9.5/10' },
      views: 1456,
      likes: 78,
      comments: 12,
      tags: ['career-change', 'ux-design', 'healthcare', 'success-story']
    },
    // Add more success stories with full content...
  ];

  const regularPosts = [
    {
      id: 9,
      title: '10 Essential Skills Every Professional Needs in 2025',
      excerpt: 'The most in-demand skills across industries and how to develop them effectively.',
      content: `
# 10 Essential Skills Every Professional Needs in 2025

*The most in-demand skills across industries and how to develop them effectively.*

## Introduction: The Evolving Professional Landscape

The professional world is changing at an unprecedented pace. Automation, artificial intelligence, and digital transformation are reshaping every industry, creating new opportunities while making some traditional skills obsolete.

To thrive in this dynamic environment, professionals need to develop a combination of technical and soft skills that will remain valuable regardless of technological changes. Here are the 10 essential skills every professional needs in 2025.

## 1. Digital Literacy and Adaptability

### Why It Matters
Digital tools and platforms are now integral to virtually every job. Professionals who can quickly learn and adapt to new technologies have a significant advantage.

### Key Components
- **Software Proficiency**: Mastery of industry-standard software
- **Platform Navigation**: Ability to quickly learn new digital platforms
- **Tech Troubleshooting**: Basic problem-solving for technical issues
- **Digital Communication**: Effective use of digital communication tools

### How to Develop
- Take online courses on popular software platforms
- Practice with new tools and apps regularly
- Join tech communities and forums
- Volunteer to lead digital initiatives at work

## 2. Data Analysis and Interpretation

### Why It Matters
Data drives decision-making in modern organizations. Professionals who can collect, analyze, and interpret data are invaluable across all industries.

### Key Components
- **Data Collection**: Gathering relevant information from various sources
- **Statistical Analysis**: Understanding basic statistical concepts
- **Data Visualization**: Creating clear charts and graphs
- **Insight Generation**: Drawing actionable conclusions from data

### How to Develop
- Learn Excel or Google Sheets advanced functions
- Take courses in statistics and data analysis
- Practice with free datasets online
- Use data visualization tools like Tableau or Power BI

## 3. Critical Thinking and Problem-Solving

### Why It Matters
As routine tasks become automated, human workers are increasingly valued for their ability to think critically and solve complex problems.

### Key Components
- **Analytical Thinking**: Breaking down complex problems into manageable parts
- **Creative Problem-Solving**: Finding innovative solutions to challenges
- **Decision-Making**: Evaluating options and making informed choices
- **Systems Thinking**: Understanding how different parts of a system interact

### How to Develop
- Practice case study analysis
- Engage in strategic games and puzzles
- Join problem-solving workshops
- Seek out challenging projects at work

## 4. Emotional Intelligence

### Why It Matters
As workplaces become more collaborative and diverse, the ability to understand and manage emotions—both your own and others'—becomes crucial for success.

### Key Components
- **Self-Awareness**: Understanding your emotions and their impact
- **Self-Regulation**: Managing your emotional responses
- **Empathy**: Understanding others' perspectives and feelings
- **Social Skills**: Building and maintaining positive relationships

### How to Develop
- Practice mindfulness and self-reflection
- Seek feedback on your interpersonal skills
- Read books on emotional intelligence
- Work with a coach or mentor

## 5. Communication and Storytelling

### Why It Matters
Clear communication is essential for collaboration, leadership, and influence. The ability to tell compelling stories helps professionals connect with audiences and drive action.

### Key Components
- **Written Communication**: Clear, concise, and persuasive writing
- **Verbal Communication**: Effective speaking and presentation skills
- **Visual Communication**: Using images and design to convey messages
- **Storytelling**: Crafting narratives that engage and persuade

### How to Develop
- Join public speaking groups like Toastmasters
- Practice writing regularly (blogs, reports, proposals)
- Take courses in presentation skills
- Study effective communicators and storytellers

## 6. Adaptability and Continuous Learning

### Why It Matters
The pace of change means that skills and knowledge quickly become outdated. Professionals must be willing and able to continuously learn and adapt.

### Key Components
- **Growth Mindset**: Believing that abilities can be developed
- **Learning Agility**: Quickly acquiring new skills and knowledge
- **Flexibility**: Adapting to changing circumstances and requirements
- **Resilience**: Bouncing back from setbacks and failures

### How to Develop
- Set aside time for regular learning
- Embrace challenges and view failures as learning opportunities
- Seek diverse experiences and perspectives
- Stay curious and ask questions

## 7. Project Management

### Why It Matters
Most work today is project-based, requiring professionals to manage timelines, resources, and stakeholders effectively.

### Key Components
- **Planning and Organization**: Breaking projects into manageable tasks
- **Time Management**: Prioritizing and scheduling work effectively
- **Resource Management**: Optimizing the use of available resources
- **Stakeholder Communication**: Keeping all parties informed and engaged

### How to Develop
- Learn project management methodologies (Agile, Scrum, Waterfall)
- Use project management tools (Asana, Trello, Monday.com)
- Volunteer to lead projects at work or in volunteer organizations
- Pursue project management certifications

## 8. Cultural Intelligence and Diversity Awareness

### Why It Matters
Globalization and remote work mean professionals increasingly work with people from different cultural backgrounds. Cultural intelligence helps build effective relationships and avoid misunderstandings.

### Key Components
- **Cultural Awareness**: Understanding different cultural norms and values
- **Inclusive Communication**: Adapting communication styles for diverse audiences
- **Bias Recognition**: Identifying and addressing unconscious biases
- **Global Mindset**: Thinking beyond local perspectives

### How to Develop
- Work with diverse teams and seek international experiences
- Learn about different cultures and their business practices
- Take diversity and inclusion training
- Practice inclusive language and behavior

## 9. Creativity and Innovation

### Why It Matters
As routine tasks become automated, human creativity becomes more valuable. Organizations need professionals who can generate new ideas and innovative solutions.

### Key Components
- **Creative Thinking**: Generating original ideas and solutions
- **Innovation Process**: Turning ideas into practical implementations
- **Design Thinking**: Human-centered approach to problem-solving
- **Experimentation**: Testing and iterating on new concepts

### How to Develop
- Practice brainstorming and ideation techniques
- Expose yourself to diverse experiences and perspectives
- Learn design thinking methodologies
- Experiment with new approaches in your work

## 10. Leadership and Influence

### Why It Matters
Leadership skills are valuable at every level of an organization. The ability to influence others and drive positive change is essential for career advancement.

### Key Components
- **Vision Setting**: Articulating a compelling future state
- **Team Building**: Creating and motivating high-performing teams
- **Influence Without Authority**: Persuading others without formal power
- **Change Management**: Leading organizations through transitions

### How to Develop
- Seek leadership opportunities in your current role
- Mentor junior colleagues
- Study successful leaders and their approaches
- Take leadership development courses

## How to Prioritize Your Skill Development

### Assess Your Current Skills
- Conduct a honest self-assessment of your current abilities
- Seek feedback from colleagues and supervisors
- Identify your strongest and weakest areas

### Align with Your Career Goals
- Consider which skills are most important for your target roles
- Research job descriptions in your field of interest
- Talk to professionals in your desired career path

### Create a Development Plan
- Set specific, measurable goals for each skill
- Identify resources and opportunities for learning
- Create a timeline for skill development
- Track your progress regularly

## Resources for Skill Development

### Online Learning Platforms
- **Coursera**: University courses and professional certificates
- **LinkedIn Learning**: Business and technology skills
- **Udemy**: Practical skills and certifications
- **edX**: Academic courses from top universities

### Professional Development
- **Industry Conferences**: Networking and learning opportunities
- **Professional Associations**: Skill-building workshops and resources
- **Mentorship Programs**: Learning from experienced professionals
- **Internal Training**: Company-sponsored development programs

### Practice Opportunities
- **Volunteer Work**: Applying skills in meaningful contexts
- **Side Projects**: Building skills through personal initiatives
- **Cross-Functional Teams**: Gaining exposure to different areas
- **Stretch Assignments**: Taking on challenging projects at work

## Conclusion: Your Competitive Advantage

In 2025's competitive job market, professionals who possess these essential skills will have a significant advantage. The key is to start developing these skills now and continue learning throughout your career.

Remember, skill development is not a one-time activity—it's an ongoing process that requires commitment and consistency. By investing in these essential skills, you're investing in your future success and career resilience.

*Ready to assess your current skills and create a development plan? CareerSpark can help you identify your strengths and create a personalized learning roadmap for 2025 and beyond.*
      `,
      category: 'career-tips',
      author: 'Maria Rodriguez',
      date: '2025-01-01',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/3184343/pexels-photo-3184343.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: 4567,
      likes: 289,
      comments: 67,
      tags: ['skills', 'professional-development', 'career-tips', '2025']
    },
    // Add more regular posts with full content...
  ];

  const allPosts = [...featuredPosts, ...successStories, ...regularPosts];

  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleReadArticle = (article: any) => {
    setSelectedArticle(article);
    setCurrentView('article');
  };

  const renderArticlePage = () => {
    if (!selectedArticle) return null;

    return (
      <div className="min-h-screen bg-white">
        {/* Article Header */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                onClick={() => setCurrentView('home')}
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Blog</span>
              </button>

              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                <span>Blog</span>
                <ChevronRight className="h-4 w-4" />
                <span>{categories.find(c => c.id === selectedArticle.category)?.label}</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-gray-800">{selectedArticle.title}</span>
              </nav>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {categories.find(c => c.id === selectedArticle.category)?.label}
                </span>
                {selectedArticle.featured && (
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
                {selectedArticle.video && (
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Play className="h-3 w-3" />
                    <span>Video</span>
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                {selectedArticle.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>{selectedArticle.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>{new Date(selectedArticle.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{selectedArticle.views}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{selectedArticle.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{selectedArticle.comments}</span>
                  </span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative rounded-2xl overflow-hidden mb-8">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-64 sm:h-80 object-cover"
                />
                {selectedArticle.video && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <button className="bg-white/90 p-4 rounded-full hover:bg-white transition-colors">
                      <Play className="h-8 w-8 text-primary-600" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="prose prose-lg max-w-none"
                >
                  <div 
                    className="article-content"
                    dangerouslySetInnerHTML={{ 
                      __html: selectedArticle.content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') 
                    }} 
                  />
                </motion.div>

                {/* Article Tags */}
                {selectedArticle.tags && (
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedArticle.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Buttons */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Share this article</h3>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Facebook className="h-4 w-4" />
                      <span>Facebook</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                      <Twitter className="h-4 w-4" />
                      <span>Twitter</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                      <Link className="h-4 w-4" />
                      <span>Copy Link</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  {/* Author Info */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">About the Author</h3>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {selectedArticle.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{selectedArticle.author}</p>
                        <p className="text-sm text-gray-600">Career Expert</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Passionate about helping professionals discover their perfect career path and achieve their goals.
                    </p>
                  </div>

                  {/* Related Articles */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {allPosts
                        .filter(post => post.id !== selectedArticle.id && post.category === selectedArticle.category)
                        .slice(0, 3)
                        .map((post) => (
                          <button
                            key={post.id}
                            onClick={() => handleReadArticle(post)}
                            className="block text-left hover:bg-white p-3 rounded-lg transition-colors"
                          >
                            <h4 className="font-medium text-gray-800 text-sm line-clamp-2 mb-1">
                              {post.title}
                            </h4>
                            <p className="text-xs text-gray-500">{post.readTime}</p>
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Newsletter Signup */}
                  <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
                    <h3 className="font-semibold text-gray-800 mb-3">Stay Updated</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get the latest career insights delivered to your inbox.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button className="w-full bg-primary-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">More Articles You Might Like</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts
                .filter(post => post.id !== selectedArticle.id)
                .slice(0, 3)
                .map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => handleReadArticle(post)}
                  >
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {post.video && (
                        <div className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full">
                          <Play className="h-3 w-3 text-primary-600" />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                          {categories.find(c => c.id === post.category)?.label}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.readTime}</span>
                        <span className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{post.views}</span>
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
            </div>
          </div>
        </section>
      </div>
    );
  };

  const renderBlogHome = () => (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
              Career Insights & Success Stories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Real stories from real people who transformed their careers, plus expert insights 
              to help you navigate your own professional journey.
            </p>
            
            {/* Quick Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setCurrentView('success-stories')}
                className="bg-white hover:bg-gray-50 text-gray-800 font-medium px-6 py-3 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
              >
                📖 Success Stories
              </button>
              <button
                onClick={() => setCurrentView('featured-articles')}
                className="bg-white hover:bg-gray-50 text-gray-800 font-medium px-6 py-3 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
              >
                ⭐ Featured Articles
              </button>
              <button
                onClick={() => setCurrentView('all-articles')}
                className="bg-white hover:bg-gray-50 text-gray-800 font-medium px-6 py-3 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
              >
                📚 All Articles
              </button>
            </div>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Success Story Video */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold gradient-text mb-4">Featured Success Story</h2>
            <p className="text-gray-600 text-lg">Watch how CareerSpark helped transform a career</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-video flex items-center justify-center overflow-hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-500 hover:bg-primary-600 text-white p-8 rounded-full shadow-2xl transition-all duration-200 z-10"
              >
                <Play className="h-16 w-16" />
              </motion.button>
              
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20"></div>
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Success story thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold text-gray-800">Youssef's Journey to Tech</h3>
                <p className="text-sm text-gray-600">From Business Student to Software Engineer</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>12:34</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>2.8k views</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>4.9/5</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Sections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Success Stories Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Success Stories</h3>
                <button
                  onClick={() => setCurrentView('success-stories')}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  View All →
                </button>
              </div>
              
              <div className="space-y-4">
                {successStories.slice(0, 3).map((story, index) => (
                  <div 
                    key={story.id} 
                    className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => handleReadArticle(story)}
                  >
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 text-sm line-clamp-2">
                        {story.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                        <span>{story.readTime}</span>
                        <span>•</span>
                        <span>{story.views} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Featured Articles Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Featured Articles</h3>
                <button
                  onClick={() => setCurrentView('featured-articles')}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  View All →
                </button>
              </div>
              
              <div className="space-y-4">
                {featuredPosts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => handleReadArticle(post)}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 text-sm line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{post.views} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Latest Articles Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Latest Articles</h3>
                <button
                  onClick={() => setCurrentView('all-articles')}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  View All →
                </button>
              </div>
              
              <div className="space-y-4">
                {regularPosts.slice(0, 3).map((post, index) => (
                  <div 
                    key={post.id} 
                    className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => handleReadArticle(post)}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 text-sm line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{post.views} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );

  const renderSuccessStories = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button
              onClick={() => setCurrentView('home')}
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </button>
            
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
              Success Stories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real transformations from our community. Get inspired by these incredible career journeys.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => handleReadArticle(story)}
              >
                <div className="relative">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {story.video && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 p-3 rounded-full">
                        <Play className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Success Story
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{story.excerpt}</p>
                  
                  {story.stats && (
                    <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{story.stats.salary}</div>
                        <div className="text-xs text-gray-500">Salary Increase</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{story.stats.time}</div>
                        <div className="text-xs text-gray-500">Transition Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">{story.stats.satisfaction}</div>
                        <div className="text-xs text-gray-500">Satisfaction</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{story.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{story.readTime}</span>
                      </div>
                    </div>
                    <span>{new Date(story.date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{story.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{story.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{story.comments}</span>
                      </span>
                    </div>
                    
                    <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors">
                      <span>Read Story</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderFeaturedArticles = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button
              onClick={() => setCurrentView('home')}
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </button>
            
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
              Featured Articles
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our most popular and impactful career guidance articles, handpicked by our experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => handleReadArticle(post)}
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                  {post.video && (
                    <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
                      <Play className="h-4 w-4 text-primary-600" />
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {categories.find(c => c.id === post.category)?.label}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </span>
                    </div>
                    
                    <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors">
                      <span>Read Article</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderAllArticles = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button
              onClick={() => setCurrentView('home')}
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </button>
            
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
              All Articles
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Explore our complete collection of career guidance articles, tips, and insights.
            </p>

            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gray-600 text-lg">
              {filteredPosts.length} articles found
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.label}`}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => handleReadArticle(post)}
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.video && (
                    <div className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full">
                      <Play className="h-3 w-3 text-primary-600" />
                    </div>
                  )}
                  {post.featured && (
                    <div className="absolute top-3 left-3 bg-primary-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                      {categories.find(c => c.id === post.category)?.label}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{post.likes}</span>
                      </span>
                    </div>
                    
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors">
                      Read →
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="blog-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderBlogHome()}
          </motion.div>
        )}

        {currentView === 'success-stories' && (
          <motion.div
            key="success-stories"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSuccessStories()}
          </motion.div>
        )}

        {currentView === 'featured-articles' && (
          <motion.div
            key="featured-articles"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderFeaturedArticles()}
          </motion.div>
        )}

        {currentView === 'all-articles' && (
          <motion.div
            key="all-articles"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderAllArticles()}
          </motion.div>
        )}

        {currentView === 'article' && (
          <motion.div
            key="article"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderArticlePage()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Newsletter Signup - Only show on home view */}
      {currentView === 'home' && (
        <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Updated with Career Insights
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get the latest success stories, career tips, and industry insights delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50"
                />
                <button className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-white/70 text-sm mt-4">
                Join 5,000+ professionals. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Blog;