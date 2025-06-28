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
  const interestKeywords = profile.interests.map(i => i.toLowerCase())
  
  const careerMatches = insights
    .map(insight => {
      let matchScore = 0
      
      // Match based on interests
      const careerKeywords = insight.career_title.toLowerCase().split(' ')
      const skillKeywords = insight.required_skills.map((s: string) => s.toLowerCase())
      
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
      if (insight.growth_rate > 20) matchScore += 15
      if (insight.growth_rate > 10) matchScore += 10
      
      return {
        title: insight.career_title,
        description: generateCareerDescription(insight),
        matchPercentage: Math.min(95, Math.max(65, matchScore)),
        averageSalary: `${Math.round(insight.salary_min / 1000)}k - ${Math.round(insight.salary_max / 1000)}k MAD`,
        growthRate: `${insight.growth_rate}%`,
        requiredSkills: insight.required_skills.slice(0, 6)
      }
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 3)

  return careerMatches
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
  
  return descriptions[insight.career_title] || `Work in ${insight.industry} focusing on ${insight.career_title.toLowerCase()} responsibilities with growth opportunities in Morocco.`
}

function generateSkillRecommendations(careers: CareerRecommendation[], resources: any[]) {
  const allSkills = careers.flatMap(career => career.requiredSkills)
  const skillCounts = allSkills.reduce((acc: any, skill) => {
    acc[skill] = (acc[skill] || 0) + 1
    return acc
  }, {})
  
  const topSkills = Object.entries(skillCounts)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 3)
    .map(([skill]) => skill)
  
  return topSkills.map(skill => {
    const relatedResources = resources
      .filter(resource => resource.skill_tags.some((tag: string) => 
        tag.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(tag.toLowerCase())
      ))
      .slice(0, 3)
      .map((resource: any) => resource.title)
    
    return {
      skill,
      importance: 'High',
      timeToLearn: getTimeToLearn(skill),
      resources: relatedResources.length > 0 ? relatedResources : [`${skill} Tutorial`, `${skill} Documentation`, `${skill} Course`]
    }
  })
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
      resources: resources.filter(r => r.difficulty_level === 'beginner').slice(0, 3).map(r => r.title)
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
    'Excel': '1-2 months'
  }
  
  return timeMap[skill] || '2-4 months'
}