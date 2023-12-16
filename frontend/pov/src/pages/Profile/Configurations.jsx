import { useState, useSelector } from "react";
import { useNavigate } from "react-router-dom";
import CloseX from "../../components/Svg/CloseX";

const Configurations = () => {
 
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
    date_of_birdth: "",
  });
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setUserData((userData) => ({
      ...userData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <>
      <header className="w-full px-[24px] py-[10px] mt-[96px] mb-[12px] flex bg-white">
        <div className="w-full md:max-w-[1000px] lg:mx-auto items-center ">
          <h2 className="text-[20px]">Mi Perfil</h2>
          <p className="text-[12px]">Actualiza tus datos personales.</p>
        </div>
        <button
          className="btn btn-circle btn-ghost bg-gray-200 hover:bg-slate-100"
          onClick={() => navigate("/home")}
        >
          <CloseX />
        </button>
      </header>
      <main className="w-full md:max-w-[1000px] lg:mx-auto px-[24px]">
        <form className="px-8 h-[calc(100vh-260px)] flex flex-col" >
          <div>
            <label htmlFor="name">Nombre y Apellido</label>
            <input
              type="text"
              name="name"
              id="name"
              value={userData.name}
              className="mb-2 flex w-full h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30  bg-[#A5A5A5]"
              onChange={onInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              value={userData.email}
              className="mb-2 flex w-full h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30  bg-[#A5A5A5]"
              onChange={onInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              name="username"
              id="username"
              value={userData.username}
              className="mb-2 flex w-full h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30  bg-[#A5A5A5]"
              onChange={onInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="date_of_birdth">Fecha de nacimiento</label>
            <input
              type="date"
              name="date_of_birdth"
              id="date_of_birdth"
              value={userData.date_of_birdth}
              className="mb-2 flex w-full h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30  bg-[#A5A5A5]"
              onChange={onInputChange}
              required
            />
          </div>
          <button
            className="btn w-full h-14 mt-auto px-10 text-white bg-[#232322] border rounded-md hover:bg-[#333333] "
            type="submit"
          >
            Continuar
          </button>
        </form>
      </main>
    </>
  );
};

export default Configurations;
