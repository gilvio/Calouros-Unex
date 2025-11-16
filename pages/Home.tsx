
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
    <button onClick={onClick} className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-neutral-light transition-all text-left">
        <div className="p-3 bg-secondary/20 text-secondary rounded-full mr-4">
            {icon}
        </div>
        <div>
            <h3 className="font-semibold text-neutral-dark">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </button>
);


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
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-neutral-dark">Olá, {user.name.split(' ')[0]}!</h2>
        <p className="text-gray-600">Bem-vindo(a) ao seu portal de calouro.</p>
      </div>
      
      {/* Aulas de Hoje */}
      <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-neutral-dark mb-4 flex items-center">
              <BellIcon className="w-6 h-6 text-accent mr-2" />
              Aulas de Hoje
          </h3>
          {todaysClasses.length > 0 ? (
              <ul className="space-y-3">
                  {todaysClasses.map((item, index) => (
                      <li key={index} className="p-3 bg-neutral-light rounded-md border-l-4 border-primary">
                          <p className="font-bold text-neutral-dark">{item.subject}</p>
                          <p className="text-sm text-gray-700">{item.time}</p>
                          <p className="text-sm text-gray-600 font-medium">{item.location}</p>
                      </li>
                  ))}
              </ul>
          ) : (
              <p className="text-sm text-gray-600">Você não tem aulas hoje. Aproveite o dia livre!</p>
          )}
      </div>

       {/* Banner Rotativo */}
      <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden shadow-lg">
          {banners.map((banner, index) => (
               <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBanner ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={banner.img} alt={banner.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 md:p-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">{banner.title}</h3>
                        <p className="text-white/90 mt-2">{banner.description}</p>
                    </div>
               </div>
          ))}
          <button onClick={prevBanner} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/50 rounded-full hover:bg-white transition">
              <ArrowLeftIcon className="w-6 h-6 text-neutral-dark"/>
          </button>
           <button onClick={nextBanner} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/50 rounded-full hover:bg-white transition">
              <ArrowRightIcon className="w-6 h-6 text-neutral-dark"/>
          </button>
      </div>
      
      {/* Acesso Rápido */}
      <div>
          <h3 className="text-xl font-semibold text-neutral-dark mb-4">Acesso Rápido</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <QuickLink 
                icon={<BookOpenIcon className="w-6 h-6"/>}
                title="Meu Curso"
                description="Matriz curricular, horários e professores."
                onClick={() => onNavClick(Page.Courses)}
              />
              <QuickLink 
                icon={<CalendarIcon className="w-6 h-6"/>}
                title="Calendário Acadêmico"
                description="Datas de provas, eventos e prazos."
                onClick={() => onNavClick(Page.Calendar)}
              />
               <QuickLink 
                icon={<ChatBubbleIcon className="w-6 h-6"/>}
                title="Comunidade"
                description="Converse com seus colegas e tire dúvidas."
                onClick={() => onNavClick(Page.Chat)}
              />
          </div>
      </div>

       {/* Notificações Recentes */}
      <div>
          <h3 className="text-xl font-semibold text-neutral-dark mb-4">Notificações Recentes</h3>
           <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
                <div className="flex items-start">
                    <div className="p-2 bg-accent/20 text-accent rounded-full mr-3">
                        <BellIcon className="w-5 h-5"/>
                    </div>
                    <div>
                        <p className="font-semibold">Aviso da Coordenação</p>
                        <p className="text-sm text-gray-600">Ajuste no horário da aula de Anatomia na próxima segunda-feira. Confira o novo horário.</p>
                        <p className="text-xs text-gray-400 mt-1">2 horas atrás</p>
                    </div>
                </div>
                 <div className="flex items-start border-t pt-4">
                    <div className="p-2 bg-accent/20 text-accent rounded-full mr-3">
                        <BellIcon className="w-5 h-5"/>
                    </div>
                    <div>
                        <p className="font-semibold">Novo Material Disponível</p>
                        <p className="text-sm text-gray-600">O professor de Bioquímica adicionou os slides da Aula 3 no Blackboard.</p>
                        <p className="text-xs text-gray-400 mt-1">Ontem</p>
                    </div>
                </div>
           </div>
      </div>
    </div>
  );
};
