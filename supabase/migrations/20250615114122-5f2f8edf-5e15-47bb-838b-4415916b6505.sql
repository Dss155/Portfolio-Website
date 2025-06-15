
-- Create table for portfolio sections content
CREATE TABLE public.portfolio_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section VARCHAR(50) NOT NULL,
  field VARCHAR(50) NOT NULL,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(section, field)
);

-- Create table for skills
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for projects
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  image_url TEXT,
  technologies TEXT[], -- Array of technology names
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for experience
CREATE TABLE public.experience (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company VARCHAR(200) NOT NULL,
  position VARCHAR(200) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  description TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for contact info
CREATE TABLE public.contact_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(50) NOT NULL, -- email, phone, location
  value TEXT NOT NULL,
  display_text TEXT,
  href TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(type)
);

-- Insert default portfolio content
INSERT INTO public.portfolio_content (section, field, value) VALUES
('hero', 'name', 'Your Name'),
('hero', 'title', 'MCA Student & Full Stack Developer'),
('hero', 'description', 'Passionate about creating innovative solutions and building scalable applications with modern technologies.'),
('about', 'journey_title', 'My Journey'),
('about', 'journey_description', 'Currently pursuing Master of Computer Applications (MCA), I am passionate about full-stack development and emerging technologies. My academic journey has equipped me with strong problem-solving skills and a deep understanding of software engineering principles.'),
('about', 'what_i_do_title', 'What I Do'),
('footer', 'description', 'MCA Student passionate about creating innovative solutions and building scalable applications with modern technologies.');

-- Insert default skills
INSERT INTO public.skills (name, category, level) VALUES
('React', 'Frontend Development', 90),
('JavaScript', 'Frontend Development', 85),
('TypeScript', 'Frontend Development', 80),
('HTML/CSS', 'Frontend Development', 95),
('Tailwind CSS', 'Frontend Development', 88),
('Node.js', 'Backend Development', 85),
('Python', 'Backend Development', 80),
('Java', 'Backend Development', 75),
('PHP', 'Backend Development', 70),
('Express.js', 'Backend Development', 82),
('MongoDB', 'Database & Tools', 85),
('MySQL', 'Database & Tools', 88),
('Git/GitHub', 'Database & Tools', 90),
('Docker', 'Database & Tools', 75),
('AWS', 'Database & Tools', 70);

-- Insert default projects
INSERT INTO public.projects (title, description, technologies, live_url, github_url, featured) VALUES
('E-Commerce Platform', 'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.', ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'], '#', '#', true),
('Task Management System', 'Collaborative project management tool with real-time updates, team collaboration features, and advanced reporting capabilities.', ARRAY['Vue.js', 'Express.js', 'PostgreSQL', 'Socket.io'], '#', '#', true),
('Mobile Banking App', 'Secure mobile banking application with biometric authentication, transaction history, and budget tracking features.', ARRAY['React Native', 'Firebase', 'Redux', 'Expo'], '#', '#', true);

-- Insert default experience
INSERT INTO public.experience (company, position, duration, location, description) VALUES
('Tech Solutions Inc.', 'Full Stack Developer Intern', 'June 2024 - Present', 'Remote', ARRAY[
  'Developed and maintained web applications using React and Node.js',
  'Collaborated with senior developers on enterprise-level projects',
  'Implemented responsive designs and optimized application performance',
  'Participated in code reviews and agile development processes'
]),
('Digital Innovation Lab', 'Frontend Developer', 'Jan 2024 - May 2024', 'Hybrid', ARRAY[
  'Built interactive user interfaces using modern JavaScript frameworks',
  'Worked closely with UX/UI designers to implement pixel-perfect designs',
  'Optimized web applications for better performance and SEO',
  'Mentored junior developers and conducted technical workshops'
]),
('StartupHub', 'Web Development Trainee', 'Sep 2023 - Dec 2023', 'On-site', ARRAY[
  'Learned full-stack development through hands-on projects',
  'Developed multiple web applications from concept to deployment',
  'Gained experience with database design and API development',
  'Collaborated with cross-functional teams on product development'
]);

-- Insert default contact info
INSERT INTO public.contact_info (type, value, display_text, href) VALUES
('email', 'your.email@example.com', 'your.email@example.com', 'mailto:your.email@example.com'),
('phone', '+91 98765 43210', '+91 98765 43210', 'tel:+919876543210'),
('location', 'Your City, State', 'Your City, State', '#');

-- Enable Row Level Security (make everything public for now)
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for portfolio_content" ON public.portfolio_content FOR SELECT USING (true);
CREATE POLICY "Public read access for skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public read access for projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read access for experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Public read access for contact_info" ON public.contact_info FOR SELECT USING (true);

-- Create admin policies (for now allow all operations - we'll add auth later)
CREATE POLICY "Admin full access for portfolio_content" ON public.portfolio_content FOR ALL USING (true);
CREATE POLICY "Admin full access for skills" ON public.skills FOR ALL USING (true);
CREATE POLICY "Admin full access for projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Admin full access for experience" ON public.experience FOR ALL USING (true);
CREATE POLICY "Admin full access for contact_info" ON public.contact_info FOR ALL USING (true);
