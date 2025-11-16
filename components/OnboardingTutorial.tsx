
import React from 'react';
import { XMarkIcon } from './Icons';

interface OnboardingTutorialProps {
    onClose: () => void;
}

export const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative transform transition-all animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <XMarkIcon className="w-6 h-6" />
                </button>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-primary">Bem-vindo(a) à UNEX!</h2>
                    <p className="mt-2 text-gray-600">Preparamos um guia rápido para você navegar pelo app.</p>
                </div>

                <div className="mt-6 space-y-4 text-sm">
                    <p className="font-semibold text-neutral-dark text-center">Conheça a interface:</p>
                    <div className="border-2 border-dashed rounded-lg p-4 h-48 flex">
                        {/* Sidebar */}
                        <div className="w-1/4 border-r-2 border-dashed pr-2 flex flex-col justify-center items-center text-center">
                            <div className="p-2 border border-secondary rounded-full mb-1">
                                <span className="text-xs text-secondary font-bold">1</span>
                            </div>
                            <p className="font-semibold text-xs text-secondary">Navegação Principal</p>
                            <p className="text-xs text-gray-500">Use o menu para acessar todas as seções.</p>
                        </div>
                        {/* Main Content */}
                        <div className="w-3/4 pl-2 flex flex-col">
                            {/* Header */}
                            <div className="border-b-2 border-dashed pb-2 flex justify-center items-center text-center">
                                <div className="p-2 border border-secondary rounded-full mr-1">
                                    <span className="text-xs text-secondary font-bold">2</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-xs text-secondary">Cabeçalho</p>
                                    <p className="text-xs text-gray-500">Veja seu perfil aqui.</p>
                                </div>
                            </div>
                            {/* Content Area */}
                            <div className="flex-1 flex flex-col justify-center items-center text-center">
                                <div className="p-2 border border-secondary rounded-full mb-1">
                                    <span className="text-xs text-secondary font-bold">3</span>
                                </div>
                                <p className="font-semibold text-xs text-secondary">Conteúdo</p>
                                <p className="text-xs text-gray-500">As informações de cada página aparecem aqui.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={onClose}
                        className="w-full py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-blue-800 transition-colors"
                    >
                        Vamos Começar!
                    </button>
                </div>
            </div>
        </div>
    );
};
