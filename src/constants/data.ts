import { Notification, ConnectedService, RiskAlert, TodoItem, Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: '프로젝트 알파',
    description: '메인 프로젝트',
    status: 'active'
  },
  {
    id: '2',
    name: '프로젝트 베타',
    description: '보조 프로젝트',
    status: 'active'
  },
  {
    id: '3',
    name: '프로젝트 감마',
    description: '실험 프로젝트',
    status: 'on-hold'
  }
];

export const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: 'PRD 리뷰 요청',
    description: '새로운 기능 PRD에 대한 리뷰가 필요합니다.',
    priority: 'high',
    time: '2분 전',
    type: 'task',
    link: 'tasks'
  },
  {
    id: 2,
    title: '미팅 시작 알림',
    description: '스프린트 계획 미팅이 10분 후 시작됩니다.',
    priority: 'medium',
    time: '8분 전',
    type: 'meeting',
    link: 'meetings'
  },
  {
    id: 3,
    title: '작업 지연 경고',
    description: '3개의 작업이 예정된 완료 시간을 초과했습니다.',
    priority: 'high',
    time: '15분 전',
    type: 'warning',
    link: 'tasks'
  }
];

export const CONNECTED_SERVICES: ConnectedService[] = [
  {
    name: 'JIRA',
    type: '작업',
    status: 'connected',
    lastSync: '2분 전',
    url: 'https://company.atlassian.net'
  },
  {
    name: 'Google Calendar',
    type: '캘린더',
    status: 'connected',
    lastSync: '5분 전',
    url: 'https://calendar.google.com'
  },
  {
    name: 'Slack',
    type: '메신저',
    status: 'connected',
    lastSync: '1분 전',
    url: 'https://company.slack.com'
  },
  {
    name: 'Notion',
    type: '문서',
    status: 'connected',
    lastSync: '10분 전',
    url: 'https://notion.so'
  },
  {
    name: 'Google Drive',
    type: '문서',
    status: 'error',
    lastSync: '2시간 전',
    url: 'https://drive.google.com'
  }
];

export const RISK_ALERTS: RiskAlert[] = [
  {
    id: 1,
    type: 'deadline',
    title: '마감일 임박',
    description: '3개 작업이 마감일을 2일 앞두고 있습니다.',
    severity: 'high',
    count: 3
  },
  {
    id: 2,
    type: 'dependency',
    title: '의존성 지연',
    description: '블로킹된 작업으로 인해 후속 작업들이 지연될 위험이 있습니다.',
    severity: 'medium',
    count: 5
  },
  {
    id: 3,
    type: 'resource',
    title: '리소스 부족',
    description: '이번 주 할당된 작업량이 팀 용량을 초과합니다.',
    severity: 'high',
    count: 1
  }
];

export const TODO_ITEMS: TodoItem[] = [
  {
    id: 1,
    title: 'PRD 리뷰 완료',
    description: '새로운 기능 PRD 검토 및 피드백',
    priority: 'high',
    status: 'pending',
    dueDate: '2024-01-15',
    assignee: '김프로젝트'
  },
  {
    id: 2,
    title: '스프린트 계획 미팅',
    description: '다음 스프린트 계획 수립',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2024-01-16',
    assignee: '팀 전체'
  },
  {
    id: 3,
    title: '코드 리뷰',
    description: '새로운 기능 코드 검토',
    priority: 'high',
    status: 'pending',
    dueDate: '2024-01-14',
    assignee: '김프로젝트'
  }
];
