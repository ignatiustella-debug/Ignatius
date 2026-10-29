export interface EducareUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'parent' | 'mentor' | 'guest';
  age?: number;
  gradeOrTitle?: string;
  avatar: string;
  badge: string;
  memberSince: string;
  enrolledCourseIds: string[];
}

export const DEMO_USERS: EducareUser[] = [
  {
    id: 'user-liam',
    name: 'Liam Vance',
    email: 'liam.vance@student.educare.org',
    role: 'student',
    age: 15,
    gradeOrTitle: 'Grade 10 · Innovator',
    avatar: 'LV',
    badge: 'Student Member',
    memberSince: 'Fall 2025',
    enrolledCourseIds: ['robotics-makers-01', 'team-grace-web-studio'],
  },
  {
    id: 'user-elena',
    name: 'Elena Vance',
    email: 'elena.vance@parent.educare.org',
    role: 'parent',
    gradeOrTitle: 'Guardian of Liam & Chloe',
    avatar: 'EV',
    badge: 'Parent & Guardian',
    memberSince: 'Spring 2025',
    enrolledCourseIds: ['robotics-makers-01', 'little-engineers-creators'],
  },
  {
    id: 'user-aris',
    name: 'Dr. Aris Thorne',
    email: 'aris.thorne@faculty.educare.org',
    role: 'mentor',
    gradeOrTitle: 'Robotics & Mechatronics Lead',
    avatar: 'AT',
    badge: 'Faculty Mentor',
    memberSince: 'Founding Faculty',
    enrolledCourseIds: ['robotics-makers-01'],
  },
  {
    id: 'user-guest',
    name: 'Guest Youth Explorer',
    email: 'guest.explorer@educare.org',
    role: 'guest',
    age: 14,
    gradeOrTitle: 'Open Day Explorer',
    avatar: 'GE',
    badge: 'Guest Pass',
    memberSince: 'Today',
    enrolledCourseIds: ['team-grace-web-studio'],
  },
];
