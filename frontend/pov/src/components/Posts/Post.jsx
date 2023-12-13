import { Link } from 'react-router-dom';
import { useContext } from 'react'
import ThreadUnion from '../Svg/ThreadUnion';
import Response from './Response';
import { ChatContext } from '../../context/ChatContext';

const Post = ({ post, userName, userAvatar, toggleModal }) => {
  const { saveChangeId, saveSelectedSocket } = useContext(ChatContext)
  const { text, comments, reactions } = post;


  return (
    <article
      className="flex flex-col gap-2 px-2 py-4 rounded-lg hover:scale-[102%] transition-transform cursor-pointer"
      onClick={() => {
        toggleModal();
        saveChangeId(post._id)
        saveSelectedSocket(post?.user_id)
      }}
    >
      {/* Imagen del Post adjunta */}
      <div className="py-1 px-4 flex flex-col justify-center items-center bg-[#C3C3BF] rounded-lg">
        {/* {imageAdded && (
          <img
            src={imageAdded}
            alt="imagen adjunta al post"
            className="mb-2 rounded-lg overflow-hidden"
          />
        )} */}
        {/* Texto del Post */}
        <div className="w-full flex gap-2 items-center">
          <img
            src={userAvatar}
            alt={`avatar de ${userName}`}
            className="w-[24px]"
          />
          <p className="w-full p-2 text-[12px]">
            <span className="font-black">{userName}: </span>
            {text}
          </p>
        </div>
      </div>

      {/* Link a Respuestas del post */}
      {comments.length > 0 && (
        <div className="flex gap-1 pl-[28px]">
          <ThreadUnion />
          <Link
            to=""
            className="w-full p-2 flex gap-2 items-center bg-[#C3C3BF] rounded-lg"
          >
            <Response responses={comments[0]} />
          </Link>
        </div>
      )}

      {/* Reacciones con Emojis */}
      <div className="flex gap-1">
        {/* {post &&
          reactions.map((reaction) => (
            <Reaction key={reaction.id} reaction={reaction} />
          ))} */}
      </div>
    </article>
  );
};

export default Post;
