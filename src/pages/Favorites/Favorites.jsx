import React, { useState } from 'react';
import { favoriteContacts, randomColors } from '../../assets/assets';
import { IoSearch, IoEllipsisVertical, IoStar, IoStarOutline } from 'react-icons/io5';
import { FaHeart } from 'react-icons/fa';

const Favorites = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(null);
  
  const filteredFavorites = favoriteContacts().filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with decorative elements */}
      <div className="relative mb-10">
        <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 blur-xl"></div>
        <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 opacity-20 blur-xl"></div>
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl shadow-lg">
              <FaHeart className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Favorite Contacts</h1>
              <p className="text-gray-600 mt-2">
                {filteredFavorites.length} {filteredFavorites.length === 1 ? 'special contact' : 'special contacts'}
              </p>
            </div>
          </div>
          
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="search" 
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100 shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium">Total Favorites</h3>
          <p className="text-3xl font-bold text-amber-700 mt-1">{favoriteContacts().length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100 shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium">Recently Added</h3>
          <p className="text-3xl font-bold text-amber-700 mt-1">3</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100 shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium">Most Contacted</h3>
          <p className="text-3xl font-bold text-amber-700 mt-1">Sarah Johnson</p>
        </div>
      </div>

      {/* Favorites Grid */}
      {filteredFavorites.length === 0 ? (
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-12 text-center border-2 border-orange-100 shadow-inner">
          <div className="bg-gradient-to-r from-orange-200 to-amber-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHeart className="text-orange-500 text-4xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No favorites yet</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Your favorite contacts will appear here. Start adding stars to your important contacts!
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
            Browse Contacts
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFavorites.map((contact) => (
            <div 
              key={contact.id} 
              className="bg-gradient-to-br from-white to-orange-50 rounded-2xl border-2 border-orange-100 shadow-sm overflow-hidden transition-all hover:shadow-lg group relative"
            >
              {/* Favorite badge */}
              <div className="absolute top-4 right-4 bg-amber-100 border border-amber-200 rounded-full px-3 py-1 flex items-center gap-1 text-amber-700 text-sm font-medium">
                <IoStar className="text-amber-500" />
                <span>Favorite</span>
              </div>
              
              {/* Contact card */}
              <div className="p-6 pt-10">
                <div className="flex items-start gap-5">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-md"
                    style={{ background: `linear-gradient(135deg, ${randomColors[Math.floor(Math.random() * randomColors.length)].hex} 0%, ${randomColors[Math.floor(Math.random() * randomColors.length)].hex} 100%)` }}
                  >
                    {getInitials(contact.name)}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{contact.name}</h3>
                    <p className="text-amber-600 font-medium flex items-center gap-1 mt-1">
                      <IoStar className="text-amber-500" />
                      <span>Top Contact</span>
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-start">
                    <span className="text-gray-500 min-w-[80px]">Email:</span>
                    <span className="text-gray-700 font-medium">{contact.email}</span>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-gray-500 min-w-[80px]">Phone:</span>
                    <span className="text-gray-700 font-medium">{contact.phone}</span>
                  </div>
                  
                  {contact.tags && contact.tags.length > 0 && (
                    <div className="flex items-start">
                      <span className="text-gray-500 min-w-[80px]">Tags:</span>
                      <div className="flex flex-wrap gap-2">
                        {contact.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="text-xs px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t border-orange-100 bg-orange-50 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center text-orange-500 hover:bg-orange-100 transition-colors">
                    <IoStarOutline className="text-xl" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center text-orange-500 hover:bg-orange-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </button>
                </div>
                
                <button 
                  className="text-gray-500 hover:text-gray-700 p-1 relative"
                  onClick={() => setShowOptions(showOptions === contact.id ? null : contact.id)}
                >
                  <IoEllipsisVertical className="text-xl" />
                  
                  {showOptions === contact.id && (
                    <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-xl shadow-xl py-2 z-10 border border-orange-100">
                      <button className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-orange-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        <span>Edit Contact</span>
                      </button>
                      <button className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-orange-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span>Remove Favorite</span>
                      </button>
                      <button className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Delete Contact</span>
                      </button>
                    </div>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Favorites Tips */}
      <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <IoStar className="text-amber-500" />
          <span>Making the Most of Favorites</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-amber-100">
            <h4 className="font-medium text-gray-800 mb-2">Quick Access</h4>
            <p className="text-gray-600 text-sm">Your favorites appear at the top of contacts lists for quick access.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-amber-100">
            <h4 className="font-medium text-gray-800 mb-2">Priority Notifications</h4>
            <p className="text-gray-600 text-sm">Get notified immediately when your favorites update their information.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-amber-100">
            <h4 className="font-medium text-gray-800 mb-2">Special Groups</h4>
            <p className="text-gray-600 text-sm">Create groups exclusively from your favorite contacts for targeted communication.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;