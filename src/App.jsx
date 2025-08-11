import React, { useState } from 'react'
import Contacts from './pages/Contacts/Contacts'
import Sidebar from './components/Sidebar/Sidebar'
import Favorites from './pages/Favorites/Favorites'
import Tags from './pages/Tags/Tags'
import Groups from './pages/Groups/Groups'
import Settings from './pages/Settings/Settings'

const App = () => {

  const [activePage, setActivePage] = useState('Contacts')

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
