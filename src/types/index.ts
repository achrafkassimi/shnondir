export interface UserProfile {
  id?: string;
  name: string;
  email?: string;
  educationLevel: string;
  interests: string[];
  experience: string;
  goals: string;
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
  userProfile: UserProfile;
  careerRecommendations: CareerRecommendation[];
  skillRecommendations: SkillRecommendation[];
  learningPlan: LearningPlan[];
  createdAt?: string;
}

// Database types for Supabase
export interface DatabaseCareerPlan {
  id: string;
  user_id: string;
  user_profile: UserProfile;
  career_recommendations: CareerRecommendation[];
  skill_recommendations: SkillRecommendation[];
  learning_plan: LearningPlan[];
  created_at: string;
}