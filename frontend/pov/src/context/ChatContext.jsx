import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useToken } from '../hooks/useToken';

export const ChatContext = createContext();

export const ChatProvider = ({ children, user }) => {
  const { token } = useToken();
  const [socket, setSocket] = useState(null);
  const [posts, setPosts] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [saveText, setSaveText] = useState(null);
  const [selectedSocket, setSelectedSocket] = useState(null);
  const TOKEN = JSON.parse(token);
  

  useEffect(() => {
    const newSocket = io('https://pov.azurewebsites.net/');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket === null) return

    socket.emit('join-room', selectedSocket)

  }, [user])

  useEffect(() => {
    if (socket === null) return

    socket?.on('new-message', (info) => {
      setPosts((prev) => [...prev, info])
    })

    return () => {
      socket?.off('new-message')
    }
  }, [socket, posts])

  useEffect(() => {
    const getMessages = async () => {
      try {
        //URL Para los chat
        //El ultimo parametro es el id al que se le da click y obtiene ese id de un get
        const URL = `https://pov.azurewebsites.net/api/chats/chat/e0c3ed5c-2116-47ed-8e65-a388df2353b2`;
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        const { data } = response;
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    }
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
  }, [])

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

  return (
    <ChatContext.Provider
      value={{
        posts,
        setPosts,
        socket,
        selectedId,
        saveChangeId,
        handleSubmit,
        saveChangeText,
        saveSelectedSocket,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
