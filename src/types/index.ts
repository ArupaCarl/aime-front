export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  time: string;
  type: 'task' | 'meeting' | 'warning' | 'message';
  link: string;
}

export interface ConnectedService {
  name: string;
  type: string;
  status: 'connected' | 'error' | 'disconnected';
  lastSync: string;
  url: string;
}

export interface RiskAlert {
  id: number;
  type: 'deadline' | 'dependency' | 'resource';
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  count: number;
}

export interface TodoItem {
  id: number;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
  assignee?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'on-hold';
}

export type ViewType = 'dashboard' | 'tasks' | 'meetings' | 'team' | 'settings';
