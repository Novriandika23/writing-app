import { useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { 
  BellIcon, 
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import useAuthStore from '../../store/authStore'

export default function Header() {
  const { user, signOut } = useAuthStore()
  const [notifications] = useState([])

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-amber-700/30 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search and breadcrumb area */}
        <div className="flex-1">
          <div className="max-w-lg">
            <input
              type="search"
              placeholder="Search stories, characters, or notes..."
              className="w-full px-4 py-2 bg-gray-800/50 border border-amber-700/30 rounded-lg text-amber-100 placeholder-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 rune-font"
            />
          </div>
        </div>

        {/* Right side - notifications and user menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-amber-300/70 hover:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg transition-colors">
            <BellIcon className="w-6 h-6" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full mystical-glow"></span>
            )}
          </button>

          {/* User menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center p-2 text-amber-300/70 hover:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg transition-colors">
              <UserCircleIcon className="w-8 h-8" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-gray-800 rounded-md shadow-xl ring-1 ring-amber-700/30 focus:outline-none border border-amber-700/20">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-amber-700/30">
                    <p className="text-sm font-medium text-amber-100 medieval-font">
                      {user?.email || 'Scribe'}
                    </p>
                    <p className="text-xs text-amber-300/70 rune-font">Tale Weaver</p>
                  </div>

                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/settings"
                        className={`${
                          active ? 'bg-amber-900/30' : ''
                        } flex items-center px-4 py-2 text-sm text-amber-200 hover:text-amber-100 transition-colors`}
                      >
                        <Cog6ToothIcon className="w-4 h-4 mr-3 text-amber-400/70" />
                        <span className="medieval-font">Arcane Settings</span>
                      </a>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={`${
                          active ? 'bg-amber-900/30' : ''
                        } flex items-center w-full px-4 py-2 text-sm text-amber-200 hover:text-amber-100 transition-colors`}
                      >
                        <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3 text-amber-400/70" />
                        <span className="medieval-font">Depart Realm</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  )
}
