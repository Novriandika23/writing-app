import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  PlusIcon,
  BookOpenIcon,
  ClockIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import useStoryStore from '../../store/storyStore'
import useAuthStore from '../../store/authStore'
import usePageTitle from '../../hooks/usePageTitle'

export default function StoriesPage() {
  usePageTitle('Stories')

  const { user } = useAuthStore()
  const { stories, loading, fetchStories, createStory } = useStoryStore()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newStory, setNewStory] = useState({
    title: '',
    description: '',
    genre: ''
  })

  useEffect(() => {
    if (user) {
      fetchStories(user.id)
    }
  }, [user, fetchStories])

  const handleCreateStory = async (e) => {
    e.preventDefault()
    if (!newStory.title.trim()) return

    const storyData = {
      ...newStory,
      user_id: user.id,
      status: 'draft',
      word_count: 0
    }

    const { error } = await createStory(storyData)
    if (!error) {
      setShowCreateModal(false)
      setNewStory({ title: '', description: '', genre: '' })
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-amber-900/30 text-amber-300 border border-amber-700/50'
      case 'in_progress': return 'bg-blue-900/30 text-blue-300 border border-blue-700/50'
      case 'completed': return 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/50'
      case 'published': return 'bg-purple-900/30 text-purple-300 border border-purple-700/50'
      default: return 'bg-amber-900/30 text-amber-300 border border-amber-700/50'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen dark-fantasy-bg parchment-texture">
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-amber-900/30 rounded-lg w-1/3 border border-amber-700/30"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-800/50 rounded-xl border border-amber-700/30 mystical-glow"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen dark-fantasy-bg parchment-texture">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-100 medieval-font tracking-wide">
              Grimoire of Tales
            </h1>
            <p className="text-amber-200/70 mt-2 rune-font text-lg">
              Chronicles of thy mystical creations
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="group relative bg-gradient-to-r from-purple-900 to-indigo-900 hover:from-purple-800 hover:to-indigo-800 text-amber-100 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 mystical-glow border border-purple-700/50"
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 magical-pen" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04Z" />
              </svg>
              <span className="medieval-font glitch-red-text">Start a New Tale</span>
            </div>
          </button>
        </div>

        {/* Stories Grid */}
        {stories.length === 0 ? (
          <div className="text-center py-16 relative">
            {/* Mystical Mist Background */}
            <div className="absolute inset-0 mystical-mist opacity-30">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
              <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-1/3 left-1/2 w-28 h-28 bg-amber-500/10 rounded-full blur-xl"></div>
            </div>

            {/* Floating Magical Book */}
            <div className="relative z-10 mb-8">
              <div className="floating-book mx-auto w-24 h-24 relative">
                <svg className="w-full h-full text-amber-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19,2L14,6.5V17.5L19,13V2M6.5,5C4.55,5 2.45,5.4 1,6.5V21.16C1,21.41 1.25,21.66 1.5,21.66C1.6,21.66 1.65,21.59 1.75,21.59C3.1,20.94 5.05,20.5 6.5,20.5C8.45,20.5 10.55,20.9 12,22C13.35,21.15 15.8,20.5 17.5,20.5C19.15,20.5 20.85,20.81 22.25,21.56C22.35,21.61 22.4,21.66 22.5,21.66C22.75,21.66 23,21.41 23,21.16V6.5C22.4,6.05 21.75,5.75 21,5.5V19C19.9,18.65 18.7,18.5 17.5,18.5C15.8,18.5 13.35,19.15 12,20V8C10.55,6.9 8.45,6.5 6.5,6.5C5.05,6.5 3.1,6.94 1.75,7.59V6.5C3.1,5.65 5.05,5 6.5,5Z"/>
                </svg>
                {/* Magical Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-purple-400/20 rounded-lg blur-md"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/10 to-purple-400/10 rounded-xl blur-lg"></div>
              </div>

              {/* Floating Sparkles */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                <div className="w-2 h-2 bg-amber-300 rounded-full animate-ping"></div>
              </div>
              <div className="absolute top-4 right-1/3">
                <div className="w-1 h-1 bg-purple-300 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-4 left-1/3">
                <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce"></div>
              </div>
            </div>

            <h3 className="text-2xl font-medium text-amber-100 mb-4 medieval-font">
              The Grimoire Awaits
            </h3>
            <p className="text-amber-200/70 mb-8 rune-font text-lg max-w-md mx-auto">
              No tales have been inscribed yet. Let thy imagination flow and weave the first thread of destiny.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="group relative bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-amber-100 font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 mystical-glow border border-amber-700/50"
            >
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 magical-pen" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04Z" />
                </svg>
                <span className="medieval-font text-lg glitch-red-text glitch-animate">Tell Thy Tale</span>
              </div>
            </button>
          </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Link
              key={story.id}
              to={`/stories/${story.id}`}
              className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-amber-700/30 hover:border-amber-500/50 transition-all duration-300 transform hover:scale-105 mystical-glow cursor-pointer"
            >
              {/* Mystical Corner Decorations */}
              <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-amber-500/50"></div>
              <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-amber-500/50"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-amber-500/50"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-amber-500/50"></div>

              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-amber-100 medieval-font line-clamp-2 group-hover:text-amber-50 transition-colors">
                  {story.title}
                </h3>
                <span className={`px-3 py-1 text-xs font-medium rounded-lg ${getStatusColor(story.status)} rune-font`}>
                  {story.status.replace('_', ' ')}
                </span>
              </div>

              {story.description && (
                <p className="text-amber-200/70 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {story.description}
                </p>
              )}
              
              <div className="flex items-center justify-between text-sm text-amber-300/60 border-t border-amber-700/30 pt-3">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                  <span className="rune-font">{story.word_count || 0} words</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                  </svg>
                  <span className="rune-font">{formatDate(story.updated_at)}</span>
                </div>
              </div>

              {story.genre && (
                <div className="mt-4">
                  <span className="inline-block bg-purple-900/40 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-700/50 rune-font">
                    {story.genre}
                  </span>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

        {/* Create Story Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-md w-full p-8 border border-amber-700/50 mystical-glow relative">
              {/* Mystical Corner Decorations */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-amber-500/70"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-amber-500/70"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-amber-500/70"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-amber-500/70"></div>

              <h2 className="text-2xl font-semibold text-amber-100 mb-6 medieval-font text-center">
                Weave New Tale
              </h2>

              <form onSubmit={handleCreateStory} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-amber-300 mb-2 rune-font">
                    Title of thy Chronicle *
                  </label>
                  <input
                    type="text"
                    value={newStory.title}
                    onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/80 border border-amber-700/50 rounded-lg text-amber-100 placeholder-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter the name of thy tale..."
                    required
                  />
                </div>
              
                <div>
                  <label className="block text-sm font-medium text-amber-300 mb-2 rune-font">
                    Chronicle's Essence
                  </label>
                  <textarea
                    value={newStory.description}
                    onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/80 border border-amber-700/50 rounded-lg text-amber-100 placeholder-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none"
                    rows="3"
                    placeholder="Describe the essence of thy tale..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-300 mb-2 rune-font">
                    Realm of Story
                  </label>
                  <input
                    type="text"
                    value={newStory.genre}
                    onChange={(e) => setNewStory({ ...newStory, genre: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/80 border border-amber-700/50 rounded-lg text-amber-100 placeholder-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., Dark Fantasy, Epic Romance, Mystical Adventure"
                  />
                </div>
              
                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-amber-200 font-medium py-3 px-4 rounded-lg transition-all duration-200 border border-gray-600 rune-font"
                  >
                    Dismiss
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-amber-100 font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 mystical-glow border border-amber-700/50 medieval-font"
                  >
                    Weave Tale
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
