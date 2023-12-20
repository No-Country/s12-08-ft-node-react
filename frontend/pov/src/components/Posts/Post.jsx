import { useContext, useEffect, useState } from "react";
import ThreadUnion from "../Svg/ThreadUnion";
import Response from "./Response";
import { ChatContext } from "../../context/ChatContext";
import { format } from "date-fns";
import axios from "axios";
import Reactions from "./Reactions";

const Post = ({ post, userName, userAvatar, toggleModal, commentsCount }) => {
  const { saveChangeId, TOKEN, URL, messages, setMessages } =
    useContext(ChatContext);
  const { text, comments, reactions } = post;
  const [page, setPage] = useState(0);
  //console.log("REACCIONES", reactions);

  useEffect(() => {
    const getComments = async () => {
      if (post && page !== 0) {
        try {
          const url = `${URL}/comments/byMessage/${post._id}?page=${page}`;
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          });
          const { data } = response;

          const newMessages = [...messages];

          const indexMessage = newMessages.findIndex(
            (message) => message._id === post._id
          );

          if (indexMessage !== -1) {
            newMessages[indexMessage].comments.push(...data.comments);
          }

          setMessages(newMessages);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="flex items-start">
      <img
        src={userAvatar}
        alt={`avatar de ${userName}`}
        className="w-[24px] rounded-full mt-[20px]"
      />
    <article
      className="flex flex-col gap-2 px-2 py-4 rounded-lg hover:scale-[102%] transition-transform cursor-pointer w-full"
      onClick={() => {
        toggleModal();
        saveChangeId(post._id);
      }}
    >
      {/* Imagen del Post adjunta */}
      <div className="py-1 px-4 flex flex-col justify-center items-center bg-[#C3C3BF] rounded-lg">
        {post.content === 'image' && (
          <img
            src={post.image}
            alt="imagen adjunta al post"
            className="mb-2 rounded-lg overflow-hidden"
          />
        )} 
        {/* Texto del Post */}
        <div className="w-full flex gap-2 items-center">

          <div className="flex flex-col overflow-auto">
            <p className="w-full text-[12px] break-words">
              <span className="font-black">{userName}: </span>
              {text}
            </p>
            <p className="text-[10px] font-thin">{format(new Date(post.createdAt), 'dd-MM-yyyy hh:mm')} </p>
          </div>
          
        </div>
      </div>
        {/* Reacciones */}
        <Reactions reactions={reactions} />

        {/* Link a Respuestas del post */}
        {comments.length > 0 &&
          comments.map((comment, index) => (
            <div key={index} className="flex gap-1 pl-[28px]">
              {/*             { index == 0 &&
              <ThreadUnion />
            } */}
              <ThreadUnion />
              <div className="w-full p-2 flex gap-2 items-center bg-[#C3C3BF] rounded-lg">
                <Response
                  responses={comment}
                  lastOne={index === comments.length - 1}
                  toShow={commentsCount - comments.length}
                  setPage={setPage}
                  page={page}
                />
              </div>
            </div>
          ))}

        {/* Reacciones con Emojis */}
        <div className="flex gap-1">
          {/* {post &&
          reactions.map((reaction) => (
            <Reaction key={reaction.id} reaction={reaction} />
          ))} */}
        </div>
      </article>
    </div>
  );
};

export default Post;
