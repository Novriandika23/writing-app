import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeftIcon,
  BookmarkIcon,
  ClockIcon,
  DocumentTextIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import RichTextEditor from '../Editor/RichTextEditor'
import useStoryStore from '../../store/storyStore'
import useAuthStore from '../../store/authStore'
import useGoalsStore from '../../store/goalsStore'
import usePageTitle from '../../hooks/usePageTitle'

export default function StoryEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { stories, updateStory, deleteStory } = useStoryStore()
  const { updateGoalProgress } = useGoalsStore()

  const [story, setStory] = useState(null)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [autoSaveTimeout, setAutoSaveTimeout] = useState(null)

  // Title editing state
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Set dynamic page title based on story title
  usePageTitle(story ? `Editing: ${story.title}` : 'Story Editor')

  useEffect(() => {
    const currentStory = stories.find(s => s.id === id)
    if (currentStory) {
      setStory(currentStory)
    } else {
      // If story not found in store, redirect back to stories
      navigate('/stories')
    }
  }, [id, stories, navigate])

  const saveStory = async (content, shouldSave = false) => {
    if (!story || !user) return

    // Clear existing timeout
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout)
    }

    const saveData = {
      content: content.html,
      word_count: content.wordCount,
      updated_at: new Date().toISOString()
    }

    // Calculate words added for goals progress
    const wordsAdded = content.wordCount - (story.word_count || 0)

    if (shouldSave) {
      // Immediate save
      setSaving(true)
      try {
        await updateStory(story.id, saveData)
        setLastSaved(new Date())

        // Update goals progress if words were added
        if (wordsAdded > 0) {
          await updateGoalProgress(user.id, wordsAdded)
        }
      } catch (error) {
        console.error('Error saving story:', error)
      } finally {
        setSaving(false)
      }
    } else {
      // Auto-save after 2 seconds of inactivity
      const timeout = setTimeout(async () => {
        setSaving(true)
        try {
          await updateStory(story.id, saveData)
          setLastSaved(new Date())

          // Update goals progress if words were added
          if (wordsAdded > 0) {
            await updateGoalProgress(user.id, wordsAdded)
          }
        } catch (error) {
          console.error('Error auto-saving story:', error)
        } finally {
          setSaving(false)
        }
      }, 2000)

      setAutoSaveTimeout(timeout)
    }
  }

  const handleContentChange = (content) => {
    saveStory(content, content.shouldSave)
  }

  const formatLastSaved = () => {
    if (!lastSaved) return 'Never'
    const now = new Date()
    const diff = now - lastSaved
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return 'Just now'
    if (minutes === 1) return '1 minute ago'
    return `${minutes} minutes ago`
  }

  // Title editing functions
  const startEditingTitle = () => {
    setEditedTitle(story.title)
    setIsEditingTitle(true)
  }

  const cancelEditingTitle = () => {
    setEditedTitle('')
    setIsEditingTitle(false)
  }

  const saveTitle = async () => {
    if (!editedTitle.trim() || editedTitle === story.title) {
      cancelEditingTitle()
      return
    }

    setSaving(true)
    try {
      await updateStory(story.id, {
        title: editedTitle.trim(),
        updated_at: new Date().toISOString()
      })
      setLastSaved(new Date())
      setIsEditingTitle(false)
    } catch (error) {
      console.error('Error updating title:', error)
    } finally {
      setSaving(false)
    }
  }

  // Delete story function
  const handleDeleteStory = async () => {
    try {
      await deleteStory(story.id)
      navigate('/stories')
    } catch (error) {
      console.error('Error deleting story:', error)
    }
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-700/50 rounded w-1/3 mb-4"></div>
          <div className="h-96 bg-slate-700/50 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen dark-fantasy-bg stone-texture flex flex-col">
      {/* Gothic Header */}
      <div className="border-b-2 border-glitchRed/20 bg-gradient-to-r from-darkBg to-darkBg-soft backdrop-blur-sm px-4 lg:px-6 py-4 lg:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 lg:space-x-4 min-w-0 flex-1">
            <button
              onClick={() => navigate('/stories')}
              className="p-2 lg:p-3 hover:bg-glitchRed/10 rounded-lg transition-all duration-300 group border border-transparent hover:border-glitchRed/30 flex-shrink-0"
            >
              <ArrowLeftIcon className="w-4 h-4 lg:w-5 lg:h-5 text-slate-400 group-hover:text-glitchRed" />
            </button>
            <div className="min-w-0 flex-1">
              {isEditingTitle ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveTitle()
                      if (e.key === 'Escape') cancelEditingTitle()
                    }}
                    className="flex-1 bg-darkBg/50 border border-glitchRed/30 rounded-lg px-3 py-2 text-lg lg:text-2xl font-semibold text-slate-100 medieval-font focus:outline-none focus:border-glitchRed/60 focus:ring-1 focus:ring-glitchRed/30"
                    autoFocus
                  />
                  <button
                    onClick={saveTitle}
                    className="p-2 hover:bg-glitchRed/10 rounded-lg transition-all duration-300 border border-transparent hover:border-glitchRed/30 text-green-400 hover:text-green-300"
                  >
                    <CheckIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                  <button
                    onClick={cancelEditingTitle}
                    className="p-2 hover:bg-glitchRed/10 rounded-lg transition-all duration-300 border border-transparent hover:border-glitchRed/30 text-red-400 hover:text-red-300"
                  >
                    <XMarkIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 group">
                  <h1 className="text-lg lg:text-2xl font-semibold text-slate-100 medieval-font truncate">
                    {story.title}
                  </h1>
                  <button
                    onClick={startEditingTitle}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-glitchRed/10 rounded transition-all duration-300 text-slate-400 hover:text-glitchRed"
                  >
                    <PencilIcon className="w-3 h-3 lg:w-4 lg:h-4" />
                  </button>
                </div>
              )}
              <div className="flex items-center space-x-3 lg:space-x-6 text-xs lg:text-sm text-slate-400 mt-1 lg:mt-2">
                <div className="flex items-center">
                  <DocumentTextIcon className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 text-slate-500" />
                  <span className="ui-text">{story.word_count || 0} words</span>
                </div>
                <div className="hidden sm:flex items-center">
                  <ClockIcon className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 text-slate-500" />
                  <span className="ui-text">Last saved: {formatLastSaved()}</span>
                </div>
                {saving && (
                  <div className="flex items-center text-glitchRed">
                    <div className="animate-spin rounded-full h-2 w-2 lg:h-3 lg:w-3 border-b-2 border-glitchRed mr-1 lg:mr-2"></div>
                    <span className="hidden sm:inline ui-text">Saving...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 lg:space-x-2 flex-shrink-0">
            <button className="p-2 lg:p-3 hover:bg-glitchRed/10 rounded-lg transition-all duration-300 group border border-transparent hover:border-glitchRed/30">
              <BookmarkIcon className="w-4 h-4 lg:w-5 lg:h-5 text-slate-400 group-hover:text-glitchRed" />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 lg:p-3 hover:bg-red-500/10 rounded-lg transition-all duration-300 group border border-transparent hover:border-red-500/30"
            >
              <TrashIcon className="w-4 h-4 lg:w-5 lg:h-5 text-slate-400 group-hover:text-red-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Gothic Editor Container */}
      <div className="flex-1 p-2 lg:p-8 w-full">
        <div className="max-w-5xl mx-auto w-full">
          <div className="medieval-card gothic-frame p-2 lg:p-8 w-full">
            <RichTextEditor
              content={story.content || ''}
              onChange={handleContentChange}
              placeholder="Begin thy chronicle... Let the words flow like ancient magic across these sacred pages."
              className="min-h-[400px] lg:min-h-[600px] w-full"
            />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-darkBg to-darkBg-soft border-2 border-glitchRed/30 rounded-lg p-6 max-w-md w-full relative">
            {/* Gothic corners */}
            <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-glitchRed/70"></div>
            <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-glitchRed/70"></div>
            <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-glitchRed/70"></div>
            <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-glitchRed/70"></div>

            <h3 className="text-xl font-semibold text-slate-100 mb-4 medieval-font text-center">
              Destroy Chronicle?
            </h3>
            <p className="text-slate-300 mb-6 text-center medieval-text">
              This action cannot be undone. The chronicle "{story.title}" and all its contents will be permanently destroyed.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-slate-600/20 hover:bg-slate-600/30 border border-slate-500/30 hover:border-slate-400/50 rounded-lg text-slate-300 hover:text-slate-100 transition-all duration-300 medieval-font"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStory}
                className="flex-1 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 hover:border-red-400/50 rounded-lg text-red-300 hover:text-red-100 transition-all duration-300 medieval-font"
              >
                Destroy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
