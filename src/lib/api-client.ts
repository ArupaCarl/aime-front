import { ApiResponse, ApiError } from '../types/api';

// 환경 변수에서 API 기본 URL 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// 토큰 관리
const getToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

const setToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

const removeToken = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// API 요청 기본 설정
const createApiClient = () => {
  const baseURL = API_BASE_URL;

  const request = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    const url = `${baseURL}${endpoint}`;
    const token = getToken();

    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // 401 에러 시 토큰 갱신 시도
        if (response.status === 401) {
          const refreshed = await refreshToken();
          if (refreshed) {
            // 토큰 갱신 성공 시 원래 요청 재시도
            return request(endpoint, options);
          }
        }

        throw new Error(data.message || 'API 요청 실패');
      }

      return data;
    } catch (error) {
      console.error('API 요청 오류:', error);
      throw error;
    }
  };

  // 토큰 갱신
  const refreshToken = async (): Promise<boolean> => {
    const refreshTokenValue = localStorage.getItem('refreshToken');
    if (!refreshTokenValue) return false;

    try {
      const response = await fetch(`${baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: refreshTokenValue }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        return true;
      }
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
    }

    // 토큰 갱신 실패 시 로그아웃
    removeToken();
    window.location.href = '/login';
    return false;
  };

  return {
    // GET 요청
    get: <T>(endpoint: string): Promise<ApiResponse<T>> => {
      return request<T>(endpoint, { method: 'GET' });
    },

    // POST 요청
    post: <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
      return request<T>(endpoint, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      });
    },

    // PUT 요청
    put: <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
      return request<T>(endpoint, {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      });
    },

    // PATCH 요청
    patch: <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
      return request<T>(endpoint, {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
      });
    },

    // DELETE 요청
    delete: <T>(endpoint: string): Promise<ApiResponse<T>> => {
      return request<T>(endpoint, { method: 'DELETE' });
    },

    // 토큰 관리
    setToken,
    removeToken,
  };
};

export const apiClient = createApiClient();
