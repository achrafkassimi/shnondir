import { CareerRecommendation, SkillRecommendation, LearningPlan } from '../types';

export const generateMockCareerRecommendations = (interests: string[]): CareerRecommendation[] => {
  const allCareers: CareerRecommendation[] = [
    {
      title: 'Software Developer',
      description: 'Design, develop, and maintain software applications and systems. Work with various programming languages and technologies to create solutions that meet user needs.',
      matchPercentage: 92,
      averageSalary: '$75,000 - $120,000',
      growthRate: '22%',
      requiredSkills: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git']
    },
    {
      title: 'UX/UI Designer',
      description: 'Create intuitive and visually appealing user interfaces for digital products. Focus on user experience research, wireframing, and prototyping.',
      matchPercentage: 87,
      averageSalary: '$65,000 - $110,000',
      growthRate: '13%',
      requiredSkills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'Design Systems']
    },
    {
      title: 'Data Scientist',
      description: 'Analyze complex data to extract insights and drive business decisions. Use statistical methods, machine learning, and data visualization techniques.',
      matchPercentage: 85,
      averageSalary: '$80,000 - $130,000',
      growthRate: '31%',
      requiredSkills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Tableau']
    },
    {
      title: 'Digital Marketing Specialist',
      description: 'Develop and execute digital marketing strategies across various online channels. Focus on SEO, social media, content marketing, and analytics.',
      matchPercentage: 78,
      averageSalary: '$45,000 - $75,000',
      growthRate: '19%',
      requiredSkills: ['Google Analytics', 'SEO', 'Social Media Marketing', 'Content Strategy', 'PPC']
    },
    {
      title: 'Product Manager',
      description: 'Guide the development and launch of products from conception to market. Work with cross-functional teams to define product strategy and roadmap.',
      matchPercentage: 82,
      averageSalary: '$85,000 - $140,000',
      growthRate: '19%',
      requiredSkills: ['Product Strategy', 'Agile Methodology', 'Market Research', 'Analytics', 'Leadership']
    },
    {
      title: 'Cybersecurity Analyst',
      description: 'Protect organizations from cyber threats by monitoring security systems, investigating incidents, and implementing security measures.',
      matchPercentage: 89,
      averageSalary: '$70,000 - $115,000',
      growthRate: '35%',
      requiredSkills: ['Network Security', 'Incident Response', 'Risk Assessment', 'Security Tools', 'Compliance']
    }
  ];

  // Simple matching logic based on interests
  const matchedCareers = allCareers
    .map(career => ({
      ...career,
      matchPercentage: Math.max(70, career.matchPercentage - Math.floor(Math.random() * 20))
    }))
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 3);

  return matchedCareers;
};

export const generateMockSkillRecommendations = (): SkillRecommendation[] => {
  return [
    {
      skill: 'JavaScript Programming',
      importance: 'High',
      timeToLearn: '3-6 months',
      resources: [
        'freeCodeCamp JavaScript Course',
        'MDN Web Docs',
        'JavaScript.info',
        'Codecademy JavaScript Track'
      ]
    },
    {
      skill: 'React Framework',
      importance: 'High',
      timeToLearn: '2-4 months',
      resources: [
        'React Official Documentation',
        'React Tutorial by Kent C. Dodds',
        'Scrimba React Course',
        'React Router Documentation'
      ]
    },
    {
      skill: 'Version Control (Git)',
      importance: 'Medium',
      timeToLearn: '2-4 weeks',
      resources: [
        'Git Handbook by GitHub',
        'Atlassian Git Tutorials',
        'Git Branching Interactive Tutorial',
        'Pro Git Book (Free)'
      ]
    }
  ];
};

export const generateMockLearningPlan = (): LearningPlan[] => {
  return [
    {
      week: 1,
      focus: 'Foundation Building',
      tasks: [
        'Complete HTML/CSS fundamentals review',
        'Set up development environment',
        'Start JavaScript basics course',
        'Create your first simple webpage'
      ],
      resources: [
        'MDN Web Docs HTML/CSS Guide',
        'VS Code Setup Tutorial',
        'freeCodeCamp Responsive Web Design'
      ]
    },
    {
      week: 2,
      focus: 'JavaScript Fundamentals',
      tasks: [
        'Learn variables, functions, and control structures',
        'Practice with coding challenges',
        'Build 3 small JavaScript projects',
        'Understand DOM manipulation'
      ],
      resources: [
        'JavaScript.info chapters 1-6',
        'Codewars JavaScript challenges',
        'Mozilla JavaScript Guide'
      ]
    },
    {
      week: 3,
      focus: 'Modern JavaScript & Tools',
      tasks: [
        'Learn ES6+ features (arrow functions, destructuring)',
        'Introduction to package managers (npm)',
        'Basic Git and version control',
        'Set up a GitHub profile'
      ],
      resources: [
        'ES6 Features Guide',
        'npm Documentation',
        'Git Tutorial by Atlassian',
        'GitHub Student Pack'
      ]
    },
    {
      week: 4,
      focus: 'First Framework Experience',
      tasks: [
        'Introduction to React concepts',
        'Build your first React component',
        'Create a simple interactive app',
        'Deploy your project online'
      ],
      resources: [
        'React Official Tutorial',
        'Create React App Documentation',
        'Netlify Deployment Guide',
        'React Dev Tools'
      ]
    }
  ];
};