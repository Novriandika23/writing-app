import { create } from 'zustand'
import { auth } from '../lib/supabase'

const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  
  setUser: (user) => set({ user, loading: false }),
  
  signUp: async (email, password) => {
    console.log('📝 Attempting sign up with:', { email, passwordLength: password?.length })
    const { data, error } = await auth.signUp(email, password)
    console.log('📝 Sign up result:', { data: data?.user ? 'User created' : 'No user', error })

    if (data.user) {
      console.log('✅ Setting user in store after signup:', data.user.email)
      set({ user: data.user, loading: false })
    }
    return { data, error }
  },
  
  signIn: async (email, password) => {
    console.log('🔐 Attempting sign in with:', { email, passwordLength: password?.length })
    const { data, error } = await auth.signIn(email, password)
    console.log('🔐 Sign in result:', { data: data?.user ? 'User found' : 'No user', error })

    if (data.user) {
      console.log('✅ Setting user in store:', data.user.email)
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
    console.log('🔄 Initializing auth store...')
    try {
      console.log('📡 Getting current user from Supabase...')
      const user = await auth.getCurrentUser()
      console.log('👤 Current user:', user)
      set({ user, loading: false })

      // Listen for auth changes
      console.log('👂 Setting up auth state listener...')
      auth.onAuthStateChange((event, session) => {
        console.log('🔔 Auth state changed:', event, session?.user)
        set({ user: session?.user || null, loading: false })
      })
      console.log('✅ Auth initialization complete')
    } catch (error) {
      console.error('❌ Auth initialization error:', error)
      set({ loading: false })
    }
  }
}))

export default useAuthStore
