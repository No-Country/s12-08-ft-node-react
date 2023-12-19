import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../../context/ChatContext';
import PostList from '../../components/Posts/PostList';
import MessageBar from '../../components/MessageBar/MessageBar';
import LoadingSpinner from '../../components/Svg/LoadingSpinner';
import BackBtn from '../../components/Svg/BackBtn';
import fondo from '../../assets/avatars/fondo1.jpg';
import Cheked from '../../components/Svg/Cheked';
import ThreadModal from '../../components/ThreadModal/ThreadModal';
import { useLocation, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

const ChatContainer = () => {
  const { userChat, messages, loadingMessages, setId, toggleModal, modal,setLoadingMessages, setMessages, setUserChat, TOKEN, URL } = useContext(ChatContext)
  const [success, setSuccess] = useState(false)
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const succes = searchParams.get('succes');
    if(succes === 'true'){
      toast.success('Suscripción realizada correctamente' , {duration: 3000})
      setSuccess(true);
    }
  }, [location.search])


  useEffect(() => {
    setId(id);
  }, [id, setId, userChat]);

  useEffect(() => {
    if (id !== null || TOKEN !== null) {
      setMessages([])
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

          const orderData = data.chat.messages.reverse();

          setMessages((prevMessages) => [
            ...orderData.filter(
              (newMessage) =>
                !prevMessages.some(
                  (existingMessage) => existingMessage._id === newMessage._id
                )
            ),
            ...prevMessages,
          ]);

          setUserChat(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoadingMessages(false);
        }
      };
      getMessages();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return !loadingMessages && userChat.user ? (
    <>
      {modal && <ThreadModal toggleModal={toggleModal} />}
      {success && <Toaster position="top-center" />}
      <header
        className="fixed z-10 left-1/2 -translate-x-1/2 w-full md:max-w-[1000px] lg:mx-auto flex justify-between items-center px-[24px] py-2 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${fondo})`,
        }}
      >
        <div>
          <Link to={`/profile/${id}`}>
            <BackBtn color={"white"} />
          </Link>
        </div>
        <div className="mx-auto flex flex-col items-center justify-center">
          <img
            src={userChat.user.profile_picture}
            alt=""
            className="w-[44px] h-[44px]"
          />
          <p className="flex w-full items-center justify-center gap-2 text-white text-[14px]">
            {userChat.user.username}
            <span>{<Cheked />}</span>
          </p>
          <p className="text-white text-[12px] font-thin">
            {userChat.user.subCount}
            <span className="text-white">
              {userChat.user.subCount >= 1000
                ? "mil"
                : userChat.user.subCount >= 1000000
                ? "millon de"
                : null}{" "}
              suscriptores
            </span>
          </p>
        </div>
      </header>
      <main className="w-full md:max-w-[1000px] min-h-[calc(100vh-99px)] lg:mx-auto py-8 px-[24px] pt-[99px] bg-slate-100 relative overflow-scroll ">
        <PostList
          chat={messages}
          messageCount={userChat.chat.totalMessages}
          user={userChat.user}
          toggleModal={toggleModal}
        />
        <MessageBar />
      </main>
    </>
  ) : (
    <LoadingSpinner />
  );
};

export default ChatContainer;
