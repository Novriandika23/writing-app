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
              <h1 className="text-lg lg:text-2xl font-semibold text-slate-100 medieval-font truncate">
                {story.title}
              </h1>
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
          </div>
        </div>
      </div>

      {/* Gothic Editor Container */}
      <div className="flex-1 p-4 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="medieval-card gothic-frame p-4 lg:p-8">
            <RichTextEditor
              content={story.content || ''}
              onChange={handleContentChange}
              placeholder="Begin thy chronicle... Let the words flow like ancient magic across these sacred pages."
              className="min-h-[400px] lg:min-h-[600px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
