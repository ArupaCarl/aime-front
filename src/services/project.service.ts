import { apiClient } from '../lib/api-client';
import { Project, PaginatedResponse, PaginationParams } from '../types/api';

export const projectService = {
  // 프로젝트 목록 조회
  getProjects: async (params?: PaginationParams): Promise<PaginatedResponse<Project>> => {
    const queryParams = params ? `?page=${params.page}&limit=${params.limit}` : '';
    const response = await apiClient.get<PaginatedResponse<Project>>(`/projects${queryParams}`);
    return response.data!;
  },

  // 프로젝트 상세 조회
  getProject: async (id: string): Promise<Project> => {
    const response = await apiClient.get<Project>(`/projects/${id}`);
    return response.data!;
  },

  // 프로젝트 생성
  createProject: async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    const response = await apiClient.post<Project>('/projects', project);
    return response.data!;
  },

  // 프로젝트 수정
  updateProject: async (id: string, project: Partial<Project>): Promise<Project> => {
    const response = await apiClient.put<Project>(`/projects/${id}`, project);
    return response.data!;
  },

  // 프로젝트 삭제
  deleteProject: async (id: string): Promise<void> => {
    await apiClient.delete(`/projects/${id}`);
  },
};
