import { useEffect, memo } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import useAuthStore from '../../store/authStore'

function Layout() {
  const initialize = useAuthStore(state => state.initialize)
  const loading = useAuthStore(state => state.loading)

  useEffect(() => {
    initialize()
  }, [initialize])

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

  return (
    <div className="min-h-screen dark-fantasy-bg flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default memo(Layout)
