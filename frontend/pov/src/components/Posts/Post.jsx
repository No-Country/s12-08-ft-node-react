import { Link } from "react-router-dom";
import Reaction from "./Reaction";
import ThreadUnion from "../Svg/ThreadUnion";
import Response from "./Response";

const Post = ({ post, userName, userAvatar }) => {
  const { message, imageAdded, responses } = post;

  return (
    <article className="flex flex-col gap-2 px-2 py-4 rounded-lg">
      {/* Post */}
      <div className="py-1 px-4 flex flex-col justify-center items-center bg-[#C3C3BF] rounded-lg">
        {imageAdded && (
          <img
            src={imageAdded}
            alt="imagen adjunta al post"
            className="mb-2 rounded-lg overflow-hidden"
          />
        )}
        <div className="w-full flex gap-2 items-center">
          <img
            src={userAvatar}
            alt={`avatar de ${userName}`}
            className="w-[24px]"
          />
          <p className="w-full p-2 text-[12px]">
            <span className="font-black">{userName}: </span>
            {message}
          </p>
        </div>
      </div>

      {/* Link a Respuestas del post */}
      <div className="flex gap-1 pl-[28px]">
        <ThreadUnion />
        <Link
          to=""
          className="w-full p-2 flex gap-2 items-center bg-[#C3C3BF] rounded-lg"
        >
          <Response response={responses[0]} />
        </Link>
      </div>

      {/* Reacciones con Emojis */}
      <div className="flex gap-1">
        {post &&
          post?.reactions.map((reaction) => (
            <Reaction key={reaction.id} reaction={reaction} />
          ))}
      </div>
    </article>
  );
};

export default Post;
