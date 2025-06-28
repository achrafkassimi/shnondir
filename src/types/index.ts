export interface UserProfile {
  id?: string;
  name: string;
  email?: string;
  educationLevel: string;
  interests: string[];
  experience: string;
  goals: string;
  location?: string;
  preferences?: any;
  createdAt?: string;
}

export interface CareerRecommendation {
  title: string;
  description: string;
  matchPercentage: number;
  averageSalary: string;
  growthRate: string;
  requiredSkills: string[];
}

export interface SkillRecommendation {
  skill: string;
  importance: string;
  timeToLearn: string;
  resources: string[];
}

export interface LearningPlan {
  week: number;
  focus: string;
  tasks: string[];
  resources: string[];
}

export interface CareerPlan {
  id?: string;
  userId?: string;
  title?: string;
  userProfile: UserProfile;
  careerRecommendations: CareerRecommendation[];
  skillRecommendations: SkillRecommendation[];
  learningPlan: LearningPlan[];
  status?: 'active' | 'completed' | 'archived';
  progressPercentage?: number;
  isFavorite?: boolean;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProgress {
  id?: string;
  userId: string;
  careerPlanId: string;
  taskId: string;
  taskType: 'learning' | 'skill' | 'project' | 'milestone';
  completed: boolean;
  completedAt?: string;
  notes?: string;
  createdAt?: string;
}

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  templateData: any;
  previewUrl?: string;
  isActive: boolean;
  createdAt: string;
}

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  url: string;
  resourceType: 'course' | 'tutorial' | 'book' | 'video' | 'article' | 'tool';
  provider: string;
  skillTags: string[];
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  durationHours?: number;
  priceType: 'free' | 'paid' | 'freemium';
  rating?: number;
  isFeatured: boolean;
  createdAt: string;
}

export interface CareerInsight {
  id: string;
  careerTitle: string;
  industry: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  growthRate: number;
  demandLevel: 'low' | 'medium' | 'high' | 'very_high';
  requiredSkills: string[];
  dataSource: string;
  lastUpdated: string;
  createdAt: string;
}

export interface Analytics {
  totalPlans: number;
  totalUsers: number;
  monthlyPlans: number;
  completionRate: number;
  growthRate: string;
  popularCareers?: Array<{
    name: string;
    percentage: number;
    color: string;
  }>;
  engagementData?: Array<{
    date: string;
    count: number;
  }>;
}

// Database types for Supabase
export interface DatabaseCareerPlan {
  id: string;
  user_id: string;
  title: string;
  user_profile: UserProfile;
  career_recommendations: CareerRecommendation[];
  skill_recommendations: SkillRecommendation[];
  learning_plan: LearningPlan[];
  status: string;
  progress_percentage: number;
  is_favorite: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface DatabaseUser {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  education_level?: string;
  location?: string;
  preferences: any;
  created_at: string;
  updated_at: string;
}