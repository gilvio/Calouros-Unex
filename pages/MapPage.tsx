
import React from 'react';
import { MapPinIcon, ArrowRightIcon } from '../components/Icons';

const POIs = [
    { name: 'Biblioteca Central', description: 'Bloco A, 2º Andar', type: 'study' },
    { name: 'Cantina Principal', description: 'Área de Convivência, Térreo', type: 'food' },
    { name: 'Coordenação de Enfermagem', description: 'Bloco C, Sala 104', type: 'admin' },
    { name: 'Laboratório de Informática', description: 'Bloco B, 1º Andar', type: 'lab' },
    { name: 'Auditório Principal', description: 'Bloco A, Térreo', type: 'event' },
    { name: 'Secretaria Acadêmica', description: 'Entrada Principal', type: 'admin' }
];

const LocationIcon: React.FC<{ type: string, className?: string }> = ({ type, className }) => {
    // Simple logic to vary colors based on type, could use specific icons in future
    const colorClass = 
        type === 'food' ? 'text-orange-500 bg-orange-100 dark:bg-orange-900/30' :
        type === 'admin' ? 'text-purple-500 bg-purple-100 dark:bg-purple-900/30' :
        type === 'lab' ? 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' :
        'text-secondary bg-blue-50 dark:bg-blue-900/20';

    return (
        <div className={`p-2 rounded-full ${colorClass} ${className}`}>
            <MapPinIcon className="w-5 h-5" />
        </div>
    );
};

export const MapPage: React.FC = () => {
    const address = "Unex - Itabuna, Praça José Bastos, 55 - Centro, Itabuna - BA, 45600-080";
    // Using the embed format to display an interactive map without requiring a client-side API key for the user
    const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
    const googleMapsDirectLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-neutral-dark dark:text-white">Mapa do Campus</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{address}</p>
                </div>
                <a 
                    href={googleMapsDirectLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center text-sm font-medium text-primary dark:text-blue-400 hover:underline"
                >
                    Abrir no Google Maps <ArrowRightIcon className="w-4 h-4 ml-1"/>
                </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                {/* Interactive Map Container */}
                <div className="lg:col-span-2 bg-white dark:bg-neutral-800 p-2 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col min-h-[300px] h-full">
                    <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <iframe 
                            title="Mapa UNEX"
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, minHeight: '400px' }} 
                            src={mapSrc} 
                            loading="lazy" 
                            allowFullScreen
                            className="dark:invert dark:grayscale dark:contrast-75 dark:brightness-90"
                        ></iframe>
                    </div>
                </div>

                {/* Points of Interest Sidebar */}
                <div className="lg:col-span-1 flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900">
                        <h3 className="font-bold text-neutral-dark dark:text-white">Locais Importantes</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Guia rápido dos setores</p>
                    </div>
                    <div className="overflow-y-auto p-2 space-y-1 flex-1 max-h-[400px] lg:max-h-none">
                        {POIs.map((poi, index) => (
                            <div key={index} className="flex items-center p-3 hover:bg-neutral-light dark:hover:bg-neutral-700 rounded-lg transition-colors group cursor-default">
                                <LocationIcon type={poi.type} className="mr-3 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-sm text-neutral-dark dark:text-white">{poi.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{poi.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-gray-100 dark:border-gray-700 sm:hidden">
                         <a 
                            href={googleMapsDirectLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex justify-center items-center w-full py-2 px-4 bg-neutral-light dark:bg-neutral-700 text-primary dark:text-blue-400 font-medium rounded-lg text-sm hover:bg-blue-50 dark:hover:bg-neutral-600 transition-colors"
                        >
                            Traçar Rota no Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
