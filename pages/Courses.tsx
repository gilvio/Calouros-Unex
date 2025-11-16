
import React, { useState } from 'react';
import { Course, Curriculum, Professor, ScheduleItem, Subject } from '../types';
import { COURSES } from '../constants';

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
      active ? 'bg-white text-primary border-b-2 border-primary' : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    {children}
  </button>
);

const CurriculumView: React.FC<{ matrix: Curriculum[] }> = ({ matrix }) => (
    <div className="space-y-6">
        {matrix.map(sem => (
            <div key={sem.semester}>
                <h4 className="text-lg font-semibold text-neutral-dark mb-2">{sem.semester}º Semestre</h4>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white text-sm">
                        <thead className="bg-neutral-light">
                            <tr>
                                <th className="text-left font-semibold p-3">Disciplina</th>
                                <th className="text-right font-semibold p-3">Carga Horária</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sem.subjects.map((sub, idx) => (
                                <tr key={idx} className="border-b">
                                    <td className="p-3">{sub.name}</td>
                                    <td className="p-3 text-right">{sub.workload}h</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ))}
    </div>
);

const ProfessorsView: React.FC<{ professors: Professor[] }> = ({ professors }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {professors.map(prof => (
            <div key={prof.id} className="bg-white rounded-lg p-4 flex items-center space-x-4 shadow-sm">
                <img src={prof.avatarUrl} alt={prof.name} className="w-16 h-16 rounded-full"/>
                <div>
                    <p className="font-bold text-neutral-dark">{prof.name}</p>
                    <p className="text-sm text-secondary hover:underline cursor-pointer">{prof.email}</p>
                    <p className="text-xs text-gray-500 mt-1">{prof.subjects.join(', ')}</p>
                </div>
            </div>
        ))}
    </div>
);

const ScheduleView: React.FC<{ schedule: ScheduleItem[] }> = ({ schedule }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm">
            <thead className="bg-neutral-light">
                <tr>
                    <th className="text-left font-semibold p-3">Dia</th>
                    <th className="text-left font-semibold p-3">Horário</th>
                    <th className="text-left font-semibold p-3">Disciplina</th>
                    <th className="text-left font-semibold p-3">Professor</th>
                    <th className="text-left font-semibold p-3">Local</th>
                </tr>
            </thead>
            <tbody>
                {schedule.map((item, idx) => (
                    <tr key={idx} className="border-b">
                        <td className="p-3 font-medium">{item.day}</td>
                        <td className="p-3">{item.time}</td>
                        <td className="p-3">{item.subject}</td>
                        <td className="p-3">{item.professor}</td>
                        <td className="p-3">{item.location}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const MaterialsView: React.FC<{ materials: { title: string; url: string; }[], coordinator: Course['coordinator'] }> = ({ materials, coordinator }) => (
    <div className="space-y-4">
        <div>
            <h4 className="text-lg font-semibold text-neutral-dark mb-2">Coordenação do Curso</h4>
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-bold">{coordinator.name}</p>
                <p className="text-sm text-secondary hover:underline cursor-pointer">{coordinator.email}</p>
            </div>
        </div>
        <div>
             <h4 className="text-lg font-semibold text-neutral-dark mb-2">Materiais e Links Úteis</h4>
             <ul className="bg-white p-4 rounded-lg shadow-sm space-y-2">
                 {materials.map((mat, idx) => (
                     <li key={idx}>
                         <a href={mat.url} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline hover:text-primary transition-colors">{mat.title}</a>
                     </li>
                 ))}
             </ul>
        </div>
    </div>
);


const CourseDetail: React.FC<{ course: Course; onBack: () => void }> = ({ course, onBack }) => {
    const [activeTab, setActiveTab] = useState('matrix');
    
    return (
        <div className="space-y-4">
            <button onClick={onBack} className="text-sm text-secondary font-medium hover:underline">&larr; Voltar para lista de cursos</button>
            <h2 className="text-3xl font-bold text-neutral-dark">{course.name}</h2>
            
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-4">
                    <TabButton active={activeTab === 'matrix'} onClick={() => setActiveTab('matrix')}>Matriz Curricular</TabButton>
                    <TabButton active={activeTab === 'professors'} onClick={() => setActiveTab('professors')}>Professores</TabButton>
                    <TabButton active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')}>Horários</TabButton>
                    <TabButton active={activeTab === 'materials'} onClick={() => setActiveTab('materials')}>Materiais</TabButton>
                </nav>
            </div>

            <div className="mt-4 p-4 bg-neutral-light rounded-b-lg">
                {activeTab === 'matrix' && <CurriculumView matrix={course.matrix} />}
                {activeTab === 'professors' && <ProfessorsView professors={course.professors} />}
                {activeTab === 'schedule' && <ScheduleView schedule={course.schedule} />}
                {activeTab === 'materials' && <MaterialsView materials={course.materials} coordinator={course.coordinator} />}
            </div>
        </div>
    );
};


export const Courses: React.FC = () => {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    if (selectedCourse) {
        return <CourseDetail course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-neutral-dark">Cursos Disponíveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {COURSES.map(course => (
                    <button 
                        key={course.id} 
                        onClick={() => setSelectedCourse(course)}
                        className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-left flex flex-col justify-between items-start"
                    >
                        <div>
                          <h3 className="text-xl font-bold text-primary">{course.name}</h3>
                          <p className="text-sm text-gray-600 mt-2">Coord.: {course.coordinator.name}</p>
                        </div>
                        <span className="mt-4 text-sm font-semibold text-secondary">Ver detalhes &rarr;</span>
                    </button>
                ))}
                 <div className="p-6 bg-neutral-light/80 rounded-xl border-2 border-dashed flex flex-col justify-center items-center text-center">
                    <h3 className="text-xl font-bold text-gray-500">Mais Cursos</h3>
                    <p className="text-sm text-gray-500 mt-2">Administração, Direito, Odontologia e mais em breve...</p>
                 </div>
            </div>
        </div>
    );
};
