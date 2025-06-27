# CareerSpark - AI-Powered Career Guidance

CareerSpark is a comprehensive web application that helps students and professionals discover their perfect career path through AI-powered analysis and personalized recommendations.

## 🌟 Features

- **AI-Powered Analysis**: Advanced algorithms analyze your background, interests, and goals
- **Dual Input Options**: Voice input (ElevenLabs) and text input for maximum accessibility
- **Personalized Recommendations**: Get 2-3 tailored career paths with detailed insights
- **Skill Development Plans**: Curated learning resources and skill recommendations
- **4-Week Learning Plans**: Structured roadmaps to get started in your chosen field
- **Custom CV Templates**: Professional templates tailored to your target career
- **Video Coaching**: Personalized video explanations powered by Tavus
- **User Dashboard**: Save plans, track progress, and manage your career journey
- **Analytics & Insights**: View trending career paths and regional opportunities

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Supabase (Database, Authentication, Real-time)
- **AI Integration**: Ready for ElevenLabs (Voice) and Tavus (Video)
- **Deployment**: Netlify
- **Icons**: Lucide React

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- ElevenLabs API key (optional, for voice features)
- Tavus API key (optional, for video coaching)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd careerspark
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your API keys:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
   VITE_TAVUS_API_KEY=your_tavus_api_key
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the migration file in `supabase/migrations/create_career_plans_table.sql`
   - Enable email authentication in Supabase Auth settings

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 📱 User Journey

1. **Landing Page**: Welcome screen with feature overview
2. **Input Phase**: Users share their background via text or voice
3. **AI Analysis**: System processes user data and generates recommendations
4. **Results**: Personalized career paths, skills, and learning plans
5. **Dashboard**: Authenticated users can save, track, and manage multiple plans

## 🎯 Key Components

### Authentication
- Secure user registration and login
- Email-based authentication via Supabase
- Protected routes and user session management

### Career Analysis
- Mock AI analysis (ready for real AI integration)
- Personalized career path matching
- Skill gap analysis and recommendations

### Dashboard Features
- Multiple career plan management
- Progress tracking with interactive checklists
- Plan sharing and export capabilities

### Responsive Design
- Mobile-first approach
- Clean, modern UI with smooth animations
- Accessible design patterns

## 🌍 Moroccan Cultural Integration

The app includes regional insights and examples relevant to Morocco:
- Local job market trends (Casablanca, Rabat, Marrakech, Tangier)
- Regional career opportunities
- Cultural context in career recommendations

## 🔧 API Integration Points

### ElevenLabs (Voice Input)
- Speech-to-text conversion
- Voice response generation
- Multi-language support ready

### Tavus (Video Coaching)
- Personalized video generation
- AI avatar explanations
- Custom video content for each career plan

### Supabase Features Used
- Authentication and user management
- Real-time database operations
- Row Level Security (RLS)
- JSON data storage for flexible career plan structure

## 📊 Analytics & Insights

- Career path popularity tracking
- User engagement metrics
- Regional job market insights
- Success rate monitoring

## 🚀 Deployment

The app is configured for easy deployment on Netlify:

```bash
npm run build
```

Deploy the `dist` folder to Netlify or use the Netlify CLI for automated deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Bolt.new](https://bolt.new) - AI-powered development platform
- Icons by [Lucide](https://lucide.dev)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)
- Animations powered by [Framer Motion](https://framer.com/motion)

---

**CareerSpark** - Empowering the next generation to find their perfect career path! 🌟