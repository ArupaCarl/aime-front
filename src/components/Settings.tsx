import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { 
  Plus, 
  Settings as SettingsIcon, 
  Link as LinkIcon,
  Unlink,
  Calendar,
  MessageSquare,
  FileText,
  Briefcase,
  Users,
  Clock
} from 'lucide-react';

export function Settings() {
  const [is1onAIEnabled, setIs1onAIEnabled] = useState(false);
  const [suggestionFrequency, setSuggestionFrequency] = useState('weekly-monday');
  const [oneOnAIFrequency, setOneOnAIFrequency] = useState('weekly');

  const connectedServices = {
    task: {
      name: 'JIRA',
      connected: true,
      url: 'https://company.atlassian.net'
    },
    calendar: {
      name: 'Google Calendar',
      connected: true,
      url: 'https://calendar.google.com'
    },
    messenger: {
      name: 'Slack',
      connected: true,
      url: 'https://company.slack.com'
    },
    documents: [
      {
        name: 'Notion',
        connected: true,
        url: 'https://notion.so'
      },
      {
        name: 'Google Drive',
        connected: true,
        url: 'https://drive.google.com'
      }
    ]
  };

  const handleConnectService = (type: string) => {
    console.log('서비스 연결:', type);
  };

  const handleDisconnectService = (type: string, name?: string) => {
    console.log('서비스 연결 해제:', type, name);
  };

  const handleAddDocument = () => {
    console.log('문서 서비스 추가');
  };

  const ServiceCard = ({ 
    title, 
    icon: Icon, 
    service, 
    type, 
    allowMultiple = false 
  }: { 
    title: string; 
    icon: any; 
    service: any; 
    type: string; 
    allowMultiple?: boolean; 
  }) => {
    if (allowMultiple) {
      return (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5" />
                <CardTitle className="text-base">{title}</CardTitle>
              </div>
              <Button variant="outline" size="sm" onClick={handleAddDocument}>
                <Plus className="w-4 h-4 mr-1" />
                추가
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {service.map((doc: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="font-medium">{doc.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDisconnectService(type, doc.name)}
                  >
                    <Unlink className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5" />
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {service?.connected ? (
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="font-medium">{service.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleDisconnectService(type)}
              >
                <Unlink className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleConnectService(type)}
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              연결
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>설정</h1>
        <p className="text-muted-foreground">시스템 설정과 연동 서비스를 관리하세요</p>
      </div>

      {/* 연결 관리 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <LinkIcon className="w-5 h-5" />
            <span>연결 관리</span>
          </CardTitle>
          <CardDescription>외부 서비스와의 연동을 관리합니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ServiceCard
              title="작업"
              icon={Briefcase}
              service={connectedServices.task}
              type="task"
            />
            <ServiceCard
              title="캘린더"
              icon={Calendar}
              service={connectedServices.calendar}
              type="calendar"
            />
            <ServiceCard
              title="메신저"
              icon={MessageSquare}
              service={connectedServices.messenger}
              type="messenger"
            />
            <ServiceCard
              title="문서"
              icon={FileText}
              service={connectedServices.documents}
              type="documents"
              allowMultiple={true}
            />
          </div>
        </CardContent>
      </Card>

      {/* 작업 관리 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5" />
            <span>작업 관리</span>
          </CardTitle>
          <CardDescription>AI 작업 제안 생성 주기를 설정합니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="suggestion-frequency">제안 생성 주기</Label>
              <Select value={suggestionFrequency} onValueChange={setSuggestionFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="주기를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly-monday">매주 월요일</SelectItem>
                  <SelectItem value="weekly-tuesday">매주 화요일</SelectItem>
                  <SelectItem value="weekly-wednesday">매주 수요일</SelectItem>
                  <SelectItem value="weekly-thursday">매주 목요일</SelectItem>
                  <SelectItem value="weekly-friday">매주 금요일</SelectItem>
                  <SelectItem value="biweekly-monday">2주마다 월요일</SelectItem>
                  <SelectItem value="biweekly-wednesday">2주마다 수요일</SelectItem>
                  <SelectItem value="biweekly-friday">2주마다 금요일</SelectItem>
                  <SelectItem value="monthly">매월 첫째 주 월요일</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  다음 제안 생성: 2024년 12월 23일 월요일 오전 9시
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 팀원 관리 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>팀원 관리</span>
          </CardTitle>
          <CardDescription>1on1 AI 기능과 관련 설정을 관리합니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="1on1-ai">1on1 AI 활성화</Label>
                <p className="text-sm text-muted-foreground">
                  AI가 팀원과의 1on1 미팅을 자동으로 제안하고 관리합니다
                </p>
              </div>
              <Switch
                id="1on1-ai"
                checked={is1onAIEnabled}
                onCheckedChange={setIs1onAIEnabled}
              />
            </div>
            
            {is1onAIEnabled && (
              <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="1on1-frequency">1on1 주기</Label>
                <Select value={oneOnAIFrequency} onValueChange={setOneOnAIFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="주기를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">매주</SelectItem>
                    <SelectItem value="biweekly">2주마다</SelectItem>
                    <SelectItem value="monthly">매월</SelectItem>
                    <SelectItem value="quarterly">분기마다</SelectItem>
                  </SelectContent>
                </Select>
                <div className="p-3 bg-muted/50 rounded-lg mt-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      다음 1on1 제안: 2024년 12월 20일 금요일
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}