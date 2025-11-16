
import React, { useState } from 'react';
import { ChatMessage, User } from '../types';
import { MOCK_USER, COMMUNITY_CHAT_MESSAGES, SUPPORT_CHAT_MESSAGES } from '../constants';

interface ChatWindowProps {
  messages: ChatMessage[];
  currentUser: User;
  title: string;
}

const ChatBubble: React.FC<{ message: ChatMessage; isCurrentUser: boolean }> = ({ message, isCurrentUser }) => {
    const bubbleClasses = isCurrentUser ? 'bg-primary text-white self-end' : 'bg-white text-neutral-dark self-start';
    const containerClasses = isCurrentUser ? 'items-end' : 'items-start';

    return (
        <div className={`flex flex-col max-w-xs md:max-w-md ${containerClasses}`}>
            <div className="flex items-center space-x-2">
                {!isCurrentUser && <img src={message.sender.avatarUrl} alt={message.sender.name} className="w-6 h-6 rounded-full" />}
                <span className="text-xs text-gray-500">{message.sender.name}</span>
            </div>
            <div className={`mt-1 p-3 rounded-xl ${bubbleClasses}`}>
                <p className="text-sm">{message.text}</p>
            </div>
            <span className="text-xs text-gray-400 mt-1">{message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
    );
};


const ChatWindow: React.FC<ChatWindowProps> = ({ messages, currentUser, title }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim()) {
            // In a real app, this would send the message to a server
            console.log(`Sending message: ${newMessage}`);
            setNewMessage('');
        }
    };
    
    return (
        <div className="flex flex-col h-full bg-neutral-light rounded-lg shadow-inner">
            <div className="p-4 bg-white border-b border-gray-200 rounded-t-lg">
                <h3 className="font-semibold text-neutral-dark">{title}</h3>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.map(msg => (
                    <ChatBubble key={msg.id} message={msg} isCurrentUser={msg.sender.id === currentUser.id} />
                ))}
            </div>
            <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <button onClick={handleSend} className="px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-blue-800 transition-colors">
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};

export const ChatPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('community');

    return (
        <div className="flex flex-col h-full">
            <div className="flex-shrink-0 border-b border-gray-200">
                <nav className="-mb-px flex space-x-4 px-4">
                    <button 
                        onClick={() => setActiveTab('community')}
                        className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'community' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Chat da Turma
                    </button>
                     <button 
                        onClick={() => setActiveTab('support')}
                        className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'support' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Suporte
                    </button>
                </nav>
            </div>
            <div className="flex-1 mt-4 overflow-hidden">
                {activeTab === 'community' && <ChatWindow messages={COMMUNITY_CHAT_MESSAGES} currentUser={MOCK_USER} title={`Comunidade - ${MOCK_USER.course}`} />}
                {activeTab === 'support' && <ChatWindow messages={SUPPORT_CHAT_MESSAGES} currentUser={MOCK_USER} title="Suporte Acadêmico" />}
            </div>
        </div>
    );
};
