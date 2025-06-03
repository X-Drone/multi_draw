import React, { useState } from 'react';

interface ChatProps {
  messages: string[];
  onSendMessage: (message: string) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState('');

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input-field"
        />
        <button 
          className="chat-send-btn" 
          onClick={() => {
            onSendMessage(input);
            setInput('');
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;