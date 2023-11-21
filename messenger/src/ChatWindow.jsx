import React, { useState, useEffect } from 'react';

const ChatWindow = ({ selectedChat }) => {
  const [randomWord, setRandomWord] = useState({ word: 'random' });
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const storageKey = `chatMessages_${selectedChat ? selectedChat.id : ''}`;

  useEffect(() => {
    const storedMessages = localStorage.getItem(storageKey);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value.slice(0, 1000);
    setInputValue(inputValue);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      setMessages([{ text: inputValue, type: 'user' }, ...messages]);
      setInputValue('');
      await fetchData();
      setTimeout(() => {
        const greetingMessage = { text: randomWord.word, type: 'greeting' };
        const userMessage = { text: inputValue, type: 'userMessage' };
        setMessages([greetingMessage, userMessage, ...messages]);
        const sessionData = [greetingMessage, userMessage, ...messages];
        setMessages(sessionData);
        localStorage.setItem(storageKey, JSON.stringify(sessionData));
      }, 5000);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.api-ninjas.com/v1/randomword', {
        method: 'GET',
        headers: {
          'X-Api-Key': process.env.REACT_APP_X_API,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorDetails = {
          status: response.status,
          statusText: response.statusText,
        };

        throw new Error(`Network response was not ok: ${JSON.stringify(errorDetails)}`);
      }
      const result = await response.json();
      setRandomWord(result);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div className="chat-window">
      {selectedChat ? (
        <div className="window">
          <div className="chat-header">
            {/* Add any header content if needed */}
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      ) : (
        <div className="empty-chat">Select a chat to start messaging</div>
      )}
    </div>
  );
};

export default ChatWindow;
