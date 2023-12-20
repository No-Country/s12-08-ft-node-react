import { useContext, useState } from "react";
import { motion } from "framer-motion";
import Add from "../Svg/Add";
import Hashtag from "../Svg/Hashtag";
import Send from "../Svg/Send";
import { ChatContext } from "../../context/ChatContext";

const ThreadInput = () => {
  const { saveChangeText, handleSubmit, reactionsDicc, URL, TOKEN, selectedId, user } = useContext(ChatContext)
  const [text, setText] = useState("");

  /* const emojis = ["😍", "🔥", "👿", "💀", "🤮"]; */

  const handleChange = (e) => {
    setText(e.target.value);
    saveChangeText(e.target.value)
  };

  const handleEmoji = async(e, key) => {
    try { 
      const url = `${URL}/message/reaction/${selectedId}?user_id=${user.user.id}&reaction=${key}`;
      console.log(url)
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const data = await response.json();

      console.log(data)
    } catch (error) {
      console.error(error);
    }
  }


  return (
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
            onClick={(e) => handleEmoji(e, key)}
            className="w-12 h-12 p-[10px] flex justify-center items-center text-[24px] bg-[#1B1B1A] rounded-full transition-transform hover:scale-105"
          >
            {value}
          </button>
        ))}
        <button className="w-12 h-12 p-[10px] flex justify-center items-center text-[24px] bg-[#1B1B1A] rounded-full hover:scale-105">
          <Add />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full flex gap-[10px] justify-between items-start "
      >
        <Hashtag />
        <textarea
          value={text}
          cols="30"
          rows="auto"
          placeholder="Contesta el hilo aquí"
          className="w-full px-2 resize-none overflow-auto bg-transparent text-white outline-none"
          onChange={(e) => {
            handleChange(e)
          }}
        ></textarea>
        <div className="flex items-center mx-2">
          <button
            type="submit"
            className="bg-[#5D73E9] text-white rounded-full p-2 hover:bg-[#3f3f2e]"
          >
            <Send />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ThreadInput;
