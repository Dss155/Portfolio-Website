
import React from 'react';
import { ExternalLink, Github, Code, Database, Smartphone, Globe } from 'lucide-react';
import { useProjects } from '@/hooks/usePortfolioData';

const Projects = () => {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
        </div>
      </section>
    );
  }

  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('mobile') || title.toLowerCase().includes('app')) return Smartphone;
    if (title.toLowerCase().includes('database') || title.toLowerCase().includes('management')) return Database;
    if (title.toLowerCase().includes('web') || title.toLowerCase().includes('website')) return Globe;
    return Code;
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">Featured Projects</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work and technical achievements
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {projects?.map((project, index) => {
            const IconComponent = getIcon(project.title);
            return (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-orange-200 hover:border-orange-400 transition-all duration-300 transform hover:scale-105 group shadow-lg hover:shadow-2xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image_url || '/placeholder.svg'}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <IconComponent className="text-orange-600 w-6 h-6" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium border border-orange-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={project.live_url || '#'}
                      className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors duration-200 font-medium"
                    >
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.github_url || '#'}
                      className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
                    >
                      <Github size={18} />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
