import React, { useState, useEffect } from 'react';
import { Code, FolderOpen, User, TrendingUp, Star, RefreshCw, AlertCircle } from 'lucide-react';

const API_URL = 'http://localhost:5065/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    skills: { count: 0, change: '+0 this month' },
    projects: { count: 0, change: '+0 this week' },
    featuredProjects: { count: 0, change: 'Updated recently' },
    aboutInfo: { name: '', title: '', experience: '', projectsCompleted: '' }
  });
  
  const [recentProjects, setRecentProjects] = useState([]);
  const [topSkills, setTopSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data for dashboard
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get auth token
      const token = sessionStorage.getItem('portfolio_admin_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Fetch all data in parallel
      const [skillsRes, projectsRes, aboutRes] = await Promise.all([
        fetch(`${API_URL}/skill`, { headers }),
        fetch(`${API_URL}/project`, { headers }),
        fetch(`${API_URL}/about`, { headers })
      ]);

      // Check for errors
      if (!skillsRes.ok || !projectsRes.ok || !aboutRes.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      // Parse responses
      const skills = await skillsRes.json();
      const projects = await projectsRes.json();
      const aboutInfo = await aboutRes.json();

      // Calculate stats
      const totalSkills = skills.length;
      const totalProjects = projects.length;
      const featuredProjects = projects.filter(p => p.featured).length;

      // Get recent projects (last 3 created)
      const sortedProjects = [...projects].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      ).slice(0, 3);

      // Get top skills (highest level, max 5)
      const sortedSkills = [...skills].sort((a, b) => b.level - a.level).slice(0, 5);

      // Update state
      setStats({
        skills: {
          count: totalSkills,
          change: totalSkills > 0 ? `+${Math.floor(totalSkills * 0.1)} this month` : 'No skills yet'
        },
        projects: {
          count: totalProjects,
          change: totalProjects > 0 ? `+${Math.floor(totalProjects * 0.05)} this week` : 'No projects yet'
        },
        featuredProjects: {
          count: featuredProjects,
          change: featuredProjects > 0 ? 'Updated recently' : 'No featured projects'
        },
        aboutInfo: aboutInfo
      });

      setRecentProjects(sortedProjects);
      setTopSkills(sortedSkills);

    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      setError(error.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const dashboardStats = [
    {
      title: 'Total Skills',
      value: stats.skills.count,
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      change: stats.skills.change
    },
    {
      title: 'Total Projects',
      value: stats.projects.count,
      icon: FolderOpen,
      color: 'from-green-500 to-green-600',
      change: stats.projects.change
    },
    {
      title: 'Featured Projects',
      value: stats.featuredProjects.count,
      icon: Star,
      color: 'from-purple-500 to-purple-600',
      change: stats.featuredProjects.change
    },
    {
      title: 'Profile Views',
      value: '1,234',
      icon: TrendingUp,
      color: 'from-yellow-500 to-yellow-600',
      change: '+15% this week'
    }
  ];

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <div className="text-gray-400 text-sm">
            Loading...
          </div>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <button
            onClick={fetchDashboardData}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </button>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <div>
              <h3 className="text-lg font-semibold text-red-400">Error Loading Dashboard</h3>
              <p className="text-gray-400">{error}</p>
              <button
                onClick={fetchDashboardData}
                className="mt-4 bg-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="text-gray-400 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </div>
          <button
            onClick={fetchDashboardData}
            className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 hover:text-white transition-colors duration-300 flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-green-400 text-xs">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <FolderOpen className="w-5 h-5 mr-2 text-blue-400" />
              Recent Projects
            </h2>
            <span className="text-gray-400 text-sm">
              {recentProjects.length} of {stats.projects.count}
            </span>
          </div>
          <div className="space-y-4">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <div
                  key={project._id || project.id}
                  className="flex items-center space-x-4 p-3 bg-gray-900 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors duration-300"
                >
                  <div className="flex-shrink-0">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-12 h-12 rounded-lg object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/48x48/374151/6B7280?text=No+Image';
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center">
                        <FolderOpen className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{project.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-gray-400 text-sm capitalize">{project.category}</span>
                      <span className="text-gray-500 text-sm">•</span>
                      <span className="text-gray-500 text-sm">
                        {project.createdAt ? formatDate(project.createdAt) : 'N/A'}
                      </span>
                    </div>
                  </div>
                  {project.featured && (
                    <Star className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0" />
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FolderOpen className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">No projects yet</p>
                <p className="text-gray-500 text-sm mt-1">Add your first project to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Skills */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Code className="w-5 h-5 mr-2 text-green-400" />
              Top Skills
            </h2>
            <span className="text-gray-400 text-sm">
              {topSkills.length} of {stats.skills.count}
            </span>
          </div>
          <div className="space-y-4">
            {topSkills.length > 0 ? (
              topSkills.map((skill) => (
                <div key={skill._id || skill.id} className="space-y-2 group">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium group-hover:text-green-400 transition-colors duration-300">
                      {skill.name}
                    </span>
                    <span className="text-blue-400 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 capitalize">{skill.category}</span>
                    <span className="text-gray-500">
                      {skill.level >= 90 ? 'Expert' : 
                       skill.level >= 75 ? 'Advanced' : 
                       skill.level >= 60 ? 'Intermediate' : 'Beginner'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Code className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">No skills yet</p>
                <p className="text-gray-500 text-sm mt-1">Add skills to showcase your expertise</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center">
            <User className="w-5 h-5 mr-2 text-purple-400" />
            Profile Summary
          </h2>
          <span className="text-gray-400 text-sm">
            {stats.aboutInfo.updatedAt ? `Updated: ${formatDate(stats.aboutInfo.updatedAt)}` : ''}
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-xl mb-4">
              <User className="w-12 h-12 text-blue-400 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 truncate">
              {stats.aboutInfo.name || 'Your Name'}
            </h3>
            <p className="text-blue-400 font-medium truncate">
              {stats.aboutInfo.title || 'Your Title'}
            </p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 p-6 rounded-xl mb-4">
              <TrendingUp className="w-12 h-12 text-green-400 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">
              {stats.aboutInfo.experience || '0 Years'}
            </h3>
            <p className="text-gray-400">Experience</p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl mb-4">
              <FolderOpen className="w-12 h-12 text-purple-400 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-purple-400 mb-2">
              {stats.aboutInfo.projectsCompleted || '0 Projects'}
            </h3>
            <p className="text-gray-400">Projects Completed</p>
          </div>
        </div>
        {stats.aboutInfo.bio && (
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="text-gray-400 text-sm font-medium mb-2">Bio Preview</h4>
            <p className="text-gray-300 text-sm line-clamp-3">
              {stats.aboutInfo.bio}
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {/* <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 p-4 rounded-lg border border-blue-500/30 transition-colors duration-300 text-left">
            <div className="flex items-center space-x-2">
              <FolderOpen className="w-5 h-5" />
              <span>Add New Project</span>
            </div>
          </button>
          <button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 p-4 rounded-lg border border-green-500/30 transition-colors duration-300 text-left">
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>Add New Skill</span>
            </div>
          </button>
          <button className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 p-4 rounded-lg border border-purple-500/30 transition-colors duration-300 text-left">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Update Profile</span>
            </div>
          </button>
          <button className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 p-4 rounded-lg border border-yellow-500/30 transition-colors duration-300 text-left">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>View Analytics</span>
            </div>
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default AdminDashboard;