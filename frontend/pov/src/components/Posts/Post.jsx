import Reaction from "./Reaction";
// POST toma el objeto post y renderiza su información.
const Post = ({ post = {} }) => {
  return (
    <article className="bg-gray-300">
      <div>
        Imagen si hay
        <img src="" alt="" />
      </div>
      <div className="bg-gray-500 rounded-lg">
        <p>Mensaje si hay</p>
      </div>
      <div>
        {post &&
          post?.reactions.map((reaction) => <Reaction reaction={reaction} />)}
      </div>
    </article>
  );
};

export default Post;
