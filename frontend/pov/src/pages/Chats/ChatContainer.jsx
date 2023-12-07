import BackBtn from "../../components/Svg/BackBtn";
import { useParams } from "react-router-dom";
import PostList from "../../components/Posts/PostList";
import MessageBar from "../../components/MessageBar/MessageBar";
import fondo from "../../assets/avatars/fondo1.jpg";
import Cheked from "../../components/Svg/Cheked";
import userAvatar from "../../assets/avatars/user.webp";
import noUserAvatar from "../../assets/avatars/no_user.png";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useToken } from "../../hooks/useToken";

const userPosts = [
  {
    id: "1",
    username: "Rubius",
    email: "rubius@mail.com",
    name: "Ruben Bladez",
    role: "client",
    profile_picture: userAvatar,
    date_of_birdth: "1999-12-02",
    subscriptions: [
      {
        beneficiary_id: "1",
      },
      {
        beneficiary_id: "2",
      },
      {
        beneficiary_id: "3",
      },
      {
        beneficiary_id: "4",
      },
      {
        beneficiary_id: "5",
      },
      {
        beneficiary_id: "6",
      },
      {
        beneficiary_id: "7",
      },
      {
        beneficiary_id: "8",
      },
    ],
    subscribersCount: 1780340,
    subscribedToCount: 8,
    posts: [
      {
        id: "1",
        imageAdded: "",
        message: "Hola soy un post sin imagen. Probando esta nueva APP!",
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
        imageAdded:
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
  },
  {
    id: "2",
    username: "NoCountry",
    email: "nocountry@mail.com",
    name: "No Country",
    role: "client",
    profile_picture: userAvatar,
    date_of_birdth: "2010-01-10",
    subscriptions: [
      {
        beneficiary_id: "1",
      },
      {
        beneficiary_id: "2",
      },
      {
        beneficiary_id: "3",
      },
      {
        beneficiary_id: "4",
      },
      {
        beneficiary_id: "5",
      },
    ],
    subscribersCount: 20345,
    subscribedToCount: 5,
    posts: [
      {
        id: "1",
        imageAdded: "",
        message:
          "Hola Bienvenidos a NoCountry. A la gente que hizo POV le vamos a poner un 10!! o no?",
        responses: [
          {
            id: "1",
            username: "Usuario1",
            avatar: noUserAvatar,
            message: "Donde me puedo anotar???",
          },
          {
            id: "2",
            username: "Usuario2",
            avatar: noUserAvatar,
            message: "Quisiera que me pasen mas info. Gracias!",
          },
          {
            id: "3",
            username: "Usuario3",
            avatar: noUserAvatar,
            message: "Claro que siiii!!",
          },
        ],
        reactions: [
          {
            id: "1",
            image: "😍",
            amount: 15,
          },
          {
            id: "2",
            image: "🔥",
            amount: 10,
          },
          {
            id: "3",
            image: "💀",
            amount: 1,
          },
          {
            id: "4",
            image: "🤮",
            amount: 0,
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
        imageAdded:
          "https://media.licdn.com/dms/image/D4E22AQFv1R0SQj1mYw/feedshare-shrink_2048_1536/0/1699454762857?e=1704931200&v=beta&t=nzXQfiwhBF4OGrUn4XYokrv5akuFjsB3YsEQI9JQrtA",
        message:
          "Cómo estan? les dejamos info para anotarse a la nueva simulación para el 2024",
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
            message: "Excelente ya me estoy anotando!",
          },
          {
            id: "3",
            username: "Usuario3",
            avatar: noUserAvatar,
            message: "Tiene algun costo???",
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
  },
  {
    id: "3",
    username: "midudev",
    email: "nocountry@mail.com",
    name: "MIDUdev",
    role: "client",
    profile_picture: userAvatar,
    date_of_birdth: "2008-05-14",
    subscriptions: [
      {
        beneficiary_id: "1",
      },
      {
        beneficiary_id: "2",
      },
      {
        beneficiary_id: "3",
      },
      {
        beneficiary_id: "4",
      },
      {
        beneficiary_id: "5",
      },
      {
        beneficiary_id: "6",
      },
      {
        beneficiary_id: "7",
      },
      {
        beneficiary_id: "8",
      },
      {
        beneficiary_id: "9",
      },
      {
        beneficiary_id: "10",
      },
      {
        beneficiary_id: "11",
      },
    ],
    subscribersCount: 80908,
    subscribedToCount: 11,
    posts: [
      {
        id: "1",
        imageAdded:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP7ZExgP83PmU9IcKyN5NYm8zfirXVveCLYtDr3Z9eckWqHwHaBk5rRrU_a19bgXlJle8&usqp=CAU",
        message: "Hola acabo de abrir este chat en POV que os parece??",
        responses: [
          {
            id: "1",
            username: "Usuario1",
            avatar: noUserAvatar,
            message: "Ya te empece a seguir",
          },
          {
            id: "2",
            username: "Usuario2",
            avatar: noUserAvatar,
            message:
              "Le aviso a mis amigos que creen una cuenta asi te siguen!",
          },
          {
            id: "3",
            username: "Usuario3",
            avatar: noUserAvatar,
            message: "Claro que siiii!!",
          },
        ],
        reactions: [
          {
            id: "1",
            image: "😍",
            amount: 15,
          },
          {
            id: "2",
            image: "🔥",
            amount: 10,
          },
          {
            id: "3",
            image: "💀",
            amount: 1,
          },
          {
            id: "4",
            image: "🤮",
            amount: 0,
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
        imageAdded:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDonKzchqLXRd-VeOWWDw66V7J8meysvtdj48wnyblbxcSSVit2ICph2hXngCqOjnadoI&usqp=CAU",
        message:
          "Cómo estan? pueden seguirme en Twitch para ver clases en vivo y codear juntos!!",
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
            message: "Excelente ya me estoy anotando!",
          },
          {
            id: "3",
            username: "Usuario3",
            avatar: noUserAvatar,
            message: "Tiene algun costo???",
          },
        ],
        reactions: [
          {
            id: "1",
            image: "😍",
            amount: 100,
          },
          {
            id: "2",
            image: "🔥",
            amount: 15,
          },
          {
            id: "3",
            image: "💀",
            amount: 5,
          },
          {
            id: "4",
            image: "🤮",
            amount: 8,
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
  },
];

const ChatContainer = () => {
  // const [user, setUser] = useState([]);
  const { id } = useParams();
  console.log(id);
  // const { token } = useToken();
  // const getUser = async () => {
  //   try {
  //     //URL Para traer los perfiles
  //     const URL = `https://pov.azurewebsites.net/api/users/${id}`;

  //     //URL Para los chat *No Funciona*
  //     //const URL = `https://pov.azurewebsites.net/api/chats/chat/${id}`;
  //     const { data } = await axios.get(URL, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (data) {
  //       setUser(data);
  //     } else setUser([]);
  //     //  console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // console.log(user);
  // useEffect(() => {
  //   getUser();
  // }, [id]);

  const { username, subscribersCount, profile_picture, posts } =
    userPosts[id - 1];

  return (
    <>
      <header
        className="w-full md:max-w-[1000px] lg:mx-auto flex justify-between items-center px-[24px] py-2 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${fondo})`,
        }}
      >
        <div className="w-[79px]">
          <BackBtn color={"white"} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <img src={profile_picture} alt="" className="w-[44px] h-[44px]" />
          <p className="flex w-full items-center justify-center gap-2 text-white text-[14px]">
            {username}
            <span>{<Cheked />}</span>
          </p>
          <p className="text-white text-[12px] font-thin">
            <span>{subscribersCount}</span> millones
          </p>
        </div>
        <button className="w-[79px] h-[28px] md:w-[120px] text-white text-[10px] rounded-full bg-[#232322] border-none hover:bg-gray-600">
          Subscribirse
        </button>
      </header>

      <main className="w-full md:max-w-[1000px] lg:mx-auto">
        <PostList
          posts={posts}
          userName={username}
          userAvatar={profile_picture}
        />
        <MessageBar />
      </main>
    </>
  );
};

export default ChatContainer;
