import BackBtn from "../../components/Svg/BackBtn";
import fondo from "../../assets/avatars/fondo1.jpg";
import EdictBtn from "../../components/Svg/EdictBtn";
import LoadingSpinner from "../../components/Svg/LoadingSpinner";
import MessageChatCircle from "../../components/Svg/MessageChatCircle";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useToken } from "../../hooks/useToken";
import { useEffect, useState } from "react";
import axios from "axios";
import CardProfile from "./CardProfile";

const ProfileContainer = () => {
  const [userToCall, setUserToCall] = useState("");
  const [userData, setUserData] = useState({});

  const { token, user } = useToken();
  const TOKEN = JSON.parse(token);

  const { id } = useParams();

  const navigate = useNavigate();

  const { id: idUser } = user;

  // Comparar ids de usuario
  useEffect(() => {
    if (id === user.user.id) {
      setUserToCall(user.user.id);
    } else {
      setUserToCall(id);
    }
  }, [userToCall]);

  useEffect(() => {
    const getUser = async () => {
      try {
        //URL Para los chat
        const URL = `https://pov.azurewebsites.net/api/users/?profile=${userToCall}`;

        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        const { data } = response;
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [userToCall]);

  return userToCall ? (
    <>
      <header
        className="w-full md:max-w-[1000px] lg:mx-auto flex flex-col justify-between items-center px-[24px] py-2 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${fondo})`,
        }}
      >
        <div className=" w-full flex flex-row justify-between items-center ">
          <div>
            <Link to="/home">
              <BackBtn color={"white"} />
            </Link>
          </div>
          <div>
            <span className=" text-white">{userData.email}</span>
          </div>
          {userToCall === user.user.id ? (
            <div>
              <Link to="/config">
                <EdictBtn className={"white"} />
              </Link>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col items-center justify-center ">
          <div className="w-[80px] h-[81px] rounded-full overflow-hidden">
            <img src={userData.profile_picture} className="" />
          </div>
          <p className="text-[12px] font-thin ">
            <span className=" text-white items-center">@{userData.name}</span>
          </p>
        </div>

        <div className="w-full flex flex-row justify-center items-center text-whit">
          <div>
            <p className="w-full flex flex-col justify-center items-center p-2 text-white text-[12px] font-thin">
              {userData.suscribersCount}
              <br />
              <span className="text-white">suscriptores</span>
            </p>
          </div>
          <div>
            <p className="w-full flex flex-col justify-center items-center p-2 text-white text-[12px] font-thin">
              {userData.suscribedToCount}
              <br />
              <span className="text-white">suscripciones</span>
            </p>
          </div>
        </div>
      </header>

      <main className="w-full flex flex-col md:max-w-[1000px] min-h-[calc(100vh-99px)] lg:mx-auto py-8 px-[24px] bg-slate-100">
        {user.user.id === id ? <CardProfile /> : ""}
        <div className="fixed bottom-[84px] left-1/2 -translate-x-1/2 w-[345px]">
          <button
            onClick={() => {
              {
                user.user.id === id
                  ? navigate(`/chats/${user.user.id}`)
                  : navigate(`/chats/${userToCall.id}`);
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
