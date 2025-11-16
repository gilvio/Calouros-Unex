import { Course, AppEvent, FAQItem, ChatMessage, User, Role, Page } from './types';

export const MOCK_USER: User = {
  id: 'user-1',
  name: 'Ana Bia',
  email: 'ana@exemplo.com',
  role: Role.Student,
  course: 'Enfermagem',
  avatarUrl: 'https://picsum.photos/seed/user1/100/100',
};

export const COURSES: Course[] = [
  {
    id: 'enfermagem',
    name: 'Enfermagem',
    coordinator: { id: 'coord-1', name: 'Prof. Dra. Maria Souza', email: 'maria.s@unex.edu.br' },
    matrix: [
      { semester: 1, subjects: [{ name: 'Anatomia Humana', workload: 80 }, { name: 'Bioquímica', workload: 60 }, { name: 'Fundamentos de Enfermagem', workload: 120 }] },
      { semester: 2, subjects: [{ name: 'Fisiologia', workload: 80 }, { name: 'Microbiologia', workload: 60 }, { name: 'Saúde Coletiva I', workload: 90 }] },
    ],
    professors: [
      { id: 'prof-1', name: 'Dr. Carlos Andrade', email: 'carlos.a@unex.edu.br', avatarUrl: 'https://picsum.photos/seed/prof1/100/100', subjects: ['Anatomia Humana'] },
      { id: 'prof-2', name: 'Dra. Beatriz Lima', email: 'beatriz.l@unex.edu.br', avatarUrl: 'https://picsum.photos/seed/prof2/100/100', subjects: ['Bioquímica', 'Fisiologia'] },
    ],
    schedule: [
        { day: 'Segunda', time: '08:00 - 10:00', subject: 'Anatomia Humana', professor: 'Dr. Carlos Andrade', location: 'Lab. Morfofuncional' },
        { day: 'Terça', time: '10:00 - 12:00', subject: 'Bioquímica', professor: 'Dra. Beatriz Lima', location: 'Sala 101' },
        { day: 'Quarta', time: '08:00 - 12:00', subject: 'Fundamentos de Enfermagem', professor: 'Prof. Dra. Maria Souza', location: 'Lab. de Enfermagem' },
    ],
    materials: [
        { title: 'Plano de Ensino - Anatomia', url: '#' },
        { title: 'Slide Aula 1 - Bioquímica', url: '#' },
    ]
  },
  {
    id: 'sistemas',
    name: 'Sistemas de Informação',
    coordinator: { id: 'coord-2', name: 'Prof. Dr. Ricardo Borges', email: 'ricardo.b@unex.edu.br' },
    matrix: [
      { semester: 1, subjects: [{ name: 'Algoritmos e Lógica de Programação', workload: 120 }, { name: 'Fundamentos de Sistemas de Informação', workload: 80 }, { name: 'Matemática Discreta', workload: 80 }] },
      { semester: 2, subjects: [{ name: 'Estrutura de Dados', workload: 120 }, { name: 'Engenharia de Software I', workload: 80 }, { name: 'Banco de Dados I', workload: 80 }] },
    ],
     professors: [
      { id: 'prof-3', name: 'Dr. João Ferreira', email: 'joao.f@unex.edu.br', avatarUrl: 'https://picsum.photos/seed/prof3/100/100', subjects: ['Algoritmos', 'Estrutura de Dados'] },
      { id: 'prof-4', name: 'Dra. Lúcia Pereira', email: 'lucia.p@unex.edu.br', avatarUrl: 'https://picsum.photos/seed/prof4/100/100', subjects: ['Engenharia de Software I', 'Banco de Dados I'] },
    ],
    schedule: [
        { day: 'Segunda', time: '19:00 - 21:00', subject: 'Algoritmos e Lógica de Programação', professor: 'Dr. João Ferreira', location: 'Lab. Info 3' },
        { day: 'Quarta', time: '19:00 - 21:00', subject: 'Matemática Discreta', professor: 'Dra. Lúcia Pereira', location: 'Sala 205' },
    ],
    materials: [
        { title: 'E-book: Entendendo Algoritmos', url: '#' },
        { title: 'Tutorial Instalação PostgreSQL', url: '#' },
    ]
  }
];

