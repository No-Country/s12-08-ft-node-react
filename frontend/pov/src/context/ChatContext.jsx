import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useToken } from '../hooks/useToken';


export const ChatContext = createContext();

export const ChatProvider = ({ children, user }) => {
  const { token } = useToken();
  const [userChat, setUserChat] = useState([]);
  const [messages, setMessages] = useState([])
  const [selectedId, setSelectedId] = useState(null);
  const [saveText, setSaveText] = useState(null);
  const [selectedSocket, setSelectedSocket] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const TOKEN = JSON.parse(token);
  console.log();
  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    if (newSocket === null) return

    newSocket.emit('join-room', {
      user_id: '23c5f1f2-7ac8-4ed3-885b-162228b7502c', //selectedSocket
    });

    return () => {
      newSocket.off('join-room');
    }
  }, [])

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    if (newSocket === null) return;
    console.log(newSocket)


    newSocket.on('new-message', (info) => {
      console.log(info);
      setMessages((prev) => [...prev, info])
    });

    console.log(messages)

    return () => {
      newSocket.off('new-message');
    };
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoadingMessages(true);
        //URL Para los chat
        //El ultimo parametro es el id al que se le da click y obtiene ese id de un get
        const URL = `https://pov.azurewebsites.net/api/chats/chat/23c5f1f2-7ac8-4ed3-885b-162228b7502c`;
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        const { data } = response;
        setMessages(data.chat.messages)
        setUserChat(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingMessages(false);
      }
    };
    getMessages();
  }, []);

  const saveChangeId = useCallback(async (id) => {
    setSelectedId(id);
  }, []);

  const saveChangeText = useCallback(async (text) => {
    setSaveText(text);
  }, []);

  const saveSelectedSocket = useCallback(async (userId) => {
    setSelectedSocket(userId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `https://pov.azurewebsites.net/api/chats/chat/${selectedId}/comment`,
        {
          method: 'POST',
          body: JSON.stringify({
            text: saveText,
            content: 'text',
            user_photo: 'foto',
            username: user?.user?.username,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
    } catch (error) {
      throw new Error('Error al enviar el mensaje', error);
    }
  };

  const handleSendMessage = async (e, message) => {
    e.preventDefault();
    try {
      await fetch(`https://pov.azurewebsites.net/api/chats/chat`, {
        method: 'POST',
        body: JSON.stringify({
          text: message,
          content: 'text',
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
    
  /*   setUserChat([...userChat, message]); */
  };
 

  return (
    <ChatContext.Provider
      value={{
        userChat,
        messages,
        selectedId,
        saveChangeId,
        handleSubmit,
        saveChangeText,
        saveSelectedSocket,
        handleSendMessage,
        loadingMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
