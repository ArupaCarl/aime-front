import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  Briefcase, 
  Calendar, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Wifi,
  WifiOff,
  AlertTriangle,
  ListTodo,
  MessageSquare,
  Send,
  ExternalLink,
  Activity
} from 'lucide-react';
import { CONNECTED_SERVICES, RISK_ALERTS, TODO_ITEMS } from '../constants/data';
import { getStatusColor, getSeverityColor } from '../utils/helpers';

export function Dashboard() {
  const [aiMessage, setAiMessage] = useState('');

  const connectedServices = CONNECTED_SERVICES;
  const riskAlerts = RISK_ALERTS;
  const todoItems = TODO_ITEMS;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': case 'high': return 'destructive';
      case 'Medium': case 'medium': return 'secondary';
      case 'Low': case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const handleSendAiMessage = () => {
    if (aiMessage.trim()) {
      // AI 메시지 처리 로직
      console.log('AI에게 보낸 메시지:', aiMessage);
      setAiMessage('');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>프로젝트 대시보드</h1>
        <p className="text-muted-foreground">프로젝트 알파의 전체 현황을 확인하세요</p>
      </div>

      {/* 연결된 서비스 상태 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>연결된 서비스 상태</span>
          </CardTitle>
          <CardDescription>외부 도구들과의 연동 상태를 확인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connectedServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {service.status === 'connected' ? (
                    <Wifi className="w-4 h-4 text-green-600" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-red-600" />
                  )}
                  <div>
                    <p className="font-medium">{service.type}: {service.name}</p>
                    <p className="text-xs text-muted-foreground">
                      마지막 동기화: {service.lastSync}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.open(service.url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 위험 감지 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>위험 감지</span>
            </CardTitle>
            <CardDescription>프로젝트 진행에 영향을 줄 수 있는 위험 요소들입니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <AlertTriangle className={`w-4 h-4 mt-1 ${getSeverityColor(alert.severity)}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{alert.title}</p>
                      <Badge variant={getPriorityColor(alert.severity) as any}>
                        {alert.count}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 할일 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ListTodo className="w-5 h-5" />
              <span>할일</span>
            </CardTitle>
            <CardDescription>오늘 완료해야 할 작업들입니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todoItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    checked={item.status === 'completed'}
                    className="w-4 h-4 rounded border border-border"
                    readOnly
                  />
                  <div className="flex-1">
                    <p className={`font-medium ${item.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.dueDate}</p>
                  </div>
                  <Badge variant={getPriorityColor(item.priority) as any} className="text-xs">
                    {item.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AIME 가르치기 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>AIME 가르치기</span>
          </CardTitle>
          <CardDescription>AI에게 프로젝트나 팀에 대한 정보를 알려주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="예: 우리 팀은 매주 화요일마다 디자인 리뷰를 진행합니다. 이때 UI/UX 개선사항을 논의하고..."
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                AI가 더 나은 제안을 할 수 있도록 팀의 업무 방식이나 프로젝트 특성을 알려주세요
              </p>
              <Button onClick={handleSendAiMessage} disabled={!aiMessage.trim()}>
                <Send className="w-4 h-4 mr-2" />
                전송
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}