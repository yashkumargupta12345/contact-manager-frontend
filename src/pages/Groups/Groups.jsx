import React, { useState } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaUserFriends, FaUsers, FaRandom } from 'react-icons/fa';
import { IoMdColorPalette } from 'react-icons/io';

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupColor, setGroupColor] = useState('#4e54c8');
  const [editingGroup, setEditingGroup] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  
  // Sample data
  const allContacts = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com' },
    { id: 6, name: 'Sarah Brown', email: 'sarah@example.com' },
  ];
  
  const [groups, setGroups] = useState([
    { 
      id: 1, 
      name: 'Marketing Team', 
      color: '#FF6B6B', 
      members: [1, 2, 3], 
      description: 'Team responsible for all marketing campaigns'
    },
    { 
      id: 2, 
      name: 'Development', 
      color: '#4ECDC4', 
      members: [4, 5], 
      description: 'Software development team'
    },
    { 
      id: 3, 
      name: 'Leadership', 
      color: '#FFD166', 
      members: [1, 4, 6], 
      description: 'Company leadership group'
    },
    { 
      id: 4, 
      name: 'Client Support', 
      color: '#6A0572', 
      members: [2, 3, 5], 
      description: 'Client support representatives'
    },
  ]);
  
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getContactNames = (memberIds) => {
    return memberIds.map(id => {
      const contact = allContacts.find(c => c.id === id);
      return contact ? contact.name : 'Unknown';
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingGroup) {
      // Update existing group
      setGroups(groups.map(group => 
        group.id === editingGroup.id 
          ? { 
              ...group, 
              name: groupName, 
              color: groupColor,
              members: selectedContacts,
              description: e.target.description.value 
            } 
          : group
      ));
      setEditingGroup(null);
    } else {
      // Add new group
      const newGroup = {
        id: groups.length + 1,
        name: groupName,
        color: groupColor,
        members: selectedContacts,
        description: e.target.description.value
      };
      setGroups([...groups, newGroup]);
    }
    
    setGroupName('');
    setGroupColor('#4e54c8');
    setSelectedContacts([]);
    setShowForm(false);
  };
  
  const handleEdit = (group) => {
    setEditingGroup(group);
    setGroupName(group.name);
    setGroupColor(group.color);
    setSelectedContacts(group.members);
    setShowForm(true);
  };
  
  const handleDelete = (groupId) => {
    setGroups(groups.filter(group => group.id !== groupId));
  };
  
  const generateRandomColor = () => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#FFD166', '#6A0572', 
      '#1A936F', '#114B5F', '#E63946', '#A8DADC',
      '#457B9D', '#F4A261', '#2A9D8F', '#E76F51'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setGroupColor(randomColor);
  };
  
  const toggleContactSelection = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-3 rounded-xl shadow-lg">
            <FaUserFriends className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Groups</h1>
            <p className="text-gray-600 mt-2">
              {groups.length} groups • {groups.reduce((sum, group) => sum + group.members.length, 0)} grouped contacts
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => {
            setShowForm(!showForm);
            setEditingGroup(null);
            setGroupName('');
            setSelectedContacts([]);
          }}
          className="bg-gradient-to-r from-teal-500 to-cyan-600 px-5 py-2.5 rounded-lg text-white flex items-center gap-2 hover:from-teal-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
        >
          <FaPlus />
          <span>{showForm ? 'Cancel' : 'Create Group'}</span>
        </button>
      </div>
      
      {/* Add/Edit Group Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editingGroup ? 'Edit Group' : 'Create New Group'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                  placeholder="Enter group name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Group Color
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="color"
                      value={groupColor}
                      onChange={(e) => setGroupColor(e.target.value)}
                      className="w-12 h-12 border-0 rounded-lg cursor-pointer"
                    />
                    <IoMdColorPalette className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none" />
                  </div>
                  
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: groupColor }}
                  >
                    <span className="text-white font-bold text-xs">
                      {groupName.substring(0, 2).toUpperCase() || 'GP'}
                    </span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={generateRandomColor}
                    className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                  >
                    <FaRandom />
                    <span>Random</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={editingGroup?.description || ''}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all min-h-[100px]"
                placeholder="Enter group description"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Members
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {allContacts.map(contact => (
                  <div 
                    key={contact.id}
                    onClick={() => toggleContactSelection(contact.id)}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedContacts.includes(contact.id)
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    <div>
                      <div className="font-medium text-gray-800">{contact.name}</div>
                      <div className="text-xs text-gray-500">{contact.email}</div>
                    </div>
                    <div className={`ml-auto w-5 h-5 rounded-full border flex items-center justify-center ${
                      selectedContacts.includes(contact.id)
                        ? 'bg-teal-500 border-teal-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedContacts.includes(contact.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-teal-500 to-cyan-600 px-5 py-2.5 rounded-lg text-white flex items-center gap-2 hover:from-teal-600 hover:to-cyan-700 transition-all shadow-md"
              >
                {editingGroup ? 'Update Group' : 'Create Group'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Search and Stats */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400 mb-6" />
            </div>
            <input 
              type="search" 
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
            />
          </div>
          
          <div className="bg-teal-50 rounded-lg p-4 flex items-center gap-3 border border-teal-100">
            <div className="bg-teal-500 w-10 h-10 rounded-full flex items-center justify-center">
              <FaUsers className="text-white" />
            </div>
            <div>
              <div className="text-sm text-teal-700">Largest group</div>
              <div className="font-semibold text-gray-800">Marketing Team (3 members)</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Groups Grid */}
      {filteredGroups.length === 0 ? (
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-12 text-center border-2 border-teal-100 shadow-inner">
          <div className="bg-gradient-to-r from-teal-200 to-cyan-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaUserFriends className="text-teal-500 text-4xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {searchTerm ? 'No matching groups' : 'No groups created yet'}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            {searchTerm 
              ? 'No groups match your search. Try different keywords.'
              : 'Organize your contacts by creating groups for teams, projects, or relationships.'}
          </p>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            Create Your First Group
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredGroups.map((group) => {
            const memberNames = getContactNames(group.members);
            return (
              <div 
                key={group.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-lg group relative"
              >
                <div 
                  className="h-4 w-full"
                  style={{ backgroundColor: group.color }}
                ></div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md"
                        style={{ backgroundColor: group.color }}
                      >
                        {group.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{group.name}</h3>
                        <p className="text-gray-600">{group.members.length} members</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(group)}
                        className="text-gray-400 hover:text-teal-600 p-1.5 rounded-full hover:bg-teal-50 transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(group.id)}
                        className="text-gray-400 hover:text-red-600 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-600 text-sm">{group.description}</p>
                  </div>
                  
                  <div className="mt-5">
                    <div className="text-xs font-medium text-gray-500 mb-2">MEMBERS</div>
                    <div className="flex flex-wrap gap-2">
                      {memberNames.slice(0, 4).map((name, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                          <span className="text-sm text-gray-700">{name.split(' ')[0]}</span>
                        </div>
                      ))}
                      {memberNames.length > 4 && (
                        <div className="text-sm text-gray-500">
                          +{memberNames.length - 4} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 px-5 py-3 bg-gray-50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: group.color }}
                    ></div>
                    <span className="text-sm text-gray-600">Group color</span>
                  </div>
                  
                  <button className="text-sm font-medium text-teal-600 hover:text-teal-800 flex items-center gap-1">
                    View Group
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
      
      {/* Group Management Tips */}
      <div className="mt-12 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border-2 border-teal-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaUserFriends className="text-teal-500" />
          <span>Effective Group Management</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-teal-100">
            <h4 className="font-medium text-gray-800 mb-2">Team Collaboration</h4>
            <p className="text-gray-600 text-sm">Create groups for departments, projects, or teams to streamline communication and collaboration.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-teal-100">
            <h4 className="font-medium text-gray-800 mb-2">Bulk Actions</h4>
            <p className="text-gray-600 text-sm">Send messages, emails, or updates to entire groups with a single action.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-teal-100">
            <h4 className="font-medium text-gray-800 mb-2">Access Control</h4>
            <p className="text-gray-600 text-sm">Manage permissions and visibility based on group membership for better security.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;