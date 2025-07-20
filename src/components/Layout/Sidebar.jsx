import { useState } from 'react'
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

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <div className={`bg-gradient-to-b from-gray-900 to-gray-800 border-r border-amber-700/30 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-700/30">
          {!collapsed && (
            <h1 className="text-xl font-bold text-amber-100 medieval-font glitch-red-text glitch-animate">
              Mystical Quill
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-amber-900/30 transition-colors border border-amber-700/50"
          >
            {collapsed ? (
              <ChevronRightIcon className="w-5 h-5 text-amber-300" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5 text-amber-300" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-900/50 to-orange-900/50 text-amber-100 border border-amber-700/50 mystical-glow'
                    : 'text-amber-200/70 hover:bg-amber-900/20 hover:text-amber-100 border border-transparent hover:border-amber-700/30'
                }`}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={`flex-shrink-0 w-5 h-5 transition-colors ${
                  isActive ? 'text-amber-300' : 'text-amber-400/70 group-hover:text-amber-300'
                }`} />
                {!collapsed && (
                  <span className="ml-3 medieval-font">{item.name}</span>
                )}
                {!collapsed && (
                  <span className="ml-auto text-xs rune-font text-amber-400/50">{item.runicName}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-amber-700/30">
          {!collapsed && (
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center border border-amber-700/50 mystical-glow">
                <svg className="w-5 h-5 text-amber-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-amber-100 medieval-font">Scribe</p>
                <p className="text-xs text-amber-300/70 rune-font">Tale Weaver</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
