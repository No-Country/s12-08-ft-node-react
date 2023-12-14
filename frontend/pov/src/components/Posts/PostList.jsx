import { useState } from "react";
import Post from "./Post";

// POSTLIST toma los posts que es un array de objetos post y los lista.-
const PostList = ({ chat, user, toggleModal }) => {
  const { profile_picture } = user;
  const { messages, name } = chat;

  return (
    <section className="w-full max-w-[780px] mx-auto py-4 flex flex-col gap-4 px-[16px]">
      {messages.map((message) => (
        <Post
          key={message._id}
          post={message}
          userName={name}
          userAvatar={profile_picture}
          toggleModal={toggleModal}
        />
      ))}
    </section>
  );
};

export default PostList;
