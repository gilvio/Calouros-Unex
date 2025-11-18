
import React, { useState } from 'react';
import { User } from '../types';
import { useTheme } from '../ThemeContext';

interface ProfileProps {
    user: User;
    onLogout: () => void;
}

const ProfileInfoRow: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
        <dd className="mt-1 text-sm text-neutral-dark dark:text-gray-200 sm:mt-0 sm:col-span-2 font-medium">{value}</dd>
    </div>
);

export const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
    const [flipped, setFlipped] = useState(false);
    const { theme, toggleTheme } = useTheme();
    
    // QR Code URL generator based on user ID
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user.id}-${user.email}`;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Student ID Card Section */}
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold text-neutral-dark dark:text-white mb-6">Carteirinha Digital</h2>
                
                {/* Card Container - Click to flip effect simulated via state */}
                <div 
                    className="relative w-full max-w-md h-64 perspective-1000 cursor-pointer group"
                    onClick={() => setFlipped(!flipped)}
                >
                    <div className={`relative w-full h-full transition-all duration-500 preserve-3d ${flipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : '' }}>
                        
                        {/* Front of Card */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary to-blue-800 rounded-2xl shadow-xl text-white overflow-hidden backface-hidden p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-2xl tracking-wider">UNEX</h3>
                                    <p className="text-xs opacity-80 uppercase tracking-widest">Carteira de Estudante</p>
                                </div>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png" className="w-10 h-10 opacity-50" alt="chip" />
                            </div>
                            
                            <div className="flex items-end space-x-4 mt-4">
                                <div className="w-24 h-24 bg-white p-1 rounded-lg shadow-inner">
                                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover rounded" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs opacity-70 uppercase">Nome do Aluno</p>
                                    <p className="font-bold text-lg leading-tight mb-2">{user.name}</p>
                                    <p className="text-xs opacity-70 uppercase">Curso</p>
                                    <p className="font-semibold text-sm">{user.course}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mt-2">
                                <div>
                                    <p className="text-[10px] opacity-70">Matrícula</p>
                                    <p className="font-mono tracking-widest">{user.id.toUpperCase().replace('USER', '2025')}</p>
                                </div>
                                <p className="text-[10px] opacity-60">Toque para ver o QR Code</p>
                            </div>
                        </div>

                        {/* Back of Card */}
                        <div className="absolute inset-0 w-full h-full bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                            <h3 className="text-primary font-bold mb-2">Validação Estudantil</h3>
                            <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32 mix-blend-multiply dark:mix-blend-normal dark:bg-white dark:p-2 dark:rounded" />
                            <p className="text-xs text-gray-400 mt-2 text-center max-w-xs">Apresente este código na biblioteca ou eventos para confirmar sua matrícula ativa.</p>
                            <p className="text-[10px] text-gray-300 mt-auto">Válido até Dez/2025</p>
                        </div>
                    </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Toque no cartão para virar</p>
            </div>

            {/* Personal Info & Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Personal Info */}
                <div className="bg-white dark:bg-neutral-800 shadow rounded-lg p-6 h-full">
                    <h3 className="text-lg font-bold text-neutral-dark dark:text-white mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Dados Acadêmicos
                    </h3>
                    <div className="flex flex-col h-full">
                        <ProfileInfoRow label="Email Institucional" value={user.email} />
                        <ProfileInfoRow label="Situação" value="Matriculado" />
                        <ProfileInfoRow label="Semestre Atual" value="1º Semestre" />
                        <ProfileInfoRow label="Cargo" value={user.role === 'student' ? 'Discente' : user.role} />
                    </div>
                </div>

                {/* Settings */}
                 <div className="bg-white dark:bg-neutral-800 shadow rounded-lg p-6 h-full flex flex-col">
                    <h3 className="text-lg font-bold text-neutral-dark dark:text-white mb-4 flex items-center">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        Configurações
                    </h3>
                    <div className="space-y-6 flex-1">
                       <label className="flex items-center justify-between cursor-pointer group">
                           <span className="text-sm text-neutral-dark dark:text-gray-200 group-hover:text-primary transition-colors">Notificações Push</span>
                           <div className="relative inline-flex items-center">
                             <input type="checkbox" value="" className="sr-only peer" defaultChecked/>
                             <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-100 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                           </div>
                       </label>
                       <label className="flex items-center justify-between cursor-pointer group">
                           <span className="text-sm text-neutral-dark dark:text-gray-200 group-hover:text-primary transition-colors">Avisos por E-mail</span>
                           <div className="relative inline-flex items-center">
                             <input type="checkbox" value="" className="sr-only peer" defaultChecked/>
                             <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-100 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                           </div>
                       </label>
                       <label className="flex items-center justify-between cursor-pointer group">
                           <span className="text-sm text-neutral-dark dark:text-gray-200 group-hover:text-primary transition-colors">Modo Escuro</span>
                           <div className="relative inline-flex items-center">
                             <input 
                                type="checkbox" 
                                checked={theme === 'dark'} 
                                onChange={toggleTheme}
                                className="sr-only peer"
                            />
                             <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-100 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                           </div>
                       </label>
                    </div>
                     <button 
                        onClick={onLogout}
                        className="mt-8 w-full flex items-center justify-center px-4 py-3 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-semibold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                        Sair da Conta
                    </button>
                </div>
            </div>
        </div>
    );
};
