
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Portfolio Content Hooks
export const usePortfolioContent = () => {
  return useQuery({
    queryKey: ['portfolio-content'],
    queryFn: async () => {
      console.log('Fetching portfolio content...');
      const { data, error } = await supabase
        .from('portfolio_content')
        .select('*');
      if (error) {
        console.error('Error fetching portfolio content:', error);
        throw error;
      }
      console.log('Portfolio content fetched:', data);
      return data;
    },
  });
};

export const useUpdatePortfolioContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ section, field, value }: { section: string; field: string; value: string }) => {
      console.log('Updating portfolio content:', { section, field, value });
      
      // First check if record exists
      const { data: existing } = await supabase
        .from('portfolio_content')
        .select('*')
        .eq('section', section)
        .eq('field', field)
        .single();

      let result;
      if (existing) {
        // Update existing record
        const { data, error } = await supabase
          .from('portfolio_content')
          .update({ value, updated_at: new Date().toISOString() })
          .eq('section', section)
          .eq('field', field)
          .select();
        result = { data, error };
      } else {
        // Insert new record
        const { data, error } = await supabase
          .from('portfolio_content')
          .insert({ section, field, value })
          .select();
        result = { data, error };
      }

      if (result.error) {
        console.error('Error updating portfolio content:', result.error);
        throw result.error;
      }
      console.log('Portfolio content updated:', result.data);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-content'] });
      toast.success('Content updated successfully!');
    },
    onError: (error) => {
      console.error('Update failed:', error);
      toast.error('Failed to update content');
    },
  });
};

// Skills Hooks
export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category');
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (skill: { name: string; category: string; level: number }) => {
      const { data, error } = await supabase
        .from('skills')
        .insert(skill)
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill added successfully!');
    },
    onError: () => {
      toast.error('Failed to add skill');
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; name?: string; category?: string; level?: number }) => {
      const { data, error } = await supabase
        .from('skills')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update skill');
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      toast.success('Skill deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete skill');
    },
  });
};

// Projects Hooks
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (project: {
      title: string;
      description?: string;
      image_url?: string;
      technologies?: string[];
      live_url?: string;
      github_url?: string;
      featured?: boolean;
    }) => {
      const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project added successfully!');
    },
    onError: () => {
      toast.error('Failed to add project');
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
      const { data, error } = await supabase
        .from('projects')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update project');
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete project');
    },
  });
};

// Experience Hooks
export const useExperience = () => {
  return useQuery({
    queryKey: ['experience'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (experience: {
      company: string;
      position: string;
      duration: string;
      location?: string;
      description?: string[];
    }) => {
      const { data, error } = await supabase
        .from('experience')
        .insert(experience)
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] });
      toast.success('Experience added successfully!');
    },
    onError: () => {
      toast.error('Failed to add experience');
    },
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
      const { data, error } = await supabase
        .from('experience')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] });
      toast.success('Experience updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update experience');
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('experience')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] });
      toast.success('Experience deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete experience');
    },
  });
};

// Contact Info Hooks
export const useContactInfo = () => {
  return useQuery({
    queryKey: ['contact-info'],
    queryFn: async () => {
      console.log('Fetching contact info...');
      const { data, error } = await supabase
        .from('contact_info')
        .select('*');
      if (error) {
        console.error('Error fetching contact info:', error);
        throw error;
      }
      console.log('Contact info fetched:', data);
      return data;
    },
  });
};

export const useUpdateContactInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ type, value, display_text, href }: { type: string; value: string; display_text?: string; href?: string }) => {
      console.log('Updating contact info:', { type, value, display_text, href });
      
      // First check if record exists
      const { data: existing } = await supabase
        .from('contact_info')
        .select('*')
        .eq('type', type)
        .single();

      let result;
      if (existing) {
        // Update existing record
        const { data, error } = await supabase
          .from('contact_info')
          .update({ 
            value, 
            display_text: display_text || value, 
            href: href || value 
          })
          .eq('type', type)
          .select();
        result = { data, error };
      } else {
        // Insert new record
        const { data, error } = await supabase
          .from('contact_info')
          .insert({ 
            type, 
            value, 
            display_text: display_text || value, 
            href: href || value 
          })
          .select();
        result = { data, error };
      }

      if (result.error) {
        console.error('Error updating contact info:', result.error);
        throw result.error;
      }
      console.log('Contact info updated:', result.data);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-info'] });
      toast.success('Contact info updated successfully!');
    },
    onError: (error) => {
      console.error('Contact update failed:', error);
      toast.error('Failed to update contact info');
    },
  });
};
