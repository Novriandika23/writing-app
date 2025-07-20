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
      case 'draft': return 'bg-red-900/30 text-red-300 border border-red-700/50'
      case 'in_progress': return 'bg-blue-900/30 text-blue-300 border border-blue-700/50'
      case 'completed': return 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/50'
      case 'published': return 'bg-purple-900/30 text-purple-300 border border-purple-700/50'
      default: return 'bg-red-900/30 text-red-300 border border-red-700/50'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen dark-fantasy-bg stone-texture fade-in-slow">
        <div className="p-4 lg:p-8">
          <div className="animate-pulse space-y-6 lg:space-y-8">
            <div className="h-12 lg:h-16 bg-glitchRed/10 rounded-lg w-2/3 lg:w-1/3 border-2 border-glitchRed/20 mx-auto lg:mx-0"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 lg:h-80 bg-darkBg-soft rounded-xl border-2 border-glitchRed/20 mystical-glow"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen dark-fantasy-bg stone-texture fade-in-slow">
      <div className="p-4 lg:p-8">
        {/* Gothic Header */}
        <div className="mb-8 lg:mb-12">
          {/* Desktop Layout - Side by side */}
          <div className="hidden lg:flex lg:items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold gothic-title tracking-wider mb-4">
                Chronicle Sanctum
              </h1>
              <p className="medieval-text text-xl">
                Sacred repository of thy written realms
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary group flex-shrink-0"
            >
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 magical-pen" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04Z" />
                </svg>
                <span className="text-white font-semibold tracking-wide">Forge New Chronicle</span>
              </div>
            </button>
          </div>

          {/* Mobile Layout - Stacked */}
          <div className="lg:hidden">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold gothic-title tracking-wider mb-3">
                Chronicle Sanctum
              </h1>
              <p className="medieval-text text-lg mb-4">
                Sacred repository of thy written realms
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary group w-full"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 magical-pen" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04Z" />
                  </svg>
                  <span className="text-white font-semibold tracking-wide text-sm">Forge New Chronicle</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Chronicles Grid */}
        {stories.length === 0 ? (
          <div className="text-center py-12 lg:py-24 relative">
            {/* Dark Mystical Atmosphere */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-1/4 left-1/4 w-20 lg:w-40 h-20 lg:h-40 bg-glitchRed/5 rounded-full blur-2xl"></div>
              <div className="absolute top-1/3 right-1/3 w-16 lg:w-32 h-16 lg:h-32 bg-darkBg-soft/80 rounded-full blur-xl"></div>
              <div className="absolute bottom-1/3 left-1/2 w-18 lg:w-36 h-18 lg:h-36 bg-glitchRed/3 rounded-full blur-2xl"></div>
            </div>

            {/* Gothic Grimoire */}
            <div className="relative z-10 mb-8 lg:mb-12">
              <div className="mx-auto w-24 lg:w-32 h-24 lg:h-32 relative mystical-glow">
                <svg className="w-full h-full text-glitchRed magical-pen" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19,2L14,6.5V17.5L19,13V2M6.5,5C4.55,5 2.45,5.4 1,6.5V21.16C1,21.41 1.25,21.66 1.5,21.66C1.6,21.66 1.65,21.59 1.75,21.59C3.1,20.94 5.05,20.5 6.5,20.5C8.45,20.5 10.55,20.9 12,22C13.35,21.15 15.8,20.5 17.5,20.5C19.15,20.5 20.85,20.81 22.25,21.56C22.35,21.61 22.4,21.66 22.5,21.66C22.75,21.66 23,21.41 23,21.16V6.5C22.4,6.05 21.75,5.75 21,5.5V19C19.9,18.65 18.7,18.5 17.5,18.5C15.8,18.5 13.35,19.15 12,20V8C10.55,6.9 8.45,6.5 6.5,6.5C5.05,6.5 3.1,6.94 1.75,7.59V6.5C3.1,5.65 5.05,5 6.5,5Z"/>
                </svg>
                {/* Gothic Aura */}
                <div className="absolute inset-0 bg-gradient-to-r from-glitchRed/10 to-darkBg/20 rounded-lg blur-lg"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-glitchRed/5 to-transparent rounded-xl blur-xl"></div>
              </div>

              {/* Mystical Orbs */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                <div className="w-3 h-3 bg-glitchRed/60 rounded-full animate-ping"></div>
              </div>
              <div className="absolute top-6 right-1/3">
                <div className="w-2 h-2 bg-goldAccent/40 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-6 left-1/3">
                <div className="w-2.5 h-2.5 bg-slate-400/30 rounded-full animate-bounce"></div>
              </div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-medium gothic-title mb-4 lg:mb-6">
              The Sanctum Awaits
            </h3>
            <p className="medieval-text text-lg lg:text-xl mb-8 lg:mb-12 max-w-lg mx-auto px-4">
              No chronicles have been inscribed upon these sacred pages. Let thy quill dance across the void and birth new realms.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary group w-full lg:w-auto"
            >
              <div className="flex items-center justify-center lg:justify-start">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3 magical-pen" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04Z" />
                </svg>
                <span className="text-sm lg:text-lg text-white font-semibold tracking-wide">Inscribe First Chronicle</span>
              </div>
            </button>
          </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {stories.map((story) => (
            <Link
              key={story.id}
              to={`/stories/${story.id}`}
              className="group relative medieval-card gothic-frame p-4 lg:p-6 hover:border-glitchRed/60 transition-all duration-500 transform hover:scale-105 cursor-pointer"
            >
              {/* Gothic Corner Ornaments */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-glitchRed/40"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-glitchRed/40"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-glitchRed/40"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-glitchRed/40"></div>

              <div className="flex items-start justify-between mb-4 lg:mb-6">
                <h3 className="text-lg lg:text-xl font-semibold text-slate-100 font-serif line-clamp-2 group-hover:text-glitchRed transition-colors duration-300 flex-1 mr-2">
                  {story.title}
                </h3>
                <span className={`px-2 lg:px-3 py-1 text-xs font-medium ${getStatusColor(story.status)} ui-text whitespace-nowrap`}>
                  {story.status.replace('_', ' ')}
                </span>
              </div>

              {story.description && (
                <p className="medieval-text text-sm lg:text-base mb-4 lg:mb-6 line-clamp-3 leading-relaxed">
                  {story.description}
                </p>
              )}
              
              <div className="flex items-center justify-between text-sm text-slate-400 border-t-2 border-glitchRed/20 pt-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                  <span className="ui-text">{story.word_count || 0} words</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                  </svg>
                  <span className="ui-text">{formatDate(story.updated_at)}</span>
                </div>
              </div>

              {story.genre && (
                <div className="mt-4">
                  <span className="inline-block bg-glitchRed/10 text-glitchRed text-xs px-3 py-1 border border-glitchRed/30 ui-text">
                    {story.genre}
                  </span>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

        {/* Gothic Create Story Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-darkBg to-darkBg-soft rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-4 lg:p-8 border-2 border-glitchRed/30 mystical-glow relative gothic-frame">
              {/* Gothic Corner Decorations */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-glitchRed/70"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-glitchRed/70"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-glitchRed/70"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-glitchRed/70"></div>

              <h2 className="text-2xl lg:text-3xl font-semibold text-slate-100 mb-6 lg:mb-8 medieval-font text-center gothic-title">
                Forge New Chronicle
              </h2>

              <form onSubmit={handleCreateStory} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3 medieval-font">
                    Title of thy Chronicle *
                  </label>
                  <input
                    type="text"
                    value={newStory.title}
                    onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                    className="input-field"
                    placeholder="Enter the name of thy tale..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3 medieval-font">
                    Chronicle's Essence
                  </label>
                  <textarea
                    value={newStory.description}
                    onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
                    className="input-field resize-none"
                    rows="3"
                    placeholder="Describe the essence of thy tale..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3 medieval-font">
                    Realm of Story
                  </label>
                  <input
                    type="text"
                    value={newStory.genre}
                    onChange={(e) => setNewStory({ ...newStory, genre: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Dark Fantasy, Epic Romance, Mystical Adventure"
                  />
                </div>
              
                <div className="flex space-x-4 pt-8">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="btn-secondary flex-1"
                  >
                    <span className="medieval-font">Dismiss</span>
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                  >
                    <span className="medieval-font">Forge Chronicle</span>
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
