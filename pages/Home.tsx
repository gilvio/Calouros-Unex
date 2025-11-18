
import React, { useState, useEffect } from 'react';
import { User, Page } from '../types';
import { BookOpenIcon, CalendarIcon, ChatBubbleIcon, ArrowLeftIcon, ArrowRightIcon, BellIcon } from '../components/Icons';
import { COURSES } from '../constants';

interface HomeProps {
  user: User;
  onNavClick: (page: Page) => void;
}

const banners = [
    { title: "Inscrições Abertas para Monitoria!", description: "Ajude seus colegas e ganhe horas complementares. Inscrições até 25/11.", img: "https://picsum.photos/seed/banner1/1200/400" },
    { title: "Palestra: O Futuro da Inteligência Artificial", description: "Participe da palestra com o Dr. Evan You no auditório principal. Dia 02/12 às 19h.", img: "https://picsum.photos/seed/banner2/1200/400" },
    { title: "Semana de Provas se Aproxima!", description: "Confira o calendário acadêmico e prepare-se para as avaliações do semestre.", img: "https://picsum.photos/seed/banner3/1200/400" },
];

const QuickLink: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; }> = ({ icon, title, description, onClick }) => (
    <button onClick={onClick} className="flex items-start p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md hover:bg-neutral-light dark:hover:bg-neutral-700 transition-all text-left h-full">
        <div className="p-3 bg-secondary/20 text-secondary dark:bg-secondary/10 dark:text-blue-400 rounded-full mr-4 shrink-0">
            {icon}
        </div>
        <div>
            <h3 className="font-semibold text-neutral-dark dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    </button>
);

const QuickNotes: React.FC = () => {
    const [note, setNote] = useState('');

    return (
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
                 <h3 className="font-semibold text-neutral-dark dark:text-white flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Bloco de Notas
                 </h3>
                 <span className="text-xs text-gray-400">Salvo automaticamente</span>
            </div>
            <textarea 
                className="flex-1 w-full p-3 bg-yellow-50 dark:bg-neutral-700 rounded-md border-0 resize-none text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-accent placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Anote sala, lembretes ou tarefas rápidas..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
            ></textarea>
        </div>
    );
};


export const Home: React.FC<HomeProps> = ({ user, onNavClick }) => {
    const [currentBanner, setCurrentBanner] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
    const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

    const userCourse = COURSES.find(course => course.name === user.course);
    const dayNames: ('Domingo' | 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado')[] = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const todayName = dayNames[new Date().getDay()];
    const todaysClasses = userCourse?.schedule.filter(item => item.day === todayName) || [];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end">
        <div>
            <h2 className="text-3xl font-bold text-neutral-dark dark:text-white">Olá, {user.name.split(' ')[0]}!</h2>
            <p className="text-gray-600 dark:text-gray-400">Bem-vindo(a) ao seu portal de calouro.</p>
        </div>
        <p className="text-sm font-medium text-primary dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full mt-2 md:mt-0">
            {todayName}, {new Date().toLocaleDateString('pt-BR')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal (Banner + Acesso Rápido) */}
          <div className="lg:col-span-2 space-y-6">
               {/* Banner Rotativo */}
              <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden shadow-lg group">
                  {banners.map((banner, index) => (
                       <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBanner ? 'opacity-100' : 'opacity-0'}`}>
                            <img src={banner.img} alt={banner.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-xl sm:text-2xl font-bold text-white">{banner.title}</h3>
                                <p className="text-white/90 mt-1 text-sm sm:text-base line-clamp-2">{banner.description}</p>
                            </div>
                       </div>
                  ))}
                  <button onClick={prevBanner} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition text-white">
                      <ArrowLeftIcon className="w-5 h-5"/>
                  </button>
                   <button onClick={nextBanner} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition text-white">
                      <ArrowRightIcon className="w-5 h-5"/>
                  </button>
              </div>

               {/* Acesso Rápido */}
              <div>
                  <h3 className="text-lg font-bold text-neutral-dark dark:text-white mb-3">Acesso Rápido</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <QuickLink 
                        icon={<BookOpenIcon className="w-6 h-6"/>}
                        title="Meu Curso"
                        description="Matriz, horários e profs."
                        onClick={() => onNavClick(Page.Courses)}
                      />
                      <QuickLink 
                        icon={<CalendarIcon className="w-6 h-6"/>}
                        title="Calendário"
                        description="Provas e eventos."
                        onClick={() => onNavClick(Page.Calendar)}
                      />
                       <QuickLink 
                        icon={<ChatBubbleIcon className="w-6 h-6"/>}
                        title="Comunidade"
                        description="Tire suas dúvidas."
                        onClick={() => onNavClick(Page.Chat)}
                      />
                  </div>
              </div>
          </div>

          {/* Coluna Lateral (Agenda + Notas) */}
          <div className="space-y-6 flex flex-col">
                {/* Aulas de Hoje */}
                <div className="bg-white dark:bg-neutral-800 p-5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-neutral-dark dark:text-white mb-4 flex items-center justify-between">
                        <span>Aulas de Hoje</span>
                        <span className="bg-primary/10 text-primary dark:text-blue-400 dark:bg-blue-900/30 text-xs px-2 py-1 rounded-full">{todaysClasses.length} aulas</span>
                    </h3>
                    {todaysClasses.length > 0 ? (
                        <ul className="space-y-3">
                            {todaysClasses.map((item, index) => (
                                <li key={index} className="flex gap-3 pb-3 border-b border-gray-50 dark:border-gray-700 last:border-0 last:pb-0">
                                    <div className="flex flex-col items-center justify-center w-12 bg-neutral-light dark:bg-neutral-700 rounded text-xs font-bold text-gray-500 dark:text-gray-300 p-1 h-fit">
                                        {item.time.split(' - ')[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-neutral-dark dark:text-white text-sm">{item.subject}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            {item.location}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Você não tem aulas hoje. Aproveite para estudar!</p>
                        </div>
                    )}
                </div>

                {/* Widget de Notas */}
                <div className="flex-1 min-h-[200px]">
                    <QuickNotes />
                </div>
          </div>
      </div>

       {/* Notificações Recentes */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-bold text-neutral-dark dark:text-white mb-4">Últimos Avisos</h3>
           <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-4 space-y-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-start hover:bg-gray-50 dark:hover:bg-neutral-700 p-2 rounded transition-colors cursor-pointer">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 rounded-full mr-3 shrink-0">
                        <BellIcon className="w-5 h-5"/>
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-neutral-dark dark:text-white">Aviso da Coordenação</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Ajuste no horário da aula de Anatomia na próxima segunda-feira. Confira o novo horário no quadro de avisos.</p>
                        <p className="text-xs text-gray-400 mt-1">2 horas atrás</p>
                    </div>
                </div>
                 <div className="flex items-start border-t border-gray-100 dark:border-gray-700 pt-4 hover:bg-gray-50 dark:hover:bg-neutral-700 p-2 rounded transition-colors cursor-pointer">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-full mr-3 shrink-0">
                         <BookOpenIcon className="w-5 h-5"/>
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-neutral-dark dark:text-white">Novo Material Disponível</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">O professor de Bioquímica adicionou os slides da Aula 3 no Blackboard.</p>
                        <p className="text-xs text-gray-400 mt-1">Ontem</p>
                    </div>
                </div>
           </div>
      </div>
    </div>
  );
};
