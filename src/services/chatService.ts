import { supabase } from '../lib/supabase';

export interface Conversation {
  id: string;
  title: string;
  status: string;
  lastMessageAt: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: any;
  createdAt: string;
}

// Get user's conversations
export const getUserConversations = async (userId: string): Promise<Conversation[]> => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .order('last_message_at', { ascending: false });

    if (error) throw error;
    
    return data.map(conv => ({
      id: conv.id,
      title: conv.title,
      status: conv.status,
      lastMessageAt: conv.last_message_at,
      createdAt: conv.created_at
    }));
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

// Get messages for a conversation
export const getConversationMessages = async (conversationId: string): Promise<ChatMessage[]> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    
    return data.map(msg => ({
      id: msg.id,
      conversationId: msg.conversation_id,
      role: msg.role,
      content: msg.content,
      metadata: msg.metadata,
      createdAt: msg.created_at
    }));
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

// Send message to chatbot
export const sendChatMessage = async (
  message: string, 
  conversationId?: string, 
  userId?: string
): Promise<{ response: string; conversationId: string; metadata?: any }> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationId,
        userId
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

// Create new conversation
export const createConversation = async (userId: string, title: string): Promise<string> => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        user_id: userId,
        title,
        status: 'active'
      })
      .select()
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};

// Update conversation
export const updateConversation = async (
  conversationId: string, 
  updates: Partial<{ title: string; status: string }>
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('conversations')
      .update(updates)
      .eq('id', conversationId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating conversation:', error);
    throw error;
  }
};

// Delete conversation
export const deleteConversation = async (conversationId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', conversationId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting conversation:', error);
    throw error;
  }
};

// Get chatbot knowledge base (for admin/debugging)
export const getChatbotKnowledge = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('chatbot_knowledge')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching chatbot knowledge:', error);
    throw error;
  }
};