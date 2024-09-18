import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import styles from './chat.module.css'; // Adjust the path as needed
import * as dotenv from 'dotenv';

dotenv.config();

let socket;

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL); // Ensure this matches your backend port

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message && username) {
      const newMessage = { sender: username, text: message };
      socket.emit('sendMessage', newMessage);
      setMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Next.js Chat Application</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.inputField}
      />
      <div className={styles.messageList}>
        {messages.map((msg, index) => (
          <div className={styles.message} key={index}>
            <div
              className={`${styles.messageBubble} ${msg.sender === username ? '' : styles.other}`}
            >
              <div className={styles.messageSender}>{msg.sender}</div>
              <div className={styles.messageText}>{msg.text}</div>
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={styles.inputField}
      />
      <button onClick={sendMessage} className={styles.button}>
        Send
      </button>
    </div>
  );
};

export default Chat;
