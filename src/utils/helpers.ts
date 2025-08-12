import { Notification, ConnectedService, RiskAlert } from '../types';
import { FileText, Calendar, AlertTriangle, MessageSquare } from 'lucide-react';

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high': return 'bg-red-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'high': return 'text-red-600 bg-red-50 border-red-200';
    case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'low': return 'text-green-600 bg-green-50 border-green-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'connected': return 'text-green-600 bg-green-50 border-green-200';
    case 'error': return 'text-red-600 bg-red-50 border-red-200';
    case 'disconnected': return 'text-gray-600 bg-gray-50 border-gray-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'task': return FileText;
    case 'meeting': return Calendar;
    case 'warning': return AlertTriangle;
    default: return MessageSquare;
  }
};

export const formatTimeAgo = (timeString: string): string => {
  return timeString; // 실제로는 moment.js나 date-fns를 사용하여 계산
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
