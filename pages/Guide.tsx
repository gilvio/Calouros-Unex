import React, { useState } from 'react';
import { FAQItem } from '../types';
import { FAQS } from '../constants';
import { ChevronDownIcon } from '../components/Icons';

const FaqAccordionItem: React.FC<{ item: FAQItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left"
            >
                <h3 className="font-semibold text-neutral-dark">{item.question}</h3>
                <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-4 pt-0 text-gray-700">
                    <p>{item.answer}</p>
                </div>
            )}
        </div>
    );
};

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
    </svg>
);

const videoTutorials = [
    {
        title: 'Apresentação do Curso de Enfermagem',
        videoUrl: 'https://youtu.be/zljQVoF9I2w',
        thumbnailUrl: 'https://img.youtube.com/vi/zljQVoF9I2w/hqdefault.jpg',
    },
    {
        title: 'Tour Pela Faculdade',
        videoUrl: 'https://youtu.be/_RfY0eH7u-c',
        thumbnailUrl: 'https://img.youtube.com/vi/_RfY0eH7u-c/hqdefault.jpg',
    }
];

export const Guide: React.FC = () => {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-neutral-dark">Tutoriais e Guias</h2>
            
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-neutral-dark mb-4">Tutoriais em Vídeo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {videoTutorials.map((video, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                               <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="block group">
                                    <div className="aspect-video bg-gray-200 rounded mb-2 overflow-hidden relative">
                                        <img 
                                            src={video.thumbnailUrl}
                                            alt={video.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <PlayIcon className="w-16 h-16 text-white" />
                                        </div>
                                    </div>
                                </a>
                                <h4 className="font-semibold">{video.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-neutral-dark mb-4">Perguntas Frequentes (FAQ)</h3>
                    <div className="bg-white rounded-lg shadow-sm">
                        {FAQS.map((faq, index) => (
                            <FaqAccordionItem key={index} item={faq} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
