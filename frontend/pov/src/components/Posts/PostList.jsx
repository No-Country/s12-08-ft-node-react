import { useEffect, useContext } from 'react';
import Post from './Post';
import { Link } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext';

const PostList = ({ chat, user, toggleModal, messageCount}) => {
  const { profile_picture } = user;
  const { page, setPage , newMessage} = useContext(ChatContext)

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [newMessage])


  const handlePage = () => {
    setPage(page + 1)
  }

  return (
    <section className="w-full max-w-[780px] mx-auto py-4 flex flex-col gap-4 px-[16px]" >
      { chat.length < messageCount &&
        <Link onClick={handlePage} className="text-blue-500 hover:underline cursor-pointer text-center">Mostrar mas...</Link>
      }
        {chat?.map((message) => (
          <Post
            key={message._id}
            post={message}
            userName={user.username}
            userAvatar={profile_picture}
            toggleModal={toggleModal}
            commentsCount={message.totalComments}
          />
      ))}
    </section>
  );
};

export default PostList;
