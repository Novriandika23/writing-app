import { useState, useEffect } from 'react'
import {
  ChartBarIcon,
  CalendarDaysIcon,
  ClockIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
  FireIcon
} from '@heroicons/react/24/outline'
import useGoalsStore from '../../store/goalsStore'
import useAuthStore from '../../store/authStore'

export default function WritingGoals() {
  const { user } = useAuthStore()
  const { goals, loading, fetchGoals, createGoal, updateGoal, deleteGoal } = useGoalsStore()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const [newGoal, setNewGoal] = useState({
    title: '',
    target_words: '',
    target_days: '',
    description: ''
  })

  useEffect(() => {
    if (user) {
      fetchGoals(user.id)
    }
  }, [user, fetchGoals])

  const handleCreateGoal = async (e) => {
    e.preventDefault()
    if (!newGoal.title.trim() || !newGoal.target_words) return

    const goalData = {
      ...newGoal,
      user_id: user.id,
      target_words: parseInt(newGoal.target_words),
      target_days: parseInt(newGoal.target_days) || 30,
      current_words: 0,
      status: 'active',
      created_at: new Date().toISOString()
    }

    const { error } = await createGoal(goalData)
    if (!error) {
      setShowCreateModal(false)
      setNewGoal({ title: '', target_words: '', target_days: '', description: '' })
    }
  }

  const handleUpdateGoal = async (goalId, updates) => {
    await updateGoal(goalId, updates)
    setEditingGoal(null)
  }

  const calculateProgress = (goal) => {
    return Math.min((goal.current_words / goal.target_words) * 100, 100)
  }

  const getDaysRemaining = (goal) => {
    const created = new Date(goal.created_at)
    const target = new Date(created.getTime() + (goal.target_days * 24 * 60 * 60 * 1000))
    const now = new Date()
    const diff = target - now
    return Math.max(0, Math.ceil(diff / (24 * 60 * 60 * 1000)))
  }

  const getWordsPerDay = (goal) => {
    const remaining = getDaysRemaining(goal)
    const wordsLeft = goal.target_words - goal.current_words
    return remaining > 0 ? Math.ceil(wordsLeft / remaining) : 0
  }

  if (loading) {
    return (
      <div className="min-h-screen dark-fantasy-bg stone-texture p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-700/50 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-slate-700/50 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen dark-fantasy-bg stone-texture fade-in-slow">
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold gothic-title tracking-wider mb-4">
                Writing Sanctum
              </h1>
              <p className="medieval-text text-xl">
                Sacred goals to guide thy literary journey
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary group flex-shrink-0"
            >
              <div className="flex items-center">
                <PlusIcon className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Forge New Goal</span>
                <span className="sm:hidden">New Goal</span>
              </div>
            </button>
          </div>
        </div>

        {/* Goals Grid */}
        {goals.length === 0 ? (
          <div className="text-center py-16">
            <ChartBarIcon className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2 medieval-font">
              No Writing Goals Yet
            </h3>
            <p className="text-slate-400 mb-6 medieval-text">
              Set thy first writing goal to begin thy journey
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              Create First Goal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => {
              const progress = calculateProgress(goal)
              const daysRemaining = getDaysRemaining(goal)
              const wordsPerDay = getWordsPerDay(goal)
              const isCompleted = progress >= 100

              return (
                <div
                  key={goal.id}
                  className="medieval-card gothic-frame p-6 relative group"
                >
                  {/* Status indicator */}
                  <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                    isCompleted ? 'bg-green-400' : 
                    daysRemaining === 0 ? 'bg-red-400' : 'bg-yellow-400'
                  }`}></div>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-100 medieval-font mb-2">
                      {goal.title}
                    </h3>
                    {goal.description && (
                      <p className="text-sm text-slate-400 medieval-text">
                        {goal.description}
                      </p>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-slate-400 mb-2">
                      <span>{goal.current_words.toLocaleString()} words</span>
                      <span>{goal.target_words.toLocaleString()} words</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          isCompleted ? 'bg-green-500' : 'bg-glitchRed'
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="text-center mt-2">
                      <span className={`text-sm font-medium ${
                        isCompleted ? 'text-green-400' : 'text-glitchRed'
                      }`}>
                        {progress.toFixed(1)}% Complete
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <CalendarDaysIcon className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                      <div className="text-slate-300 font-medium">
                        {daysRemaining}
                      </div>
                      <div className="text-slate-500">days left</div>
                    </div>
                    <div className="text-center">
                      <PencilIcon className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                      <div className="text-slate-300 font-medium">
                        {wordsPerDay}
                      </div>
                      <div className="text-slate-500">words/day</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => setEditingGoal(goal)}
                      className="flex-1 px-3 py-2 bg-glitchRed/10 hover:bg-glitchRed/20 border border-glitchRed/30 hover:border-glitchRed/50 rounded-lg text-glitchRed hover:text-glitchRed-light transition-all duration-300 text-sm"
                    >
                      Update Progress
                    </button>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-lg text-red-400 hover:text-red-300 transition-all duration-300 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Update Progress Modal */}
        {editingGoal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-darkBg to-darkBg-soft border-2 border-glitchRed/30 rounded-lg p-6 max-w-md w-full relative">
              {/* Gothic corners */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-glitchRed/70"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-glitchRed/70"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-glitchRed/70"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-glitchRed/70"></div>

              <h3 className="text-xl font-semibold text-slate-100 mb-6 medieval-font text-center">
                Update Progress: {editingGoal.title}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 medieval-font">
                    Current Word Count
                  </label>
                  <input
                    type="number"
                    value={editingGoal.current_words}
                    onChange={(e) => setEditingGoal({
                      ...editingGoal,
                      current_words: parseInt(e.target.value) || 0
                    })}
                    className="input-field"
                    min="0"
                    max={editingGoal.target_words}
                  />
                  <div className="text-xs text-slate-400 mt-1">
                    Target: {editingGoal.target_words.toLocaleString()} words
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setEditingGoal(null)}
                    className="flex-1 px-4 py-2 bg-slate-600/20 hover:bg-slate-600/30 border border-slate-500/30 hover:border-slate-400/50 rounded-lg text-slate-300 hover:text-slate-100 transition-all duration-300 medieval-font"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdateGoal(editingGoal.id, {
                      current_words: editingGoal.current_words,
                      updated_at: new Date().toISOString()
                    })}
                    className="flex-1 btn-primary"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Goal Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-darkBg to-darkBg-soft border-2 border-glitchRed/30 rounded-lg p-6 max-w-md w-full relative">
              {/* Gothic corners */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-glitchRed/70"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-glitchRed/70"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-glitchRed/70"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-glitchRed/70"></div>

              <h3 className="text-xl font-semibold text-slate-100 mb-6 medieval-font text-center">
                Forge New Writing Goal
              </h3>

              <form onSubmit={handleCreateGoal} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 medieval-font">
                    Goal Title *
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Complete First Draft"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 medieval-font">
                      Target Words *
                    </label>
                    <input
                      type="number"
                      value={newGoal.target_words}
                      onChange={(e) => setNewGoal({ ...newGoal, target_words: e.target.value })}
                      className="input-field"
                      placeholder="50000"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 medieval-font">
                      Days to Complete
                    </label>
                    <input
                      type="number"
                      value={newGoal.target_days}
                      onChange={(e) => setNewGoal({ ...newGoal, target_days: e.target.value })}
                      className="input-field"
                      placeholder="30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 medieval-font">
                    Description
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    className="input-field resize-none"
                    rows="3"
                    placeholder="Describe thy writing goal..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 bg-slate-600/20 hover:bg-slate-600/30 border border-slate-500/30 hover:border-slate-400/50 rounded-lg text-slate-300 hover:text-slate-100 transition-all duration-300 medieval-font"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    Create Goal
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
