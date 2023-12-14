import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useToken } from '../hooks/useToken';

export const ChatContext = createContext();
const socket = io('https://pov.azurewebsites.net/');

export const ChatProvider = ({ children, user }) => {
  const { token } = useToken();
  const [userChat, setUserChat] = useState([]);
  const [messages, setMessages] = useState([])
  const [selectedId, setSelectedId] = useState(null);
  const [saveText, setSaveText] = useState(null);
  const [selectedSocket, setSelectedSocket] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const TOKEN = JSON.parse(token);
  


  useEffect(() => {
    if (socket === null) return

    socket.emit('join-room', {
      user_id: '23c5f1f2-7ac8-4ed3-885b-162228b7502c' //selectedSocket
    })

    return () => {
      socket.off('join-room')
    }
  }, [])

  useEffect(() => {
    if (socket === null) return

    socket.on('new-message', (info) => {
      setMessages((prev) => [...prev, info])
    })

    return () => {
      socket.off('new-message')
    }
  }, [])

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoadingMessages(true);
        //URL Para los chat
        //El ultimo parametro es el id al que se le da click y obtiene ese id de un get
        const URL = `https://pov.azurewebsites.net/api/chats/chat/e0c3ed5c-2116-47ed-8e65-a388df2353b2`;
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
    console.log(id);
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
          method: "POST",
          body: JSON.stringify({
            text: saveText,
            content: 'text',
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
    } catch (error) {
      throw new Error("Error al enviar el mensaje", error);
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
