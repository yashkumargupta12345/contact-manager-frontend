import React, { useState } from 'react';
import { dummyContacts, randomColors } from '../../assets/assets';
import { IoSearch, IoAdd, IoFunnel, IoEllipsisVertical } from "react-icons/io5";
import { FaStar, FaRegStar, FaUserAlt } from "react-icons/fa";

const Contacts = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(null);

  const filteredContacts = dummyContacts().filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
          <button className="bg-blue-600 px-5 py-2.5 rounded-lg text-white flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
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

      {/* Contact Cards Grid */}
      {filteredContacts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaUserAlt className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No contacts found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            We couldn't find any contacts matching your search. Try different keywords or add a new contact.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
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
                    <button className="text-gray-400 hover:text-yellow-500 p-1">
                      {contact.favorite ? (
                        <FaStar className="text-yellow-400" />
                      ) : (
                        <FaRegStar className="hover:text-yellow-500" />
                      )}
                    </button>

                    <button
                      className="text-gray-400 hover:text-gray-600 p-1 relative"
                      onClick={() => setShowOptions(showOptions === contact.id ? null : contact.id)}
                    >
                      <IoEllipsisVertical />

                      {showOptions === contact.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
                          <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50">
                            Edit
                          </button>
                          <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
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
                        {tag}
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