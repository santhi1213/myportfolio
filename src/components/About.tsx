import { useEffect, useState } from "react";
import { Code, Database, Server, Smartphone } from "lucide-react";

const API_URL = "https://portfolio-node-backend-eskk.onrender.com/api/About";

interface AboutInfo {
  id?: string;
  name: string;
  title: string;
  bio: string;
  experience: string;
  projectsCompleted: string;
  availability: string;
}

const About = () => {
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch about info from API on component mount
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch About info");
        const data = await response.json();
        setAboutInfo(data);
      } catch (error) {
        console.error("Error fetching About data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const features = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "Expert in React, TypeScript, and modern CSS frameworks",
    },
    {
      icon: Server,
      title: "Backend Development",
      description: "Proficient in Node.js, Express.js, and RESTful APIs",
    },
    {
      icon: Database,
      title: "Database Management",
      description: "Experienced with MongoDB, PostgreSQL",
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "React Native and responsive web applications",
    },
  ];

  if (loading) {
    return (
      <section id="about" className="py-20 bg-gray-800 text-center text-gray-400">
        <p>Loading About Information...</p>
      </section>
    );
  }

  if (!aboutInfo) {
    return (
      <section id="about" className="py-20 bg-gray-800 text-center text-gray-400">
        <p>Failed to load About information.</p>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About <span className="text-blue-400">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A passionate MERN stack developer with extensive experience in
              building scalable web applications and solving complex problems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* ✅ About Info Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                My Journey
              </h3>
              <p className="text-gray-400 leading-relaxed">{aboutInfo.bio}</p>
              <div className="flex flex-wrap gap-4 mt-6">
                <span className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm border border-blue-500/20">
                  {aboutInfo.experience}
                </span>
                <span className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm border border-green-500/20">
                  {aboutInfo.projectsCompleted}
                </span>
                <span className="bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm border border-purple-500/20">
                  {aboutInfo.availability}
                </span>
              </div>
            </div>

            {/* ✅ Skill Bars */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-gray-700">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Frontend</span>
                    <span className="text-blue-400 font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Backend</span>
                    <span className="text-green-400 font-semibold">90%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Database</span>
                    <span className="text-purple-400 font-semibold">88%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full"
                      style={{ width: "88%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">DevOps</span>
                    <span className="text-yellow-400 font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Features Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
