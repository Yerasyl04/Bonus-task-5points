import React, { useState } from 'react';

const ChatList = ({ chats, onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChat, setActiveChat] = useState(null);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectChat = (chatId) => {
    onSelectChat(chatId);
    setActiveChat(chatId);
  };

  return (
    <div className="chat-list">
      <div className='chat-list-header'>
        <div id='top'>
          <p>Chats</p>
        </div>
        <div className='chat-list-search'>
          <input
            type='text'
            placeholder='Search'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className='list'>
        <ul>
          {filteredChats.map(chat => (
            <li
              key={chat.id}
              onClick={() => handleSelectChat(chat.id)}
              className={activeChat === chat.id ? 'active-chat' : ''}
            >
              <div className="chat-name">{chat.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatList;
