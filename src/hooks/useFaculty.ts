import { useState, useEffect, useCallback } from 'react';
import { facultyApi } from '../lib/facultyApi';
import type { FacultyMember } from '../types/faculty';

interface UseFacultyResult {
  facultyMembers: FacultyMember[];
  loading: boolean;
  error: string | null;
  refreshFaculty: () => void;
  addFaculty: (member: Omit<FacultyMember, 'id'>) => Promise<void>;
  updateFaculty: (id: string, updates: Partial<FacultyMember>) => Promise<void>;
  deleteFaculty: (id: string) => Promise<void>;
}

export const useFaculty = (): UseFacultyResult => {
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFaculty = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await facultyApi.getAllFaculty();
      setFacultyMembers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch faculty members');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFaculty();
  }, [fetchFaculty]);

  const addFaculty = async (member: Omit<FacultyMember, 'id'>) => {
    try {
      const newMember = await facultyApi.createFaculty(member);
      setFacultyMembers((prev) => [...prev, newMember]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add faculty member');
      throw err;
    }
  };

  const updateFaculty = async (id: string, updates: Partial<FacultyMember>) => {
    try {
      const updatedMember = await facultyApi.updateFaculty(id, updates);
      setFacultyMembers((prev) =>
        prev.map((member) => (member.id === id ? updatedMember : member))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update faculty member');
      throw err;
    }
  };

  const deleteFaculty = async (id: string) => {
    try {
      await facultyApi.deleteFaculty(id);
      setFacultyMembers((prev) => prev.filter((member) => member.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete faculty member');
      throw err;
    }
  };

  return {
    facultyMembers,
    loading,
    error,
    refreshFaculty: fetchFaculty,
    addFaculty,
    updateFaculty,
    deleteFaculty,
  };
}; 