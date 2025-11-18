
import React, { useState, useRef } from 'react';
import { ChatMessage, User, Classmate, ChatAttachment } from '../types';
import { MOCK_USER, COMMUNITY_CHAT_MESSAGES, SUPPORT_CHAT_MESSAGES, CLASSMATES } from '../constants';
import { PaperClipIcon, PhotoIcon, DocumentIcon, Bars3Icon, XMarkIcon } from '../components/Icons';

// --- Components ---

const ChatBubble: React.FC<{ message: ChatMessage; isCurrentUser: boolean }> = ({ message, isCurrentUser }) => {
    const bubbleClasses = isCurrentUser ? 'bg-primary text-white self-end' : 'bg-white dark:bg-neutral-800 text-neutral-dark dark:text-white self-start';
    const containerClasses = isCurrentUser ? 'items-end' : 'items-start';

    return (
        <div className={`flex flex-col max-w-[85%] md:max-w-md ${containerClasses}`}>
            <div className="flex items-center space-x-2 mb-1">
                {!isCurrentUser && <img src={message.sender.avatarUrl} alt={message.sender.name} className="w-6 h-6 rounded-full" />}
                <span className="text-xs text-gray-500 dark:text-gray-400">{message.sender.name}</span>
            </div>
            <div className={`p-3 rounded-2xl shadow-sm ${bubbleClasses}`}>
                {message.attachment && (
                    <div className="mb-2">
                        {message.attachment.type === 'image' ? (
                            <img src={message.attachment.url} alt="anexo" className="rounded-lg max-h-48 object-cover w-full" />
                        ) : (
                            <div className={`flex items-center p-2 rounded bg-opacity-20 ${isCurrentUser ? 'bg-black' : 'bg-gray-100 dark:bg-neutral-700'}`}>
                                <DocumentIcon className={`w-8 h-8 mr-2 ${isCurrentUser ? 'text-white' : 'text-primary dark:text-blue-400'}`} />
                                <div>
                                    <p className="font-bold text-sm truncate max-w-[150px]">{message.attachment.name}</p>
                                    {message.attachment.size && <p className="text-xs opacity-80">{message.attachment.size}</p>}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {message.text && <p className="text-sm whitespace-pre-wrap">{message.text}</p>}
            </div>
            <span className="text-xs text-gray-400 mt-1 px-1">{message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
    );
};

interface ChatWindowProps {
  messages: ChatMessage[];
  currentUser: User;
  title: string;
  subtitle?: string;
  avatarUrl?: string;
  onSendMessage: (text: string, attachment?: ChatAttachment) => void;
  onBackMobile: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, currentUser, title, subtitle, avatarUrl, onSendMessage, onBackMobile }) => {
    const [newMessage, setNewMessage] = useState('');
    const [showAttachMenu, setShowAttachMenu] = useState(false);
    const [tempAttachment, setTempAttachment] = useState<ChatAttachment | null>(null);
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (newMessage.trim() || tempAttachment) {
            onSendMessage(newMessage, tempAttachment || undefined);
            setNewMessage('');
            setTempAttachment(null);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const isImage = file.type.startsWith('image/');
            const mockUrl = URL.createObjectURL(file);
            
            setTempAttachment({
                type: isImage ? 'image' : 'document',
                name: file.name,
                url: mockUrl,
                size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
            });
            setShowAttachMenu(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#efe7dd] dark:bg-[#1a1a1a] relative"> 
            {/* Header */}
            <div className="p-3 bg-white dark:bg-neutral-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center">
                     <button onClick={onBackMobile} className="mr-2 md:hidden text-gray-600 dark:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    {avatarUrl && <img src={avatarUrl} alt={title} className="w-10 h-10 rounded-full mr-3" />}
                    <div>
                        <h3 className="font-semibold text-neutral-dark dark:text-white">{title}</h3>
                        {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-neutral-light dark:bg-[#222]">
                {messages.map(msg => (
                    <ChatBubble key={msg.id} message={msg} isCurrentUser={msg.sender.id === currentUser.id} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Attachment Preview */}
            {tempAttachment && (
                <div className="p-2 bg-gray-100 dark:bg-neutral-700 border-t border-gray-200 dark:border-gray-600 flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-neutral-600 rounded mr-3 overflow-hidden">
                            {tempAttachment.type === 'image' ? (
                                <img src={tempAttachment.url} className="w-full h-full object-cover" alt="preview"/>
                            ) : (
                                <DocumentIcon className="w-6 h-6 text-gray-600 dark:text-gray-300"/>
                            )}
                        </div>
                        <div className="text-sm">
                            <p className="font-bold truncate max-w-[200px] dark:text-white">{tempAttachment.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{tempAttachment.size}</p>
                        </div>
                    </div>
                    <button onClick={() => setTempAttachment(null)} className="p-1 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded-full">
                        <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
            )}

            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-neutral-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-end space-x-2 relative">
                    {/* Attach Button */}
                    <div className="relative">
                        <button 
                            onClick={() => setShowAttachMenu(!showAttachMenu)} 
                            className={`p-2 rounded-full transition-colors ${showAttachMenu ? 'bg-gray-200 dark:bg-neutral-700 text-primary dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-700'}`}
                        >
                            <PaperClipIcon className="w-6 h-6" />
                        </button>
                        
                        {/* Attach Menu Popup */}
                        {showAttachMenu && (
                            <div className="absolute bottom-12 left-0 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-2 flex flex-col gap-2 min-w-[150px] animate-fade-in-up z-20">
                                <button onClick={() => fileInputRef.current?.click()} className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg text-left">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
                                        <DocumentIcon className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Documento</span>
                                </button>
                                <button onClick={() => fileInputRef.current?.click()} className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg text-left">
                                    <div className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full">
                                        <PhotoIcon className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Galeria</span>
                                </button>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    onChange={handleFileSelect}
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 bg-gray-100 dark:bg-neutral-700 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-secondary/50 transition-shadow">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Digite uma mensagem"
                            className="w-full bg-transparent border-none focus:ring-0 resize-none text-sm max-h-24 py-1 text-neutral-dark dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                            rows={1}
                            style={{ minHeight: '24px' }}
                        />
                    </div>
                    <button 
                        onClick={handleSend} 
                        disabled={!newMessage.trim() && !tempAttachment}
                        className={`p-2 rounded-full transition-colors ${newMessage.trim() || tempAttachment ? 'bg-primary text-white hover:bg-blue-700' : 'bg-gray-200 dark:bg-neutral-700 text-gray-400 dark:text-gray-500'}`}
                    >
                         <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transform rotate-90">
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main Page Component ---

type ActiveChatType = 'community' | 'support' | string; // string = classmate ID

export const ChatPage: React.FC = () => {
    const [activeChatId, setActiveChatId] = useState<ActiveChatType>('community');
    const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');
    
    // Local state for messages (so we can add to them)
    const [communityMessages, setCommunityMessages] = useState(COMMUNITY_CHAT_MESSAGES);
    const [supportMessages, setSupportMessages] = useState(SUPPORT_CHAT_MESSAGES);
    // Simulating private messages storage
    const [privateMessages, setPrivateMessages] = useState<Record<string, ChatMessage[]>>({});

    const handleSendMessage = (text: string, attachment?: ChatAttachment) => {
        const newMessage: ChatMessage = {
            id: `msg-new-${Date.now()}`,
            sender: { id: MOCK_USER.id, name: MOCK_USER.name, avatarUrl: MOCK_USER.avatarUrl },
            text,
            attachment,
            timestamp: new Date(),
        };

        if (activeChatId === 'community') {
            setCommunityMessages([...communityMessages, newMessage]);
        } else if (activeChatId === 'support') {
            setSupportMessages([...supportMessages, newMessage]);
        } else {
            // Private chat
            const currentHistory = privateMessages[activeChatId] || [];
            setPrivateMessages({
                ...privateMessages,
                [activeChatId]: [...currentHistory, newMessage]
            });
        }
    };

    const getActiveChatInfo = () => {
        if (activeChatId === 'community') {
            return { 
                title: `Chat da Turma - ${MOCK_USER.course}`, 
                subtitle: '32 participantes', 
                messages: communityMessages,
                avatarUrl: 'https://ui-avatars.com/api/?name=Turma&background=0D8ABC&color=fff'
            };
        }
        if (activeChatId === 'support') {
            return { 
                title: "Suporte Acadêmico", 
                subtitle: 'Online', 
                messages: supportMessages,
                avatarUrl: 'https://picsum.photos/seed/support/40/40'
            };
        }
        const classmate = CLASSMATES.find(c => c.id === activeChatId);
        if (classmate) {
             return { 
                title: classmate.name, 
                subtitle: classmate.status === 'online' ? 'Online agora' : 'Visto por último hoje', 
                messages: privateMessages[classmate.id] || [],
                avatarUrl: classmate.avatarUrl
            };
        }
        return { title: '', messages: [], avatarUrl: '' };
    };

    const activeInfo = getActiveChatInfo();

    return (
        <div className="flex h-[calc(100vh-140px)] bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            
            {/* Sidebar - List of Chats */}
            <div className={`w-full md:w-80 bg-white dark:bg-neutral-800 border-r border-gray-200 dark:border-gray-700 flex flex-col ${mobileView === 'chat' ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900">
                    <h2 className="text-xl font-bold text-neutral-dark dark:text-white">Conversas</h2>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                    {/* Official Channels */}
                    <div className="py-2">
                        <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Canais Oficiais</h3>
                        <button 
                            onClick={() => { setActiveChatId('community'); setMobileView('chat'); }}
                            className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-neutral-light dark:hover:bg-neutral-700 transition-colors ${activeChatId === 'community' ? 'bg-blue-50 dark:bg-blue-900/20 border-r-4 border-primary' : ''}`}
                        >
                            <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-full text-primary dark:text-blue-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-semibold text-neutral-dark dark:text-white">Chat da Turma</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{communityMessages[communityMessages.length-1]?.text || 'Comece a conversar...'}</p>
                            </div>
                        </button>
                        
                         <button 
                            onClick={() => { setActiveChatId('support'); setMobileView('chat'); }}
                            className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-neutral-light dark:hover:bg-neutral-700 transition-colors ${activeChatId === 'support' ? 'bg-blue-50 dark:bg-blue-900/20 border-r-4 border-primary' : ''}`}
                        >
                            <div className="bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded-full text-yellow-600 dark:text-yellow-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-semibold text-neutral-dark dark:text-white">Suporte</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{supportMessages[supportMessages.length-1]?.text || 'Fale com o suporte'}</p>
                            </div>
                        </button>
                    </div>

                    {/* Classmates List */}
                    <div className="py-2">
                        <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex justify-between items-center">
                            Alunos da Turma
                            <span className="bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full text-[10px]">{CLASSMATES.length}</span>
                        </h3>
                        {CLASSMATES.map(student => (
                             <button 
                                key={student.id}
                                onClick={() => { setActiveChatId(student.id); setMobileView('chat'); }}
                                className={`w-full px-4 py-2 flex items-center space-x-3 hover:bg-neutral-light dark:hover:bg-neutral-700 transition-colors ${activeChatId === student.id ? 'bg-blue-50 dark:bg-blue-900/20 border-r-4 border-primary' : ''}`}
                            >
                                <div className="relative">
                                    <img src={student.avatarUrl} alt={student.name} className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600" />
                                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-neutral-800 ${
                                        student.status === 'online' ? 'bg-green-500' : 
                                        student.status === 'busy' ? 'bg-red-500' : 'bg-gray-400'
                                    }`}></span>
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-medium text-sm text-neutral-dark dark:text-white">{student.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{student.status === 'online' ? 'Online' : 'Offline'}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={`flex-1 flex flex-col ${mobileView === 'list' ? 'hidden md:flex' : 'flex'}`}>
                <ChatWindow 
                    messages={activeInfo.messages} 
                    currentUser={MOCK_USER} 
                    title={activeInfo.title}
                    subtitle={activeInfo.subtitle}
                    avatarUrl={activeInfo.avatarUrl}
                    onSendMessage={handleSendMessage}
                    onBackMobile={() => setMobileView('list')}
                />
            </div>
        </div>
    );
};
