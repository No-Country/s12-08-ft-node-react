import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseX from "../../components/Svg/CloseX";
import { useDispatch } from "react-redux";
import { fetchEditProfile } from "../../slices/profileSlice";
import { fileToBase64 } from "../../helpers/fileUtils";
 
const EditProfile = () => {
    // Obtener el objeto del localStorage
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const{user}= storedUserData
    const { id, role, subscriptions, suscribedToCount, suscribersCount, ...User } = user;
    const [userData, setUserData] = useState(User || "");
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onInputChange = async (e) => {
      setIsEdit(true);
      if (e.target.name === "profile_picture") {
        try {
          const base64String = await fileToBase64(e.target);
          setUserData((UserData) => ({
            ...UserData,
            [e.target.name]: e.target.value,
            profile_picture: base64String,
          }));
        } catch (error) {
          console.error("Error al transformar el archivo a base64:", error);
        }
      }
       };
useEffect(() => {
  console.log(userData);
}, [userData]);

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(fetchEditProfile(userData));
      setIsEdit(false);
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
          onClick={() => navigate("/profile")}
        >
          <CloseX />
        </button>
      </header>
      <main className="w-full md:max-w-[1000px] lg:mx-auto px-[24px]">
        <form
          className="px-8 h-[calc(100vh-260px)] flex flex-col"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name">Nombre y Apellido</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={userData.name || ""}
              //value={userData.name || ""}
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
              defaultValue={userData.email || ""}
              // value={userData.email || ""}
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
              defaultValue={userData.username || ""}
              // value={userData.username || ""}
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
              defaultValue={userData.date_of_birth || ""}
             // value={userData.date_of_birth || ""}
              className="mb-2 flex w-full h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30  bg-[#A5A5A5]"
              onChange={onInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="date_of_birdth">Subir una foto de perfil </label>
            <input
              type="file"
              name="profile_picture"
              id="profile_picture"
              // value={userData.profile_picture}
              className="mb-2 flex items-center gap-2 flex-shrink-0 file-input file-input-ghost w-full max-w-xs"
              onChange={onInputChange}
              required
            />
          </div>
          <button
            className="btn w-full h-14 mt-auto px-10 text-white  border rounded-md hover:bg-[#333333] bg-[#5D73E9] "
            type="submit"
          >
            {isEdit ? "Editar" : "Cancelar"}
          </button>
        </form>
      </main>
    </>
  );
};

export default EditProfile;
