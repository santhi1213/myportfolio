import  { useEffect, useState } from 'react';

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://portfolio-node-backend-eskk.onrender.com/api/Skill';

  // 🔹 Fetch skills from backend API
  const fetchSkills = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch skills');
      const data = await res.json();
      setSkills(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const categories = [
    {
      value: 'frontend',
      title: 'Frontend', 
      color: 'from-blue-400 to-blue-600',
      skills: skills.filter(skill => skill.category.toLowerCase() === 'frontend')
    },
    {
      value: 'backend',
      title: 'Backend',
      color: 'from-green-400 to-green-600',
      skills: skills.filter(skill => skill.category.toLowerCase() === 'backend')
    },
    {
      value: 'tools',
      title: 'Tools & Others',
      color: 'from-purple-400 to-purple-600',
      skills: skills.filter(skill => skill.category.toLowerCase() === 'tools')
    }
  ];

  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Express', icon: '🚂' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Git', icon: '📚' },
  ];

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-gray-900 text-center text-gray-400">
        <p>Loading skills...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="py-20 bg-gray-900 text-center text-red-400">
        <p>⚠️ {error}</p>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My <span className="text-blue-400">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A comprehensive overview of my technical expertise and proficiency levels
            </p>
          </div>

          {/* Technologies Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Technologies I Work With
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-110 group text-center"
                >
                  <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-white transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Categories */}
          <div className="grid lg:grid-cols-3 gap-8">
            {categories.map((category, categoryIndex) => (
              <div 
                key={categoryIndex}
                className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <h3 className={`text-2xl font-bold mb-8 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.skills.length > 0 ? (
                    category.skills.map((skill, skillIndex) => (
                      <div key={skill.id} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
                            {skill.name}
                          </span>
                          <span className={`text-sm font-semibold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out transform origin-left group-hover:scale-105`}
                            style={{ 
                              width: `${skill.level}%`,
                              animation: `slideIn 1.5s ease-out ${skillIndex * 0.1}s both`
                            }}
                          ></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm text-center">No skills yet.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
