
import React, { useState, useEffect } from 'react';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CalendarPage } from './pages/CalendarPage';
import { ChatPage } from './pages/ChatPage';
import { Guide } from './pages/Guide';
import { MapPage } from './pages/MapPage';
import { Profile } from './pages/Profile';
import { Layout } from './components/Layout';
import { OnboardingTutorial } from './components/OnboardingTutorial';
import { Page, User } from './types';
import { MOCK_USER } from './constants';
import { ThemeProvider } from './ThemeContext';

const App: React.FC = () => {
  // Initialize user state by checking localStorage first
  const [user, setUser] = useState<User | null>(() => {
      try {
          const savedUser = localStorage.getItem('unex_user_session');
          return savedUser ? JSON.parse(savedUser) : null;
      } catch (error) {
          console.error("Failed to load user session", error);
          return null;
      }
  });

  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleLogin = () => {
    const userToLogin = MOCK_USER;
    setUser(userToLogin);
    
    // Save user to localStorage for persistence
    localStorage.setItem('unex_user_session', JSON.stringify(userToLogin));
    
    setCurrentPage(Page.Home);
    
    // Check if user has seen tutorial
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
        setShowTutorial(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    // Clear user session
    localStorage.removeItem('unex_user_session');
  };

  const closeTutorial = () => {
      setShowTutorial(false);
      localStorage.setItem('hasSeenTutorial', 'true');
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <Home user={user!} onNavClick={setCurrentPage} />;
      case Page.Courses:
        return <Courses />;
      case Page.Calendar:
        return <CalendarPage />;
      case Page.Chat:
        return <ChatPage />;
      case Page.Guide:
        return <Guide />;
      case Page.Map:
        return <MapPage />;
      case Page.Profile:
        return <Profile user={user!} onLogout={handleLogout}/>;
      default:
        return <Home user={user!} onNavClick={setCurrentPage} />;
    }
  };

  // Wraps the entire auth/app logic to ensure context availability if needed in login too
  const content = !user ? (
      <Login onLogin={handleLogin} />
  ) : (
      <Layout 
        user={user} 
        currentPage={currentPage} 
        onNavClick={setCurrentPage}
        onLogout={handleLogout}
      >
          {renderPage()}
          {showTutorial && <OnboardingTutorial onClose={closeTutorial} />}
      </Layout>
  );

  return (
    <ThemeProvider>
        {content}
    </ThemeProvider>
  );
};

export default App;
