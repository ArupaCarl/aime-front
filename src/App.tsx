import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { MainLayout } from './components/MainLayout';
import { Dashboard } from './components/Dashboard';
import { TicketBoard } from './components/TicketBoard';
import { MeetingCalendar } from './components/MeetingCalendar';
import { TeamManagement } from './components/TeamManagement';
import { Settings } from './components/Settings';
import { User, ViewType } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  if (!currentUser) {
    return <LoginScreen onLogin={setCurrentUser} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <TicketBoard />;
      case 'meetings':
        return <MeetingCalendar />;
      case 'team':
        return <TeamManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MainLayout
      currentUser={currentUser}
      currentView={currentView}
      onViewChange={setCurrentView}
      onLogout={() => setCurrentUser(null)}
    >
      {renderContent()}
    </MainLayout>
  );
}