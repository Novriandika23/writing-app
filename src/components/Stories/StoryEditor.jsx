import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeftIcon,
  BookmarkIcon,
  ClockIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import RichTextEditor from '../Editor/RichTextEditor'
import useStoryStore from '../../store/storyStore'
import useAuthStore from '../../store/authStore'
import usePageTitle from '../../hooks/usePageTitle'

export default function StoryEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { stories, updateStory } = useStoryStore()

  const [story, setStory] = useState(null)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [autoSaveTimeout, setAutoSaveTimeout] = useState(null)

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

    if (shouldSave) {
      // Immediate save
      setSaving(true)
      try {
        await updateStory(story.id, saveData)
        setLastSaved(new Date())
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={() => navigate('/stories')}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200 group"
            >
              <ArrowLeftIcon className="w-5 h-5 text-slate-300 group-hover:text-purple-300" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg md:text-xl font-semibold text-slate-100 font-serif truncate">
                {story.title}
              </h1>
              <div className="flex items-center space-x-2 md:space-x-4 text-xs md:text-sm text-slate-400 mt-1">
                <div className="flex items-center">
                  <DocumentTextIcon className="w-3 h-3 md:w-4 md:h-4 mr-1 text-purple-400" />
                  <span>{story.word_count || 0} words</span>
                </div>
                <div className="hidden sm:flex items-center">
                  <ClockIcon className="w-3 h-3 md:w-4 md:h-4 mr-1 text-purple-400" />
                  <span>Last saved: {formatLastSaved()}</span>
                </div>
                {saving && (
                  <div className="flex items-center text-purple-400">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-purple-400 mr-1"></div>
                    <span className="hidden sm:inline">Saving...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200 group">
              <BookmarkIcon className="w-5 h-5 text-slate-300 group-hover:text-purple-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <RichTextEditor
            content={story.content || ''}
            onChange={handleContentChange}
            placeholder="Begin your tale... Let the words flow like magic across the page."
            className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50"
          />
        </div>
      </div>
    </div>
  )
}
