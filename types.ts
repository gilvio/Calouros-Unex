
export enum Role {
  Student = 'student',
  Teacher = 'teacher',
  Coordination = 'coordination',
  Admin = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  course: string;
  avatarUrl: string;
}

export interface Subject {
  name: string;
  workload: number;
}

export interface Curriculum {
  semester: number;
  subjects: Subject[];
}

export interface Professor {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  subjects: string[];
}

export interface ScheduleItem {
  day: 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta';
  time: string;
  subject: string;
  professor: string;
  location: string;
}

export interface Course {
  id: string;
  name: string;
  matrix: Curriculum[];
  coordinator: {
    id: string;
    name: string;
    email: string;
  };
  professors: Professor[];
  schedule: ScheduleItem[];
  materials: { title: string; url: string; }[];
}

export interface AppEvent {
  id: string;
  title: string;
  courseId: string;
  start: Date;
  end: Date;
  location: string;
  type: 'exam' | 'event' | 'deadline' | 'registration';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  sender: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  text: string;
  timestamp: Date;
}

export enum Page {
  Home,
  Courses,
  Calendar,
  Chat,
  Guide,
  Map,
  Profile,
  Admin
}
