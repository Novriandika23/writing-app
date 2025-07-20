-- Create custom types
CREATE TYPE story_status AS ENUM ('draft', 'in_progress', 'completed', 'published');
CREATE TYPE character_role AS ENUM ('protagonist', 'antagonist', 'supporting', 'minor');
CREATE TYPE plot_type AS ENUM ('opening', 'inciting_incident', 'rising_action', 'climax', 'falling_action', 'resolution');
CREATE TYPE world_element_type AS ENUM ('location', 'culture', 'magic_system', 'technology', 'history', 'religion', 'politics', 'other');

-- Stories table
CREATE TABLE stories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    genre VARCHAR(100),
    status story_status DEFAULT 'draft',
    word_count INTEGER DEFAULT 0,
    target_word_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Characters table
CREATE TABLE characters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    role character_role DEFAULT 'supporting',
    age INTEGER,
    description TEXT,
    background TEXT,
    personality TEXT,
    appearance TEXT,
    goals TEXT,
    conflicts TEXT,
    relationships JSONB DEFAULT '{}',
    notes TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Plot points table
CREATE TABLE plot_points (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type plot_type DEFAULT 'rising_action',
    order_index INTEGER NOT NULL,
    chapter INTEGER,
    word_count_target INTEGER,
    completed BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- World elements table
CREATE TABLE world_elements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type world_element_type DEFAULT 'other',
    description TEXT,
    details JSONB DEFAULT '{}',
    relationships JSONB DEFAULT '{}',
    notes TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI suggestions table
CREATE TABLE ai_suggestions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    suggestion TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'character', 'plot', 'world', 'dialogue', 'description'
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_stories_user_id ON stories(user_id);
CREATE INDEX idx_stories_updated_at ON stories(updated_at);
CREATE INDEX idx_characters_story_id ON characters(story_id);
CREATE INDEX idx_plot_points_story_id ON plot_points(story_id);
CREATE INDEX idx_plot_points_order ON plot_points(story_id, order_index);
CREATE INDEX idx_world_elements_story_id ON world_elements(story_id);
CREATE INDEX idx_ai_suggestions_story_id ON ai_suggestions(story_id);

-- Enable Row Level Security
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE plot_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE world_elements ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_suggestions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Stories policies
CREATE POLICY "Users can view their own stories" ON stories
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stories" ON stories
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stories" ON stories
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stories" ON stories
    FOR DELETE USING (auth.uid() = user_id);

-- Characters policies
CREATE POLICY "Users can view characters of their stories" ON characters
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM stories 
            WHERE stories.id = characters.story_id 
            AND stories.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert characters to their stories" ON characters
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM stories 
            WHERE stories.id = characters.story_id 
            AND stories.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update characters of their stories" ON characters
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM stories 
            WHERE stories.id = characters.story_id 
            AND stories.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete characters of their stories" ON characters
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM stories 
            WHERE stories.id = characters.story_id 
            AND stories.user_id = auth.uid()
        )
    );

-- Plot points policies (similar pattern)
CREATE POLICY "Users can view plot points of their stories" ON plot_points
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM stories 
            WHERE stories.id = plot_points.story_id 
            AND stories.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert plot points to their stories" ON plot_points
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM stories 
            WHERE stories.id = plot_points.story_id 
            AND stories.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update plot points of their stories" ON plot_points
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM stories 
            WHERE stories.id = plot_points.story_id 
            AND stories.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete plot points of their stories" ON plot_points
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM stories 
            WHERE stories.id = plot_points.story_id 
            AND stories.user_id = auth.uid()
        )
    );

-- World elements policies (similar pattern)
CREATE POLICY "Users can view world elements of their stories" ON world_elements
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM stories 
            WHERE stories.id = world_elements.story_id 
            AND stories.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert world elements to their stories" ON world_elements
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM stories 
            WHERE stories.id = world_elements.story_id 
            AND stories.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update world elements of their stories" ON world_elements
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM stories 
            WHERE stories.id = world_elements.story_id 
            AND stories.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete world elements of their stories" ON world_elements
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM stories 
            WHERE stories.id = world_elements.story_id 
            AND stories.user_id = auth.uid()
        )
    );

-- AI suggestions policies
CREATE POLICY "Users can view their own AI suggestions" ON ai_suggestions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI suggestions" ON ai_suggestions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI suggestions" ON ai_suggestions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own AI suggestions" ON ai_suggestions
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON stories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_characters_updated_at BEFORE UPDATE ON characters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plot_points_updated_at BEFORE UPDATE ON plot_points
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_world_elements_updated_at BEFORE UPDATE ON world_elements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
