import { useState, useCallback, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  BookOpenIcon,
  UserGroupIcon,
  MapIcon,
  ChartBarIcon,
  SparklesIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Grimoire', href: '/stories', icon: BookOpenIcon, runicName: 'Chronicles' },
  { name: 'Personas', href: '/characters', icon: UserGroupIcon, runicName: 'Souls' },
  { name: 'Fate Weaver', href: '/plot', icon: ChartBarIcon, runicName: 'Destiny' },
  { name: 'Realm Forge', href: '/world', icon: MapIcon, runicName: 'Worlds' },
  { name: 'Oracle', href: '/ai', icon: SparklesIcon, runicName: 'Wisdom' },
  { name: 'Arcane', href: '/settings', icon: Cog6ToothIcon, runicName: 'Runes' },
]

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const toggleCollapsed = useCallback(() => {
    setCollapsed(prev => !prev)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-6 left-4 z-50 p-2 bg-darkBg/90 backdrop-blur-sm border border-glitchRed/30 rounded-lg text-slate-400 hover:text-glitchRed transition-colors duration-300 shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        bg-gradient-to-b from-darkBg to-darkBg-soft border-r border-glitchRed/20 transition-all duration-300 stone-texture
        ${collapsed ? 'lg:w-16' : 'lg:w-64'}
        w-64
        lg:relative lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed lg:static top-0 left-0 h-full z-40
      `}>
      <div className="flex flex-col h-full">
        {/* Gothic Header */}
        <div className={`flex items-center p-4 border-b border-glitchRed/20 ${
          collapsed ? 'justify-center' : 'justify-between'
        }`}>
          {!collapsed && (
            <h1 className="text-lg lg:text-xl font-bold gothic-title tracking-wider">
              Mystical Quill
            </h1>
          )}

          {/* Desktop Collapse Button */}
          <button
            onClick={toggleCollapsed}
            className="hidden lg:block p-2 hover:bg-glitchRed/10 rounded-lg transition-all duration-300 border border-transparent hover:border-glitchRed/30"
          >
            {collapsed ? (
              <ChevronRightIcon className="w-4 h-4 text-slate-400 hover:text-glitchRed transition-colors duration-300" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4 text-slate-400 hover:text-glitchRed transition-colors duration-300" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 hover:bg-glitchRed/10 rounded-lg transition-all duration-300 border border-transparent hover:border-glitchRed/30"
          >
            <svg className="w-5 h-5 text-slate-400 hover:text-glitchRed transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Gothic Navigation */}
        <nav className={`flex-1 p-4 space-y-2 ${collapsed ? 'px-2' : ''}`}>
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center rounded-lg transition-all duration-300 ${
                  collapsed
                    ? 'justify-center p-3 mx-auto w-12 h-12'
                    : 'px-4 py-3'
                } ${
                  isActive
                    ? 'bg-gradient-to-r from-glitchRed/20 to-glitchRed/10 text-slate-100 border border-glitchRed/40 shadow-lg'
                    : 'text-slate-300 hover:bg-glitchRed/5 hover:text-slate-100 border border-transparent hover:border-glitchRed/20'
                }`}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={`flex-shrink-0 transition-colors duration-300 ${
                  collapsed ? 'w-5 h-5' : 'w-5 h-5'
                } ${
                  isActive ? 'text-glitchRed' : 'text-slate-400 group-hover:text-glitchRed'
                }`} />
                {!collapsed && (
                  <div className="ml-3 flex-1 flex items-center justify-between">
                    <span className="font-serif text-sm font-medium tracking-wide">{item.name}</span>
                    <span className="text-xs ui-text text-slate-500 font-sans">{item.runicName}</span>
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Gothic User Section */}
        <div className={`p-4 border-t border-glitchRed/20 ${collapsed ? 'px-2' : ''}`}>
          {!collapsed ? (
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-glitchRed-deep to-glitchRed rounded-full flex items-center justify-center border border-glitchRed/40 shadow-lg">
                <svg className="w-5 h-5 text-slate-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-100 font-serif">Chronicler</p>
                <p className="text-xs text-slate-400 ui-text">Order of Scribes</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-glitchRed-deep to-glitchRed rounded-full flex items-center justify-center border border-glitchRed/40 shadow-lg">
                <svg className="w-5 h-5 text-slate-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default memo(Sidebar)
