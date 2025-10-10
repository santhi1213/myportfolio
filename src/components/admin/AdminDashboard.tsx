import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Code, FolderOpen, User, Mail, TrendingUp, Star } from 'lucide-react';

const AdminDashboard = () => {
  const { skills, projects, aboutInfo } = useData();

  const stats = [
    {
      title: 'Total Skills',
      value: skills.length,
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      change: '+2 this month'
    },
    {
      title: 'Total Projects',
      value: projects.length,
      icon: FolderOpen,
      color: 'from-green-500 to-green-600',
      change: '+1 this week'
    },
    {
      title: 'Featured Projects',
      value: projects.filter(p => p.featured).length,
      icon: Star,
      color: 'from-purple-500 to-purple-600',
      change: 'Updated recently'
    },
    {
      title: 'Profile Views',
      value: '1,234',
      icon: TrendingUp,
      color: 'from-yellow-500 to-yellow-600',
      change: '+15% this week'
    }
  ];

  const recentProjects = projects.slice(0, 3);
  const topSkills = skills.sort((a, b) => b.level - a.level).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="text-gray-400 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <FolderOpen className="w-5 h-5 mr-2 text-blue-400" />
            Recent Projects
          </h2>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center space-x-4 p-3 bg-gray-900 rounded-lg border border-gray-600"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-white font-medium">{project.title}</h3>
                  <p className="text-gray-400 text-sm">{project.category}</p>
                </div>
                {project.featured && (
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Top Skills */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Code className="w-5 h-5 mr-2 text-green-400" />
            Top Skills
          </h2>
          <div className="space-y-4">
            {topSkills.map((skill) => (
              <div key={skill.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-blue-400 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-purple-400" />
          Profile Summary
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">{aboutInfo.name}</h3>
            <p className="text-blue-400 font-medium">{aboutInfo.title}</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-400 mb-2">{aboutInfo.experience}</h3>
            <p className="text-gray-400">Experience</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-purple-400 mb-2">{aboutInfo.projectsCompleted}</h3>
            <p className="text-gray-400">Projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;