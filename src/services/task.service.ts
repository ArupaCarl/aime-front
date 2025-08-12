import { apiClient } from '../lib/api-client';
import { Task, PaginatedResponse, PaginationParams } from '../types/api';

export const taskService = {
  // 작업 목록 조회
  getTasks: async (params?: PaginationParams & { projectId?: string; status?: string }): Promise<PaginatedResponse<Task>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.projectId) queryParams.append('projectId', params.projectId);
    if (params?.status) queryParams.append('status', params.status);
    
    const queryString = queryParams.toString();
    const response = await apiClient.get<PaginatedResponse<Task>>(`/tasks${queryString ? `?${queryString}` : ''}`);
    return response.data!;
  },

  // 작업 상세 조회
  getTask: async (id: string): Promise<Task> => {
    const response = await apiClient.get<Task>(`/tasks/${id}`);
    return response.data!;
  },

  // 작업 생성
  createTask: async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    const response = await apiClient.post<Task>('/tasks', task);
    return response.data!;
  },

  // 작업 수정
  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    const response = await apiClient.put<Task>(`/tasks/${id}`, task);
    return response.data!;
  },

  // 작업 삭제
  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },

  // 작업 상태 변경
  updateTaskStatus: async (id: string, status: Task['status']): Promise<Task> => {
    const response = await apiClient.patch<Task>(`/tasks/${id}/status`, { status });
    return response.data!;
  },

  // 작업 할당
  assignTask: async (id: string, assigneeId: string): Promise<Task> => {
    const response = await apiClient.patch<Task>(`/tasks/${id}/assign`, { assigneeId });
    return response.data!;
  },
};
