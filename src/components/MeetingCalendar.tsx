import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Video,
  ChevronLeft,
  ChevronRight,
  FileText,
  ArrowLeft,
  Edit3,
  MessageSquare,
  Save,
  Eye,
  Bold,
  Italic,
  List,
  Link,
  Heading1,
  Heading2
} from 'lucide-react';

interface MeetingRecord {
  id: number;
  title: string;
  date: string;
  status: 'completed' | 'scheduled';
  summary: string;
  content: string;
}

export function MeetingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [currentView, setCurrentView] = useState('calendar'); // 'calendar', 'records', 'record-detail'
  const [selectedRecord, setSelectedRecord] = useState<MeetingRecord | null>(null);
  const [isEditingRecord, setIsEditingRecord] = useState(false);
  const [recordContent, setRecordContent] = useState('');
  
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    agenda: '',
    date: '',
    time: '',
    duration: '60',
    attendees: ''
  });

  const meetings = [
    {
      id: 1,
      title: '스프린트 플래닝',
      date: '2024-12-16',
      time: '14:00',
      duration: 90,
      attendees: ['김개발', '박백엔드', '이프론트', '최디자인', '정기획'],
      organizer: '정기획',
      agenda: '다음 스프린트 계획 수립 및 작업 배분',
      hasAgenda: true,
      hasOpinion: false,
      location: '회의실 A'
    },
    {
      id: 2,
      title: '디자인 리뷰',
      date: '2024-12-17',
      time: '10:00',
      duration: 60,
      attendees: ['최디자인', '정기획', '김개발'],
      organizer: '최디자인',
      agenda: '',
      hasAgenda: false,
      hasOpinion: false,
      location: '온라인'
    },
    {
      id: 3,
      title: '팀 회고',
      date: '2024-12-18',
      time: '16:00',
      duration: 60,
      attendees: ['김개발', '박백엔드', '이프론트', '최디자인', '정기획', '조매니저'],
      organizer: '조매니저',
      agenda: '스프린트 회고 및 개선사항 논의',
      hasAgenda: true,
      hasOpinion: true,
      location: '회의실 B'
    },
    {
      id: 4,
      title: '클라이언트 미팅',
      date: '2024-12-19',
      time: '15:00',
      duration: 120,
      attendees: ['조매니저', '한리더', '정기획'],
      organizer: '한리더',
      agenda: '프로젝트 진행 상황 보고',
      hasAgenda: true,
      hasOpinion: false,
      location: '온라인'
    }
  ];

  const meetingRecords: MeetingRecord[] = [
    {
      id: 1,
      title: '지난주 스프린트 플래닝',
      date: '2024-12-09',
      status: 'completed',
      summary: '스프린트 목표 설정, 작업 분배, 예상 소요시간 논의',
      content: '## 논의 내용\n- 새로운 기능 개발 우선순위 결정\n- 각 작업별 담당자 배정\n- 예상 완료 시간 설정\n\n## 결정 사항\n- 로그인 기능 우선 개발\n- UI 개선 작업 병행 진행'
    },
    {
      id: 2,
      title: '디자인 시스템 리뷰',
      date: '2024-12-10',
      status: 'completed',
      summary: '디자인 시스템 가이드라인 검토 및 컴포넌트 표준화',
      content: '## 검토 내용\n- 색상 팔레트 최종 확정\n- 버튼 컴포넌트 스타일 가이드\n- 반응형 그리드 시스템 적용\n\n## 액션 아이템\n- 디자인 토큰 문서화\n- Figma 라이브러리 업데이트'
    },
    {
      id: 3,
      title: '스프린트 플래닝',
      date: '2024-12-16',
      status: 'scheduled',
      summary: '다음 스프린트 계획 수립 및 작업 배분',
      content: ''
    }
  ];

  const currentUser = '정기획'; // 현재 사용자

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'planning': return 'bg-blue-500';
      case 'review': return 'bg-yellow-500';
      case 'retrospective': return 'bg-green-500';
      case 'client': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'planning': return '기획';
      case 'review': return '리뷰';
      case 'retrospective': return '회고';
      case 'client': return '클라이언트';
      default: return '일반';
    }
  };

  const handleCreateMeeting = () => {
    console.log('새 미팅 생성:', newMeeting);
    setNewMeeting({
      title: '',
      agenda: '',
      date: '',
      time: '',
      duration: '60',
      attendees: ''
    });
    setIsCreateDialogOpen(false);
  };

  const handleAgendaEdit = (meeting: any) => {
    console.log('아젠다 편집:', meeting);
  };

  const handleOpinionSubmit = (meeting: any) => {
    console.log('의견 제출:', meeting);
  };

  const handleRecordClick = (record: MeetingRecord) => {
    setSelectedRecord(record);
    setRecordContent(record.content);
    setCurrentView('record-detail');
  };

  const handleSaveRecord = () => {
    console.log('회의 기록 저장:', recordContent);
    setIsEditingRecord(false);
  };

  const EditorToolbar = () => (
    <div className="flex items-center space-x-2 p-2 border-b bg-muted/30">
      <Button variant="ghost" size="sm">
        <Bold className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Italic className="w-4 h-4" />
      </Button>
      <div className="w-px h-6 bg-border" />
      <Button variant="ghost" size="sm">
        <Heading1 className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Heading2 className="w-4 h-4" />
      </Button>
      <div className="w-px h-6 bg-border" />
      <Button variant="ghost" size="sm">
        <List className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Link className="w-4 h-4" />
      </Button>
    </div>
  );

  // 미팅 기록 상세 화면
  if (currentView === 'record-detail') {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentView('records')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              뒤로 가기
            </Button>
            <div>
              <h1>{selectedRecord?.title}</h1>
              <p className="text-sm text-muted-foreground">
                {selectedRecord?.date} • {selectedRecord?.status === 'scheduled' ? '예정' : '완료'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setIsEditingRecord(!isEditingRecord)}
            >
              {isEditingRecord ? (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  미리보기
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4 mr-2" />
                  편집
                </>
              )}
            </Button>
            <Button onClick={handleSaveRecord}>
              <Save className="w-4 h-4 mr-2" />
              저장
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {/* 사전 요약 */}
          <div className="p-6 border-b bg-muted/30">
            <h3 className="font-medium mb-2">사전 요약</h3>
            <p className="text-sm text-muted-foreground">{selectedRecord?.summary}</p>
          </div>

          {/* 기록 */}
          <div className="flex-1 flex flex-col">
            <div className="p-6 pb-2">
              <h3 className="font-medium">기록</h3>
            </div>
            
            {isEditingRecord ? (
              <div className="flex-1 flex flex-col">
                <EditorToolbar />
                <Textarea
                  value={recordContent}
                  onChange={(e) => setRecordContent(e.target.value)}
                  className="flex-1 border-0 rounded-none resize-none focus-visible:ring-0 font-mono text-sm"
                  placeholder="회의 기록을 입력하세요..."
                />
              </div>
            ) : (
              <div className="flex-1 p-6 pt-2">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap">{recordContent || '기록이 없습니다.'}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 미팅 기록 목록 화면
  if (currentView === 'records') {
    return (
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentView('calendar')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              뒤로 가기
            </Button>
            <div>
              <h1>미팅 기록</h1>
              <p className="text-muted-foreground">지난 미팅 기록을 확인하고 관리하세요</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {meetingRecords.map((record) => (
            <Card 
              key={record.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleRecordClick(record)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{record.title}</h3>
                      <Badge variant={record.status === 'scheduled' ? 'secondary' : 'outline'}>
                        {record.status === 'scheduled' ? '예정' : '완료'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{record.date}</p>
                    <p className="text-sm">{record.summary}</p>
                  </div>
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // 기본 캘린더 화면
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1>미팅 관리</h1>
          <p className="text-muted-foreground">팀 미팅을 효율적으로 관리하세요</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            onClick={() => setCurrentView('records')}
          >
            <FileText className="w-4 h-4 mr-2" />
            미팅 기록
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                새로운 미팅 생성
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>새 미팅 생성</DialogTitle>
                <DialogDescription>
                  새로운 팀 미팅을 예약합니다
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meeting-title">미팅 제목</Label>
                  <Input
                    id="meeting-title"
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                    placeholder="미팅 제목을 입력하세요"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meeting-agenda">아젠다</Label>
                  <Textarea
                    id="meeting-agenda"
                    value={newMeeting.agenda}
                    onChange={(e) => setNewMeeting({...newMeeting, agenda: e.target.value})}
                    placeholder="미팅 아젠다를 입력하세요"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="meeting-date">날짜</Label>
                    <Input
                      id="meeting-date"
                      type="date"
                      value={newMeeting.date}
                      onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meeting-time">시간</Label>
                    <Input
                      id="meeting-time"
                      type="time"
                      value={newMeeting.time}
                      onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meeting-duration">소요시간 (분)</Label>
                  <Input
                    id="meeting-duration"
                    type="number"
                    value={newMeeting.duration}
                    onChange={(e) => setNewMeeting({...newMeeting, duration: e.target.value})}
                    placeholder="60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meeting-attendees">참석자</Label>
                  <Input
                    id="meeting-attendees"
                    value={newMeeting.attendees}
                    onChange={(e) => setNewMeeting({...newMeeting, attendees: e.target.value})}
                    placeholder="참석자명을 쉼표로 구분하여 입력"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    취소
                  </Button>
                  <Button onClick={handleCreateMeeting}>
                    생성
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* 캘린더 뷰 */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {currentDate.toLocaleDateString('ko-KR', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 6;
                  const date = new Date(2024, 11, day);
                  const isToday = day === 16;
                  const hasMeeting = meetings.some(meeting => 
                    parseInt(meeting.date.split('-')[2]) === day
                  );
                  
                  return (
                    <div
                      key={i}
                      className={`
                        aspect-square p-1 text-sm border rounded-lg cursor-pointer hover:bg-accent
                        ${day < 1 ? 'text-muted-foreground' : ''}
                        ${isToday ? 'bg-primary text-primary-foreground' : ''}
                        ${hasMeeting ? 'border-primary' : ''}
                      `}
                    >
                      <div className="flex flex-col h-full">
                        <span className="text-center">
                          {day > 0 ? day : ''}
                        </span>
                        {hasMeeting && (
                          <div className="flex-1 flex flex-col space-y-1 mt-1">
                            {meetings
                              .filter(meeting => parseInt(meeting.date.split('-')[2]) === day)
                              .slice(0, 2)
                              .map((meeting) => (
                                <div
                                  key={meeting.id}
                                  className="w-full h-1 rounded bg-primary"
                                />
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 미팅 목록 */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>이번 주 미팅</CardTitle>
              <CardDescription>예정된 미팅 일정입니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="border rounded-lg p-3 hover:bg-accent cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="space-y-1">
                      <h4 className="font-medium">{meeting.title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <CalendarIcon className="w-3 h-3" />
                        <span>
                          {new Date(meeting.date).toLocaleDateString('ko-KR', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <Clock className="w-3 h-3 ml-2" />
                        <span>{meeting.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {meeting.organizer === currentUser ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="relative"
                          onClick={() => handleAgendaEdit(meeting)}
                        >
                          <Edit3 className="w-3 h-3 mr-1" />
                          아젠다 편집
                          {!meeting.hasAgenda && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                          )}
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="relative"
                          onClick={() => handleOpinionSubmit(meeting)}
                        >
                          <MessageSquare className="w-3 h-3 mr-1" />
                          의견
                          {!meeting.hasOpinion && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{meeting.attendees.length}명</span>
                      {meeting.location === '온라인' && (
                        <>
                          <Video className="w-3 h-3 ml-2" />
                          <span>온라인</span>
                        </>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {meeting.duration}분
                    </span>
                  </div>
                  
                  <div className="flex -space-x-1 mt-2">
                    {meeting.attendees.slice(0, 5).map((attendee, index) => (
                      <Avatar key={index} className="w-6 h-6 border-2 border-background">
                        <AvatarFallback className="text-xs">
                          {attendee[0]}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {meeting.attendees.length > 5 && (
                      <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                        +{meeting.attendees.length - 5}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}