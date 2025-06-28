import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CVRequest {
  userProfile: any;
  careerPath: string;
  templateId?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { userProfile, careerPath, templateId }: CVRequest = await req.json()

    // Get CV template
    const { data: template } = await supabase
      .from('cv_templates')
      .select('*')
      .eq('id', templateId || '')
      .single()

    // If no specific template, get default for career category
    let cvTemplate = template
    if (!cvTemplate) {
      const category = getCategoryForCareer(careerPath)
      const { data: defaultTemplate } = await supabase
        .from('cv_templates')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .limit(1)
        .single()
      
      cvTemplate = defaultTemplate
    }

    // Generate CV content
    const cvContent = generateCVContent(userProfile, careerPath, cvTemplate)

    // Log analytics
    await supabase.from('analytics').insert({
      event_type: 'cv_template_generated',
      event_data: {
        career_path: careerPath,
        template_id: cvTemplate?.id,
        template_name: cvTemplate?.name
      }
    })

    return new Response(
      JSON.stringify({
        cvContent,
        template: cvTemplate,
        downloadUrl: generateDownloadUrl(cvContent, cvTemplate)
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

function getCategoryForCareer(careerPath: string): string {
  const categoryMap: { [key: string]: string } = {
    'Software Developer': 'technology',
    'Data Scientist': 'technology',
    'UX/UI Designer': 'design',
    'Digital Marketing Specialist': 'business',
    'Product Manager': 'business',
    'Cybersecurity Analyst': 'technology'
  }
  
  return categoryMap[careerPath] || 'business'
}

function generateCVContent(userProfile: any, careerPath: string, template: any) {
  const sections = template?.template_data?.sections || ['header', 'summary', 'experience', 'skills', 'education']
  
  const cvContent: any = {
    header: {
      name: userProfile.name,
      email: userProfile.email || 'your.email@example.com',
      phone: '+212 6XX XXX XXX',
      location: 'Morocco',
      linkedin: 'linkedin.com/in/yourprofile'
    },
    summary: generateSummary(userProfile, careerPath),
    experience: generateExperience(userProfile, careerPath),
    skills: generateSkills(careerPath),
    education: generateEducation(userProfile),
    projects: generateProjects(careerPath)
  }

  // Filter content based on template sections
  const filteredContent: any = {}
  sections.forEach((section: string) => {
    if (cvContent[section]) {
      filteredContent[section] = cvContent[section]
    }
  })

  return filteredContent
}

function generateSummary(userProfile: any, careerPath: string): string {
  const summaries: { [key: string]: string } = {
    'Software Developer': `Passionate ${userProfile.educationLevel} graduate with strong interest in ${userProfile.interests.join(', ')}. Seeking to leverage programming skills and problem-solving abilities to contribute to innovative software development projects. ${userProfile.goals}`,
    'Data Scientist': `Analytical ${userProfile.educationLevel} graduate with expertise in data analysis and statistical modeling. Passionate about extracting insights from complex datasets to drive business decisions. ${userProfile.goals}`,
    'UX/UI Designer': `Creative ${userProfile.educationLevel} graduate with a passion for user-centered design. Skilled in creating intuitive and visually appealing digital experiences. ${userProfile.goals}`,
    'Digital Marketing Specialist': `Results-driven ${userProfile.educationLevel} graduate with expertise in digital marketing strategies. Passionate about leveraging data-driven insights to optimize marketing campaigns. ${userProfile.goals}`
  }
  
  return summaries[careerPath] || `Motivated ${userProfile.educationLevel} graduate seeking opportunities in ${careerPath}. ${userProfile.goals}`
}

function generateExperience(userProfile: any, careerPath: string): any[] {
  // Parse experience from user profile
  const experiences = []
  
  if (userProfile.experience && userProfile.experience.length > 50) {
    experiences.push({
      title: 'Relevant Experience',
      company: 'Various Projects',
      duration: 'Recent',
      description: userProfile.experience,
      achievements: [
        'Applied theoretical knowledge to practical projects',
        'Developed problem-solving and analytical skills',
        'Collaborated with team members on various initiatives'
      ]
    })
  }
  
  // Add suggested experience based on career path
  const suggestedExperience = {
    'Software Developer': {
      title: 'Junior Developer (Internship)',
      company: 'Tech Company',
      duration: '3 months',
      description: 'Developed web applications using modern frameworks',
      achievements: [
        'Built responsive web applications using React and JavaScript',
        'Collaborated with senior developers on code reviews',
        'Implemented user interface designs with attention to detail'
      ]
    },
    'Data Scientist': {
      title: 'Data Analysis Intern',
      company: 'Analytics Firm',
      duration: '3 months',
      description: 'Analyzed datasets and created visualizations',
      achievements: [
        'Processed and analyzed large datasets using Python',
        'Created data visualizations and reports',
        'Assisted in machine learning model development'
      ]
    }
  }
  
  if (suggestedExperience[careerPath as keyof typeof suggestedExperience]) {
    experiences.push(suggestedExperience[careerPath as keyof typeof suggestedExperience])
  }
  
  return experiences
}

function generateSkills(careerPath: string): any {
  const skillSets: { [key: string]: any } = {
    'Software Developer': {
      technical: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git'],
      soft: ['Problem Solving', 'Team Collaboration', 'Communication', 'Attention to Detail']
    },
    'Data Scientist': {
      technical: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Tableau'],
      soft: ['Analytical Thinking', 'Communication', 'Problem Solving', 'Attention to Detail']
    },
    'UX/UI Designer': {
      technical: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'HTML/CSS'],
      soft: ['Creativity', 'Empathy', 'Communication', 'Attention to Detail']
    },
    'Digital Marketing Specialist': {
      technical: ['Google Analytics', 'SEO', 'Social Media Marketing', 'Content Creation', 'PPC'],
      soft: ['Creativity', 'Communication', 'Analytical Thinking', 'Adaptability']
    }
  }
  
  return skillSets[careerPath] || {
    technical: ['Industry-specific tools', 'Data Analysis', 'Project Management'],
    soft: ['Communication', 'Problem Solving', 'Team Collaboration', 'Adaptability']
  }
}

function generateEducation(userProfile: any): any[] {
  return [{
    degree: userProfile.educationLevel,
    institution: 'University/Institution Name',
    year: new Date().getFullYear(),
    gpa: '3.5/4.0',
    relevantCourses: userProfile.interests.slice(0, 3)
  }]
}

function generateProjects(careerPath: string): any[] {
  const projectSuggestions: { [key: string]: any[] } = {
    'Software Developer': [
      {
        name: 'Personal Portfolio Website',
        description: 'Responsive website showcasing projects and skills',
        technologies: ['React', 'JavaScript', 'CSS'],
        link: 'github.com/yourprofile/portfolio'
      },
      {
        name: 'Task Management App',
        description: 'Full-stack application for managing daily tasks',
        technologies: ['Node.js', 'Express', 'MongoDB'],
        link: 'github.com/yourprofile/task-app'
      }
    ],
    'Data Scientist': [
      {
        name: 'Sales Prediction Model',
        description: 'Machine learning model to predict sales trends',
        technologies: ['Python', 'Scikit-learn', 'Pandas'],
        link: 'github.com/yourprofile/sales-prediction'
      },
      {
        name: 'Data Visualization Dashboard',
        description: 'Interactive dashboard for business metrics',
        technologies: ['Python', 'Plotly', 'Streamlit'],
        link: 'github.com/yourprofile/dashboard'
      }
    ]
  }
  
  return projectSuggestions[careerPath] || []
}

function generateDownloadUrl(cvContent: any, template: any): string {
  // In a real implementation, this would generate a PDF and return a download URL
  // For now, return a placeholder URL
  return `/api/cv/download/${Date.now()}.pdf`
}