import React, { useState, useEffect } from 'react';
import { randomColors } from '../../assets/assets';
import { IoSearch, IoAdd, IoFunnel, IoEllipsisVertical, IoClose } from "react-icons/io5";
import { FaStar, FaRegStar, FaUserAlt, FaSave, FaTrash } from "react-icons/fa";
import { contactService } from '../../api/services/contactService';

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    isFavorite: false
  });

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await contactService.getAllContacts();
      if (response.success) {
        setContacts(response.data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      // Handle error (show toast notification)
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Add Contact Functions
  const handleAddContact = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      isFavorite: false
    });
    setShowAddForm(true);
  };

  const closeAddForm = () => {
    setShowAddForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      isFavorite: false
    });
  };

  // Edit Contact Functions
  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      isFavorite: contact.isFavorite || false
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
      phone: '',
      isFavorite: false
    });
  };

  // Delete Contact Function
  const handleDelete = async (contact) => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      try {
        const response = await contactService.deleteContact(contact._id);
        if (response.success) {
          setContacts(contacts.filter(c => c._id !== contact._id));
          setShowOptions(null);
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Failed to delete contact. Please try again.');
      }
    }
  };

  // Toggle Favorite
  const handleToggleFavorite = async (contact) => {
    try {
      if (contact.isFavorite) {
        await contactService.removeFromFavorites(contact._id);
      } else {
        await contactService.addToFavorites(contact._id);
      }
      // Update local state
      setContacts(contacts.map(c => 
        c._id === contact._id 
          ? { ...c, isFavorite: !c.isFavorite }
          : c
      ));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    
    try {
      let response;
      if (editingContact) {
        // Update existing contact
        response = await contactService.updateContact(editingContact._id, formData);
        if (response.success) {
          setContacts(contacts.map(c => 
            c._id === editingContact._id ? response.data : c
          ));
          closeEditForm();
        }
      } else {
        // Create new contact
        response = await contactService.createContact(formData);
        if (response.success) {
          setContacts([...contacts, response.data]);
          closeAddForm();
        }
      }
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Failed to save contact. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Contacts</h1>
          <p className="text-gray-600 mt-2">
            {filteredContacts.length} {filteredContacts.length === 1 ? 'contact' : 'contacts'}
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-50 transition-colors">
            <IoFunnel className="text-gray-500" />
            <span>Filter</span>
          </button>
          <button 
            onClick={handleAddContact}
            className="bg-blue-600 px-5 py-2.5 rounded-lg text-white flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            <IoAdd className="text-xl" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center rounded-t-2xl">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-white">Add New Contact</h2>
                <button
                  onClick={closeAddForm}
                  className="text-white hover:text-gray-200 p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <IoClose className="text-xl" />
                </button>
              </div>
              <p className="text-blue-100">Create a new contact entry</p>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="addIsFavorite"
                    name="isFavorite"
                    checked={formData.isFavorite}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="addIsFavorite" className="text-sm font-medium text-gray-700">
                    Mark as favorite
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeAddForm}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 rounded-lg text-white flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FaSave />
                        <span>Add Contact</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Contact Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center rounded-t-2xl">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-white">Edit Contact</h2>
                <button
                  onClick={closeEditForm}
                  className="text-white hover:text-gray-200 p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <IoClose className="text-xl" />
                </button>
              </div>
              <p className="text-blue-100">Update contact information</p>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="editIsFavorite"
                    name="isFavorite"
                    checked={formData.isFavorite}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="editIsFavorite" className="text-sm font-medium text-gray-700">
                    Mark as favorite
                  </label>
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
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 rounded-lg text-white flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Contact Cards Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaUserAlt className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {contacts.length === 0 ? 'No contacts yet' : 'No contacts found'}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            {contacts.length === 0 
              ? 'Get started by adding your first contact.'
              : "We couldn't find any contacts matching your search. Try different keywords or add a new contact."
            }
          </p>
          {contacts.length === 0 && (
            <button 
              onClick={handleAddContact}
              className="bg-blue-600 px-6 py-3 rounded-lg text-white flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md mx-auto"
            >
              <IoAdd className="text-xl" />
              <span>Add Your First Contact</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md group"
            >
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: randomColors[Math.floor(Math.random() * randomColors.length)].hex }}
                  >
                    {getInitials(contact.name)}
                  </div>

                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleToggleFavorite(contact)}
                      className="text-gray-400 hover:text-yellow-500 p-1"
                    >
                      {contact.isFavorite ? (
                        <FaStar className="text-yellow-400" />
                      ) : (
                        <FaRegStar className="hover:text-yellow-500" />
                      )}
                    </button>

                    <button
                      className="text-gray-400 hover:text-gray-600 p-1 relative"
                      onClick={() => setShowOptions(showOptions === contact._id ? null : contact._id)}
                    >
                      <IoEllipsisVertical />

                      {showOptions === contact._id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
                          <button 
                            onClick={() => handleEdit(contact)}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(contact)}
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">{contact.name}</h3>
                  <p className="text-gray-600 mt-1 truncate">{contact.email}</p>
                  <p className="text-gray-700 font-medium mt-2">{contact.phone}</p>
                </div>

                {contact.tags && contact.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {contact.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
                      >
                        {tag.name || tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 px-5 py-3 bg-gray-50 flex justify-end">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;