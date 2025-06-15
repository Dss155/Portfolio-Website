import React from 'react';
import { ExternalLink, Github, Code, Database, Smartphone, Globe } from 'lucide-react';
import { useProjects } from '@/hooks/usePortfolioData';

const Projects = () => {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
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
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work and technical achievements
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {projects?.map((project, index) => {
            const IconComponent = getIcon(project.title);
            return (
              <div
                key={index}
                className="card-professional overflow-hidden group hover:border-blue-200"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image_url || '/placeholder.svg'}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center">
                    <IconComponent className="text-blue-600 w-5 h-5" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{project.title}</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4 text-sm">
                    <a
                      href={project.live_url || '#'}
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.github_url || '#'}
                      className="inline-flex items-center space-x-1 text-slate-600 hover:text-slate-800 transition-colors duration-200 font-medium"
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
