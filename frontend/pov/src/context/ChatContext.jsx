import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useToken } from "../hooks/useToken";

export const ChatContext = createContext();

export const ChatProvider = ({ children, user }) => {
  const { token } = useToken();
  const [socket, setSocket] = useState(null);
  const [posts, setPosts] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [saveText, setSaveText] = useState(null);
  const [userSocket, setUserSocket] = useState(null);

  const TOKEN = JSON.parse(token);

  let sockettt;

  useEffect(() => {
    sockettt = io("https://pov.azurewebsites.net/");
    // const newSocket = io("https://pov.azurewebsites.net/");
    // setSocket(newSocket);
    console.log("Conectado a GENERAL");
    return () => {
      // newSocket.disconnect();
      sockettt.disconnect();
    };
  }, []);

  useEffect(() => {
    // if (socket === null) return;

    console.log("Conectado a ROOM");
    sockettt.emit("join-room", userSocket);
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    console.log("Escuchando Evento NEW-MESSAGE");
    sockettt?.on("new-message", (info) => {
      console.log("Recivido", info);
      setPosts((prev) => [...prev, info]);
    });

    return () => {
      sockettt?.off("new-message");
    };
  }, [socket, posts]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        //URL Para los chat
        //El ultimo parametro es el id al que se le da click y obtiene ese id de un get
        const URL = `https://pov.azurewebsites.net/api/chats/chat/9adfd373-f14d-41e0-a61f-f3957e3d5292`;
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

  const saveUserSocket = useCallback(async (userId) => {
    setUserSocket(userId);
    console.log(userId, "UserSocket");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `https://pov.azurewebsites.net/api/chats/chat/${selectedId}/comment`,
        {
          method: "POST",
          body: JSON.stringify({
            text: saveText,
            content: "text",
            user_photo: "imagen",
            username: "un usuario",
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
        posts,
        setPosts,
        socket,
        selectedId,
        saveChangeId,
        handleSubmit,
        saveChangeText,
        saveUserSocket,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
