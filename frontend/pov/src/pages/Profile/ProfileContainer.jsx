import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useToken } from "../../hooks/useToken";
import axios from "axios";
import SubscriptionsList from "./SubscriptionsList";
import BackBtn from "../../components/Svg/BackBtn";
import EditBtn from "../../components/Svg/EditBtn";
import LoadingSpinner from "../../components/Svg/LoadingSpinner";
import MessageChatCircle from "../../components/Svg/MessageChatCircle";
import CheckedIcon from "../../components/Svg/CheckedIcon";
import SubscriptionCard from "./SubscriptionCard";
import { useSelector } from "react-redux";

const ProfileContainer = () => {
  const [userData, setUserData] = useState({});
  const [subscriptions, setSubscriptions] = useState([]);
  const [backgroundChat, setBackgroundChat] = useState("");

  const { token, user } = useToken();
  const TOKEN = JSON.parse(token);

  const { id } = useParams();
  const profile = useSelector((state) => state.profile);

  const navigate = useNavigate();

  // OBTIENE EL USUARIO QUE MUESTRA EL PERFIL y SETEA EL ESTADO USERDATA
  const getUser = async () => {
    try {
      //URL Para los chat
      const URL = `https://pov.azurewebsites.net/api/users/?profile=${id}`;

      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const { data } = response;
      setBackgroundChat(data.chat.img);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // OBTIENE LA LISTA DE SUBSCRIPCIONES PARA EL USER LOGUEADO
  const getSubscriptions = async () => {
    try {
      const URL = `https://pov.azurewebsites.net/api/users/subscribed/`;

      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setSubscriptions(response.data.userSubscriptions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData && userData.id === id) {
      getSubscriptions();
    }
  }, [userData]);

  return id ? (
    <>
      <header
        className="w-full md:max-w-[1000px] lg:mx-auto flex justify-between items-center px-[24px] py-2 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundChat})`,
        }}
      >
        {/* BOTON VOLVER ATRAS */}
        <Link to="/home">
          <BackBtn color={"white"} />
        </Link>

        {/* INFO DE USUARIO */}
        <div className="flex flex-col items-center justify-center ">
          <div>
            <span className=" text-white">
              {profile.email ? profile.email : userData.email}
            </span>
          </div>
          <div className="flex justify-center items-center bg-gradient-to-b from-[#5D73E9] via-[#4C22B3] to-[#FF8600] rounded-full">
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-transparent">
              <img
                src={
                  profile.profile_picture
                    ? profile.profile_picture
                    : userData.profile_picture
                }
                className="w-[80px] h-[80px] object-cover"
              />
            </div>
          </div>
          <p className="w-full flex gap-2 text-[14px] font-bold text-white justify-center items-center">
            {profile.name ? profile.name : userData.name}
            <span className="">
              <CheckedIcon />
            </span>
          </p>
          <div className="w-full flex flex-row justify-center items-center text-whit">
            <p className="w-full flex gap-1 justify-center items-center p-2 text-white text-[12px] font-thin">
              {userData.subscribersCount}
              <span className="text-white">
                {userData.subscribersCount >= 1000
                  ? "mil"
                  : userData.subscribersCount >= 1000000
                  ? "millon de"
                  : null}
                suscriptores
              </span>
            </p>
          </div>
        </div>

        {/* BOTON EDITAR - SI NO ES USUARIO LOGEADO NO APARECE */}
        {id === user.user.id ? (
          <Link to="/config">
            <EditBtn className={"white"} />
          </Link>
        ) : (
          <div></div>
        )}
      </header>

      <main className="w-full min-h-[calc(100vh-175px)] flex flex-col md:max-w-[1000px] lg:mx-auto py-8 px-[24px]">
        {/* LISTADO DE SUBSCRIPCIONES */}
        <SubscriptionsList>
          {user.user.id === id ? (
            subscriptions?.map((subs, index) => (
              <Link key={index} to={`/chats/${subs.beneficiary.id}`}>
                <SubscriptionCard key={subs.beneficiary.id} subs={subs} />
              </Link>
            ))
          ) : (
            <div className="w-full h-[300px] overflow-hidden rounded-lg">
              <img
                alt="Chat with your favorite famous ppl"
                src="https://m.media-amazon.com/images/M/MV5BNDQzNDViNDYtNjE2Ny00YmNhLWExZWEtOTIwMDA1YjY5NDBhXkEyXkFqcGdeQXVyODg3NDc1OTE@._V1_FMjpg_UX1000_.jpg"
                className="w-full h-[300px] object-cover"
              />
            </div>
          )}
        </SubscriptionsList>
        {/* BOTON DE IR A CHAT */}
        <div className="mt-auto mx-auto w-[345px]">
          <button
            onClick={() => {
              {
                user.user.id === id
                  ? navigate(`/chats/${user.user.id}`)
                  : navigate(`/chats/${id}`);
              }
            }}
            className="btn mt-auto text-white hover:bg-gray-500 flex h-14 px-10 justify-center w-full items-center gap-4 border rounded-md bg-[#5D73E9]"
          >
            <span className=" text-white">Ir al chat</span>
            <MessageChatCircle />
          </button>
        </div>
      </main>
    </>
  ) : (
    <LoadingSpinner />
  );
};

export default ProfileContainer;
