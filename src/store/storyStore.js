import { create } from 'zustand'
import { db } from '../lib/supabase'

const useStoryStore = create((set, get) => ({
  stories: [],
  currentStory: null,
  characters: [],
  plotPoints: [],
  worldElements: [],
  loading: false,
  
  // Stories
  setStories: (stories) => set({ stories }),
  setCurrentStory: (story) => set({ currentStory: story }),
  
  fetchStories: async (userId) => {
    set({ loading: true })
    const { data, error } = await db.getStories(userId)
    if (data) {
      set({ stories: data })
    }
    set({ loading: false })
    return { data, error }
  },
  
  createStory: async (storyData) => {
    const { data, error } = await db.createStory(storyData)
    if (data && data[0]) {
      const { stories } = get()
      set({ stories: [data[0], ...stories] })
    }
    return { data, error }
  },
  
  updateStory: async (id, updates) => {
    const { data, error } = await db.updateStory(id, updates)
    if (data && data[0]) {
      const { stories, currentStory } = get()
      const updatedStories = stories.map(story => 
        story.id === id ? data[0] : story
      )
      set({ 
        stories: updatedStories,
        currentStory: currentStory?.id === id ? data[0] : currentStory
      })
    }
    return { data, error }
  },
  
  deleteStory: async (id) => {
    const { error } = await db.deleteStory(id)
    if (!error) {
      const { stories, currentStory } = get()
      const filteredStories = stories.filter(story => story.id !== id)
      set({ 
        stories: filteredStories,
        currentStory: currentStory?.id === id ? null : currentStory
      })
    }
    return { error }
  },
  
  // Characters
  setCharacters: (characters) => set({ characters }),
  
  fetchCharacters: async (storyId) => {
    const { data, error } = await db.getCharacters(storyId)
    if (data) {
      set({ characters: data })
    }
    return { data, error }
  },
  
  createCharacter: async (characterData) => {
    const { data, error } = await db.createCharacter(characterData)
    if (data && data[0]) {
      const { characters } = get()
      set({ characters: [data[0], ...characters] })
    }
    return { data, error }
  },
  
  updateCharacter: async (id, updates) => {
    const { data, error } = await db.updateCharacter(id, updates)
    if (data && data[0]) {
      const { characters } = get()
      const updatedCharacters = characters.map(char => 
        char.id === id ? data[0] : char
      )
      set({ characters: updatedCharacters })
    }
    return { data, error }
  },
  
  deleteCharacter: async (id) => {
    const { error } = await db.deleteCharacter(id)
    if (!error) {
      const { characters } = get()
      const filteredCharacters = characters.filter(char => char.id !== id)
      set({ characters: filteredCharacters })
    }
    return { error }
  },
  
  // Plot Points
  setPlotPoints: (plotPoints) => set({ plotPoints }),
  
  fetchPlotPoints: async (storyId) => {
    const { data, error } = await db.getPlotPoints(storyId)
    if (data) {
      set({ plotPoints: data })
    }
    return { data, error }
  },
  
  createPlotPoint: async (plotPointData) => {
    const { data, error } = await db.createPlotPoint(plotPointData)
    if (data && data[0]) {
      const { plotPoints } = get()
      set({ plotPoints: [...plotPoints, data[0]].sort((a, b) => a.order_index - b.order_index) })
    }
    return { data, error }
  },
  
  updatePlotPoint: async (id, updates) => {
    const { data, error } = await db.updatePlotPoint(id, updates)
    if (data && data[0]) {
      const { plotPoints } = get()
      const updatedPlotPoints = plotPoints.map(point => 
        point.id === id ? data[0] : point
      ).sort((a, b) => a.order_index - b.order_index)
      set({ plotPoints: updatedPlotPoints })
    }
    return { data, error }
  },
  
  deletePlotPoint: async (id) => {
    const { error } = await db.deletePlotPoint(id)
    if (!error) {
      const { plotPoints } = get()
      const filteredPlotPoints = plotPoints.filter(point => point.id !== id)
      set({ plotPoints: filteredPlotPoints })
    }
    return { error }
  },
  
  // World Elements
  setWorldElements: (worldElements) => set({ worldElements }),
  
  fetchWorldElements: async (storyId) => {
    const { data, error } = await db.getWorldElements(storyId)
    if (data) {
      set({ worldElements: data })
    }
    return { data, error }
  },
  
  createWorldElement: async (worldElementData) => {
    const { data, error } = await db.createWorldElement(worldElementData)
    if (data && data[0]) {
      const { worldElements } = get()
      set({ worldElements: [data[0], ...worldElements] })
    }
    return { data, error }
  },
  
  updateWorldElement: async (id, updates) => {
    const { data, error } = await db.updateWorldElement(id, updates)
    if (data && data[0]) {
      const { worldElements } = get()
      const updatedWorldElements = worldElements.map(element => 
        element.id === id ? data[0] : element
      )
      set({ worldElements: updatedWorldElements })
    }
    return { data, error }
  },
  
  deleteWorldElement: async (id) => {
    const { error } = await db.deleteWorldElement(id)
    if (!error) {
      const { worldElements } = get()
      const filteredWorldElements = worldElements.filter(element => element.id !== id)
      set({ worldElements: filteredWorldElements })
    }
    return { error }
  }
}))

export default useStoryStore
