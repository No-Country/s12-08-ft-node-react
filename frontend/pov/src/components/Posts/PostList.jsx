import { useEffect, useContext, useState, useRef} from 'react';
import Post from './Post';
import { Link } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext';
import axios from 'axios';

const PostList = ({ chat, user, toggleModal, messageCount, toggleModalComment}) => {
  const { profile_picture } = user;
  const [page, setPage] = useState(1);
  const { newMessage, URL, TOKEN, setMessages} = useContext(ChatContext)
  const ButtonRef = useRef();

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [newMessage])



  useEffect(() => {
    const getMessages = async() => {
      if(chat && page > 1){
        try {
          const url = `${URL}/message/chat/${user.id}?page=${page}`;
              const response = await axios.get(url, {
                headers: {
                  Authorization: `Bearer ${TOKEN}`,
                },
              });
          const { data } = response;

          const orderData = data.messages.reverse()

          const buttonHeight = ButtonRef.current.offsetHeight

          setMessages((prevMessages) => [
            ...orderData.filter(
              (newMessage) => !prevMessages.some((existingMessage) => existingMessage._id === newMessage._id)
            ),
            ...prevMessages,
          ]);


          window.scrollTo({ top: buttonHeight })
        } catch (error) {
          console.log(error);
        }
      }
    }

    getMessages()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handlePage = () => {
    setPage(page + 1)
  }

  return (
    <section className="w-full max-w-[780px] mx-auto py-4 flex flex-col gap-4 px-[16px]" >
      { chat.length < messageCount &&
        <Link ref={ButtonRef} onClick={handlePage} className="text-blue-500 hover:underline cursor-pointer text-center">Mostrar mas...</Link>
      }
      <div>
        {chat?.map((message) => (
          <Post
            key={message._id}
            post={message}
            userName={user.username}
            userAvatar={profile_picture}
            toggleModal={toggleModal}
            commentsCount={message.totalComments}
            toggleModalComment={toggleModalComment}
          />
      ))}
      </div>
        
    </section>
  );
};

export default PostList;
