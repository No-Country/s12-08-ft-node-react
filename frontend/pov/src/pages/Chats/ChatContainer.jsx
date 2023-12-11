import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToken } from "../../hooks/useToken";
import PostList from "../../components/Posts/PostList";
import MessageBar from "../../components/MessageBar/MessageBar";
import LoadingSpinner from "../../components/Svg/LoadingSpinner";
import BackBtn from "../../components/Svg/BackBtn";
import fondo from "../../assets/avatars/fondo1.jpg";
import Cheked from "../../components/Svg/Cheked";
import axios from "axios";

const ChatContainer = () => {
  const [posts, setPosts] = useState(null);
  const { id } = useParams();
  const { token } = useToken();
  const TOKEN = JSON.parse(token);

  useEffect(() => {
    const getUser = async () => {
      try {
        //URL Para los chat
        const URL = `https://pov.azurewebsites.net/api/chats/chat/${id}`;
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        const { data } = response;
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [id]);

  return posts ? (
    <>
      <header
        className="w-full md:max-w-[1000px] lg:mx-auto flex justify-between items-center px-[24px] py-2 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${fondo})`,
        }}
      >
        <div className="w-[79px]">
          <BackBtn color={"white"} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <img
            src={posts.user.profile_picture}
            alt=""
            className="w-[44px] h-[44px]"
          />
          <p className="flex w-full items-center justify-center gap-2 text-white text-[14px]">
            {posts.user.username}
            <span>{<Cheked />}</span>
          </p>
          <p className="text-white text-[12px] font-thin">
            <span>{posts.user.subscribersCount}</span> millones
          </p>
        </div>
        <button className="w-[79px] h-[28px] md:w-[120px] text-white text-[10px] rounded-full bg-[#232322] border-none hover:bg-gray-600">
          Subscribirse
        </button>
      </header>

      <main className="w-full md:max-w-[1000px] min-h-[calc(100vh-99px)] lg:mx-auto py-8 px-[24px] bg-slate-100">
        <PostList chat={posts.chat} user={posts.user} />
        <MessageBar />
      </main>
    </>
  ) : (
    <LoadingSpinner />
  );
};

export default ChatContainer;
