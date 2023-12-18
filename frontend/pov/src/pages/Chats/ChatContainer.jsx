import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";
import PostList from "../../components/Posts/PostList";
import MessageBar from "../../components/MessageBar/MessageBar";
import LoadingSpinner from "../../components/Svg/LoadingSpinner";
import BackBtn from "../../components/Svg/BackBtn";
import fondo from "../../assets/avatars/fondo1.jpg";
import Cheked from "../../components/Svg/Cheked";
import ThreadModal from "../../components/ThreadModal/ThreadModal";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ChatContainer = () => {
  const { userChat, messages, loadingMessages, setId, toggleModal, modal } =
    useContext(ChatContext);
  const { id } = useParams();

  useEffect(() => {
    setId(id);
  }, [id, setId, userChat]);

  return !loadingMessages && userChat.user ? (
    <>
      {modal && <ThreadModal toggleModal={toggleModal} />}
      <header
        className="fixed z-10 left-1/2 -translate-x-1/2 w-full md:max-w-[1000px] lg:mx-auto flex justify-center items-center px-[24px] py-2 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${fondo})`,
        }}
      >
        <div className="w-[79px]">
          <Link to="/home">
            <BackBtn color={"white"} />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src={userChat.user.profile_picture}
            alt=""
            className="w-[44px] h-[44px]"
          />
          <p className="flex w-full items-center justify-center gap-2 text-white text-[14px]">
            {userChat.user.username}
            <span>{<Cheked />}</span>
          </p>
          {/*           <p className="text-white text-[12px] font-thin">
            <span>{posts.user.subscribersCount}</span> millones
          </p> */}
        </div>
      </header>
      <main className="w-full md:max-w-[1000px] min-h-[calc(100vh-99px)] lg:mx-auto py-8 px-[24px] pt-[99px] bg-slate-100 relative overflow-scroll ">
        <PostList
          chat={messages}
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
