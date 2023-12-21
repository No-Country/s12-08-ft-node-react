import { createContext, useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useToken } from "../hooks/useToken";
import { URL, URL_SOCKET } from "../router/routes";


export const ChatContext = createContext();
const socket = io(URL_SOCKET);

export const ChatProvider = ({ children, user }) => {
  const { token } = useToken();
  const [userChat, setUserChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [saveText, setSaveText] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [id, setId] = useState(null);
  const TOKEN = JSON.parse(token);
  const [modal, setModal] = useState(false);
  const [modalComment, setModalComment] = useState(false);
  const [newMessage,setNewMessage] = useState(false)
  const [currenctCommentId, setCurrentCommentId] = useState(null)

  const reactionsDicc = {
/*     like: "👍",
    dislike: "👎", */
    love: "😍",
    sad: "😢",
    fun: "😂",
    interesting: "😲",
/*     dead: "💀",
    hate: "🤬", */
  };
  
  useEffect(() => {
    if (socket === null) return
    socket.emit('join-room', {
      user_id: id //selectedSocket
    })

    return () => {
      setMessages([]);
      socket.off("join-room");
    };
  }, [id]);

  useEffect(() => {
    if (socket === null) return;

    socket.on("new-message", (info) => {
      setMessages((prevMessages) => {
        if (info.comment) {
          const newMessages = [...prevMessages];
          const messageIndex = newMessages.findIndex(
            (message) => message._id === info.message_id
          );

          if (messageIndex !== -1) {
            const existingComment = newMessages[messageIndex].comments.some(
              (comment) => comment._id === info.comment._id
            );

            if (!existingComment) {
              newMessages[messageIndex].comments.push(info.comment);
            }
          }

          return newMessages;
        }
        setNewMessage((prev) => !prev);
        return [...prevMessages, info];
      });
    });

    return () => {
      socket.off("new-message");
    };
  }, []);

  const saveChangeId = useCallback(async (id) => {
    setSelectedId(id);
  }, []);

  const saveChangeText = useCallback(async (text) => {
    setSaveText(text);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/chats/chat/${selectedId}/comment`, {
        method: "POST",
        body: JSON.stringify({
          text: saveText,
          user_photo: user.user.profile_picture,
          username: user.user.username,
          content: "text",
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (response.ok) {
        toggleModal();
      }
    } catch (error) {
      throw new Error("Error al enviar el mensaje", error);
    }
  };


  const debounceTimersMessages = {};

  const handleEmoji = async(e, key, id, modal) => {
    if (debounceTimersMessages[id]) {
      clearTimeout(debounceTimersMessages[id]);
    }
    debounceTimersMessages[id] = setTimeout(async () => {
      try {
        if(id){
        const url = `${URL}/message/reaction/${id}`
        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify({
            user_id: user.user.id,
            reaction: key
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        const data = await response.json();

        const newMessages = [...messages];

        const messageIndex = newMessages.findIndex(
          (message) => message._id === id
        );

        newMessages[messageIndex].reactions= data.updatedMessage.reactions

        setMessages(newMessages)
        delete debounceTimersMessages[id]
        if(response.ok && modal){
          toggleModal()
        }
      }
      } catch (error) {
        console.error(error);
        delete debounceTimersMessages[id]
      }
    }, 500);
  }

  const debounceTimersComments = {};

  const handleEmojiComment = async(e, key, id, messageId ,  modal) =>{
     if (debounceTimersComments[id]) {
        clearTimeout(debounceTimersComments[id]);
      }
      debounceTimersComments[id] = setTimeout(async () => {
        try {
          if(id && messageId){
          const url = `${URL}/comments/reaction/${id}`
          const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify({
              reaction: key
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
          });

          const data = await response.json();


          const newMessages = [...messages];

          const messageIndex = newMessages.findIndex(
            (message) => message._id === messageId
          );

          const commentIndex = newMessages[messageIndex].comments.findIndex((comment) => comment._id === id)

          newMessages[messageIndex].comments[commentIndex].reactions = data.updatedComment.reactions

          setMessages(newMessages)
          delete debounceTimersComments[id];
          if(response.ok && modal){
            toggleModalComment()
          }
        }
        } catch (error) {
          console.error(error);
          delete debounceTimersComments[id];
        }
      }, 500);
  }

  const toggleModal = () => {
    setModal((modal) => !modal);
  };

  const toggleModalComment = () => {
    setModalComment((modal) => !modal);
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
        setId,
        toggleModal,
        modal,
        newMessage,
        TOKEN,
        setLoadingMessages,
        URL,
        setMessages,
        setUserChat,
        reactionsDicc,
        handleEmoji,
        user,
        toggleModalComment,
        modalComment,
        setCurrentCommentId,
        currenctCommentId,
        handleEmojiComment
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
