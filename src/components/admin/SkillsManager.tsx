import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface Skill {
  id?: string;
  name: string;
  level: number;
  category: string;
}

const SkillsManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Skill>({
    name: '',
    level: 50,
    category: 'frontend'
  });

  const API_URL = 'https://portfolio-node-backend-eskk.onrender.com/api/Skill';

  const categories = [
    { value: 'frontend', label: 'Frontend', color: 'from-blue-400 to-blue-600' },
    { value: 'backend', label: 'Backend', color: 'from-green-400 to-green-600' },
    { value: 'tools', label: 'Tools & Others', color: 'from-purple-400 to-purple-600' }
  ];

  // 🔹 Fetch all skills on load
  const fetchSkills = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      console.error('Error fetching skills:', err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // 🔹 Add new skill
  const addSkill = async (skill: Skill) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill)
      });
      if (!res.ok) throw new Error('Failed to add skill');
      await fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Update existing skill
  const updateSkill = async (id: string, updatedSkill: Skill) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updatedSkill, id })
      });
      if (!res.ok) throw new Error('Failed to update skill');
      await fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete skill
  const deleteSkill = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete skill');
      await fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateSkill(editingId, formData);
      setEditingId(null);
    } else {
      addSkill(formData);
      setIsAdding(false);
    }
    setFormData({ name: '', level: 50, category: 'frontend' });
  };

  // 🔹 Edit skill
  const handleEdit = (skill: Skill) => {
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category
    });
    setEditingId(skill._id || null);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: '', level: 50, category: 'frontend' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      deleteSkill(id);
    }
  };

  const skillsByCategory = categories.map(category => ({
    ...category,
    skills: skills.filter(skill => skill.category.toLowerCase() === category.value)
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Skills Management</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            {editingId ? 'Edit Skill' : 'Add New Skill'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 mb-2 text-sm font-medium">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
                  placeholder="e.g., React.js"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm font-medium">
                  Proficiency Level ({formData.level}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm font-medium">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{editingId ? 'Update' : 'Add'} Skill</span>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skill Display */}
      <div className="grid lg:grid-cols-3 gap-6">
        {skillsByCategory.map((category) => (
          <div key={category.value} className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className={`text-xl font-bold mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
              {category.label} ({category.skills.length})
            </h2>
            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div
                  key={skill._id}
                  className="bg-gray-900 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium">{skill.name}</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id!)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Proficiency</span>
                    <span className={`text-sm font-semibold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-300`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              {category.skills.length === 0 && (
                <p className="text-gray-500 text-center py-4">No skills in this category yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsManager;
