import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useToken } from '../hooks/useToken';
import { URL, URL_SOCKET } from '../router/routes';

export const ChatContext = createContext();
const socket = io(URL_SOCKET);

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
    if (socket === null || !user?.user) return

    socket.emit('join-room', {
      user_id: user.user.id //selectedSocket
    })

    return () => {
      socket.off('join-room')
    }
  }, [])

  useEffect(() => {
    if (socket === null) return

    socket.on('new-message', (info) => {
      console.log(info)
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
        const url = `${URL}/chats/chat/${user.user.id}`;
        const response = await axios.get(url, {
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
  }, [TOKEN, user]);

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
    console.log(selectedId)
    e.preventDefault();
    try {
      await fetch(
        `${URL}/chats/chat/${selectedId}/comment`,
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
        loadingMessages,

      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
