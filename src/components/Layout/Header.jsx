import { useState, memo, useCallback } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { 
  BellIcon, 
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import useAuthStore from '../../store/authStore'

function Header() {
  const user = useAuthStore(state => state.user)
  const signOut = useAuthStore(state => state.signOut)
  const [notifications] = useState([])

  const handleSignOut = useCallback(async () => {
    await signOut()
  }, [signOut])

  return (
    <header className="bg-gradient-to-r from-darkBg to-darkBg-soft border-b-2 border-glitchRed/20 px-4 lg:px-8 py-4 lg:py-6 stone-texture">
      <div className="flex items-center justify-between">
        {/* Gothic Search Area */}
        <div className="flex-1 mr-4">
          <div className="max-w-lg">
            <input
              type="search"
              placeholder="Search stories, characters..."
              className="input-field text-sm lg:text-base w-full"
            />
          </div>
        </div>

        {/* Gothic Right Side - notifications and user menu */}
        <div className="flex items-center space-x-2 lg:space-x-6">
          {/* Mystical Notifications */}
          <button className="relative p-2 lg:p-3 text-slate-400 hover:text-glitchRed focus:outline-none focus:ring-2 focus:ring-glitchRed focus:ring-offset-2 focus:ring-offset-darkBg rounded-lg transition-all duration-300 border border-transparent hover:border-glitchRed/30 hover:bg-glitchRed/5">
            <BellIcon className="w-5 h-5 lg:w-6 lg:h-6" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 block w-2 h-2 lg:w-3 lg:h-3 bg-glitchRed rounded-full mystical-glow"></span>
            )}
          </button>

          {/* Gothic User Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center p-2 lg:p-3 text-slate-400 hover:text-glitchRed focus:outline-none focus:ring-2 focus:ring-glitchRed focus:ring-offset-2 focus:ring-offset-darkBg rounded-lg transition-all duration-300 border border-transparent hover:border-glitchRed/30 hover:bg-glitchRed/5">
              <UserCircleIcon className="w-6 h-6 lg:w-8 lg:h-8" />
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
              <Menu.Items className="absolute right-0 z-10 mt-3 w-64 lg:w-72 origin-top-right bg-gradient-to-br from-darkBg to-darkBg-soft rounded-lg shadow-2xl ring-2 ring-glitchRed/30 focus:outline-none border border-glitchRed/20 gothic-frame">
                <div className="py-2">
                  <div className="px-6 py-4 border-b-2 border-glitchRed/20">
                    <p className="text-base font-medium text-slate-100 medieval-font truncate max-w-full">
                      {user?.email || 'Anonymous Scribe'}
                    </p>
                    <p className="text-sm text-slate-400 rune-font">Tale Weaver</p>
                  </div>

                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/settings"
                        className={`${
                          active ? 'bg-glitchRed/10 text-slate-100' : 'text-slate-300'
                        } flex items-center px-6 py-3 text-sm hover:text-slate-100 hover:bg-glitchRed/5 transition-all duration-300 border-l-2 ${
                          active ? 'border-glitchRed' : 'border-transparent'
                        }`}
                      >
                        <Cog6ToothIcon className="w-5 h-5 mr-4 text-slate-400" />
                        <span className="medieval-font">Arcane Settings</span>
                      </a>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={`${
                          active ? 'bg-glitchRed/10 text-slate-100' : 'text-slate-300'
                        } flex items-center w-full px-6 py-3 text-sm hover:text-slate-100 hover:bg-glitchRed/5 transition-all duration-300 border-l-2 ${
                          active ? 'border-glitchRed' : 'border-transparent'
                        }`}
                      >
                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-4 text-slate-400" />
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

export default memo(Header)
