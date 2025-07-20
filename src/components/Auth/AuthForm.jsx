import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import useAuthStore from '../../store/authStore'
import usePageTitle from '../../hooks/usePageTitle'

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { signIn, signUp, user } = useAuthStore()

  // Set dynamic page title based on auth mode
  usePageTitle(isSignUp ? 'Sign Up' : 'Sign In')

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      console.log('🔀 User authenticated, redirecting to /stories')
      navigate('/stories')
    }
  }, [user, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      const { error } = isSignUp 
        ? await signUp(formData.email, formData.password)
        : await signIn(formData.email, formData.password)

      if (error) {
        let errorMessage = error.message

        // Provide user-friendly error messages
        if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and click the confirmation link before signing in.'
        } else if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials.'
        } else if (error.message.includes('email_address_invalid')) {
          errorMessage = 'Please enter a valid email address.'
        }

        setErrors({ submit: errorMessage })
      } else {
        // Success - redirect will happen via useEffect when user state updates
        console.log('✅ Auth successful, waiting for redirect...')
      }
    } catch (err) {
      console.error('Unexpected auth error:', err)
      setErrors({ submit: 'An unexpected error occurred' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen dark-fantasy-bg parchment-texture flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 mystical-card bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-700/30 mystical-glow">
        <div className="text-center">
          {/* Enhanced Book Logo */}
          <div className="mx-auto w-20 h-20 mb-6 relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-amber-800 to-orange-900 rounded-2xl flex items-center justify-center shadow-2xl border border-amber-600/50 group-hover:border-amber-500/70 transition-all duration-500 group-hover:scale-110 floating-book">
              <svg className="w-10 h-10 text-amber-200 group-hover:text-amber-100 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19,2L14,6.5V17.5L19,13V2M6.5,5C4.55,5.05 2.45,5.4 1,6.5V21.16C1,21.41 1.25,21.66 1.5,21.66C1.6,21.66 1.65,21.59 1.75,21.59C3.1,20.94 5.05,20.68 6.5,20.68C8.45,20.68 10.55,21.1 12,22C13.35,21.15 15.8,20.68 17.5,20.68C19.15,20.68 20.85,20.9 22.25,21.56C22.35,21.61 22.4,21.66 22.5,21.66C22.75,21.66 23,21.41 23,21.16V6.5C22.4,6.05 21.75,5.75 21,5.5V19C19.9,18.65 18.7,18.5 17.5,18.5C15.8,18.5 13.35,18.9 12,19.5C10.55,18.9 8.45,18.5 6.5,18.5C5.05,18.5 3.1,18.65 1.75,19.5V6.5C3.1,5.55 5.05,5.25 6.5,5.25C8.45,5.25 10.55,5.65 12,6.5C13.35,5.65 15.8,5.25 17.5,5.25C18.7,5.25 19.9,5.4 21,5.75V2L6.5,5Z" />
              </svg>
              {/* Mystical sparkles */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse group-hover:bg-amber-300"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-300 group-hover:bg-orange-300"></div>
              <div className="absolute top-1 left-1 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-500 opacity-70"></div>
            </div>
          </div>

          <h2 className="text-center text-3xl font-bold text-amber-100 medieval-font mb-2">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
          <p className="text-center text-amber-200/70 rune-font">
            {isSignUp ? 'Start your writing journey' : 'Welcome back, writer'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-200 rune-font">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 w-full px-4 py-3 bg-gray-800/70 border border-amber-700/30 rounded-lg text-amber-100 placeholder-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300 backdrop-blur-sm ${errors.email ? 'border-red-500/70 focus:ring-red-500/50' : 'hover:border-amber-600/50'}`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400 rune-font glitch-red-text glitch-animate">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-amber-200 rune-font">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 bg-gray-800/70 border border-amber-700/30 rounded-lg text-amber-100 placeholder-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300 backdrop-blur-sm ${errors.password ? 'border-red-500/70 focus:ring-red-500/50' : 'hover:border-amber-600/50'}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-amber-400/70 hover:text-amber-300 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400 rune-font glitch-red-text glitch-animate">{errors.password}</p>
              )}
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-amber-200 rune-font">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`mt-1 w-full px-4 py-3 bg-gray-800/70 border border-amber-700/30 rounded-lg text-amber-100 placeholder-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300 backdrop-blur-sm ${errors.confirmPassword ? 'border-red-500/70 focus:ring-red-500/50' : 'hover:border-amber-600/50'}`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400 rune-font glitch-red-text glitch-animate">{errors.confirmPassword}</p>
                )}
              </div>
            )}
          </div>

          {errors.submit && (
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm text-red-300 rune-font glitch-red-text glitch-animate">{errors.submit}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mystical-glow medieval-font shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  <span className="rune-font glitch-red-text glitch-animate">{isSignUp ? 'Creating account...' : 'Signing in...'}</span>
                </div>
              ) : (
                isSignUp ? 'Create account' : 'Sign in'
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setErrors({})
                setFormData({ email: '', password: '', confirmPassword: '' })
              }}
              className="text-sm text-amber-400 hover:text-amber-300 transition-colors duration-300 underline decoration-amber-400/30 hover:decoration-amber-300/50 rune-font"
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
