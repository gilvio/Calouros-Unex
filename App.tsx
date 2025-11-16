
import React, { useState } from 'react';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CalendarPage } from './pages/CalendarPage';
import { ChatPage } from './pages/ChatPage';
import { Guide } from './pages/Guide';
import { MapPage } from './pages/MapPage';
import { Profile } from './pages/Profile';
import { Layout } from './components/Layout';
import { Page, User } from './types';
import { MOCK_USER } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  const handleLogin = () => {
    setUser(MOCK_USER);
    setCurrentPage(Page.Home);
  };

  const handleLogout = () => {
    setUser(null);
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

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      user={user} 
      currentPage={currentPage} 
      onNavClick={setCurrentPage}
      onLogout={handleLogout}
    >
        {renderPage()}
    </Layout>
  );
};

export default App;
