import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services';
import { LoginRequest, User } from '../types/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();

  // 현재 사용자 정보 조회
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: authService.getCurrentUser,
    enabled: isAuthenticated,
    retry: false,
  });

  // 로그인 뮤테이션
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setIsAuthenticated(true);
      queryClient.setQueryData(['user'], data.user);
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });

  // 로그아웃 뮤테이션
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      setIsAuthenticated(false);
      queryClient.clear();
    },
  });

  // 로그인 함수
  const login = async (credentials: LoginRequest) => {
    return loginMutation.mutateAsync(credentials);
  };

  // 로그아웃 함수
  const logout = async () => {
    return logoutMutation.mutateAsync();
  };

  // 초기 인증 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return {
    user,
    isAuthenticated,
    isLoadingUser,
    login,
    logout,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
};
