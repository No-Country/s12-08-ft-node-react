import { useContext } from "react";
import { motion } from "framer-motion";
import Add from "../Svg/Add";
import { ChatContext } from "../../context/ChatContext";

const ThreadEmojis = ({toggleModal}) => {
  const { reactionsDicc, selectedId, messages ,user, handleEmojiComment, currenctCommentId } = useContext(ChatContext)

  const handleClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };
  
  const userReacted = (key) => {
    const message = messages.find((message) => message._id === selectedId)

    const comment = message.comments.find((comment) => comment._id === currenctCommentId)

    return comment.reactions.users_who_reacted
      .some((reaction) => user.user.id === reaction.user_id && reaction.reaction === key)
  }
  return (
    <div
    className="w-full h-screen fixed z-20 flex flex-col items-center bg-[rgba(0,0,0,0.3)]"
    onClick={handleClick}
  >
    <motion.div
      initial={{
        y: 100,
      }}
      transition={{
        duration: 0.3,
      }}
      animate={{
        y: 0,
      }}
      className={
        "w-full max-w-[780px] absolute z-50 bottom-0 px-[24px] py-[16px] flex flex-col gap-[16px] justify-between bg-[#232322] text-white rounded-t-3xl"
      }
    >
      <div className="w-full flex justify-between ">
        {Object.entries(reactionsDicc).map(([key, value]) => (
          <button
            key={key}
            onClick={(e) => handleEmojiComment(e, key, currenctCommentId , selectedId, true)}
            className={`w-12 h-12 p-[10px] flex justify-center items-center text-[24px] rounded-full transition-transform hover:scale-105 ${
              userReacted(key) ? 'bg-[#5D73E9]' : 'bg-[#1B1B1A]'
            }`}
          >
            {value}
          </button>
        ))}
        <button className="w-12 h-12 p-[10px] flex justify-center items-center text-[24px] bg-[#1B1B1A] rounded-full hover:scale-105">
          <Add />
        </button>
      </div>
    </motion.div>
    </div>
  );
};
export default ThreadEmojis;
