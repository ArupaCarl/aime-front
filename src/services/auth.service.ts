import { apiClient } from '../lib/api-client';
import { LoginRequest, LoginResponse, User } from '../types/api';

export const authService = {
  // 로그인
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    if (response.success && response.data) {
      apiClient.setToken(response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data!;
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    } finally {
      apiClient.removeToken();
    }
  },

  // 현재 사용자 정보 조회
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data!;
  },

  // 토큰 갱신
  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/refresh', { refreshToken });
    if (response.success && response.data) {
      apiClient.setToken(response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data!;
  },
};
