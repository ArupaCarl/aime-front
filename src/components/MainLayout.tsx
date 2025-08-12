import React, { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { 
  ChevronDown, 
  Building2, 
  Briefcase, 
  Calendar, 
  Users, 
  Settings, 
  Bell, 
  User,
  LogOut,
  Plus,
  AlertTriangle,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { User as UserType, ViewType, Notification, Project } from '../types';
import { NOTIFICATIONS, PROJECTS } from '../constants/data';
import { getPriorityColor } from '../utils/helpers';

interface MainLayoutProps {
  children: React.ReactNode;
  currentUser: UserType;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onLogout: () => void;
}

export function MainLayout({ 
  children, 
  currentUser, 
  currentView, 
  onViewChange, 
  onLogout 
}: MainLayoutProps) {
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0].name);

  const notifications = NOTIFICATIONS;

  const sidebarItems = [
    { id: 'dashboard', label: '대시보드', icon: Building2 },
    { id: 'tasks', label: '작업 관리', icon: Briefcase },
    { id: 'meetings', label: '미팅 관리', icon: Calendar },
    { id: 'team', label: '팀원 관리', icon: Users },
    { id: 'settings', label: '설정', icon: Settings },
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Global Navigation */}
      <header className="h-16 border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          {/* 조직 아이콘 */}
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          
          {/* 프로젝트 드롭다운 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <span className="font-medium">{selectedProject}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {PROJECTS.map((project) => (
                <DropdownMenuItem
                  key={project.id}
                  onClick={() => setSelectedProject(project.name)}
                  className={selectedProject === project.name ? 'bg-accent' : ''}
                >
                  {project.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Plus className="w-4 h-4 mr-2" />
                새 프로젝트 추가
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center space-x-4">
          {/* 알림 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
                >
                  {notifications.length}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <h3 className="font-medium">알림</h3>
              </div>
              <div className="max-h-96 overflow-auto">
                {notifications.map((notification) => {
                  const getIcon = () => {
                    switch (notification.type) {
                      case 'task': return <FileText className="w-4 h-4 text-muted-foreground" />;
                      case 'meeting': return <Calendar className="w-4 h-4 text-muted-foreground" />;
                      case 'warning': return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
                      default: return <MessageSquare className="w-4 h-4 text-muted-foreground" />;
                    }
                  };
                  
                  return (
                    <DropdownMenuItem
                      key={notification.id}
                      className="p-4 cursor-pointer"
                      onClick={() => onViewChange(notification.link as ViewType)}
                    >
                      <div className="flex items-start space-x-3 w-full">
                        <div className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(notification.priority)}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            {getIcon()}
                            <p className="font-medium truncate">{notification.title}</p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 사용자 메뉴 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                </Avatar>
                <span className="hidden md:block">{currentUser.name}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                내 정보
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                조직 설정
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 사이드바 */}
        <aside className="w-64 border-r border-border bg-card">
          <nav className="p-4">
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onViewChange(item.id as ViewType)}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}