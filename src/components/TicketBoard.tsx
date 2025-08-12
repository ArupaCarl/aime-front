import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { 
  Plus, 
  MoreVertical, 
  User, 
  Calendar, 
  Flag,
  MessageSquare,
  Paperclip,
  FileText,
  Wand2,
  ArrowLeft,
  Save,
  Eye,
  Edit3,
  Bold,
  Italic,
  List,
  Link,
  Heading1,
  Heading2,
  Check,
  X
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  assignee: { name: string; avatar: string };
  dueDate: string;
  comments?: number;
  attachments?: number;
}

interface AISuggestion {
  id: string;
  type: 'new' | 'modify' | 'delete';
  title: string;
  description: string;
  priority: string;
  assignee: { name: string; avatar: string };
  dueDate: string;
  estimatedHours?: number;
  tags?: string[];
  reasoning: string;
  originalTask?: Task;
}

export function TicketBoard() {
  const [tasks, setTasks] = useState({
    backlog: [
      {
        id: 'TASK-001',
        title: '로그인 페이지 UI 개선',
        description: '사용자 경험을 향상시키기 위한 로그인 페이지 리디자인',
        priority: 'High',
        assignee: { name: '김개발', avatar: '' },
        dueDate: '2024-12-20',
        comments: 3,
        attachments: 1
      },
      {
        id: 'TASK-002',
        title: '모바일 반응형 대응',
        description: '모바일 디바이스에서의 사용성 개선',
        priority: 'Medium',
        assignee: { name: '이프론트', avatar: '' },
        dueDate: '2024-12-25',
        comments: 1,
        attachments: 0
      }
    ],
    'in-progress': [
      {
        id: 'TASK-003',
        title: '데이터베이스 성능 최적화',
        description: '쿼리 성능 개선 및 인덱스 최적화',
        priority: 'High',
        assignee: { name: '박백엔드', avatar: '' },
        dueDate: '2024-12-18',
        comments: 5,
        attachments: 2
      }
    ],
    review: [
      {
        id: 'TASK-004',
        title: 'API 문서 작성',
        description: 'REST API 엔드포인트 문서화',
        priority: 'Low',
        assignee: { name: '최문서', avatar: '' },
        dueDate: '2024-12-22',
        comments: 2,
        attachments: 1
      }
    ],
    done: [
      {
        id: 'TASK-005',
        title: '사용자 인증 구현',
        description: 'JWT 기반 사용자 인증 시스템 구현',
        priority: 'High',
        assignee: { name: '김개발', avatar: '' },
        dueDate: '2024-12-15',
        comments: 8,
        attachments: 3
      }
    ]
  });

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isPrdEditorOpen, setIsPrdEditorOpen] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [hasPendingSuggestions, setHasPendingSuggestions] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState(new Set());
  const [isEditingSuggestion, setIsEditingSuggestion] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<AISuggestion | null>(null);
  const [feedbackDialog, setFeedbackDialog] = useState({ open: false, type: '', feedback: '' });
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assignee: '',
    dueDate: ''
  });

  // AI 제안 작업들
  const aiSuggestions: AISuggestion[] = [
    {
      id: 'AI-001',
      type: 'new',
      title: '푸시 알림 시스템 구현',
      description: '실시간 알림을 위한 푸시 알림 시스템 개발',
      priority: 'High',
      assignee: { name: '박백엔드', avatar: '' },
      dueDate: '2024-12-30',
      estimatedHours: 16,
      tags: ['Backend', 'Notification'],
      reasoning: '사용자 참여도 향상을 위해 필요한 기능입니다.'
    },
    {
      id: 'AI-002',
      type: 'modify',
      title: '로그인 페이지 UI 개선',
      description: '접근성을 고려한 로그인 폼 재설계 및 소셜 로그인 추가',
      priority: 'High',
      assignee: { name: '김개발', avatar: '' },
      dueDate: '2024-12-25',
      estimatedHours: 12,
      tags: ['Frontend', 'UI/UX'],
      reasoning: '현재 로그인 페이지의 사용성 개선이 필요합니다.',
      originalTask: {
        id: 'TASK-001',
        title: '로그인 페이지 UI 개선',
        description: '사용자 경험을 향상시키기 위한 로그인 페이지 리디자인',
        priority: 'High',
        assignee: { name: '김개발', avatar: '' },
        dueDate: '2024-12-20'
      }
    },
    {
      id: 'AI-003',
      type: 'delete',
      title: 'API 문서 작성',
      description: 'REST API 엔드포인트 문서화',
      priority: 'Low',
      assignee: { name: '최문서', avatar: '' },
      dueDate: '2024-12-22',
      reasoning: '자동 문서 생성 도구 도입으로 수동 작업이 불필요해졌습니다.',
      originalTask: {
        id: 'TASK-004',
        title: 'API 문서 작성',
        description: 'REST API 엔드포인트 문서화',
        priority: 'Low',
        assignee: { name: '최문서', avatar: '' },
        dueDate: '2024-12-22'
      }
    },
    {
      id: 'AI-004',
      type: 'new',
      title: '다크 모드 지원',
      description: '사용자 선호도에 따른 다크/라이트 테마 전환 기능',
      priority: 'Medium',
      assignee: { name: '이프론트', avatar: '' },
      dueDate: '2025-01-05',
      estimatedHours: 20,
      tags: ['Frontend', 'UI/UX'],
      reasoning: '사용자 경험 향상과 눈의 피로 감소를 위해 권장됩니다.'
    }
  ];

  const [prdContent, setPrdContent] = useState(`# 프로젝트 요구사항 문서 (PRD)

## 1. 프로젝트 개요
- **프로젝트명**: 프로젝트 알파
- **목표**: 사용자 경험 향상을 위한 플랫폼 개선
- **기간**: 2024.12.01 ~ 2025.02.28

## 2. 핵심 기능
### 2.1 사용자 인증 시스템
- 소셜 로그인 지원 (Google, GitHub)
- 2FA 인증 구현
- 비밀번호 재설정 기능

### 2.2 대시보드 개선
- 실시간 데이터 시각화
- 커스터마이징 가능한 위젯
- 반응형 디자인 적용

## 3. 성공 지표
- 사용자 만족도: 4.5/5.0 이상
- 페이지 로딩 시간: 2초 이내
- 모바일 사용성: 90% 이상

## 4. 기술 스택
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, PostgreSQL
- Infrastructure: AWS, Docker

## 5. 마일스톤
- Phase 1: 기본 인증 시스템 (12월)
- Phase 2: 대시보드 개선 (1월)
- Phase 3: 모바일 최적화 (2월)`);

  const columns = [
    { id: 'backlog', title: '백로그', color: 'border-gray-200' },
    { id: 'in-progress', title: '진행 중', color: 'border-blue-200' },
    { id: 'review', title: '리뷰', color: 'border-yellow-200' },
    { id: 'done', title: '완료', color: 'border-green-200' }
  ];

  const suggestionColumns = [
    { id: 'new', title: '신규 작업', color: 'border-green-200' },
    { id: 'modify', title: '수정 작업', color: 'border-yellow-200' },
    { id: 'delete', title: '삭제 작업', color: 'border-red-200' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'modify': return 'bg-yellow-100 text-yellow-800';
      case 'delete': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'new': return '신규';
      case 'modify': return '수정';
      case 'delete': return '삭제';
      default: return '일반';
    }
  };

  const handleCreateTask = () => {
    const task = {
      id: `TASK-${String(Date.now()).slice(-3)}`,
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      assignee: { name: newTask.assignee, avatar: '' },
      dueDate: newTask.dueDate,
      comments: 0,
      attachments: 0
    };

    setTasks(prev => ({
      ...prev,
      backlog: [...prev.backlog, task]
    }));

    setNewTask({
      title: '',
      description: '',
      priority: 'Medium',
      assignee: '',
      dueDate: ''
    });
    setIsCreateDialogOpen(false);
  };

  const handleGenerateTaskSuggestions = () => {
    console.log('AI 작업 제안 생성');
    setHasPendingSuggestions(true);
  };

  const handleReviewSuggestions = () => {
    setIsReviewMode(true);
  };

  const handleSavePrd = () => {
    console.log('PRD 저장:', prdContent);
    setIsEditing(false);
  };

  const handleSelectSuggestion = (suggestionId: string) => {
    const newSelected = new Set(selectedSuggestions);
    if (newSelected.has(suggestionId)) {
      newSelected.delete(suggestionId);
    } else {
      newSelected.add(suggestionId);
    }
    setSelectedSuggestions(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedSuggestions.size === aiSuggestions.length) {
      setSelectedSuggestions(new Set());
    } else {
      setSelectedSuggestions(new Set(aiSuggestions.map(s => s.id)));
    }
  };

  const handleSuggestionAction = (type: 'accept' | 'reject') => {
    setFeedbackDialog({ open: true, type, feedback: '' });
  };

  const handleConfirmAction = () => {
    console.log(`${feedbackDialog.type} 선택된 제안들:`, Array.from(selectedSuggestions));
    console.log('피드백:', feedbackDialog.feedback);
    
    if (feedbackDialog.type === 'accept') {
      setHasPendingSuggestions(false);
    }
    
    setFeedbackDialog({ open: false, type: '', feedback: '' });
    setSelectedSuggestions(new Set());
    setIsReviewMode(false);
  };

  const handleEditSuggestion = (suggestion: any) => {
    setSelectedSuggestion(suggestion);
    setIsEditingSuggestion(true);
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

  if (isPrdEditorOpen) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsPrdEditorOpen(false)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              뒤로 가기
            </Button>
            <div>
              <h1>PRD 편집</h1>
              <p className="text-sm text-muted-foreground">프로젝트 요구사항 문서를 편집하세요</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
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
            <Button onClick={handleSavePrd}>
              <Save className="w-4 h-4 mr-2" />
              저장
            </Button>
          </div>
        </div>

        <div className="flex-1 flex">
          <div className="flex-1">
            {isEditing ? (
              <div className="h-full flex flex-col">
                <EditorToolbar />
                <Textarea
                  value={prdContent}
                  onChange={(e) => setPrdContent(e.target.value)}
                  className="flex-1 border-0 rounded-none resize-none focus-visible:ring-0 font-mono text-sm"
                  placeholder="PRD 내용을 입력하세요..."
                />
              </div>
            ) : (
              <div className="p-6 prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap">{prdContent}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 작업 제안 리뷰 화면
  if (isReviewMode) {
    return (
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsReviewMode(false)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              뒤로 가기
            </Button>
            <div>
              <h1>작업 제안 리뷰</h1>
              <p className="text-muted-foreground">AI가 제안한 작업들을 검토하고 승인하세요</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={selectedSuggestions.size === aiSuggestions.length}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm">전체선택</span>
            </div>
            <Button 
              variant="default"
              onClick={() => handleSuggestionAction('accept')}
              disabled={selectedSuggestions.size === 0}
            >
              <Check className="w-4 h-4 mr-2" />
              수락
            </Button>
            <Button 
              variant="destructive"
              onClick={() => handleSuggestionAction('reject')}
              disabled={selectedSuggestions.size === 0}
            >
              <X className="w-4 h-4 mr-2" />
              거절
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <div className="flex space-x-6 h-full min-w-max">
            {suggestionColumns.map((column) => {
              const columnSuggestions = aiSuggestions.filter(s => s.type === column.id);
              return (
                <div key={column.id} className="w-80 flex flex-col">
                  <div className={`border-t-4 ${column.color} bg-card rounded-t-lg p-4`}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{column.title}</h3>
                      <Badge variant="secondary">{columnSuggestions.length}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-card/50 p-4 space-y-3 min-h-96 border-l border-r border-b rounded-b-lg">
                    {columnSuggestions.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                          <Plus className="w-6 h-6" />
                        </div>
                        <p className="text-sm">제안이 없습니다</p>
                      </div>
                    ) : (
                      columnSuggestions.map((suggestion) => (
                        <Card 
                          key={suggestion.id} 
                          className={`cursor-pointer hover:shadow-md transition-shadow ${selectedSuggestions.has(suggestion.id) ? 'ring-2 ring-primary' : ''}`}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  checked={selectedSuggestions.has(suggestion.id)}
                                  onCheckedChange={() => handleSelectSuggestion(suggestion.id)}
                                />
                                <div className="space-y-1">
                                  <CardTitle className="text-sm">{suggestion.id}</CardTitle>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${getTypeColor(suggestion.type)}`}
                                  >
                                    {getTypeLabel(suggestion.type)}
                                  </Badge>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreVertical className="w-3 h-3" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent 
                            className="pt-0"
                            onClick={() => suggestion.type !== 'delete' && handleEditSuggestion(suggestion)}
                          >
                            <h4 className="font-medium mb-2">{suggestion.title}</h4>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {suggestion.description}
                            </p>
                            
                            {suggestion.type !== 'delete' && (
                              <>
                                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{new Date(suggestion.dueDate).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}</span>
                                  </div>
                                  {suggestion.estimatedHours && (
                                    <span>{suggestion.estimatedHours}시간</span>
                                  )}
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <Avatar className="w-6 h-6">
                                      <AvatarImage src={suggestion.assignee.avatar} />
                                      <AvatarFallback className="text-xs">
                                        {suggestion.assignee.name[0]}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs">{suggestion.assignee.name}</span>
                                  </div>
                                  <Badge variant={getPriorityColor(suggestion.priority) as any} className="text-xs">
                                    {suggestion.priority}
                                  </Badge>
                                </div>
                              </>
                            )}
                            
                            <div className="mt-3 p-2 bg-muted/50 rounded text-xs">
                              <span className="font-medium">AI 추천 이유: </span>
                              <span className="text-muted-foreground">{suggestion.reasoning}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 편집 모달 */}
        <Dialog open={isEditingSuggestion} onOpenChange={setIsEditingSuggestion}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>작업 제안 편집</DialogTitle>
              <DialogDescription>
                AI 제안을 검토하고 필요한 경우 수정하세요
              </DialogDescription>
            </DialogHeader>
            
            {selectedSuggestion && (
              <div className="grid grid-cols-2 gap-6">
                {/* 기존 작업 (수정인 경우) */}
                {selectedSuggestion.type === 'modify' && selectedSuggestion.originalTask && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-muted-foreground">기존 작업</h3>
                    <div className="p-4 border rounded-lg bg-muted/20">
                      <div className="space-y-3">
                        <div>
                          <Label>제목</Label>
                          <p className="text-sm">{selectedSuggestion.originalTask.title}</p>
                        </div>
                        <div>
                          <Label>설명</Label>
                          <p className="text-sm">{selectedSuggestion.originalTask.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>우선순위</Label>
                            <p className="text-sm">{selectedSuggestion.originalTask.priority}</p>
                          </div>
                          <div>
                            <Label>마감일</Label>
                            <p className="text-sm">{selectedSuggestion.originalTask.dueDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* 제안된 작업 */}
                <div className="space-y-4">
                  <h3 className="font-medium text-primary">
                    {selectedSuggestion.type === 'modify' ? '수정된 작업' : '신규 작업'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="suggestion-title">제목</Label>
                      <Input
                        id="suggestion-title"
                        defaultValue={selectedSuggestion.title}
                      />
                    </div>
                    <div>
                      <Label htmlFor="suggestion-description">설명</Label>
                      <Textarea
                        id="suggestion-description"
                        defaultValue={selectedSuggestion.description}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="suggestion-priority">우선순위</Label>
                        <Select defaultValue={selectedSuggestion.priority}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">높음</SelectItem>
                            <SelectItem value="Medium">보통</SelectItem>
                            <SelectItem value="Low">낮음</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="suggestion-dueDate">마감일</Label>
                        <Input
                          id="suggestion-dueDate"
                          type="date"
                          defaultValue={selectedSuggestion.dueDate}
                        />
                      </div>
                    </div>
                    {selectedSuggestion.estimatedHours && (
                      <div>
                        <Label htmlFor="suggestion-hours">예상 소요시간 (시간)</Label>
                        <Input
                          id="suggestion-hours"
                          type="number"
                          defaultValue={selectedSuggestion.estimatedHours}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditingSuggestion(false)}>
                취소
              </Button>
              <Button onClick={() => setIsEditingSuggestion(false)}>
                저장
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* 피드백 모달 */}
        <Dialog open={feedbackDialog.open} onOpenChange={(open) => setFeedbackDialog({...feedbackDialog, open})}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {feedbackDialog.type === 'accept' ? '제안 수락' : '제안 거절'}
              </DialogTitle>
              <DialogDescription>
                선택된 {selectedSuggestions.size}개의 제안에 대한 피드백을 작성해주세요
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="feedback">피드백 (선택사항)</Label>
                <Textarea
                  id="feedback"
                  placeholder={feedbackDialog.type === 'accept' ? 
                    '수락 사유나 추가 의견을 작성해주세요...' : 
                    '거절 사유나 개선 의견을 작성해주세요...'
                  }
                  value={feedbackDialog.feedback}
                  onChange={(e) => setFeedbackDialog({...feedbackDialog, feedback: e.target.value})}
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setFeedbackDialog({...feedbackDialog, open: false})}
              >
                취소
              </Button>
              <Button 
                variant={feedbackDialog.type === 'accept' ? 'default' : 'destructive'}
                onClick={handleConfirmAction}
              >
                {feedbackDialog.type === 'accept' ? '수락' : '거절'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1>작업 관리</h1>
          <p className="text-muted-foreground">팀의 작업을 체계적으로 관리하세요</p>
        </div>
        <div className="flex space-x-3">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                새 작업 생성
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>새 작업 생성</DialogTitle>
                <DialogDescription>
                  새로운 작업을 생성합니다
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">제목</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    placeholder="작업 제목을 입력하세요"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">설명</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    placeholder="상세 설명을 입력하세요"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">우선순위</Label>
                    <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="우선순위 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">높음</SelectItem>
                        <SelectItem value="Medium">보통</SelectItem>
                        <SelectItem value="Low">낮음</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assignee">담당자</Label>
                    <Input
                      id="assignee"
                      value={newTask.assignee}
                      onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                      placeholder="담당자명"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">마감일</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    취소
                  </Button>
                  <Button onClick={handleCreateTask}>
                    생성
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          {hasPendingSuggestions ? (
            <Button 
              variant="outline" 
              className="relative"
              onClick={handleReviewSuggestions}
            >
              <Wand2 className="w-4 h-4 mr-2" />
              작업 제안 리뷰
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
          ) : (
            <Button 
              variant="outline"
              onClick={handleGenerateTaskSuggestions}
            >
              <Wand2 className="w-4 h-4 mr-2" />
              작업 제안 생성
            </Button>
          )}
          
          <Button 
            variant="outline"
            onClick={() => setIsPrdEditorOpen(true)}
          >
            <FileText className="w-4 h-4 mr-2" />
            PRD
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="flex space-x-6 h-full min-w-max">
          {columns.map((column) => (
            <div key={column.id} className="w-80 flex flex-col">
              <div className={`border-t-4 ${column.color} bg-card rounded-t-lg p-4`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{column.title}</h3>
                  <Badge variant="secondary">{tasks[column.id as keyof typeof tasks].length}</Badge>
                </div>
              </div>
              
              <div className="flex-1 bg-card/50 p-4 space-y-3 min-h-96 border-l border-r border-b rounded-b-lg">
                {tasks[column.id as keyof typeof tasks].length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                      <Plus className="w-6 h-6" />
                    </div>
                    <p className="text-sm">작업이 없습니다</p>
                  </div>
                ) : (
                  tasks[column.id as keyof typeof tasks].map((task: Task) => (
                    <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <CardTitle className="text-sm">{task.id}</CardTitle>
                            <Badge variant={getPriorityColor(task.priority) as any} className="text-xs">
                              {task.priority}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <h4 className="font-medium mb-2">{task.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {task.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="w-3 h-3" />
                              <span>{task.comments}</span>
                            </div>
                            {task.attachments && task.attachments > 0 && (
                              <div className="flex items-center space-x-1">
                                <Paperclip className="w-3 h-3" />
                                <span>{task.attachments}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(task.dueDate).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={task.assignee.avatar} />
                              <AvatarFallback className="text-xs">
                                {task.assignee.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{task.assignee.name}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}