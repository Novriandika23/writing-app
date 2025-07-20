import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const auth = {
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helpers
export const db = {
  // Stories
  getStories: async (userId) => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
    return { data, error }
  },

  createStory: async (story) => {
    const { data, error } = await supabase
      .from('stories')
      .insert([story])
      .select()
    return { data, error }
  },

  updateStory: async (id, updates) => {
    const { data, error } = await supabase
      .from('stories')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },

  deleteStory: async (id) => {
    const { error } = await supabase
      .from('stories')
      .delete()
      .eq('id', id)
    return { error }
  },

  // Characters
  getCharacters: async (storyId) => {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .eq('story_id', storyId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  createCharacter: async (character) => {
    const { data, error } = await supabase
      .from('characters')
      .insert([character])
      .select()
    return { data, error }
  },

  updateCharacter: async (id, updates) => {
    const { data, error } = await supabase
      .from('characters')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },

  deleteCharacter: async (id) => {
    const { error } = await supabase
      .from('characters')
      .delete()
      .eq('id', id)
    return { error }
  },

  // Plot points
  getPlotPoints: async (storyId) => {
    const { data, error } = await supabase
      .from('plot_points')
      .select('*')
      .eq('story_id', storyId)
      .order('order_index', { ascending: true })
    return { data, error }
  },

  createPlotPoint: async (plotPoint) => {
    const { data, error } = await supabase
      .from('plot_points')
      .insert([plotPoint])
      .select()
    return { data, error }
  },

  updatePlotPoint: async (id, updates) => {
    const { data, error } = await supabase
      .from('plot_points')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },

  deletePlotPoint: async (id) => {
    const { error } = await supabase
      .from('plot_points')
      .delete()
      .eq('id', id)
    return { error }
  },

  // World elements
  getWorldElements: async (storyId) => {
    const { data, error } = await supabase
      .from('world_elements')
      .select('*')
      .eq('story_id', storyId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  createWorldElement: async (worldElement) => {
    const { data, error } = await supabase
      .from('world_elements')
      .insert([worldElement])
      .select()
    return { data, error }
  },

  updateWorldElement: async (id, updates) => {
    const { data, error } = await supabase
      .from('world_elements')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },

  deleteWorldElement: async (id) => {
    const { error } = await supabase
      .from('world_elements')
      .delete()
      .eq('id', id)
    return { error }
  },

  // Writing Goals
  getGoals: async (userId) => {
    const { data, error } = await supabase
      .from('writing_goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  createGoal: async (goal) => {
    const { data, error } = await supabase
      .from('writing_goals')
      .insert([goal])
      .select()
    return { data, error }
  },

  updateGoal: async (id, updates) => {
    const { data, error } = await supabase
      .from('writing_goals')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },

  deleteGoal: async (id) => {
    const { error } = await supabase
      .from('writing_goals')
      .delete()
      .eq('id', id)
    return { error }
  }
}
