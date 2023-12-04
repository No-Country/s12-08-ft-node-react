import { useNavigate } from "react-router-dom";
import BackBtn from "../components/Svg/BackBtn";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <main className="w-full px-[24px] py-8">
      <div className="mb-2 p-2 flex gap-4 items-center bg-black">
        <button
          className="btn btn-circle btn-ghost bg-gray-200 text-white hover:bg-slate-100"
          onClick={() => navigate("/home")}
        >
          <BackBtn color="black" />
        </button>
        <h2 className="text-xl text-white">Configuraciones</h2>
      </div>
      <p className="mb-8 text-xs">
        Aquí puedes configurar tu perfil de usuario.
      </p>
      <section className="px-8">
        <ul className="flex flex-col gap-8">
          <li>Cambiar Foto de perfil</li>
          <li>Cambiar nombre de usuario</li>
          <li>Cambiar email de cuenta</li>
          <li>Borrar historial de búsquedas</li>
          <li>Seguridad</li>
        </ul>
      </section>
    </main>
  );
};

export default Profile;
