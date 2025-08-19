import React from 'react';
import { menuItems } from '../../assets/assets';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { authService } from '../../api/services/authService';

const Sidebar = ({ activePage, setActivePage, onLogout }) => {
  const handleOptionClick = (option) => {
    setActivePage(option)
  }

  const handleLogout = async() => {
    try {
      // Call the logout API
      await authService.logout();

      // Call the logout function passed from App.jsx
      onLogout();
    } catch (error) {
      console.error('Logout error: ', error);
      // Even if API call fails, still logout locally
      onLogout();
    }
  }

    // Get current user data from localStorage
  const getCurrentUser = () => {
    try {
      const user = localStorage.getItem('user');
      if (user && user !== 'undefined') {
        return JSON.parse(user);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    return { name: 'User', email: 'user@example.com' };
  };

  const currentUser = getCurrentUser();

  // Get user intials
  const getUserInitials = (name) => {
    if(!name) return 'U';
    return name.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  return (
    <div className="bg-gradient-to-b from-[#f0f7ff] to-[#e6f2ff] w-[260px] flex flex-col border-r border-gray-200 shadow-lg">
      {/* App Logo & Title */}
      <div className="py-8 px-6 flex flex-col items-center">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-8 h-8 rounded-md flex items-center justify-center">
              <FaUserCircle className="text-white text-xl" />
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Contact Manager
        </h1>
        <div className="mt-2 text-sm text-gray-500">Stay connected effortlessly</div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-4 py-6">
        <div className="text-xs uppercase font-semibold text-gray-500 tracking-wider pl-4 mb-3">
          Main Navigation
        </div>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <div
                className={`flex items-center gap-4 px-5 py-3.5 rounded-xl cursor-pointer transition-all duration-300 ${activePage === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'hover:bg-blue-100 hover:text-blue-600'
                  }`}
                onClick={() => handleOptionClick(item.id)}
              >
                <div className={`p-1.5 rounded-lg ${activePage === item.id ? 'bg-white/20' : 'bg-blue-100'}`}>
                  {React.cloneElement(item.icon, {
                    className: `${item.icon.props.className} ${activePage === item.id ? 'text-white' : 'text-blue-500'}`
                  })}
                </div>
                <span className="text-[17px] font-medium">{item.label}</span>
                {activePage === item.id && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse"></div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* User Profile & Settings */}
      <div className="border-t border-gray-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-400 to-indigo-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
            JD
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-800">John Doe</div>
            <div className="text-xs text-gray-500">Admin Account</div>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
            <FiLogOut onClick={handleLogout} className="text-lg cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-gray-600">Online</span>
          </div>
          <div className="text-gray-500">v2.4.1</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;