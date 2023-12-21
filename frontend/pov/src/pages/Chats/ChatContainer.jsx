import { useContext, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";
import PostList from "../../components/Posts/PostList";
import MessageBar from "../../components/MessageBar/MessageBar";
import LoadingSpinner from "../../components/Svg/LoadingSpinner";
import BackBtn from "../../components/Svg/BackBtn";
import Cheked from "../../components/Svg/Cheked";
import ThreadModal from "../../components/ThreadModal/ThreadModal";
import ThreadEmojis from "../../components/ThreadModal/ThreadEmojis";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const {
    userChat,
    messages,
    loadingMessages,
    setId,
    toggleModal,
    modal,
    modalComment,
    setLoadingMessages,
    setMessages,
    setUserChat,
    TOKEN,
    URL,
    user,
    toggleModalComment
  } = useContext(ChatContext);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const succes = searchParams.get("succes");
    if (succes === "true") {
      toast.success("Suscripción realizada correctamente");
    }
  }, [location.search]);

  useEffect(() => {
    setId(id);
  }, [id, setId, userChat]);

  useEffect(() => {
    if (id !== null && TOKEN !== null) {
      setMessages([]);
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
          toast.error("No estas suscrito/a. Hubo un error al ingresar al chat");
          setTimeout(() => {
            navigate(`/sub/${id}`);
          }, 1000);
        } finally {
          setLoadingMessages(false);
        }
      };
      getMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, TOKEN]);

  return !loadingMessages && userChat.user ? (
    <>
      {modal && <ThreadModal toggleModal={toggleModal} />}
      {modalComment && <ThreadEmojis toggleModal={toggleModalComment} />}
      <header
        className="fixed z-10 left-1/2 -translate-x-1/2 w-full md:max-w-[1000px] lg:mx-auto flex justify-between items-center px-[24px] py-2 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${userChat.chat.img})`,
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
            {userChat.chat.name}
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
          toggleModalComment={toggleModalComment}
        />
        { id == user.user.id && <MessageBar /> }
      </main>
    </>
  ) : (
    <LoadingSpinner />
  );
};

export default ChatContainer;
