import React, { useState, useEffect } from "react";
import { ExternalLink, Github, Eye, Filter } from "lucide-react";

type Project = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  live?: string;
  category: string;
  featured?: boolean;
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { value: "all", label: "All Projects" },
    { value: "fullstack", label: "Full Stack" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
  ];

  // ✅ Fetch data from API
  useEffect(() => {
    fetch("http://localhost:5065/api/project")
      .then((res) => res.json())
      .then((data) => {
        // Convert Base64 images to data URLs
        const formatted: Project[] = data.map((project: any) => ({
          ...project,
          image: `data:image/jpeg;base64,${project.image}`,
        }));
        setProjects(formatted);
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // ✅ Sort fullstack first
  const sortedProjects = [...projects].sort((a: Project, b: Project) => {
    if (a.category === "fullstack" && b.category !== "fullstack") return -1;
    if (b.category === "fullstack" && a.category !== "fullstack") return 1;
    return 0;
  });

  const filteredProjects =
    filter === "all"
      ? sortedProjects
      : sortedProjects.filter((project: Project) => project.category === filter);

  const featuredProjects = sortedProjects.filter((p: Project) => p.featured);

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My <span className="text-blue-400">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A showcase of my recent work and personal projects built with modern technologies.
            </p>
          </div>

          {/* Featured */}
          {featuredProjects.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Eye className="w-6 h-6 mr-2 text-blue-400" />
                Featured Projects
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Filter className="w-5 h-5 text-gray-400" />
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  filter === cat.value
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* All Projects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

type ProjectCardProps = {
  project: Project;
  index: number;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => (
  <div
    className="bg-gray-900 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 group overflow-hidden"
    style={{
      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
    }}
  >
    <div className="relative overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
      {project.featured && (
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          Featured
        </div>
      )}
    </div>
    <div className="p-6">
      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
        {project.title}
      </h4>
      <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
      {project.technologies && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, i: React.Key | null | undefined) => (
            <span
              key={i}
              className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-xs border border-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center space-x-4">
        {project.github && (
          <a
            href={project.github}
            className="flex items-center text-gray-400 hover:text-white transition-colors duration-300"
          >
            <Github className="w-4 h-4 mr-1" />
            Code
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Live Demo
          </a>
        )}
      </div>
    </div>
  </div>
);

export default Projects;
