import React, { useState } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaTags, FaRandom } from 'react-icons/fa';
import { IoIosColorPalette } from 'react-icons/io';

const Tags = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('#4e54c8');
  const [editingTag, setEditingTag] = useState(null);

  // Sample tags data
  const [tags, setTags] = useState([
    { id: 1, name: 'Family', color: '#FF6B6B', contacts: 12 },
    { id: 2, name: 'Work', color: '#4ECDC4', contacts: 8 },
    { id: 3, name: 'Friends', color: '#FFD166', contacts: 24 },
    { id: 4, name: 'VIP', color: '#6A0572', contacts: 5 },
    { id: 5, name: 'Clients', color: '#1A936F', contacts: 17 },
    { id: 6, name: 'Suppliers', color: '#114B5F', contacts: 9 },
  ]);

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTag) {
      // Update existing tag
      setTags(tags.map(tag =>
        tag.id === editingTag.id
          ? { ...tag, name: tagName, color: tagColor }
          : tag
      ));
      setEditingTag(null);
    } else {
      // Add new tag
      const newTag = {
        id: tags.length + 1,
        name: tagName,
        color: tagColor,
        contacts: 0
      };
      setTags([...tags, newTag]);
    }
    setTagName('');
    setTagColor('#4e54c8');
    setShowForm(false);
  };

  const handleEdit = (tag) => {
    setEditingTag(tag);
    setTagName(tag.name);
    setTagColor(tag.color);
    setShowForm(true);
  };

  const handleDelete = (tagId) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  const generateRandomColor = () => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#FFD166', '#6A0572',
      '#1A936F', '#114B5F', '#E63946', '#A8DADC',
      '#457B9D', '#F4A261', '#2A9D8F', '#E76F51'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTagColor(randomColor);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg">
            <FaTags className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Tags</h1>
            <p className="text-gray-600 mt-2">
              {tags.length} tags • {tags.reduce((sum, tag) => sum + tag.contacts, 0)} tagged contacts
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingTag(null);
            setTagName('');
          }}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 px-5 py-2.5 rounded-lg text-white flex items-center gap-2 hover:from-purple-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
        >
          <FaPlus />
          <span>{showForm ? 'Cancel' : 'Add Tag'}</span>
        </button>
      </div>

      {/* Add/Edit Tag Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editingTag ? 'Edit Tag' : 'Create New Tag'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tag Name
              </label>
              <input
                type="text"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                placeholder="Enter tag name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tag Color
              </label>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={tagColor}
                    onChange={(e) => setTagColor(e.target.value)}
                    className="w-12 h-12 border-0 rounded-lg cursor-pointer"
                  />
                  <IoIosColorPalette className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none" />
                </div>

                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: tagColor }}
                >
                  <span className="text-white font-bold text-xs">
                    {tagName.substring(0, 2).toUpperCase() || 'TA'}
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

                <span className="text-sm font-medium text-gray-700">
                  {tagColor}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 px-5 py-2.5 rounded-lg text-white flex items-center gap-2 hover:from-purple-600 hover:to-indigo-700 transition-all shadow-md"
              >
                {editingTag ? 'Update Tag' : 'Create Tag'}
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
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
            />
          </div>

          <div className="bg-purple-50 rounded-lg p-4 flex items-center gap-3 border border-purple-100">
            <div className="bg-purple-500 w-10 h-10 rounded-full flex items-center justify-center">
              <FaTags className="text-white" />
            </div>
            <div>
              <div className="text-sm text-purple-700">Most used tag</div>
              <div className="font-semibold text-gray-800">Friends (24 contacts)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tags Grid */}
      {filteredTags.length === 0 ? (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-12 text-center border-2 border-purple-100 shadow-inner">
          <div className="bg-gradient-to-r from-purple-200 to-indigo-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTags className="text-purple-500 text-4xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {searchTerm ? 'No matching tags' : 'No tags created yet'}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            {searchTerm
              ? 'No tags match your search. Try different keywords.'
              : 'Get started by creating your first tag to organize your contacts.'}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            Create Your First Tag
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredTags.map((tag) => (
            <div
              key={tag.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md group"
            >
              <div
                className="h-3 w-full"
                style={{ backgroundColor: tag.color }}
              ></div>

              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: tag.color }}
                    >
                      {tag.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{tag.name}</h3>
                      <p className="text-gray-600">{tag.contacts} contacts</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(tag)}
                      className="text-gray-400 hover:text-purple-600 p-1.5 rounded-full hover:bg-purple-50 transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(tag.id)}
                      className="text-gray-400 hover:text-red-600 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: tag.color }}
                    ></div>
                    <span className="text-sm text-gray-600">Tag color</span>
                  </div>

                  <button className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center gap-1">
                    View Contacts
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tag Management Tips */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaTags className="text-purple-500" />
          <span>Effective Tag Management</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-purple-100">
            <h4 className="font-medium text-gray-800 mb-2">Organize Efficiently</h4>
            <p className="text-gray-600 text-sm">Create meaningful tags to categorize contacts based on relationships, projects, or priorities.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-purple-100">
            <h4 className="font-medium text-gray-800 mb-2">Color Coding</h4>
            <p className="text-gray-600 text-sm">Use distinct colors for quick visual identification of different contact categories.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-purple-100">
            <h4 className="font-medium text-gray-800 mb-2">Bulk Actions</h4>
            <p className="text-gray-600 text-sm">Apply tags to multiple contacts at once for efficient organization.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tags;