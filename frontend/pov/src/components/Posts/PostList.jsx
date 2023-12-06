import Post from "./Post";
import userAvatar from "../../assets/avatars/user.webp";
import noUserAvatar from "../../assets/avatars/no_user.png";

const userPosts = {
  id: "1",
  username: "Rubius",
  avatar: userAvatar,
  posts: [
    {
      id: "1",
      image: "",
      message: "Hola soy un post sin imagen",
      responses: [
        {
          id: "1",
          username: "Usuario1",
          avatar: noUserAvatar,
          message: "Y entonces?...",
        },
        {
          id: "2",
          username: "Usuario2",
          avatar: noUserAvatar,
          message: "mmm...no creo que sea asi.",
        },
        {
          id: "3",
          username: "Usuario3",
          avatar: noUserAvatar,
          message: "Tal vez puede que vaya tambien..pero me da fiaca!.",
        },
      ],
      reactions: [
        {
          id: "1",
          image: "😍",
          amount: 0,
        },
        {
          id: "2",
          image: "🔥",
          amount: 10,
        },
        {
          id: "3",
          image: "💀",
          amount: 0,
        },
        {
          id: "4",
          image: "🤮",
          amount: 30,
        },
        {
          id: "5",
          image: "👿",
          amount: 0,
        },
        {
          id: "6",
          image: "✖️",
          amount: 0,
        },
      ],
    },
    {
      id: "2",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4z46qK0RcIPyHJ8np0rnC5j6DCFGW7M9yGgQ8X5cMPOn-tnzy7SSu9ruItPItNDd5KY&usqp=CAU",
      message: "Cómo estan? que les parece esta nueva portada para mi serie?",
      responses: [
        {
          id: "1",
          username: "Usuario1",
          avatar: noUserAvatar,
          message: "Esta Genial!!!!",
        },
        {
          id: "2",
          username: "Usuario2",
          avatar: noUserAvatar,
          message: "Yo buscaria una foto mejor...",
        },
        {
          id: "3",
          username: "Usuario3",
          avatar: noUserAvatar,
          message: "Me la voy a ver en un día! les aseguro!",
        },
      ],
      reactions: [
        {
          id: "1",
          image: "😍",
          amount: 30,
        },
        {
          id: "2",
          image: "🔥",
          amount: 0,
        },
        {
          id: "3",
          image: "💀",
          amount: 5,
        },
        {
          id: "4",
          image: "🤮",
          amount: 10,
        },
        {
          id: "5",
          image: "👿",
          amount: 0,
        },
        {
          id: "6",
          image: "✖️",
          amount: 1,
        },
      ],
    },
  ],
};

// POSTLIST toma los posts que es un array de objetos post y los lista.-
const PostList = () => {
  const { posts, username, avatar, responses } = userPosts;

  return (
    <section className="py-4 flex flex-col gap-4 px-[16px]">
      {posts.map((post) => (
        <Post key={post.id} post={post} username={username} avatar={avatar} />
      ))}
    </section>
  );
};

export default PostList;
