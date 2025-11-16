
import React, { useState } from 'react';
import { Page, User } from '../types';
import { HomeIcon, BookOpenIcon, CalendarIcon, ChatBubbleIcon, UserCircleIcon, Bars3Icon, MapPinIcon, QuestionMarkCircleIcon, ArrowLeftOnRectangleIcon, XMarkIcon } from './Icons';
import { PAGE_CONFIG } from '../constants';

interface LayoutProps {
  user: User;
  currentPage: Page;
  onNavClick: (page: Page) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const navItemsConfig = [
    { page: Page.Home, icon: <HomeIcon />, text: "Início" },
    { page: Page.Courses, icon: <BookOpenIcon />, text: "Cursos" },
    { page: Page.Calendar, icon: <CalendarIcon />, text: "Calendário" },
    { page: Page.Chat, icon: <ChatBubbleIcon />, text: "Chat" },
    { page: Page.Guide, icon: <QuestionMarkCircleIcon />, text: "Tutoriais" },
    { page: Page.Map, icon: <MapPinIcon />, text: "Mapa" },
];

// FIX: Changed icon prop type from React.ReactNode to React.ReactElement for better type safety with React.cloneElement.
// FIX: Corrected icon prop type to specify that it accepts a `className` prop, resolving an error with `React.cloneElement`.
const NavItem: React.FC<{ page: Page; currentPage: Page; onNavClick: (page: Page) => void; icon: React.ReactElement<{ className?: string }>; text: string; isMobile?: boolean; isCollapsed?: boolean }> = ({ page, currentPage, onNavClick, icon, text, isMobile = false, isCollapsed = false }) => {
  const isActive = currentPage === page;
  
  const baseClasses = 'flex items-center rounded-lg p-3 text-sm font-medium transition-colors w-full';
  
  const mobileClasses = 'flex-col justify-center space-x-0 space-y-1 text-xs';
  const desktopCollapsedClasses = 'justify-center';
  const desktopExpandedClasses = 'justify-start space-x-3';
  
  const layoutClasses = isMobile ? mobileClasses : (isCollapsed ? desktopCollapsedClasses : desktopExpandedClasses);
  
  const activeClasses = 'bg-secondary text-white';
  const inactiveClasses = 'text-gray-600 hover:bg-neutral-light hover:text-neutral-dark';
  
  return (
    <button onClick={() => onNavClick(page)} className={`${baseClasses} ${layoutClasses} ${isActive ? activeClasses : inactiveClasses}`} title={text}>
      {React.cloneElement(icon, { className: 'w-6 h-6 flex-shrink-0' })}
      {(isMobile || !isCollapsed) && <span className={isMobile ? 'mt-1' : ''}>{text}</span>}
    </button>
  );
};

interface SidebarContentProps {
    isCollapsed: boolean;
    currentPage: Page;
    onNavClick: (page: Page) => void;
    onLogout: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ isCollapsed, currentPage, onNavClick, onLogout }) => {
    const logoSrc = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgcng9IjMwIiBmaWxsPSIjMDA1NUE0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJjZW50cmFsIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSW50ZXIsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iODAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSI+VVg8L3RleHQ+PC9zdmc+";

    return (
        <div className="flex flex-col h-full bg-white border-r border-gray-200">
            <div className={`p-4 border-b flex items-center gap-3 ${isCollapsed ? 'justify-center' : 'justify-start'}`} style={{ minHeight: '69px' }}>
                <img src={logoSrc} alt="UNEX Logo" className="w-8 h-8 flex-shrink-0" />
                {!isCollapsed && (
                    <div className="whitespace-nowrap overflow-hidden">
                        <h1 className="text-2xl font-bold text-primary">UNEX</h1>
                        <p className="text-sm text-gray-500">Calouros</p>
                    </div>
                )}
            </div>
            <nav className="flex-1 p-2 space-y-2 mt-2 overflow-y-auto">
                {navItemsConfig.map(item => (
                    <NavItem key={item.page} {...item} currentPage={currentPage} onNavClick={onNavClick} isCollapsed={isCollapsed} />
                ))}
            </nav>
            <div className="p-2 border-t flex-shrink-0">
                <NavItem 
                    page={Page.Profile} 
                    currentPage={currentPage} 
                    onNavClick={onNavClick}
                    icon={<UserCircleIcon />} 
                    text="Perfil" 
                    isCollapsed={isCollapsed} 
                />
                <button 
                    onClick={onLogout} 
                    className={`w-full mt-2 flex items-center rounded-lg p-3 text-sm font-medium text-gray-600 hover:bg-neutral-light hover:text-neutral-dark transition-colors ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}`}
                    title="Sair"
                >
                    <ArrowLeftOnRectangleIcon className="w-6 h-6 flex-shrink-0" />
                    {!isCollapsed && <span>Sair</span>}
                </button>
            </div>
        </div>
    );
};

export const Layout: React.FC<LayoutProps> = ({ user, currentPage, onNavClick, onLogout, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile overlay
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // For desktop collapse

  const handleNav = (page: Page) => {
    onNavClick(page);
    setIsSidebarOpen(false); // Close mobile sidebar on navigation
  };

  return (
    <div className="flex h-screen bg-neutral-light font-sans">
      {/* Mobile Sidebar (off-canvas) */}
      <div className={`fixed inset-0 z-40 transform transition-transform md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <SidebarContent isCollapsed={false} currentPage={currentPage} onNavClick={handleNav} onLogout={onLogout} />
      </div>
      {isSidebarOpen && <div className="fixed inset-0 z-30 bg-black opacity-50 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Desktop Sidebar */}
      <aside className={`hidden md:block flex-shrink-0 bg-white transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
         <SidebarContent isCollapsed={isSidebarCollapsed} currentPage={currentPage} onNavClick={handleNav} onLogout={onLogout} />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center">
                {/* Mobile Menu Button */}
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden mr-4 text-gray-600">
                    {isSidebarOpen ? <XMarkIcon className="w-6 h-6"/> : <Bars3Icon className="w-6 h-6"/>}
                </button>
                {/* Desktop Menu Button */}
                <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="hidden md:block mr-4 text-gray-600">
                    <Bars3Icon className="w-6 h-6"/>
                </button>
                <h2 className="text-xl font-bold text-neutral-dark">{PAGE_CONFIG[currentPage].name}</h2>
            </div>
          <div className="flex items-center space-x-4">
            <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
            <div>
                <p className="font-semibold text-neutral-dark">{user.name}</p>
                <p className="text-sm text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="md:hidden grid grid-cols-5 gap-1 p-2 bg-white border-t border-gray-200">
          {navItemsConfig.slice(0, 5).map(item => (
             <NavItem key={item.page} {...item} currentPage={currentPage} onNavClick={onNavClick} isMobile={true}/>
          ))}
        </nav>
      </div>
    </div>
  );
};
