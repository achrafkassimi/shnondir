import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

interface ChatRequest {
  message: string;
  conversationId?: string;
  userId?: string;
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

    const { message, conversationId, userId }: ChatRequest = await req.json()

    // Get or create conversation
    let conversation
    if (conversationId) {
      const { data } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .single()
      conversation = data
    } else {
      // Create new conversation
      const { data } = await supabase
        .from('conversations')
        .insert({
          user_id: userId,
          title: generateConversationTitle(message),
          context: { initial_message: message }
        })
        .select()
        .single()
      conversation = data
    }

    // Save user message
    if (conversation) {
      await supabase.from('messages').insert({
        conversation_id: conversation.id,
        user_id: userId,
        role: 'user',
        content: message
      })
    }

    // Generate AI response
    const aiResponse = await generateAIResponse(message, conversation, supabase)

    // Save AI response
    if (conversation) {
      await supabase.from('messages').insert({
        conversation_id: conversation.id,
        role: 'assistant',
        content: aiResponse.content,
        metadata: aiResponse.metadata
      })

      // Update conversation last message time
      await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversation.id)
    }

    // Log analytics
    await supabase.from('analytics').insert({
      event_type: 'chatbot_interaction',
      event_data: {
        conversation_id: conversation?.id,
        message_length: message.length,
        response_type: aiResponse.metadata.response_type
      },
      user_id: userId
    })

    return new Response(
      JSON.stringify({
        response: aiResponse.content,
        conversationId: conversation?.id,
        metadata: aiResponse.metadata
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Chatbot error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        response: generateFallbackResponse(req.url)
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200, // Return 200 with fallback response
      },
    )
  }
})

async function generateAIResponse(message: string, conversation: any, supabase: any) {
  const lowerMessage = message.toLowerCase()
  
  // Get relevant knowledge from database
  try {
    const { data: knowledge } = await supabase
      .from('chatbot_knowledge')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: false })

    // Find best matching response
    let bestMatch = null
    let bestScore = 0

    for (const item of knowledge || []) {
      let score = 0
      
      // Check keywords
      for (const keyword of item.keywords) {
        if (lowerMessage.includes(keyword.toLowerCase())) {
          score += 2
        }
      }
      
      // Check question similarity
      if (lowerMessage.includes(item.question.toLowerCase().substring(0, 10))) {
        score += 3
      }
      
      // Boost priority items
      score += item.priority
      
      if (score > bestScore) {
        bestScore = score
        bestMatch = item
      }
    }

    // Generate contextual response
    if (bestMatch && bestScore > 3) {
      return {
        content: personalizeResponse(bestMatch.answer, conversation),
        metadata: {
          response_type: 'knowledge_base',
          category: bestMatch.category,
          confidence: Math.min(bestScore / 10, 1)
        }
      }
    }
  } catch (dbError) {
    console.log('Database unavailable, using fallback responses')
  }

  // Handle specific intents with fallback responses
  if (lowerMessage.includes('career plan') || lowerMessage.includes('assessment')) {
    return {
      content: "I'd love to help you create a personalized career plan! 🎯\n\nTo get started, I'll need to know a bit about you. You can either:\n\n**📝 Take our quick assessment** - Click the 'Start Your Journey' button to begin\n\n**💬 Tell me about yourself** - Share your education, interests, and experience right here in chat\n\nWhich option sounds better to you?",
      metadata: {
        response_type: 'career_plan_prompt',
        suggested_actions: ['start_assessment', 'continue_chat']
      }
    }
  }

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return {
      content: "Hello! 👋 I'm your AI career assistant at CareerSpark. I'm here to help you navigate your career journey!\n\n**I can help you with:**\n• 🎓 Career exploration for students\n• 💼 Career change guidance\n• 📈 Skill development planning\n• 🎯 Job search strategies\n• 📝 CV and interview preparation\n\nWhat brings you here today? Feel free to ask me anything about careers, skills, or how CareerSpark can help you succeed!",
      metadata: {
        response_type: 'greeting',
        suggested_topics: ['career_exploration', 'skill_development', 'job_search']
      }
    }
  }

  if (lowerMessage.includes('skill') || lowerMessage.includes('learn')) {
    return {
      content: "Excellent question about skills! 📚 Here are some of the most in-demand skills right now:\n\n**🔥 Hot Tech Skills:**\n• JavaScript & Python programming\n• Data analysis & visualization\n• Cloud computing (AWS, Azure)\n• AI/Machine Learning basics\n\n**💼 Essential Business Skills:**\n• Digital marketing & SEO\n• Project management\n• Data-driven decision making\n• Communication & leadership\n\nWhat field interests you most? I can suggest specific learning paths and resources!",
      metadata: {
        response_type: 'skill_guidance',
        categories: ['tech', 'business', 'creative']
      }
    }
  }

  // Default response with helpful suggestions
  return {
    content: "Thanks for reaching out! 😊 I'm here to help with your career journey.\n\n**Here's how I can assist you:**\n\n🎯 **Career Exploration** - Discover paths that match your interests\n📚 **Skill Development** - Learn what skills to focus on\n💼 **Job Search** - Tips for CVs, interviews, and finding opportunities\n🎓 **Education Decisions** - Whether to pursue further studies\n\n**Quick Start Options:**\n• Take our career assessment for personalized recommendations\n• Tell me about your background and goals\n• Ask specific questions about any career topic\n\nWhat would you like to explore first?",
    metadata: {
      response_type: 'general_help',
      suggested_actions: ['career_assessment', 'skill_planning', 'job_search_help']
    }
  }
}

function personalizeResponse(baseResponse: string, conversation: any): string {
  // Add personalization based on conversation context
  const context = conversation?.context || {}
  
  if (context.user_name) {
    baseResponse = baseResponse.replace(/\bYou\b/g, context.user_name)
  }
  
  // Add encouraging phrases
  const encouragements = [
    "You're on the right track! ",
    "Great question! ",
    "I'm excited to help you with this! ",
    "This is a smart thing to think about! "
  ]
  
  if (Math.random() > 0.7) {
    baseResponse = encouragements[Math.floor(Math.random() * encouragements.length)] + baseResponse
  }
  
  return baseResponse
}

function generateConversationTitle(message: string): string {
  const keywords = message.toLowerCase().split(' ').slice(0, 3)
  const titles = [
    'Career Guidance Chat',
    'Skill Development Discussion',
    'Job Search Help',
    'Career Planning Session',
    'Professional Development Chat'
  ]
  
  if (message.toLowerCase().includes('career')) return 'Career Guidance Chat'
  if (message.toLowerCase().includes('skill')) return 'Skill Development Discussion'
  if (message.toLowerCase().includes('job')) return 'Job Search Help'
  
  return titles[Math.floor(Math.random() * titles.length)]
}

function generateFallbackResponse(url: string): string {
  return "Hi there! 👋 I'm your AI career assistant. I'm here to help you with career planning, skill development, and job search strategies. How can I assist you today?"
}