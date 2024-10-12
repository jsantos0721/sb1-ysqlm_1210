import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import RegistrationForm from './RegistrationForm';
import AdminScreen from './AdminScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showAdminScreen, setShowAdminScreen] = useState(false);

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setShowAdminScreen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : showAdminScreen ? (
        <AdminScreen onBack={() => setShowAdminScreen(false)} onLogout={handleLogout} />
      ) : (
        <RegistrationForm 
          userEmail={userEmail} 
          isAdmin={userEmail.toLowerCase() === 'admin@ideaingenieria.es'}
          onShowAdminScreen={() => setShowAdminScreen(true)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;