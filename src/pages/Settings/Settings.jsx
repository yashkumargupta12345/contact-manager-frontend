import React, { useState } from 'react';
import { FaUser, FaPalette, FaLock, FaBell, FaGlobe, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdInformationCircle } from 'react-icons/io';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Settings updated:', formData);
    // Show success message
    alert('Your settings have been updated successfully!');
  };
  
  const togglePasswordVisibility = (field) => {
    if (field === 'current') setShowCurrentPassword(!showCurrentPassword);
    if (field === 'new') setShowNewPassword(!showNewPassword);
    if (field === 'confirm') setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <IoMdInformationCircle className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-600 mt-2">
              Manage your account preferences and security settings
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pl-2">Settings</h3>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('account')}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all ${
                  activeTab === 'account'
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaUser className={`${activeTab === 'account' ? 'text-indigo-600' : 'text-gray-500'}`} />
                <span>Account Settings</span>
              </button>
              
              <button
                onClick={() => setActiveTab('preferences')}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all ${
                  activeTab === 'preferences'
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaPalette className={`${activeTab === 'preferences' ? 'text-indigo-600' : 'text-gray-500'}`} />
                <span>Preferences</span>
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all ${
                  activeTab === 'security'
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaLock className={`${activeTab === 'security' ? 'text-indigo-600' : 'text-gray-500'}`} />
                <span>Security</span>
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all ${
                  activeTab === 'notifications'
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaBell className={`${activeTab === 'notifications' ? 'text-indigo-600' : 'text-gray-500'}`} />
                <span>Notifications</span>
              </button>
              
              <button
                onClick={() => setActiveTab('language')}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all ${
                  activeTab === 'language'
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaGlobe className={`${activeTab === 'language' ? 'text-indigo-600' : 'text-gray-500'}`} />
                <span>Language & Region</span>
              </button>
            </nav>
            
            <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <h4 className="font-medium text-indigo-800 mb-2">Need help?</h4>
              <p className="text-sm text-indigo-600 mb-3">
                Visit our help center or contact our support team
              </p>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                Contact Support
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Settings Content */}
        <div className="lg:w-3/4">
          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <FaUser className="text-indigo-600" />
                <span>Account Settings</span>
              </h2>
              <p className="text-gray-600 mb-6">Update your personal information and contact details</p>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    required
                  />
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 rounded-lg text-white flex items-center gap-2 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md"
                  >
                    <FaSave />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Preferences */}
          {activeTab === 'preferences' && (
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <FaPalette className="text-indigo-600" />
                <span>Preferences</span>
              </h2>
              <p className="text-gray-600 mb-6">Customize your application experience</p>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium text-gray-800">Dark Mode</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Switch to dark theme for better night viewing
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium text-gray-800">Compact View</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Show more content with a denser layout
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="font-medium text-gray-800">Contact Avatars</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Show profile pictures instead of initials
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      defaultChecked
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end pt-6 mt-4">
                <button
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 rounded-lg text-white flex items-center gap-2 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md"
                >
                  <FaSave />
                  <span>Save Preferences</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Security */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <FaLock className="text-indigo-600" />
                <span>Security Settings</span>
              </h2>
              <p className="text-gray-600 mb-6">Manage your password and account security</p>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute inset-y-0 right-0 px-4 text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute inset-y-0 right-0 px-4 text-gray-500 hover:text-gray-700"
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute inset-y-0 right-0 px-4 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                  <h3 className="font-medium text-blue-800 mb-2">Password Requirements</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>Minimum 8 characters</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>At least one uppercase letter</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>At least one number or special character</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex items-center justify-between py-4 border-b border-gray-100 mb-6">
                  <div>
                    <h3 className="font-medium text-gray-800">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    Enable
                  </button>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 rounded-lg text-white flex items-center gap-2 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md"
                  >
                    <FaSave />
                    <span>Update Password</span>
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <FaBell className="text-indigo-600" />
                <span>Notification Settings</span>
              </h2>
              <p className="text-gray-600 mb-6">Manage how you receive notifications</p>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium text-gray-800">Email Notifications</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive important updates via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={emailNotifications}
                      onChange={() => setEmailNotifications(!emailNotifications)}
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium text-gray-800">Push Notifications</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Get notified on your device about new messages
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={pushNotifications}
                      onChange={() => setPushNotifications(!pushNotifications)}
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium text-gray-800">Sound Alerts</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Play a sound when receiving notifications
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      defaultChecked
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="font-medium text-gray-800">Weekly Summary</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive a weekly summary of your activity
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      defaultChecked
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end pt-6 mt-4">
                <button
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 rounded-lg text-white flex items-center gap-2 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md"
                >
                  <FaSave />
                  <span>Save Notification Settings</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Language & Region */}
          {activeTab === 'language' && (
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <FaGlobe className="text-indigo-600" />
                <span>Language & Region</span>
              </h2>
              <p className="text-gray-600 mb-6">Set your preferred language and regional settings</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Format
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
                  >
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY/MM/DD</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Format
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
                  >
                    <option>12-hour (AM/PM)</option>
                    <option>24-hour</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Zone
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none bg-white"
                  >
                    <option>(UTC-05:00) Eastern Time (US & Canada)</option>
                    <option>(UTC-08:00) Pacific Time (US & Canada)</option>
                    <option>(UTC+00:00) London</option>
                    <option>(UTC+01:00) Berlin</option>
                    <option>(UTC+08:00) Singapore</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <button
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 rounded-lg text-white flex items-center gap-2 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md"
                >
                  <FaSave />
                  <span>Save Preferences</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* About Section */}
      <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <IoMdInformationCircle className="text-indigo-500" />
          <span>About Contact Manager</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-indigo-100">
            <h4 className="font-medium text-gray-800 mb-2">Version</h4>
            <p className="text-gray-600">2.4.1</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-indigo-100">
            <h4 className="font-medium text-gray-800 mb-2">Developer</h4>
            <p className="text-gray-600">Contact Manager Team</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-indigo-100">
            <h4 className="font-medium text-gray-800 mb-2">Release Date</h4>
            <p className="text-gray-600">August 11, 2025</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-indigo-100">
          <p className="text-gray-600">
            Contact Manager helps you organize your contacts efficiently. 
            We value your privacy and security, and we're constantly working to improve your experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;