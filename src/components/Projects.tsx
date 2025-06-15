
import React from 'react';
import { ExternalLink, Github, Code, Database, Smartphone } from 'lucide-react';
import { useProjects } from '@/hooks/usePortfolioData';

const Projects = () => {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto"></div>
        </div>
      </section>
    );
  }

  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('mobile') || title.toLowerCase().includes('app')) return Smartphone;
    if (title.toLowerCase().includes('database') || title.toLowerCase().includes('management')) return Database;
    return Code;
  };

  return (
    <section id="projects" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my recent work and technical achievements
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {projects?.map((project, index) => {
            const IconComponent = getIcon(project.title);
            return (
              <div
                key={index}
                className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image_url || '/placeholder.svg'}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <IconComponent className="absolute top-4 right-4 text-cyan-400 w-6 h-6" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={project.live_url || '#'}
                      className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.github_url || '#'}
                      className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <Github size={16} />
                      <span>Code</span>
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
