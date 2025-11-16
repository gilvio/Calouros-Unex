
import React from 'react';
import { User } from '../types';

interface ProfileProps {
    user: User;
    onLogout: () => void;
}

const ProfileInfoRow: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-neutral-dark sm:mt-0 sm:col-span-2">{value}</dd>
    </div>
);

export const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <div className="flex flex-col items-center sm:flex-row sm:items-start">
                         <img className="w-24 h-24 rounded-full" src={user.avatarUrl} alt={user.name} />
                         <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                             <h2 className="text-2xl font-bold text-neutral-dark">{user.name}</h2>
                             <p className="text-sm text-gray-600 capitalize">{user.role}</p>
                             <p className="text-sm text-gray-600">{user.course}</p>
                         </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-medium leading-6 text-neutral-dark">Informações Pessoais</h3>
                    <dl className="divide-y divide-gray-200">
                        <ProfileInfoRow label="Nome Completo" value={user.name} />
                        <ProfileInfoRow label="Email" value={user.email} />
                        <ProfileInfoRow label="Curso" value={user.course} />
                        <ProfileInfoRow label="Cargo" value={user.role} />
                    </dl>
                </div>
                 <div className="p-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium leading-6 text-neutral-dark mb-4">Configurações</h3>
                    <div className="space-y-4">
                       <label className="flex items-center justify-between">
                           <span className="text-sm text-neutral-dark">Receber notificações por push</span>
                           <div className="relative inline-flex items-center cursor-pointer">
                             <input type="checkbox" value="" className="sr-only peer" defaultChecked/>
                             <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                           </div>
                       </label>
                       <label className="flex items-center justify-between">
                           <span className="text-sm text-neutral-dark">Receber avisos por e-mail</span>
                           <div className="relative inline-flex items-center cursor-pointer">
                             <input type="checkbox" value="" className="sr-only peer" defaultChecked/>
                             <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                           </div>
                       </label>
                    </div>
                     <button 
                        onClick={onLogout}
                        className="mt-6 w-full sm:w-auto px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
                    >
                        Sair da Conta
                    </button>
                </div>
            </div>
        </div>
    );
};
