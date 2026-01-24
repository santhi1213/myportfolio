import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../contexts/DataContext';
import { Save, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const ContactManager = () => {
  const { updateContactInfo } = useData();
  const [formData, setFormData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false); // Prevent multiple fetches

  const API_URL = 'http://localhost:5065/api/Contact';

  // Fetch contact info on mount - only once
  useEffect(() => {
    if (hasFetched.current) return; // Skip if already fetched
    
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch contact info');
        const data = await response.json();
        setFormData(data);
        updateContactInfo(data);
        hasFetched.current = true; // Mark as fetched
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContactInfo();
  }, []); // Empty dependency array - only run once

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: typeof formData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSaving(true);
    try {
      const method = formData.id ? 'PUT' : 'POST';
      const payload = method === 'PUT' ? formData : { ...formData };

      const response = await fetch(API_URL, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to save contact info');
      const savedData = await response.json();
      setFormData(savedData);
      updateContactInfo(savedData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const contactFields = [
    { name: 'email', label: 'Email Address', type: 'email', icon: Mail, placeholder: 'your.email@example.com' },
    { name: 'phone', label: 'Phone Number', type: 'tel', icon: Phone, placeholder: '+1 (555) 123-4567' },
    { name: 'location', label: 'Location', type: 'text', icon: MapPin, placeholder: 'San Francisco, CA' },
    { name: 'github', label: 'GitHub Profile', type: 'url', icon: Github, placeholder: 'https://github.com/username' },
    { name: 'linkedin', label: 'LinkedIn Profile', type: 'url', icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
    { name: 'twitter', label: 'Twitter Profile', type: 'url', icon: Twitter, placeholder: 'https://twitter.com/username' },
  ];

  if (isLoading) return <p className="text-white">Loading contact info...</p>;
  if (!formData) return <p className="text-white">No contact info available</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Contact Information</h1>
      </div>

      {/* Update Form */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Update Contact Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {contactFields.map(field => {
              const IconComponent = field.icon;
              return (
                <div key={field.name}>
                  <label className="block text-gray-400 mb-2 text-sm font-medium">{field.label}</label>
                  <div className="relative">
                    <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-colors duration-300"
                      placeholder={field.placeholder}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Contact Preview */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Contact Preview</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contactFields.map(field => {
            const IconComponent = field.icon;
            const value = formData[field.name];
            return (
              <div key={field.name} className="bg-gray-900 p-4 rounded-lg border border-gray-600 flex items-center space-x-3">
                <div className="bg-blue-500/10 p-2 rounded-lg">
                  <IconComponent className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 text-xs">{field.label}</p>
                  <p className="text-white text-sm truncate">{value || 'Not set'}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Social Links Preview */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Social Media Links</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'github', label: 'GitHub', icon: Github, color: 'hover:text-gray-300' },
            { name: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'hover:text-blue-400' },
            { name: 'twitter', label: 'Twitter', icon: Twitter, color: 'hover:text-sky-400' },
          ].map(social => {
            const IconComponent = social.icon;
            const url = formData[social.name];
            return (
              <a
                key={social.name}
                href={url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-3 p-4 bg-gray-900 rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-300 text-gray-400 ${social.color} ${!url ? 'pointer-events-none opacity-50' : ''}`}
              >
                <IconComponent className="w-6 h-6" />
                <div>
                  <p className="font-medium">{social.label}</p>
                  <p className="text-xs text-gray-500">{url ? 'Active' : 'Not configured'}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactManager;


