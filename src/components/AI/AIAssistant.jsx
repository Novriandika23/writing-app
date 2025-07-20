import { useState } from 'react'
import { 
  SparklesIcon,
  PaperAirplaneIcon,
  LightBulbIcon,
  UserGroupIcon,
  MapIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'

const promptTemplates = [
  {
    id: 'character',
    title: 'Character Development',
    icon: UserGroupIcon,
    description: 'Get help developing character backgrounds, motivations, and relationships',
    prompts: [
      'Create a complex backstory for my protagonist',
      'Suggest character flaws that would create interesting conflicts',
      'Help me develop relationships between my main characters',
      'What motivations would drive my antagonist?'
    ]
  },
  {
    id: 'plot',
    title: 'Plot Ideas',
    icon: LightBulbIcon,
    description: 'Generate plot twists, conflicts, and story developments',
    prompts: [
      'Suggest a plot twist for my current chapter',
      'Help me resolve this conflict between characters',
      'What obstacles should my protagonist face next?',
      'Create a compelling opening scene'
    ]
  },
  {
    id: 'world',
    title: 'World Building',
    icon: MapIcon,
    description: 'Develop settings, cultures, and world details',
    prompts: [
      'Help me design a unique magic system',
      'Create details for a fictional city',
      'Develop cultural traditions for my world',
      'Suggest environmental challenges for my setting'
    ]
  },
  {
    id: 'dialogue',
    title: 'Dialogue & Style',
    icon: ChatBubbleLeftRightIcon,
    description: 'Improve dialogue and writing style',
    prompts: [
      'Help me write natural dialogue for this scene',
      'Suggest ways to show emotion without telling',
      'How can I improve the pacing of this chapter?',
      'Create distinctive speech patterns for my character'
    ]
  }
]

export default function AIAssistant() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [customPrompt, setCustomPrompt] = useState('')
  const [conversation, setConversation] = useState([])
  const [loading, setLoading] = useState(false)

  const handlePromptSubmit = async (prompt) => {
    if (!prompt.trim()) return

    setLoading(true)
    const userMessage = { role: 'user', content: prompt, timestamp: new Date() }
    setConversation(prev => [...prev, userMessage])

    try {
      // Simulate AI response (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const aiResponse = {
        role: 'assistant',
        content: `This is a simulated AI response to: "${prompt}". In a real implementation, this would connect to OpenAI's API or another AI service to generate creative writing suggestions based on your prompt.`,
        timestamp: new Date()
      }
      
      setConversation(prev => [...prev, aiResponse])
    } catch (error) {
      console.error('Error getting AI response:', error)
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setConversation(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
      setCustomPrompt('')
    }
  }

  const handleCustomSubmit = (e) => {
    e.preventDefault()
    handlePromptSubmit(customPrompt)
  }

  return (
    <div className="min-h-screen dark-fantasy-bg parchment-texture">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 text-amber-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A1,1 0 0,0 14,8H18A1,1 0 0,1 19,9V10C19,10.55 18.55,11 18,11H14A3,3 0 0,1 11,8V7.73C10.4,7.39 10,6.74 10,6A2,2 0 0,1 12,2M7,10A1,1 0 0,0 6,11V12A1,1 0 0,0 7,13H8V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V13H17A1,1 0 0,0 18,12V11A1,1 0 0,0 17,10H7Z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-amber-100 medieval-font mb-4">Oracle of Wisdom</h1>
          <p className="text-amber-200/70 rune-font text-lg">Seek guidance from the mystical scribes to overcome thy creative barriers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Categories */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-amber-100 mb-6 medieval-font">Mystical Domains</h2>
            <div className="space-y-3">
              {promptTemplates.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory?.id === category.id
                      ? 'border-amber-500/70 bg-gradient-to-r from-amber-900/50 to-orange-900/50 mystical-glow'
                      : 'border-amber-700/30 hover:border-amber-500/50 bg-gray-800/50 hover:bg-amber-900/20'
                  }`}
                >
                  <div className="flex items-start">
                    <category.icon className={`w-5 h-5 mt-0.5 mr-3 ${
                      selectedCategory?.id === category.id ? 'text-amber-300' : 'text-amber-400/70'
                    }`} />
                    <div>
                      <h3 className="font-medium text-amber-100 medieval-font">{category.title}</h3>
                      <p className="text-sm text-amber-200/70 mt-1 rune-font">{category.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {selectedCategory ? (
              <div>
                <h2 className="text-xl font-semibold text-amber-100 mb-6 medieval-font">
                  {selectedCategory.title} Incantations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {selectedCategory.prompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handlePromptSubmit(prompt)}
                      className="text-left p-4 border border-amber-700/30 rounded-lg hover:border-amber-500/50 hover:bg-amber-900/20 transition-all duration-300 transform hover:scale-105 bg-gray-800/50"
                    >
                      <p className="text-sm text-amber-200 rune-font">{prompt}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <SparklesIcon className="w-16 h-16 text-amber-300/50 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-amber-100 mb-2 medieval-font">Choose thy Path</h3>
                <p className="text-amber-200/70 rune-font">Select a mystical domain to unveil the ancient prompts</p>
              </div>
            )}

            {/* Custom Prompt */}
            <div className="border-t border-amber-700/30 pt-6">
              <h3 className="text-lg font-medium text-amber-100 mb-4 medieval-font">Speak thy Query</h3>
              <form onSubmit={handleCustomSubmit} className="flex space-x-3">
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Ask the Oracle about thy tale..."
                  className="flex-1 px-4 py-3 bg-gray-800/80 border border-amber-700/50 rounded-lg text-amber-100 placeholder-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 rune-font"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !customPrompt.trim()}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-amber-100 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 mystical-glow border border-amber-700/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-100"></div>
                  ) : (
                    <PaperAirplaneIcon className="w-4 h-4" />
                  )}
                </button>
              </form>
            </div>

            {/* Conversation */}
            {conversation.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-amber-100 mb-4 medieval-font">Sacred Discourse</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {conversation.map((message, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-700/50 ml-8'
                          : 'bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-amber-700/30 mr-8'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className={`text-sm font-medium medieval-font ${
                          message.role === 'user' ? 'text-amber-200' : 'text-amber-300'
                        }`}>
                          {message.role === 'user' ? 'Scribe' : 'Oracle'}
                        </span>
                        <span className="text-xs text-amber-400/50 rune-font">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-amber-100 text-sm leading-relaxed">{message.content}</p>
                    </div>
                  ))}
                  {loading && (
                    <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-amber-700/30 mr-8 p-4 rounded-lg">
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-500 mr-2"></div>
                        <span className="text-sm text-amber-200 rune-font">The Oracle contemplates...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
