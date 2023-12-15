import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useToken } from '../hooks/useToken';
import { URL, URL_SOCKET } from '../router/routes';

export const ChatContext = createContext();
const socket = io(URL_SOCKET);

export const ChatProvider = ({ children, user }) => {
  const { token} = useToken();
  const [userChat, setUserChat] = useState([]);
  const [messages, setMessages] = useState([])
  const [selectedId, setSelectedId] = useState(null);
  const [saveText, setSaveText] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [id, setId] = useState(null);
  const TOKEN = JSON.parse(token);  
  
  useEffect(() => {
    if (socket === null) return

    socket.emit('join-room', {
      user_id: id //selectedSocket
    })

    return () => {
      socket.off('join-room')
    }
  }, [id])

  useEffect(() => {
    if (socket === null) return

    socket.on('new-message', (info) => {
      if(info.comment){
        console.log(info.comment)
        //const messagesWithComment = messages.map(message => message)
      }
      setMessages((prev) => [...prev, info])
    })

    return () => {
      socket.off('new-message')
    }
  }, [])

  useEffect(() => {
    if(id !== null){
      const getMessages = async () => {
        try {
          setLoadingMessages(true);
          //URL Para los chat
          //El ultimo parametro es el id al que se le da click y obtiene ese id de un get
          const url = `${URL}/chats/chat/${id}`;
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
    }
  }, [TOKEN, user, id]);

  const saveChangeId = useCallback(async (id) => {
    setSelectedId(id);
  }, []);

  const saveChangeText = useCallback(async (text) => {
    setSaveText(text);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `${URL}/chats/chat/${selectedId}/comment`,
        {
          method: "POST",
          body: JSON.stringify({
            text: saveText,
            user_photo: user.user.profile_picture,
            username: user.user.username,
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
        loadingMessages,
        id,
        setId
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
