import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Clock,
  Plus,
  Users,
  MessageSquare,
  LayoutGrid,
  Calendar,
  Share2,
  Heart,
  Search,
  Filter,
  CheckSquare,
  Terminal,
  ExternalLink,
  Award,
  LogOut,
} from 'lucide-react';
import { EducareUser } from '../types/auth';
import { CertificateModal } from './CertificateModal';

interface TeamGraceAppProps {
  onBackToEducare: () => void;
  onEnrollInTrack: () => void;
  currentUser?: EducareUser | null;
  onSignOut?: () => void;
}

interface Task {
  id: string;
  title: string;
  category: 'Design' | 'Robotics' | 'Web Dev' | 'AI & Data';
  assignee: string;
  status: 'todo' | 'inprogress' | 'review' | 'done';
  dueDate: string;
}

interface Post {
  id: string;
  author: string;
  role: string;
  time: string;
  content: string;
  likes: number;
  liked: boolean;
  commentsCount: number;
  tag: string;
}

export const TeamGraceApp: React.FC<TeamGraceAppProps> = ({
  onBackToEducare,
  onEnrollInTrack,
  currentUser,
  onSignOut,
}) => {
  const [activeTab, setActiveTab] = useState<'board' | 'feed' | 'roster' | 'sprint'>('board');
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 't-1',
      title: 'Assemble ultrasonic sensor bracket on autonomous rover chassis',
      category: 'Robotics',
      assignee: 'Liam Vance',
      status: 'done',
      dueDate: 'Yesterday',
    },
    {
      id: 't-2',
      title: 'Build interactive navigation drawer & dark mode palette',
      category: 'Design',
      assignee: 'Grace Kim',
      status: 'inprogress',
      dueDate: 'Today 5:00 PM',
    },
    {
      id: 't-3',
      title: 'Deploy AI classification endpoint to Google Cloud Run',
      category: 'AI & Data',
      assignee: 'Maya Patel',
      status: 'inprogress',
      dueDate: 'Tomorrow',
    },
    {
      id: 't-4',
      title: 'Write test suite for real-time WebSocket state synchronization',
      category: 'Web Dev',
      assignee: 'Tariq Mansoor',
      status: 'review',
      dueDate: 'Friday',
    },
    {
      id: 't-5',
      title: 'Draft community outreach presentation for youth hackathon',
      category: 'Design',
      assignee: 'Sophie Chen',
      status: 'todo',
      dueDate: 'Next Monday',
    },
  ]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 'p-1',
      author: 'Grace Kim',
      role: 'Team Lead & UI Designer · Age 16',
      time: '2 hours ago',
      content:
        '🚀 Excited to share that our team app is now running directly inside AI Studio! We just hooked up the live sprint tracking and member roster. What feature should we code next for our project demo day?',
      likes: 14,
      liked: false,
      commentsCount: 5,
      tag: 'Milestone',
    },
    {
      id: 'p-2',
      author: 'Maya Patel',
      role: 'AI & Data Lead · Age 15',
      time: '5 hours ago',
      content:
        'Just validated the computer vision dataset in the lab! The rover detects path boundaries with 98.4% precision under bright studio lighting. Thanks Liam for printing the new camera mount!',
      likes: 9,
      liked: true,
      commentsCount: 3,
      tag: 'Robotics',
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'Design' | 'Robotics' | 'Web Dev' | 'AI & Data'>('Web Dev');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const [newPostContent, setNewPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `t-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      assignee: 'Grace Kim',
      status: 'todo',
      dueDate: 'Next Week',
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setIsAddingTask(false);
  };

  const handleMoveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: `p-${Date.now()}`,
      author: 'Guest Contributor (You)',
      role: 'Educare Student Fellow',
      time: 'Just now',
      content: newPostContent.trim(),
      likes: 1,
      liked: true,
      commentsCount: 0,
      tag: 'Youth Collab',
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setIsPosting(false);
  };

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            liked: !p.liked,
            likes: p.liked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Banner / Breadcrumb back to Educare */}
      <div className="bg-stone-950 px-4 py-2.5 border-b border-stone-800 flex items-center justify-between text-xs">
        <button
          onClick={onBackToEducare}
          className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer font-medium"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Exit to Educare Center</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-stone-400">
            Running directly in <strong>Google AI Studio</strong>
          </span>
          <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded text-[11px] font-mono">
            LIVE APP
          </span>
          <button
            onClick={() => setCertModalOpen(true)}
            className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded text-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5 fill-current" />
            <span>Web Studio Exam & Certificate</span>
          </button>
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sign out of Educare"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          )}
        </div>
      </div>

      {/* Team Grace App Navigation Bar */}
      <header className="bg-stone-900 border-b border-stone-800 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center font-bold text-white text-base shadow-sm font-display">
            G
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-white font-display flex items-center gap-2">
              <span>Team Grace</span>
              <span className="text-[10px] text-stone-400 font-mono uppercase bg-stone-800 px-1.5 py-0.5 rounded">
                v2.4
              </span>
            </div>
            <div className="text-[11px] text-stone-400 hidden sm:block">
              Youth Collaborative Engineering & Innovation Space
            </div>
          </div>
        </div>

        {/* App Tabs */}
        <nav className="flex items-center gap-1 bg-stone-800/80 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('board')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'board'
                ? 'bg-rose-600 text-white font-semibold shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Sprint Board</span>
          </button>
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'feed'
                ? 'bg-rose-600 text-white font-semibold shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Community Feed</span>
          </button>
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'roster'
                ? 'bg-rose-600 text-white font-semibold shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Team Roster</span>
          </button>
          <button
            onClick={() => setActiveTab('sprint')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sprint'
                ? 'bg-rose-600 text-white font-semibold shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Lab Hub</span>
          </button>
        </nav>

        {/* User profile capsule */}
        <div className="hidden md:flex items-center gap-2.5 pl-3 border-l border-stone-800">
          <div className="w-8 h-8 rounded-full bg-rose-500/30 text-rose-300 border border-rose-500/40 flex items-center justify-center font-bold text-xs">
            GK
          </div>
          <div className="text-left text-xs">
            <div className="font-semibold text-stone-200">Grace Kim</div>
            <div className="text-[10px] text-stone-400">Team Lead · Online</div>
          </div>
        </div>
      </header>

      {/* Main App Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* TAB 1: SPRINT BOARD */}
        {activeTab === 'board' && (
          <div className="space-y-6">
            {/* Header of board */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <h2 className="text-2xl font-bold font-display text-white">
                  Sprint #14: Autonomous Robotics & Web Platform
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  12 Active youth engineering deliverables · Target: Regional Demo Day
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddingTask(true)}
                  className="px-3.5 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Deliverable</span>
                </button>
              </div>
            </div>

            {/* Quick add modal/inline form */}
            {isAddingTask && (
              <form
                onSubmit={handleAddTask}
                className="p-4 rounded-xl bg-stone-800 border border-rose-500/40 space-y-3 animate-fade-in"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                    Add Team Grace Deliverable
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsAddingTask(false)}
                    className="text-stone-400 hover:text-white text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Task description (e.g. Test LiDAR distance threshold)..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="sm:col-span-2 px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-rose-400"
                  />
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value as any)}
                    className="px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-rose-400"
                  >
                    <option value="Web Dev">Web Dev</option>
                    <option value="Robotics">Robotics</option>
                    <option value="Design">Design</option>
                    <option value="AI & Data">AI & Data</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-md cursor-pointer"
                  >
                    Post Task to Board
                  </button>
                </div>
              </form>
            )}

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Col 1: Todo */}
              <div className="bg-stone-800/50 rounded-xl p-3 border border-stone-800 flex flex-col min-h-[380px]">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-700 text-xs font-bold text-stone-300">
                  <span>To Do</span>
                  <span className="bg-stone-700 px-2 py-0.5 rounded text-[11px]">
                    {tasks.filter((t) => t.status === 'todo').length}
                  </span>
                </div>
                <div className="space-y-2.5 flex-1">
                  {tasks
                    .filter((t) => t.status === 'todo')
                    .map((task) => (
                      <div
                        key={task.id}
                        className="p-3 rounded-lg bg-stone-900 border border-stone-700/80 shadow-xs space-y-2 hover:border-stone-500 transition-colors"
                      >
                        <div className="flex items-center justify-between text-[10px] text-stone-400">
                          <span className="bg-stone-800 px-1.5 py-0.5 rounded text-rose-300">
                            {task.category}
                          </span>
                          <span>{task.dueDate}</span>
                        </div>
                        <p className="text-xs font-medium text-stone-200 leading-snug">
                          {task.title}
                        </p>
                        <div className="flex items-center justify-between pt-1 text-[11px] text-stone-400">
                          <span>{task.assignee}</span>
                          <button
                            onClick={() => handleMoveTask(task.id, 'inprogress')}
                            className="text-rose-400 hover:text-rose-300 underline cursor-pointer text-[10px]"
                          >
                            Start →
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Col 2: In Progress */}
              <div className="bg-stone-800/50 rounded-xl p-3 border border-stone-800 flex flex-col min-h-[380px]">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-700 text-xs font-bold text-amber-400">
                  <span>In Progress</span>
                  <span className="bg-stone-700 px-2 py-0.5 rounded text-[11px] text-stone-300">
                    {tasks.filter((t) => t.status === 'inprogress').length}
                  </span>
                </div>
                <div className="space-y-2.5 flex-1">
                  {tasks
                    .filter((t) => t.status === 'inprogress')
                    .map((task) => (
                      <div
                        key={task.id}
                        className="p-3 rounded-lg bg-stone-900 border border-amber-500/40 shadow-xs space-y-2"
                      >
                        <div className="flex items-center justify-between text-[10px] text-stone-400">
                          <span className="bg-stone-800 px-1.5 py-0.5 rounded text-amber-300">
                            {task.category}
                          </span>
                          <span>{task.dueDate}</span>
                        </div>
                        <p className="text-xs font-medium text-stone-200 leading-snug">
                          {task.title}
                        </p>
                        <div className="flex items-center justify-between pt-1 text-[11px] text-stone-400">
                          <span>{task.assignee}</span>
                          <button
                            onClick={() => handleMoveTask(task.id, 'review')}
                            className="text-amber-400 hover:text-amber-300 underline cursor-pointer text-[10px]"
                          >
                            Submit Review →
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Col 3: Review */}
              <div className="bg-stone-800/50 rounded-xl p-3 border border-stone-800 flex flex-col min-h-[380px]">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-700 text-xs font-bold text-sky-400">
                  <span>Peer Review</span>
                  <span className="bg-stone-700 px-2 py-0.5 rounded text-[11px] text-stone-300">
                    {tasks.filter((t) => t.status === 'review').length}
                  </span>
                </div>
                <div className="space-y-2.5 flex-1">
                  {tasks
                    .filter((t) => t.status === 'review')
                    .map((task) => (
                      <div
                        key={task.id}
                        className="p-3 rounded-lg bg-stone-900 border border-sky-500/40 shadow-xs space-y-2"
                      >
                        <div className="flex items-center justify-between text-[10px] text-stone-400">
                          <span className="bg-stone-800 px-1.5 py-0.5 rounded text-sky-300">
                            {task.category}
                          </span>
                          <span>{task.dueDate}</span>
                        </div>
                        <p className="text-xs font-medium text-stone-200 leading-snug">
                          {task.title}
                        </p>
                        <div className="flex items-center justify-between pt-1 text-[11px] text-stone-400">
                          <span>{task.assignee}</span>
                          <button
                            onClick={() => handleMoveTask(task.id, 'done')}
                            className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer text-[10px]"
                          >
                            Approve & Close ✓
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Col 4: Done */}
              <div className="bg-stone-800/50 rounded-xl p-3 border border-stone-800 flex flex-col min-h-[380px]">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-700 text-xs font-bold text-emerald-400">
                  <span>Completed</span>
                  <span className="bg-stone-700 px-2 py-0.5 rounded text-[11px] text-stone-300">
                    {tasks.filter((t) => t.status === 'done').length}
                  </span>
                </div>
                <div className="space-y-2.5 flex-1">
                  {tasks
                    .filter((t) => t.status === 'done')
                    .map((task) => (
                      <div
                        key={task.id}
                        className="p-3 rounded-lg bg-stone-900/60 border border-stone-800 text-stone-400 space-y-2 opacity-80"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="line-through">{task.category}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        </div>
                        <p className="text-xs text-stone-400 line-through leading-snug">
                          {task.title}
                        </p>
                        <div className="text-[10px] text-stone-500">
                          Completed by {task.assignee}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMMUNITY FEED */}
        {activeTab === 'feed' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Create Post Card */}
            <div className="p-4 rounded-xl bg-stone-800 border border-stone-700 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-300">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Share a Project Update with Team Grace</span>
              </div>
              <form onSubmit={handleCreatePost} className="space-y-2">
                <textarea
                  rows={2}
                  placeholder="What did you build or test today in the lab?..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full p-3 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-rose-400 resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    Post to Team Feed
                  </button>
                </div>
              </form>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-5 rounded-xl bg-stone-800/80 border border-stone-700/80 space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 text-white flex items-center justify-center font-bold text-xs font-display">
                        {post.author.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{post.author}</div>
                        <div className="text-[11px] text-stone-400">{post.role} · {post.time}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold bg-stone-700 text-rose-300 px-2 py-0.5 rounded">
                      {post.tag}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                    {post.content}
                  </p>

                  <div className="pt-3 border-t border-stone-700/60 flex items-center gap-6 text-xs text-stone-400">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                        post.liked ? 'text-rose-400 font-bold' : 'hover:text-white'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${post.liked ? 'fill-current' : ''}`} />
                      <span>{post.likes} Likes</span>
                    </button>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.commentsCount} Comments</span>
                    </div>
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer ml-auto">
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TEAM ROSTER */}
        {activeTab === 'roster' && (
          <div className="space-y-6">
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold text-white font-display">Team Grace Cohort Roster</h3>
              <p className="text-xs text-stone-400 mt-1">
                A multidisciplinary youth squad uniting frontend engineers, mechatronics designers, and data researchers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'Grace Kim',
                  role: 'Team Lead & UI Systems Architect',
                  age: 16,
                  specialty: 'React, Tailwind, Prototyping in AI Studio',
                  commits: '48 Commits this month',
                  avatar: 'GK',
                },
                {
                  name: 'Liam Vance',
                  role: 'Mechatronics & Hardware Integration',
                  age: 15,
                  specialty: 'ESP32 Firmware, 3D Tolerances, Soldering',
                  commits: '34 Commits this month',
                  avatar: 'LV',
                },
                {
                  name: 'Maya Patel',
                  role: 'Computer Vision & AI Modeling',
                  age: 15,
                  specialty: 'Python 3.12, Neural Pathfinding, OpenCV',
                  commits: '29 Commits this month',
                  avatar: 'MP',
                },
                {
                  name: 'Tariq Mansoor',
                  role: 'Cloud Backend & State Synchronization',
                  age: 17,
                  specialty: 'REST APIs, Cloud Run, WebSocket telemetry',
                  commits: '52 Commits this month',
                  avatar: 'TM',
                },
                {
                  name: 'Sophie Chen',
                  role: 'Research & Policy Documentation',
                  age: 16,
                  specialty: 'Technical writing, empirical analysis, pitch',
                  commits: '19 Dossiers published',
                  avatar: 'SC',
                },
              ].map((member, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-stone-800/80 border border-stone-700/80 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 text-white flex items-center justify-center font-bold text-sm font-display">
                      {member.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{member.name}</div>
                      <div className="text-[11px] text-rose-300">{member.role} ({member.age} yrs)</div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-stone-700/60 space-y-1 text-xs">
                    <div className="text-stone-300 font-medium">Core Skills:</div>
                    <div className="text-stone-400 text-[11px]">{member.specialty}</div>
                    <div className="text-emerald-400 text-[10px] pt-1">{member.commits}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LAB HUB & SPRINT */}
        {activeTab === 'sprint' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-stone-800/90 border border-rose-500/40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Team Grace Live Cloud Workspace
              </h3>
              <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                This full-stack application environment is hosted directly on Google AI Studio. Educare students learn the entire development cycle: drafting UI tokens, writing reactive state, connecting real backend APIs, and deploying live production builds.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={onEnrollInTrack}
                  className="px-5 py-2.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Join the Full-Stack AI Studio Cohort ($0 Free)
                </button>
                <button
                  onClick={onBackToEducare}
                  className="px-4 py-2.5 text-xs font-medium text-stone-300 hover:text-white bg-stone-700 rounded-lg cursor-pointer"
                >
                  Return to Educare Catalog
                </button>
              </div>
            </div>

            {/* Architecture Card */}
            <div className="p-5 rounded-xl bg-stone-800 border border-stone-700 space-y-3 text-xs text-stone-300">
              <div className="font-bold text-white uppercase tracking-wider text-[11px]">
                Under the Hood: Team Grace Architecture
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800">
                  <span className="text-[10px] text-stone-500 block">Runtime</span>
                  <span className="font-semibold text-rose-400 mt-1 block">React 19 + Vite</span>
                </div>
                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800">
                  <span className="text-[10px] text-stone-500 block">Language</span>
                  <span className="font-semibold text-rose-400 mt-1 block">TypeScript 5</span>
                </div>
                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800">
                  <span className="text-[10px] text-stone-500 block">Platform</span>
                  <span className="font-semibold text-amber-400 mt-1 block">Google AI Studio</span>
                </div>
                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800">
                  <span className="text-[10px] text-stone-500 block">Tuition</span>
                  <span className="font-semibold text-emerald-400 mt-1 block">100% Free ($0)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Universal Level Quiz & Real Certificate Modal */}
      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        courseId="team-grace-web-studio"
        courseTitle="Team Grace Web & AI Studio"
        levelNumber={1}
        levelTitle="Level 1: Semantic Web & Design Architecture"
        tier="Beginner"
        currentUser={currentUser}
      />
    </div>
  );
};
