import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Award,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';

export function TeamManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const teamMembers = [
    {
      id: 1,
      name: '김개발',
      role: 'Frontend Developer',
      email: 'kim.dev@company.com',
      phone: '010-1234-5678',
      location: '서울, 한국',
      joinDate: '2023-03-15',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      status: 'online',
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
      currentProjects: 2,
      completedTasks: 24
    },
    {
      id: 2,
      name: '박백엔드',
      role: 'Backend Developer',
      email: 'park.backend@company.com',
      phone: '010-2345-6789',
      location: '부산, 한국',
      joinDate: '2023-01-20',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
      status: 'busy',
      skills: ['Node.js', 'Python', 'PostgreSQL'],
      currentProjects: 3,
      completedTasks: 18
    },
    {
      id: 3,
      name: '이프론트',
      role: 'Frontend Developer',
      email: 'lee.front@company.com',
      phone: '010-3456-7890',
      location: '대구, 한국',
      joinDate: '2023-06-10',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b96e6e1e?w=64&h=64&fit=crop&crop=face',
      status: 'away',
      skills: ['Vue.js', 'JavaScript', 'SCSS'],
      currentProjects: 1,
      completedTasks: 15
    },
    {
      id: 4,
      name: '최디자인',
      role: 'UI/UX Designer',
      email: 'choi.design@company.com',
      phone: '010-4567-8901',
      location: '서울, 한국',
      joinDate: '2023-02-28',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      status: 'online',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      currentProjects: 2,
      completedTasks: 22
    },
    {
      id: 5,
      name: '정기획',
      role: 'Product Manager',
      email: 'jung.pm@company.com',
      phone: '010-5678-9012',
      location: '서울, 한국',
      joinDate: '2022-11-15',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face',
      status: 'online',
      skills: ['Agile', 'Jira', 'Analytics'],
      currentProjects: 4,
      completedTasks: 31
    },
    {
      id: 6,
      name: '조매니저',
      role: 'Engineering Manager',
      email: 'jo.manager@company.com',
      phone: '010-6789-0123',
      location: '서울, 한국',
      joinDate: '2022-08-01',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      status: 'busy',
      skills: ['Leadership', 'Architecture', 'Mentoring'],
      currentProjects: 5,
      completedTasks: 28
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online': return '온라인';
      case 'busy': return '업무 중';
      case 'away': return '자리 비움';
      case 'offline': return '오프라인';
      default: return '알 수 없음';
    }
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditMember = (memberId: number) => {
    console.log('팀원 수정:', memberId);
  };

  const handleDeleteMember = (memberId: number) => {
    console.log('팀원 삭제:', memberId);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>팀원 관리</h1>
          <p className="text-muted-foreground">팀 구성원들의 정보와 현황을 관리하세요</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          팀원 초대
        </Button>
      </div>

      {/* 검색 */}
      <div className="flex space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="팀원 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* 팀원 목록 (리스트뷰) */}
      <Card>
        <CardHeader>
          <CardTitle>팀원 목록</CardTitle>
          <CardDescription>총 {teamMembers.length}명의 팀원이 있습니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <div 
                key={member.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div 
                      className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-background`}
                    />
                  </div>
                  <div className="space-y-1">
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditMember(member.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteMember(member.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium mb-2">검색 결과가 없습니다</h3>
          <p className="text-muted-foreground">다른 검색어를 시도해 보세요</p>
        </div>
      )}
    </div>
  );
}