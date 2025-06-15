
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Portfolio Content Hooks
export const usePortfolioContent = () => {
  return useQuery({
    queryKey: ['portfolio-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_content')
        .select('*');
      if (error) throw error;
      return data;
    },
  });
};

export const useUpdatePortfolioContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ section, field, value }: { section: string; field: string; value: string }) => {
      const { data, error } = await supabase
        .from('portfolio_content')
        .upsert({ section, field, value, updated_at: new Date().toISOString() })
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-content'] });
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
    },
  });
};

// Contact Info Hooks
export const useContactInfo = () => {
  return useQuery({
    queryKey: ['contact-info'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*');
      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateContactInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ type, value, display_text, href }: { type: string; value: string; display_text?: string; href?: string }) => {
      const { data, error } = await supabase
        .from('contact_info')
        .upsert({ type, value, display_text, href })
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-info'] });
    },
  });
};
