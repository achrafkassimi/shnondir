import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

interface UserProfile {
  name: string;
  educationLevel: string;
  interests: string[];
  experience: string;
  goals: string;
}

interface CareerRecommendation {
  title: string;
  description: string;
  matchPercentage: number;
  averageSalary: string;
  growthRate: string;
  requiredSkills: string[];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { userProfile }: { userProfile: UserProfile } = await req.json()

    // Get career insights from database
    const { data: careerInsights } = await supabase
      .from('career_insights')
      .select('*')
      .limit(10)

    // Get learning resources
    const { data: learningResources } = await supabase
      .from('learning_resources')
      .select('*')
      .eq('is_featured', true)
      .limit(20)

    // AI-powered career matching logic
    const careerRecommendations = generateCareerRecommendations(userProfile, careerInsights || [])
    const skillRecommendations = generateSkillRecommendations(careerRecommendations, learningResources || [])
    const learningPlan = generateLearningPlan(skillRecommendations, learningResources || [])

    // Log analytics
    await supabase.from('analytics').insert({
      event_type: 'career_plan_generated',
      event_data: {
        career_paths: careerRecommendations.map(c => c.title),
        user_interests: userProfile.interests,
        education_level: userProfile.educationLevel
      }
    })

    return new Response(
      JSON.stringify({
        careerRecommendations,
        skillRecommendations,
        learningPlan,
        generatedAt: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in generate-career-plan function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

function generateCareerRecommendations(profile: UserProfile, insights: any[]): CareerRecommendation[] {
  // Simple matching algorithm based on interests and education
  const interestKeywords = (profile.interests || []).map(i => i.toLowerCase())
  
  const careerMatches = insights
    .filter(insight => insight && insight.career_title) // Filter out null/undefined insights
    .map(insight => {
      let matchScore = 0
      
      // Safely handle career title
      const careerTitle = insight.career_title || ''
      const careerKeywords = careerTitle.toLowerCase().split(' ')
      
      // Safely handle required skills
      const requiredSkills = Array.isArray(insight.required_skills) ? insight.required_skills : []
      const skillKeywords = requiredSkills.map((s: string) => (s || '').toLowerCase())
      
      // Match based on interests
      interestKeywords.forEach(interest => {
        if (careerKeywords.some((keyword: string) => keyword.includes(interest) || interest.includes(keyword))) {
          matchScore += 30
        }
        if (skillKeywords.some((skill: string) => skill.includes(interest) || interest.includes(skill))) {
          matchScore += 20
        }
      })
      
      // Boost score for high-demand careers
      if (insight.demand_level === 'very_high') matchScore += 15
      if (insight.demand_level === 'high') matchScore += 10
      
      // Boost score for high growth careers
      const growthRate = insight.growth_rate || 0
      if (growthRate > 20) matchScore += 15
      if (growthRate > 10) matchScore += 10
      
      // Safely handle salary values
      const salaryMin = insight.salary_min || 30000
      const salaryMax = insight.salary_max || 60000
      
      return {
        title: careerTitle,
        description: generateCareerDescription(insight),
        matchPercentage: Math.min(95, Math.max(65, matchScore)),
        averageSalary: `${Math.round(salaryMin / 1000)}k - ${Math.round(salaryMax / 1000)}k MAD`,
        growthRate: `${growthRate}%`,
        requiredSkills: requiredSkills.slice(0, 6)
      }
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 3)

  // If no matches found, return default recommendations
  if (careerMatches.length === 0) {
    return getDefaultCareerRecommendations()
  }

  return careerMatches
}

function getDefaultCareerRecommendations(): CareerRecommendation[] {
  return [
    {
      title: 'Software Developer',
      description: 'Design, develop, and maintain software applications using modern programming languages and frameworks. Work on web applications, mobile apps, or enterprise systems.',
      matchPercentage: 85,
      averageSalary: '35k - 80k MAD',
      growthRate: '15%',
      requiredSkills: ['JavaScript', 'Python', 'React', 'SQL', 'Git', 'Problem Solving']
    },
    {
      title: 'Digital Marketing Specialist',
      description: 'Develop and execute digital marketing strategies across various online channels. Manage SEO, social media, content marketing, and analytics.',
      matchPercentage: 80,
      averageSalary: '25k - 60k MAD',
      growthRate: '12%',
      requiredSkills: ['SEO', 'Social Media', 'Google Analytics', 'Content Creation', 'Email Marketing', 'PPC']
    },
    {
      title: 'Data Analyst',
      description: 'Analyze complex datasets to extract insights and drive business decisions. Use statistical tools and data visualization to solve real-world problems.',
      matchPercentage: 75,
      averageSalary: '30k - 70k MAD',
      growthRate: '18%',
      requiredSkills: ['Excel', 'SQL', 'Python', 'Tableau', 'Statistics', 'Data Visualization']
    }
  ]
}

function generateCareerDescription(insight: any): string {
  const descriptions: { [key: string]: string } = {
    'Software Developer': 'Design, develop, and maintain software applications using modern programming languages and frameworks. Work on web applications, mobile apps, or enterprise systems.',
    'Data Scientist': 'Analyze complex datasets to extract insights and drive business decisions. Use machine learning, statistics, and data visualization to solve real-world problems.',
    'UX/UI Designer': 'Create intuitive and visually appealing user interfaces for digital products. Focus on user research, wireframing, prototyping, and design systems.',
    'Digital Marketing Specialist': 'Develop and execute digital marketing strategies across various online channels. Manage SEO, social media, content marketing, and analytics.',
    'Product Manager': 'Guide product development from conception to launch. Work with cross-functional teams to define product strategy, roadmap, and user requirements.',
    'Cybersecurity Analyst': 'Protect organizations from cyber threats by monitoring security systems, investigating incidents, and implementing security measures.'
  }
  
  const careerTitle = insight.career_title || 'Professional'
  const industry = insight.industry || 'technology'
  
  return descriptions[careerTitle] || `Work in ${industry} focusing on ${careerTitle.toLowerCase()} responsibilities with growth opportunities in Morocco.`
}

function generateSkillRecommendations(careers: CareerRecommendation[], resources: any[]) {
  const allSkills = careers.flatMap(career => career.requiredSkills || [])
  const skillCounts = allSkills.reduce((acc: any, skill) => {
    if (skill) {
      acc[skill] = (acc[skill] || 0) + 1
    }
    return acc
  }, {})
  
  const topSkills = Object.entries(skillCounts)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 3)
    .map(([skill]) => skill)
  
  // If no skills found, return default skills
  if (topSkills.length === 0) {
    return getDefaultSkillRecommendations()
  }
  
  return topSkills.map(skill => {
    const relatedResources = resources
      .filter(resource => {
        const skillTags = Array.isArray(resource.skill_tags) ? resource.skill_tags : []
        return skillTags.some((tag: string) => 
          (tag || '').toLowerCase().includes(skill.toLowerCase()) || 
          skill.toLowerCase().includes((tag || '').toLowerCase())
        )
      })
      .slice(0, 3)
      .map((resource: any) => resource.title || 'Learning Resource')
    
    return {
      skill,
      importance: 'High',
      timeToLearn: getTimeToLearn(skill),
      resources: relatedResources.length > 0 ? relatedResources : [`${skill} Tutorial`, `${skill} Documentation`, `${skill} Course`]
    }
  })
}

function getDefaultSkillRecommendations() {
  return [
    {
      skill: 'Communication',
      importance: 'High',
      timeToLearn: '1-2 months',
      resources: ['Communication Skills Course', 'Public Speaking Tutorial', 'Writing Workshop']
    },
    {
      skill: 'Problem Solving',
      importance: 'High',
      timeToLearn: '2-3 months',
      resources: ['Critical Thinking Course', 'Logic Puzzles', 'Case Study Analysis']
    },
    {
      skill: 'Digital Literacy',
      importance: 'High',
      timeToLearn: '1-2 months',
      resources: ['Computer Basics', 'Internet Skills', 'Office Software Training']
    }
  ]
}

function generateLearningPlan(skills: any[], resources: any[]) {
  const weeks = [
    {
      week: 1,
      focus: 'Foundation Building',
      tasks: [
        'Set up development environment',
        'Complete basic tutorials',
        'Join relevant communities',
        'Create learning schedule'
      ],
      resources: resources.filter(r => r.difficulty_level === 'beginner').slice(0, 3).map(r => r.title || 'Learning Resource')
    },
    {
      week: 2,
      focus: skills[0]?.skill || 'Core Skills',
      tasks: [
        `Start ${skills[0]?.skill || 'primary skill'} fundamentals`,
        'Practice with small projects',
        'Complete online exercises',
        'Build first project'
      ],
      resources: skills[0]?.resources || ['Online Course', 'Documentation', 'Practice Platform']
    },
    {
      week: 3,
      focus: skills[1]?.skill || 'Advanced Concepts',
      tasks: [
        `Learn ${skills[1]?.skill || 'secondary skill'} basics`,
        'Integrate with previous learning',
        'Work on portfolio project',
        'Seek feedback from community'
      ],
      resources: skills[1]?.resources || ['Advanced Tutorial', 'Project Ideas', 'Community Forum']
    },
    {
      week: 4,
      focus: 'Portfolio & Practice',
      tasks: [
        'Complete portfolio project',
        'Apply for internships/jobs',
        'Network with professionals',
        'Plan next learning phase'
      ],
      resources: ['Portfolio Examples', 'Job Boards', 'LinkedIn Learning', 'Interview Prep']
    }
  ]
  
  return weeks
}

function getTimeToLearn(skill: string): string {
  const timeMap: { [key: string]: string } = {
    'JavaScript': '3-6 months',
    'Python': '2-4 months',
    'React': '2-3 months',
    'SQL': '1-2 months',
    'Figma': '2-4 weeks',
    'Excel': '1-2 months',
    'Communication': '1-2 months',
    'Problem Solving': '2-3 months',
    'Digital Literacy': '1-2 months'
  }
  
  return timeMap[skill] || '2-4 months'
}