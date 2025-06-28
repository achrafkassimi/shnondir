/*
  # Add chatbot and conversation tables

  1. New Tables
    - `conversations` - Store chat conversations
    - `messages` - Store individual chat messages
    - `chatbot_knowledge` - Store knowledge base for AI responses

  2. Security
    - Enable RLS on all tables
    - Add policies for user access
    - Create indexes for performance
*/

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text DEFAULT 'New Conversation',
  status text DEFAULT 'active' CHECK (status IN ('active', 'archived', 'completed')),
  context jsonb DEFAULT '{}'::jsonb,
  last_message_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Chatbot knowledge base
CREATE TABLE IF NOT EXISTS chatbot_knowledge (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  question text NOT NULL,
  answer text NOT NULL,
  keywords text[] DEFAULT '{}',
  priority integer DEFAULT 1,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_knowledge ENABLE ROW LEVEL SECURITY;

-- Conversations policies
CREATE POLICY "Users can view own conversations"
  ON conversations FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update own conversations"
  ON conversations FOR UPDATE TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Messages policies
CREATE POLICY "Users can view messages in their conversations"
  ON messages FOR SELECT TO authenticated
  USING (
    auth.uid() = user_id OR 
    user_id IS NULL OR
    conversation_id IN (
      SELECT id FROM conversations WHERE user_id = auth.uid() OR user_id IS NULL
    )
  );

CREATE POLICY "Users can create messages"
  ON messages FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id OR 
    user_id IS NULL OR
    conversation_id IN (
      SELECT id FROM conversations WHERE user_id = auth.uid() OR user_id IS NULL
    )
  );

-- Knowledge base policies (read-only for users)
CREATE POLICY "Anyone can view active knowledge"
  ON chatbot_knowledge FOR SELECT TO authenticated
  USING (is_active = true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_last_message ON conversations(last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chatbot_keywords ON chatbot_knowledge USING GIN(keywords);

-- Add updated_at triggers
CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chatbot_knowledge_updated_at
  BEFORE UPDATE ON chatbot_knowledge
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();