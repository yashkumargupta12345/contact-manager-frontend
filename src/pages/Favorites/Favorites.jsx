import React, { useState, useEffect } from 'react';
import { randomColors } from '../../assets/assets';
import { IoSearch, IoEllipsisVertical, IoStar, IoStarOutline, IoClose } from 'react-icons/io5';
import { FaHeart, FaSave, FaEdit, FaTrash } from 'react-icons/fa';
import { contactService } from '../../api/services/contactService';
import Contacts from '../Contacts/Contacts';

const Favorites = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Fetch favorites on component mount
  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      // Changed from getFavorites to getFavoriteContacts
      const response = await contactService.getFavoriteContacts();
      if (response.success) {
        setFavorites(response.data);
      } else {
        console.error('Failed to fetch favorites:', response);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      // You might want to show a toast notification here
    } finally {
      setLoading(false);
    }
  };

  const filteredFavorites = favorites.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Remove from favorites
  const handleRemoveFromFavorites = async (contact) => {
    try {
      const response = await contactService.removeFromFavorites(contact._id);
      if (response.success) {
        setFavorites(favorites.filter(fav => fav._id !== contact._id));
        setShowOptions(null);
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      alert('Failed to remove from favorites. Please try again.');
    }
  };

  // Edit Contact Functions
  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
    setShowEditForm(true);
    setShowOptions(null);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
    setEditingContact(null);
    setFormData({
      name: '',
      email: '',
      phone: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    
    try {
      const response = await contactService.updateContact(editingContact._id, {
        ...formData,
        isFavorite: true // Ensure it stays as favorite
      });
      
      if (response.success) {
        setFavorites(favorites.map(fav => 
          fav._id === editingContact._id ? response.data : fav
        ));
        closeEditForm();
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Failed to update contact. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  // Delete Contact
  const handleDelete = async (contact) => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      try {
        const response = await contactService.deleteContact(contact._id);
        if (response.success) {
          setFavorites(favorites.filter(fav => fav._id !== contact._id));
          setShowOptions(null);
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Failed to delete contact. Please try again.');
      }
    }
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
          <p className="text-3xl font-bold text-amber-700 mt-1">{favorites.length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100 shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium">Recently Added</h3>
          <p className="text-3xl font-bold text-amber-700 mt-1">
            {favorites.filter(fav => {
              const today = new Date();
              const contactDate = new Date(fav.updatedAt || fav.createdAt);
              const diffTime = Math.abs(today - contactDate);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays <= 7;
            }).length}
          </p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100 shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium">Most Recent</h3>
          <p className="text-3xl font-bold text-amber-700 mt-1">
            {favorites.length > 0 ? favorites[0]?.name?.split(' ')[0] || 'N/A' : 'None'}
          </p>
        </div>
      </div>

      {/* Edit Contact Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-6 text-center rounded-t-2xl">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-white">Edit Favorite Contact</h2>
                <button
                  onClick={closeEditForm}
                  className="text-white hover:text-gray-200 p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <IoClose className="text-xl" />
                </button>
              </div>
              <p className="text-orange-100">Update your favorite contact's information</p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeEditForm}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 px-4 py-3 rounded-lg text-white flex items-center justify-center gap-2 hover:from-orange-600 hover:to-amber-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FaSave />
                        <span>Update Contact</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Favorites Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-12 text-center border-2 border-orange-100 shadow-inner">
          <div className="bg-gradient-to-r from-orange-200 to-amber-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHeart className="text-orange-500 text-4xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {favorites.length === 0 ? 'No favorites yet' : 'No favorites found'}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            {favorites.length === 0 
              ? 'Your favorite contacts will appear here. Start adding stars to your important contacts!'
              : "We couldn't find any favorites matching your search. Try different keywords."
            }
          </p>
          {favorites.length === 0 && (

            <button 
              onClick={() => window.location.href = <Contacts/>}
              className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              Browse Contacts
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFavorites.map((contact) => (
            <div 
              key={contact._id} 
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
                            {tag.name || tag}
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </button>
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
                  onClick={() => setShowOptions(showOptions === contact._id ? null : contact._id)}
                >
                  <IoEllipsisVertical className="text-xl" />
                  
                  {showOptions === contact._id && (
                    <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-xl shadow-xl py-2 z-10 border border-orange-100">
                      <button 
                        onClick={() => handleEdit(contact)}
                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-orange-50"
                      >
                        <FaEdit className="text-orange-500" />
                        <span>Edit Contact</span>
                      </button>
                      <button 
                        onClick={() => handleRemoveFromFavorites(contact)}
                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 hover:bg-orange-50"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span>Remove Favorite</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(contact)}
                        className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                      >
                        <FaTrash />
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