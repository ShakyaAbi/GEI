import api from './api';
import type { ApiResponse } from '../types';
import type { FacultyMember } from '../types/faculty';

export const facultyApi = {
  async getAllFaculty(): Promise<FacultyMember[]> {
    try {
      const response = await api.get<ApiResponse<FacultyMember[]>>('/faculty');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching faculty members:', error);
      throw error;
    }
  },

  async getFacultyById(id: string): Promise<FacultyMember> {
    try {
      const response = await api.get<ApiResponse<FacultyMember>>(`/faculty/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching faculty member with ID ${id}:`, error);
      throw error;
    }
  },

  async createFaculty(facultyMember: Omit<FacultyMember, 'id'>): Promise<FacultyMember> {
    try {
      const response = await api.post<ApiResponse<FacultyMember>>('/faculty', facultyMember);
      return response.data.data;
    } catch (error) {
      console.error('Error creating faculty member:', error);
      throw error;
    }
  },

  async updateFaculty(id: string, updates: Partial<FacultyMember>): Promise<FacultyMember> {
    try {
      const response = await api.put<ApiResponse<FacultyMember>>(`/faculty/${id}`, updates);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating faculty member with ID ${id}:`, error);
      throw error;
    }
  },

  async deleteFaculty(id: string): Promise<void> {
    try {
      await api.delete(`/faculty/${id}`);
    } catch (error) {
      console.error(`Error deleting faculty member with ID ${id}:`, error);
      throw error;
    }
  },
}; 