export const EVENTS: AppEvent[] = [
  { id: 'event-1', title: 'Prova - Anatomia Humana', courseId: 'enfermagem', start: new Date(2025, 10, 20, 14, 0), end: new Date(2025, 10, 20, 16, 0), location: 'Sala 12', type: 'exam' },
  { id: 'event-2', title: 'Prazo Final Inscrição Monitoria', courseId: 'todos', start: new Date(2025, 10, 25, 23, 59), end: new Date(2025, 10, 25, 23, 59), location: 'Online', type: 'deadline' },
  { id: 'event-3', title: 'Palestra: IA na Saúde', courseId: 'todos', start: new Date(2025, 11, 2, 19, 0), end: new Date(2025, 11, 2, 21, 0), location: 'Auditório Principal', type: 'event' },
  { id: 'event-4', title: 'Prova - Algoritmos', courseId: 'sistemas', start: new Date(2025, 10, 22, 19, 0), end: new Date(2025, 10, 22, 21, 0), location: 'Lab. Info 3', type: 'exam' },
];

export const FAQS: FAQItem[] = [
    { question: 'Como acesso o Portal do Aluno?', answer: 'Você pode acessar o Portal do Aluno através do link no menu principal do site da UNEX. Suas credenciais são seu CPF e a senha enviada para seu e-mail de matrícula.' },
    { question: 'Onde vejo minhas notas e faltas?', answer: 'As notas e a frequência são lançadas no Portal do Aluno. Navegue até a seção "Diário Eletrônico" para visualizar as informações por disciplina.' },
    { question: 'Como funciona o Blackboard?', answer: 'O Blackboard é nossa plataforma de aprendizado online. Lá, os professores postam materiais, atividades e avisos. O acesso é feito com o mesmo login e senha do e-mail institucional.' },
];

export const COMMUNITY_CHAT_MESSAGES: ChatMessage[] = [
    { id: 'msg-c-1', sender: { id: 'user-2', name: 'Carlos', avatarUrl: 'https://picsum.photos/seed/user2/40/40' }, text: 'Pessoal, alguém sabe onde encontro o material da aula de ontem?', timestamp: new Date(new Date().getTime() - 10 * 60000) },
    { id: 'msg-c-2', sender: { id: 'user-3', name: 'Mariana', avatarUrl: 'https://picsum.photos/seed/user3/40/40' }, text: 'O professor postou no Blackboard, na pasta da Aula 5.', timestamp: new Date(new Date().getTime() - 8 * 60000) },
    { id: 'msg-c-3', sender: { id: 'user-1', name: 'Ana Bia', avatarUrl: MOCK_USER.avatarUrl }, text: 'Valeu, Mariana! Encontrei aqui.', timestamp: new Date(new Date().getTime() - 5 * 60000) },
];

export const SUPPORT_CHAT_MESSAGES: ChatMessage[] = [
    { id: 'msg-s-1', sender: { id: 'user-1', name: 'Ana Bia', avatarUrl: MOCK_USER.avatarUrl }, text: 'Olá, estou com um problema para acessar a biblioteca virtual.', timestamp: new Date(new Date().getTime() - 20 * 60000) },
    { id: 'msg-s-2', sender: { id: 'support-1', name: 'Suporte UNEX', avatarUrl: 'https://picsum.photos/seed/support/40/40' }, text: 'Olá Ana, bom dia! Qual mensagem de erro aparece para você?', timestamp: new Date(new Date().getTime() - 19 * 60000) },
];

export const PAGE_CONFIG = {
  [Page.Home]: { name: "Início" },
  [Page.Courses]: { name: "Cursos" },
  [Page.Calendar]: { name: "Calendário" },
  [Page.Chat]: { name: "Chat" },
  [Page.Guide]: { name: "Tutoriais" },
  [Page.Map]: { name: "Mapa" },
  [Page.Profile]: { name: "Perfil" },
  [Page.Admin]: { name: "Admin" },
};