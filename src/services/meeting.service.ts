import { apiClient } from '../lib/api-client';
import { Meeting, PaginatedResponse, PaginationParams } from '../types/api';

export const meetingService = {
  // 미팅 목록 조회
  getMeetings: async (params?: PaginationParams & { projectId?: string; status?: string }): Promise<PaginatedResponse<Meeting>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.projectId) queryParams.append('projectId', params.projectId);
    if (params?.status) queryParams.append('status', params.status);
    
    const queryString = queryParams.toString();
    const response = await apiClient.get<PaginatedResponse<Meeting>>(`/meetings${queryString ? `?${queryString}` : ''}`);
    return response.data!;
  },

  // 미팅 상세 조회
  getMeeting: async (id: string): Promise<Meeting> => {
    const response = await apiClient.get<Meeting>(`/meetings/${id}`);
    return response.data!;
  },

  // 미팅 생성
  createMeeting: async (meeting: Omit<Meeting, 'id' | 'createdAt' | 'updatedAt'>): Promise<Meeting> => {
    const response = await apiClient.post<Meeting>('/meetings', meeting);
    return response.data!;
  },

  // 미팅 수정
  updateMeeting: async (id: string, meeting: Partial<Meeting>): Promise<Meeting> => {
    const response = await apiClient.put<Meeting>(`/meetings/${id}`, meeting);
    return response.data!;
  },

  // 미팅 삭제
  deleteMeeting: async (id: string): Promise<void> => {
    await apiClient.delete(`/meetings/${id}`);
  },

  // 미팅 상태 변경
  updateMeetingStatus: async (id: string, status: Meeting['status']): Promise<Meeting> => {
    const response = await apiClient.patch<Meeting>(`/meetings/${id}/status`, { status });
    return response.data!;
  },

  // 미팅 참석자 추가
  addAttendee: async (id: string, attendeeId: string): Promise<Meeting> => {
    const response = await apiClient.patch<Meeting>(`/meetings/${id}/attendees`, { attendeeId });
    return response.data!;
  },

  // 미팅 참석자 제거
  removeAttendee: async (id: string, attendeeId: string): Promise<Meeting> => {
    const response = await apiClient.delete<Meeting>(`/meetings/${id}/attendees/${attendeeId}`);
    return response.data!;
  },
};
