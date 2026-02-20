import React, { useState, useRef, useEffect } from 'react';
import { FiMessageSquare, FiX, FiSend, FiLoader } from 'react-icons/fi';
import API from '../api';
import './ChatBot.css';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'model', parts: [{ text: 'Hello! I am Learnix AI. How can I assist you today?' }] }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', parts: [{ text: input }] };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Gemini SDK requires history to start with a 'user' message.
            // Our first message is always the model welcome greeting, so we skip it.
            const filteredHistory = messages.length > 1 ? messages.slice(1) : [];

            const response = await API.post('/api/chat', {
                message: input,
                history: filteredHistory
            });

            const aiMessage = { role: 'model', parts: [{ text: response.data.response }] };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, {
                role: 'model',
                parts: [{ text: 'Sorry, I am having trouble connecting right now. Please try again later.' }]
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            {!isOpen && (
                <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
                    <FiMessageSquare size={24} />
                </button>
            )}

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h3>Learnix AI Assistant</h3>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            <FiX size={20} />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.role === 'user' ? 'user' : 'ai'}`}>
                                <div className="message-content">
                                    {msg.parts[0].text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message ai typing">
                                <FiLoader className="spin" />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button onClick={handleSend} disabled={isLoading || !input.trim()}>
                            <FiSend size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
