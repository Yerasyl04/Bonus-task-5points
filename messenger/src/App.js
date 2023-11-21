import React, { useState } from 'react';
import './App.css';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

const App = () => {
  const [chats, setChats] = useState([
    { id: 1, name: 'Alan'},
    { id: 2, name: 'Beibyt'},
    { id: 3, name: 'Cerke'},
    { id: 4, name: 'Daulet'},
  ]);

  const [selectedChat, setSelectedChat] = useState(null);

  const onSelectChat = (chatId) => {
    const selectedChat = chats.find(chat => chat.id === chatId);
    setSelectedChat(selectedChat);
  };

  return (
    <div className="app">
      <ChatList chats={chats} onSelectChat={onSelectChat} />
      <ChatWindow selectedChat={selectedChat} />
    </div>
  );
};

export default App;
