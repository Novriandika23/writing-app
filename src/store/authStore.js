import { create } from 'zustand'
import { auth } from '../lib/supabase'

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  
  setUser: (user) => set({ user, loading: false }),
  
  signUp: async (email, password) => {
    const { data, error } = await auth.signUp(email, password)

    if (data.user) {
      set({ user: data.user, loading: false })
    }
    return { data, error }
  },
  
  signIn: async (email, password) => {
    const { data, error } = await auth.signIn(email, password)

    if (data.user) {
      set({ user: data.user, loading: false })
    }
    return { data, error }
  },
  
  signOut: async () => {
    const { error } = await auth.signOut()
    if (!error) {
      set({ user: null })
    }
    return { error }
  },
  
  initialize: async () => {
    try {
      const user = await auth.getCurrentUser()
      set({ user, loading: false })

      // Listen for auth changes
      auth.onAuthStateChange((_, session) => {
        set({ user: session?.user || null, loading: false })
      })
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({ loading: false })
    }
  }
}))

export default useAuthStore
