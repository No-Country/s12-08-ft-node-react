import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useToken } from "../../hooks/useToken";
import axios from "axios";
import SubscriptionsList from "./SubscriptionsList";
import BackBtn from "../../components/Svg/BackBtn";
import fondo from "../../assets/avatars/fondo1.jpg";
import EditBtn from "../../components/Svg/EditBtn";
import LoadingSpinner from "../../components/Svg/LoadingSpinner";
import MessageChatCircle from "../../components/Svg/MessageChatCircle";
import CheckedIcon from "../../components/Svg/CheckedIcon";
import SubscriptionCard from "./SubscriptionCard";

const ProfileContainer = () => {
  const [userData, setUserData] = useState({});
  const [subscriptions, setSubscriptions] = useState([]);

  const { token, user } = useToken();
  const TOKEN = JSON.parse(token);

  const { id } = useParams();

  const navigate = useNavigate();

  // OBTIENE EL USUARIO QUE MUESTRA EL PERFIL y SETEA EL ESTADO USERDATA
  const getUser = async () => {
    try {
      //URL Para los chat
      console.log("GETUSER");
      const URL = `https://pov.azurewebsites.net/api/users/?profile=${id}`;

      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const { data } = response;
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
      console.log(response.data.userSubscriptions);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (userData && userData.id === id) {
      getSubscriptions();
    }
  }, [userData]);
  
    //   useEffect(() => {
    //   // Actualiza el estado local cuando los datos globales cambian
    //   setUserData({
    //     name: user?.user.name,
    //     email: user?.user.email,
    //     username: user?.user.username,
    //     profile_picture: user?.user.profile_picture,
    //     date_of_birth: user?.user.date_of_birth,
    //   });
    // }, [user]);
  
  console.log(userData);
  console.log(subscriptions);

  return id ? (
    <>
      <header
        className="w-full md:max-w-[1000px] lg:mx-auto flex justify-between items-center px-[24px] py-2 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${fondo})`,
        }}
      >
        {/* BOTON VOLVER ATRAS */}
        <Link to="/home">
          <BackBtn color={"white"} />
        </Link>

        {/* INFO DE USUARIO */}
        <div className="flex flex-col items-center justify-center ">
          <div>
            <span className=" text-white">{userData.email}</span>
          </div>
          <div className="w-[80px] rounded-full overflow-hidden">
            <img src={userData.profile_picture} />
          </div>
          <p className="w-full flex gap-2 text-[14px] font-bold text-white justify-center items-center">
            @{userData.name}
            <span className="">
              <CheckedIcon />
            </span>
          </p>
          <div className="w-full flex flex-row justify-center items-center text-whit">
            <p className="w-full flex gap-2 justify-center items-center p-2 text-white text-[12px] font-thin">
              {userData.subscribersCount}
              <span className="text-white">
                {userData.subscribersCount >= 1000
                  ? "mil"
                  : userData.subscribersCount >= 1000000
                  ? "millon"
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

      <main className="w-full flex flex-col md:max-w-[1000px] min-h-[calc(100vh-99px)] lg:mx-auto py-8 px-[24px] bg-slate-100">
        {/* LISTADO DE SUBSCRIPCIONES */}
        <SubscriptionsList>
          {subscriptions?.map((subs) => (
            <SubscriptionCard key={subs.beneficiary.id} subs={subs} />
          ))}
        </SubscriptionsList>

        {/* BOTON DE IR A CHAT */}
        <div className="fixed bottom-[84px] left-1/2 -translate-x-1/2 w-[345px]">
          <button
            onClick={() => {
              {
                user.user.id === id
                  ? navigate(`/chats/${user.user.id}`)
                  : navigate(`/chats/${id.id}`);
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





