import { useEffect, useContext } from 'react';
import Post from './Post';
import { Link } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext';
import axios from 'axios';

const PostList = ({ chat, user, toggleModal, messageCount}) => {
  const { profile_picture } = user;
  const { page, setPage , newMessage, URL, TOKEN} = useContext(ChatContext)

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [newMessage])

  useEffect(() => {
    const getComments = async() => {
      if(chat && page > 1){
        try {
          const url = `${URL}/message/chat/${user.id}?page=${page}`;
              const response = await axios.get(url, {
                headers: {
                  Authorization: `Bearer ${TOKEN}`,
                },
              });
               const { data } = response;

/*                const orderData = data.chat.messages.reverse()

               setMessages((prevMessages) => [
                 ...orderData.filter(
                   (newMessage) => !prevMessages.some((existingMessage) => existingMessage._id === newMessage._id)
                 ),
                 ...prevMessages,
               ]); */

/*              const newMessages = [...messages];

              const indexMessage = newMessages.findIndex((message) => message._id === post._id);
              
              if(indexMessage !== -1){
                newMessages[indexMessage].comments.push(...data.comments)
              }
              
              setMessages(newMessages) */
        } catch (error) {
          console.log(error);
        }
      }
    }

    getComments()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

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
