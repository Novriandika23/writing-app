import { create } from 'zustand'
import { db } from '../lib/supabase'

const useGoalsStore = create((set, get) => ({
  goals: [],
  loading: false,
  
  setGoals: (goals) => set({ goals }),
  
  fetchGoals: async (userId) => {
    set({ loading: true })
    const { data, error } = await db.getGoals(userId)
    if (data) {
      set({ goals: data })
    }
    set({ loading: false })
    return { data, error }
  },
  
  createGoal: async (goalData) => {
    const { data, error } = await db.createGoal(goalData)
    if (data && data[0]) {
      const { goals } = get()
      set({ goals: [data[0], ...goals] })
    }
    return { data, error }
  },
  
  updateGoal: async (id, updates) => {
    const { data, error } = await db.updateGoal(id, updates)
    if (data && data[0]) {
      const { goals } = get()
      const updatedGoals = goals.map(goal => 
        goal.id === id ? data[0] : goal
      )
      set({ goals: updatedGoals })
    }
    return { data, error }
  },
  
  deleteGoal: async (id) => {
    const { error } = await db.deleteGoal(id)
    if (!error) {
      const { goals } = get()
      const filteredGoals = goals.filter(goal => goal.id !== id)
      set({ goals: filteredGoals })
    }
    return { error }
  },

  // Update goal progress based on story word count changes
  updateGoalProgress: async (userId, wordsAdded) => {
    const { goals } = get()
    const activeGoals = goals.filter(goal => goal.status === 'active')
    
    for (const goal of activeGoals) {
      const newWordCount = goal.current_words + wordsAdded
      const updates = {
        current_words: Math.max(0, newWordCount),
        updated_at: new Date().toISOString()
      }
      
      // Mark as completed if target reached
      if (newWordCount >= goal.target_words && goal.status !== 'completed') {
        updates.status = 'completed'
        updates.completed_at = new Date().toISOString()
      }
      
      await get().updateGoal(goal.id, updates)
    }
  }
}))

export default useGoalsStore
