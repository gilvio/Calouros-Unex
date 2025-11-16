
import React from 'react';
import { MapPinIcon } from '../components/Icons';

const POIs = [
    { name: 'Biblioteca', description: 'Bloco A, 2º Andar' },
    { name: 'Cantina Principal', description: 'Próximo à entrada' },
    { name: 'Coordenação de Enfermagem', description: 'Bloco C, Térreo' },
    { name: 'Laboratório de Informática', description: 'Bloco B, 1º Andar' }
];

export const MapPage: React.FC = () => {
    const address = "Praça José Bastos, 55 - Osvaldo Cruz, Itabuna - BA, 45600-080";
    const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-neutral-dark">Mapa e Localização</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
                    <p className="font-semibold mb-2">{address}</p>
                    <a href={googleMapsSearchUrl} target="_blank" rel="noopener noreferrer" className="block group">
                      <div className="aspect-video w-full rounded-md overflow-hidden bg-gray-200 flex flex-col items-center justify-center text-gray-700 group-hover:bg-gray-300 transition-colors p-4 text-center cursor-pointer">
                          <MapPinIcon className="w-12 h-12 text-secondary mb-2" />
                          <p className="font-bold text-lg">Clique para abrir o mapa interativo</p>
                          <p className="text-sm text-gray-600">Você será redirecionado para o Google Maps em uma nova aba.</p>
                      </div>
                    </a>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-neutral-dark mb-4">Pontos de Interesse</h3>
                        <ul className="space-y-4">
                            {POIs.map((poi, index) => (
                                <li key={index} className="flex items-start">
                                    <MapPinIcon className="w-6 h-6 text-secondary flex-shrink-0 mt-1 mr-3" />
                                    <div>
                                        <p className="font-semibold">{poi.name}</p>
                                        <p className="text-sm text-gray-600">{poi.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
