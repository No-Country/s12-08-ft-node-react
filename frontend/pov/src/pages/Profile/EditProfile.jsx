import { useEffect, useState } from "react";
import { useToken } from "../../hooks/useToken";
import { useNavigate } from "react-router-dom";
import CloseX from "../../components/Svg/CloseX";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditProfile } from "../../slices/profileSlice";
import { fileToBase64, convertirImagenABase64 } from "../../helpers";
import { toast } from "react-hot-toast";

const EditProfile = () => {
  const { user } = useToken();
  const [userData, setUserData] = useState({
    name: user?.user.name,
    email: user?.user.email,
    username: user?.user.username,
    profile_picture: user?.user.profile_picture,
    date_of_birth: user?.user.date_of_birth,
  });

  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onInputChange = async (e) => {
    setIsEdit(true);
    if (e.target.name === "profile_picture") {
      try {
        const base64String = await fileToBase64(e.target);
        setUserData((userData) => ({
          ...userData,
          profile_picture: base64String,
        }));
      } catch (error) {
        console.error("Error al transformar el archivo a base64:", error);
      }
    } else {
      // Si no es "profile_picture", actualiza el estado normalmente
      setUserData((userData) => ({
        ...userData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const objToLocalStorage = user;

    objToLocalStorage.user = {
      ...objToLocalStorage.user,
      name: userData.name,
      email: userData.email,
      username: userData.username,
      profile_picture: userData.profile_picture,
      date_of_birth: userData.date_of_birth,
    };
    localStorage.setItem("user", JSON.stringify(objToLocalStorage));

    dispatch(fetchEditProfile(userData));

    setIsEdit(false);

    navigate(-1);

    toast.success("Usuario Moficado con exito!!!");
  };

  useEffect(() => {
    convertirImagenABase64(userData.profile_picture, function (base64) {
      setUserData((prevState) => ({ ...prevState, profile_picture: base64 }));
    });
  }, []);

  return (
    <>
      <header className="w-full px-[24px] py-[10px] pt-[64px] flex bg-white">
        <div className="w-full md:max-w-[1000px] lg:mx-auto items-center ">
          <h2 className="text-[20px]">Mi Perfil</h2>
          <p className="text-[12px]">Actualiza tus datos personales.</p>
        </div>
        <button
          className="btn btn-circle btn-ghost  hover:bg-slate-100"
          onClick={() => navigate(-1)}
        >
          <CloseX color="#232322" />
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
              //defaultValue={userData.name || ""}
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
              disabled
            />
          </div>
          <div>
            <label htmlFor="date_of_birth">Fecha de nacimiento</label>
            <input
              type="date"
              name="date_of_birth"
              id="date_of_birth"
              value={userData.date_of_birth || ""}
              className="mb-2 flex w-full h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30  bg-[#A5A5A5]"
              onChange={onInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profile_picture">Subir una foto de perfil </label>
            <input
              type="file"
              name="profile_picture"
              id="profile_picture"
              accept="image/png,image/jpeg"
              placeholder={userData.profile_picture}
              className="mb-2 flex items-center gap-2 flex-shrink-0 file-input file-input-ghost w-full max-w-xs"
              onChange={onInputChange}
            />
          </div>
          <div>
            <p>Imagen Seleccionada:</p>
            <div className="w-32 h-32 flex items-center overflow-hidden border-4 border-slate-300 rounded-full shadow-lg">
              <img
                src={userData.profile_picture}
                alt={`imagen de ${userData.name}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {isEdit ? (
            <button
              className="btn w-full h-14 mt-auto px-10 text-white  border rounded-md hover:bg-[#333333] bg-[#5D73E9] "
              type="submit"
            >
              Guardar Cambios
            </button>
          ) : null}
        </form>
      </main>
    </>
  );
};

export default EditProfile;
