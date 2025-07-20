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
    <div className="min-h-screen dark-fantasy-bg stone-texture flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 fade-in-slow">
      <div className="max-w-md w-full space-y-8 medieval-card gothic-frame p-8">
        <div className="text-center">
          {/* Gothic Grimoire Symbol */}
          <div className="mx-auto w-24 h-24 mb-8 relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-glitchRed/10 to-darkBg rounded-full blur-xl group-hover:blur-2xl transition-all duration-700"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-darkBg-soft to-darkBg border-2 border-glitchRed/30 rounded-full flex items-center justify-center shadow-2xl group-hover:border-glitchRed/50 transition-all duration-700 mystical-glow">
              <svg className="w-12 h-12 text-glitchRed group-hover:text-red-300 transition-colors duration-500 magical-pen" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19,2L14,6.5V17.5L19,13V2M6.5,5C4.55,5.05 2.45,5.4 1,6.5V21.16C1,21.41 1.25,21.66 1.5,21.66C1.6,21.66 1.65,21.59 1.75,21.59C3.1,20.94 5.05,20.68 6.5,20.68C8.45,20.68 10.55,21.1 12,22C13.35,21.15 15.8,20.68 17.5,20.68C19.15,20.68 20.85,20.9 22.25,21.56C22.35,21.61 22.4,21.66 22.5,21.66C22.75,21.66 23,21.41 23,21.16V6.5C22.4,6.05 21.75,5.75 21,5.5V19C19.9,18.65 18.7,18.5 17.5,18.5C15.8,18.5 13.35,18.9 12,19.5C10.55,18.9 8.45,18.5 6.5,18.5C5.05,18.5 3.1,18.65 1.75,19.5V6.5C3.1,5.55 5.05,5.25 6.5,5.25C8.45,5.25 10.55,5.65 12,6.5C13.35,5.65 15.8,5.25 17.5,5.25C18.7,5.25 19.9,5.4 21,5.75V2L6.5,5Z" />
              </svg>
              {/* Gothic ornaments */}
              <div className="absolute -top-2 -right-2 w-2 h-2 bg-goldAccent rounded-full animate-pulse opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-glitchRed rounded-full animate-pulse delay-300"></div>
              <div className="absolute top-1 left-1 w-1 h-1 bg-slate-400 rounded-full animate-pulse delay-700 opacity-50"></div>
            </div>
          </div>

          <h2 className="text-center text-3xl font-bold gothic-title mb-4">
            {isSignUp ? 'Join the Order' : 'Enter the Sanctum'}
          </h2>
          <p className="text-center medieval-text text-lg">
            {isSignUp ? 'Begin thy chronicle of words' : 'Return to thy sacred texts'}
          </p>
        </div>

        <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium ui-text mb-3">
                Sacred Scroll Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field ${errors.email ? 'border-glitchRed focus:border-glitchRed' : 'hover:border-slate-600'}`}
                placeholder="thy.name@realm.sanctum"
              />
              {errors.email && (
                <p className="mt-2 text-sm glitch-red-text glitch-animate medieval-text">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium ui-text mb-3">
                Sacred Cipher
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field pr-12 ${errors.password ? 'border-glitchRed focus:border-glitchRed' : 'hover:border-slate-600'}`}
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-glitchRed transition-colors duration-300"
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
                <p className="mt-2 text-sm glitch-red-text glitch-animate medieval-text">{errors.password}</p>
              )}
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium ui-text mb-3">
                  Confirm Sacred Cipher
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input-field ${errors.confirmPassword ? 'border-glitchRed focus:border-glitchRed' : 'hover:border-slate-600'}`}
                  placeholder="••••••••••••"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm glitch-red-text glitch-animate medieval-text">{errors.confirmPassword}</p>
                )}
              </div>
            )}
          </div>

          {errors.submit && (
            <div className="gothic-frame bg-darkBg-soft p-4">
              <p className="text-sm glitch-red-text glitch-animate medieval-text">{errors.submit}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-200 mr-3"></div>
                  <span className="glitch-red-text glitch-animate">{isSignUp ? 'Forging thy seal...' : 'Entering sanctum...'}</span>
                </div>
              ) : (
                <span className="tracking-wide">{isSignUp ? 'Join the Order' : 'Enter Sanctum'}</span>
              )}
            </button>
          </div>

          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setErrors({})
                setFormData({ email: '', password: '', confirmPassword: '' })
              }}
              className="ui-text hover:text-glitchRed transition-colors duration-500 underline decoration-slate-600 hover:decoration-glitchRed"
            >
              {isSignUp
                ? 'Already sworn to the Order? Return'
                : 'Seek to join our sacred brotherhood?'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
