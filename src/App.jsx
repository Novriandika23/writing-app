import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import AuthForm from './components/Auth/AuthForm'
import StoriesPage from './components/Stories/StoriesPage'
import StoryEditor from './components/Stories/StoryEditor'
import AIAssistant from './components/AI/AIAssistant'
import useAuthStore from './store/authStore'
import usePageTitle from './hooks/usePageTitle'

// Placeholder components for other pages
const CharactersPage = () => {
  usePageTitle('Characters')
  return (
    <div className="min-h-screen dark-fantasy-bg parchment-texture">
      <div className="p-6">
        <div className="text-center py-16">
          <div className="mb-8">
            <svg className="w-24 h-24 text-amber-300 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-amber-100 medieval-font mb-4">Souls of the Realm</h1>
          <p className="text-amber-200/70 rune-font text-lg">Character weaving shall be unveiled soon...</p>
        </div>
      </div>
    </div>
  )
}

const PlotPage = () => {
  usePageTitle('Plot')
  return (
    <div className="min-h-screen dark-fantasy-bg parchment-texture">
      <div className="p-6">
        <div className="text-center py-16">
          <div className="mb-8">
            <svg className="w-24 h-24 text-amber-300 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.5,19H21.5V21H2.5V19M22.07,9.64C21.86,8.84 21.03,8.36 20.23,8.58L14.92,10L8.09,8.07L1.93,9.64C1.13,9.86 0.65,10.69 0.87,11.49L0.96,11.82C1.18,12.62 2.01,13.1 2.81,12.88L8.09,11.5L15.91,13.93L22.07,12.36C22.87,12.14 23.35,11.31 23.13,10.51L23.04,10.18C22.82,9.38 21.99,8.9 21.19,9.12L22.07,9.64M7.5,5.5C7.5,4.67 8.17,4 9,4H15C15.83,4 16.5,4.67 16.5,5.5V7H7.5V5.5Z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-amber-100 medieval-font mb-4">Fate Weaver</h1>
          <p className="text-amber-200/70 rune-font text-lg">Destiny's threads await thy guidance...</p>
        </div>
      </div>
    </div>
  )
}

const WorldPage = () => (
  <div className="min-h-screen dark-fantasy-bg parchment-texture">
    <div className="p-6">
      <div className="text-center py-16">
        <div className="mb-8">
          <svg className="w-24 h-24 text-amber-300 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V9M19,19H5V3H13V9H19V19Z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-amber-100 medieval-font mb-4">Realm Forge</h1>
        <p className="text-amber-200/70 rune-font text-lg">World crafting tools emerge from the mists...</p>
      </div>
    </div>
  </div>
)

const AIPage = () => <AIAssistant />

const SettingsPage = () => (
  <div className="min-h-screen dark-fantasy-bg parchment-texture">
    <div className="p-6">
      <div className="text-center py-16">
        <div className="mb-8">
          <svg className="w-24 h-24 text-amber-300 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-amber-100 medieval-font mb-4">Arcane Configurations</h1>
        <p className="text-amber-200/70 rune-font text-lg">Mystical settings await thy touch...</p>
      </div>
    </div>
  </div>
)

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark-fantasy-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-amber-200 rune-font">Awakening the mystical realm...</p>
        </div>
      </div>
    )
  }

  return user ? children : <Navigate to="/auth" replace />
}

function App() {
  const { initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/stories" replace />} />
          <Route path="stories" element={<StoriesPage />} />
          <Route path="stories/:id" element={<StoryEditor />} />
          <Route path="characters" element={<CharactersPage />} />
          <Route path="plot" element={<PlotPage />} />
          <Route path="world" element={<WorldPage />} />
          <Route path="ai" element={<AIPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
