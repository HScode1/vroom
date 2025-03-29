'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutButton } from '@clerk/nextjs'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  // Home, // Removed - Was unused
  Settings,
  User,
  // ShoppingBag, // Removed - Was unused
  // Search, // Removed - Was unused
  // HelpCircle, // Removed - Was unused
  Menu as MenuIcon,
  // Heart, // Removed - Was unused
  PlusSquare,
  Clock,
  BarChart2,
  Clipboard,
  LayoutDashboard,
  DollarSign,
  LogOut,
  AlertTriangle
} from 'lucide-react'
import Image from 'next/image'

type SidebarProps = {
  className?: string
}

export default function ProfessionalSidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const mobileCheck = window.innerWidth < 1024;
      setIsMobile(mobileCheck)
      // Collapse sidebar by default on mobile only if it wasn't manually opened
      if (mobileCheck && !isMobileOpen) {
        setIsCollapsed(true)
      } else if (!mobileCheck) {
        // Optionally set a default state for desktop if needed, e.g., not collapsed
        // setIsCollapsed(false);
      }
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [isMobileOpen]) // Re-run effect if mobile open state changes

  // Main menu items (most important for professionals)
  const mainMenu = [
    {
      title: 'Tableau de bord',
      icon: LayoutDashboard,
      path: '/dashboard',
      active: pathname === '/dashboard',
      badge: null
    },
    {
      title: 'Ajouter véhicule',
      icon: PlusSquare,
      path: '/addCar',
      active: pathname === '/addCar',
      badge: null,
      highlight: true
    },
    {
      title: 'Stock',
      icon: Clipboard,
      path: '/stock',
      active: pathname === '/stock' || pathname.startsWith('/stock/'),
      badge: {
        count: 47,
        color: 'bg-blue-500'
      }
    },
    {
      title: 'Ventes',
      icon: DollarSign,
      path: '/transactions',
      active: pathname === '/transactions',
      badge: {
        count: 3,
        color: 'bg-green-500'
      }
    },
    {
      title: 'Statistiques',
      icon: BarChart2,
      path: '/statistiques',
      active: pathname === '/statistiques',
      badge: null
    },

  ]

  // Secondary menu (less important but still useful)
  const secondaryMenu = [
    {
      title: 'Alertes',
      icon: AlertTriangle,
      path: '/alertes',
      active: pathname === '/alertes',
      badge: {
        count: 2,
        color: 'bg-amber-500'
      }
    },
    {
      title: 'Historique',
      icon: Clock,
      path: '/historique',
      active: pathname === '/historique',
      badge: null
    },
    {
      title: 'Profil',
      icon: User,
      path: '/profil',
      active: pathname === '/profil',
      badge: null
    },
    {
      title: 'Paramètres',
      icon: Settings,
      path: '/parametres',
      active: pathname === '/parametres',
      badge: null
    }
  ]

  // Mobile toggle button
  const MobileToggle = () => (
    <button
      className="lg:hidden fixed z-50 top-5 left-5 bg-[#C8EC66] p-2 rounded-full shadow-lg text-gray-900" // Ensure text color contrast
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      aria-label={isMobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
    >
      <MenuIcon className="h-6 w-6" />
    </button>
  )

  // Menu item component with badge support
  const MenuItem = ({ item }: { item: typeof mainMenu[0] }) => ( // Add explicit type for item
    <Link
      href={item.path}
      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${ // Added duration
        item.active
          ? 'bg-[#C8EC66] text-gray-900 font-medium shadow-sm' // Added subtle shadow on active
          : item.highlight
            ? 'text-[#5a6d2b] hover:bg-[#C8EC66]/30 font-medium' // Adjusted highlight color and hover
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900' // Added hover text color change
      }`}
      onClick={() => { if (isMobile) setIsMobileOpen(false); }} // Ensure mobile menu closes on click
    >
      <div className="flex items-center gap-3">
        <item.icon className={`h-5 w-5 flex-shrink-0 ${item.highlight && !item.active ? 'text-[#98B544]' : ''} ${isCollapsed ? 'mx-auto' : ''}`} />
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap overflow-hidden" // Prevent text wrap during animation
            >
              {item.title}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {!isCollapsed && item.badge && (
        <span className={`${item.badge.color} text-white text-xs font-semibold px-2 py-0.5 rounded-full`}> {/* Adjusted padding/font-weight */}
          {item.badge.count}
        </span>
      )}
    </Link>
  )

  const SidebarContent = () => (
    <>
      {/* Header Section */}
      <div className={`flex items-center p-4 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <Link href="/dashboard" className={`${isCollapsed ? 'w-full flex justify-center' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="bg-[#C8EC66] p-2 rounded-lg flex-shrink-0">
              <Image
                src="/images/logo.png" // Make sure this path is correct relative to the public folder
                alt="VROOM logo"
                width={30}
                height={30}
                // Consider removing filter if logo has transparency or is designed for light backgrounds
                // className="[filter:brightness(0)_sepia(100%)_hue-rotate(80deg)_saturate(700%)_brightness(1.1)]"
              />
            </div>
            <AnimatePresence>
             {!isCollapsed && (
               <motion.span
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.2, delay: 0.1 }}
                 className="font-bold text-lg whitespace-nowrap"
               >
                 VROOM PRO
               </motion.span>
             )}
           </AnimatePresence>
          </div>
        </Link>
        {/* Collapse Toggle - Only on Desktop */}
        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-lg hover:bg-gray-100 ${isCollapsed ? 'hidden' : 'hidden lg:block'}`} // Hide when collapsed on mobile too
            aria-label={isCollapsed ? "Développer le menu" : "Réduire le menu"}
          >
             <ChevronLeft className="h-5 w-5" />
          </button>
        )}
         {isCollapsed && !isMobile && ( // Show expand button only when collapsed and on desktop
          <button
             onClick={() => setIsCollapsed(!isCollapsed)}
             className="p-2 rounded-lg hover:bg-gray-100 hidden lg:block absolute right-[-15px] top-16 bg-white border border-gray-200 shadow-sm" // Position expand button outside
             aria-label="Développer le menu"
           >
             <ChevronRight className="h-5 w-5" />
          </button>
         )}

      </div>

      {/* Menu Sections */}
      <div className="mt-6 px-3 space-y-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400"> {/* Added scrollbar styling */}
        {/* Main Menu Section */}
        <div>
          {!isCollapsed && (
            <div className={`mb-2 px-1 text-xs font-semibold text-gray-500 uppercase tracking-wider`}> {/* Adjusted padding/tracking */}
              Gestion véhicules
            </div>
          )}
           {isCollapsed && <hr className="mx-2 my-4 border-gray-200" />} {/* Divider when collapsed */}
          <ul className="space-y-1 relative"> {/* Added relative for badge positioning */}
            {mainMenu.map((item) => (
              <li key={item.title} className="relative"> {/* Added relative here too */}
                <MenuItem item={item} />
                {isCollapsed && item.badge && (
                  <span className={`${item.badge.color} h-2 w-2 rounded-full absolute top-1 right-1 ring-2 ring-white`}> {/* Improved badge positioning for collapsed */}
                    <span className="sr-only">{item.badge.count}</span> {/* Screen reader text */}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Secondary Menu Section */}
        <div className="pt-4"> {/* Removed border when collapsed */}
          {!isCollapsed && <hr className="mx-2 my-4 border-gray-200" />} {/* Use divider only when expanded */}
          {!isCollapsed && (
            <div className={`mb-2 px-1 text-xs font-semibold text-gray-500 uppercase tracking-wider`}>
              Paramètres compte
            </div>
          )}
           {isCollapsed && <hr className="mx-2 my-4 border-gray-200" />} {/* Divider when collapsed */}
          <ul className="space-y-1 relative">
            {secondaryMenu.map((item) => (
              <li key={item.title} className="relative">
                <MenuItem item={item} />
                {isCollapsed && item.badge && (
                   <span className={`${item.badge.color} h-2 w-2 rounded-full absolute top-1 right-1 ring-2 ring-white`}>
                     <span className="sr-only">{item.badge.count}</span>
                   </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Section - Logout */}
      <div className="mt-auto p-3 border-t border-gray-200"> {/* Adjusted padding */}
        <SignOutButton>
          <button className={`flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full ${isCollapsed ? 'justify-center' : ''}`}>
            <LogOut className={`h-5 w-5 flex-shrink-0 ${isCollapsed ? 'mx-auto' : ''}`} />
            <AnimatePresence>
              {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                     className="whitespace-nowrap overflow-hidden font-medium" // Added font-medium
                  >
                    Déconnexion
                  </motion.span>
              )}
            </AnimatePresence>
          </button>
        </SignOutButton>
      </div>
    </>
  )

  // Desktop sidebar
  const DesktopSidebar = () => (
    <aside // Use aside semantic element
      className={`hidden lg:flex h-screen flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out ${ // Added ease-in-out
        isCollapsed ? 'w-20' : 'w-64'
      } ${className}`}
    >
      <SidebarContent />
    </aside>
  )

  // Mobile sidebar with overlay
  const MobileSidebar = () => (
    <>
      <MobileToggle />
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden" // Slightly darker overlay
              aria-hidden="true" // Hide from screen readers
            />
            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }} // Adjusted animation physics
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 lg:hidden flex flex-col shadow-xl" // Adjusted width and added shadow
              role="dialog" // Accessibility role
              aria-modal="true" // Accessibility attribute
              aria-label="Menu principal" // Accessibility label
            >
              {/* Add a close button inside mobile menu for better accessibility */}
               <button
                 onClick={() => setIsMobileOpen(false)}
                 className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800"
                 aria-label="Fermer le menu"
               >
                 <ChevronLeft className="h-6 w-6" /> {/* Or use an X icon */}
               </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )

  return (
    <>
      <DesktopSidebar />
      {isMobile && <MobileSidebar />} {/* Conditionally render MobileSidebar only on mobile */}
    </>
  )
}