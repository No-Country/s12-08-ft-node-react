import Reaction from "./Reaction";
import ThreadUnion from "../Svg/ThreadUnion";
import Response from "./Response";
// POST toma el objeto post y renderiza su información.
const Post = ({ post, username, avatar }) => {
  
  const { message, image, responses } = post;
  console.log(responses[0]);
  return (
    <article className="flex flex-col gap-2 px-2 py-4 rounded-lg">
      {/* Post */}
      <div className="py-1 px-4 flex flex-col justify-center items-center bg-[#C3C3BF] rounded-lg">
        {image && (
          <img
            src={image}
            alt="imagen adjunta al post"
            className="mb-2 rounded-lg overflow-hidden"
          />
        )}
        <div className="w-full flex gap-2 items-center">
          <img src={avatar} alt="user avatar" className="w-[24px]" />
          <p className="w-full text-[12px]">
            <span className="font-black">{username}: </span>
            {message}
          </p>
        </div>
      </div>
      {/* Respuestas al post */}
      <div className="flex gap-1 pl-[28px]">
        <ThreadUnion />
        <div className="w-full p-2 flex gap-2 items-center bg-[#C3C3BF] rounded-lg">
          <Response response={responses[0]} />
        </div>
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
