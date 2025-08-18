import React, { useState, useEffect } from 'react'
import Contacts from './pages/Contacts/Contacts'
import Sidebar from './components/Sidebar/Sidebar'
import Favorites from './pages/Favorites/Favorites'
import Tags from './pages/Tags/Tags'
import Groups from './pages/Groups/Groups'
import Settings from './pages/Settings/Settings'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'

const App = () => {
  const [activePage, setActivePage] = useState('Contacts')
  const [authPage, setAuthPage] = useState('Login')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [signupEmail, setSignupEmail] = useState('') // Store email from signup

  const renderPage = () => {
    switch (activePage) {
      case 'Contacts':
        return <Contacts />
      case 'Favorites':
        return <Favorites />
      case 'Tags':
        return <Tags />
      case 'Groups':
        return <Groups />
      case 'Settings':
        return <Settings />
      default:
        return <Contacts />
    }
  }

  // Handle login
  const handleLogin = (userData) => {
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Handle signup - redirect to login
  const handleSignup = (userData) => {
    setSignupEmail(userData.email || '') // Store email for pre-filling login
    setAuthPage('Login') // Switch to login page
  }

  // Check if user is already logged in on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (savedUser && token) {
      setIsAuthenticated(true)
    }
  }, [])

  // If not authenticated, show login/signup pages
  if (!isAuthenticated) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#ebf1f6]'>
        <div className='w-full max-w-md'>
          {authPage === 'Login' ? (
            <Login
              onLogin={handleLogin}
              onSwitchPage={() => setAuthPage('Signup')}
              prefillEmail={signupEmail} // Pass email to pre-fill
            />
          ) : (
            <Signup
              onSignup={handleSignup}
              onSwitchPage={() => setAuthPage('Login')}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#ebf1f6]'>
      <div className='flex w-[80%] bg-[#ebf0f5] rounded-xl shadow-lg overflow-hidden'>
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div className='flex-1 p-8 bg-[#ffffff]'>
          {renderPage()}
        </div>
      </div>
    </div>
  )
}

export default App