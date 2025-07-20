-- Create writing_goals table
CREATE TABLE IF NOT EXISTS writing_goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  target_words INTEGER NOT NULL,
  current_words INTEGER DEFAULT 0,
  target_days INTEGER DEFAULT 30,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_writing_goals_user_id ON writing_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_writing_goals_status ON writing_goals(status);
CREATE INDEX IF NOT EXISTS idx_writing_goals_created_at ON writing_goals(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE writing_goals ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own writing goals" ON writing_goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own writing goals" ON writing_goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own writing goals" ON writing_goals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own writing goals" ON writing_goals
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_writing_goals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_writing_goals_updated_at_trigger
  BEFORE UPDATE ON writing_goals
  FOR EACH ROW
  EXECUTE FUNCTION update_writing_goals_updated_at();

-- Insert some sample data (optional)
-- INSERT INTO writing_goals (user_id, title, description, target_words, target_days) VALUES
-- (auth.uid(), 'Complete First Novel', 'Write my first 50,000 word novel', 50000, 60),
-- (auth.uid(), 'Daily Writing Habit', 'Write 500 words every day', 15000, 30);
