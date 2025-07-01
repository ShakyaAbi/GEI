import { useState, useEffect } from 'react';
import { projectsApi } from '../lib/projectsApi';
import type { Project, ProjectFormData } from '../types/project';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsApi.getProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (projectData: ProjectFormData): Promise<Project | null> => {
    try {
      setError(null);
      const newProject = await projectsApi.createProject(projectData);
      if (newProject) {
        setProjects(prev => [newProject, ...prev]);
      }
      return newProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
      return null;
    }
  };

  const updateProject = async (id: string, projectData: Partial<ProjectFormData>): Promise<Project | null> => {
    try {
      setError(null);
      const updatedProject = await projectsApi.updateProject(id, projectData);
      if (updatedProject) {
        setProjects(prev => prev.map(p => p.id === id ? updatedProject : p));
      }
      return updatedProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project');
      return null;
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      setError(null);
      const success = await projectsApi.deleteProject(id);
      if (success) {
        setProjects(prev => prev.filter(p => p.id !== id));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
      return false;
    }
  };

  const filterByStatus = (status: 'active' | 'completed' | 'on_hold' | 'cancelled' | 'all') => {
    if (status === 'all') return projects;
    return projects.filter(project => project.status === status);
  };

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    filterByStatus,
    refetch: fetchProjects
  };
}

export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await projectsApi.getProject(id);
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  return { project, loading, error };
}