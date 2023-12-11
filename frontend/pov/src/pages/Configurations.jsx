import { useNavigate } from "react-router-dom";
import BackBtn from "../components/Svg/BackBtn";

const Configurations = () => {
  const navigate = useNavigate();
  return (
    <main className="w-full px-[24px]">
      <div className="mb-2 p-2 flex gap-4 items-center bg-black">
        <button
          className="btn btn-circle btn-ghost bg-gray-200 text-white hover:bg-slate-100"
          onClick={() => navigate("/home")}
        >
          <BackBtn color="black" />
        </button>
        <h2 className="text-xl text-white">Configuracion de Perfil</h2>
      </div>
      <p className="mb-8 text-xs">
        Aquí puedes configurar tu perfil de usuario.
      </p>
      <section className="px-8">
        <ul className="flex flex-col gap-8">
          <li className="p-2 hover:bg-slate-400 cursor-pointer">
            Cambiar Foto de perfil
          </li>
          <li className="p-2 hover:bg-slate-400 cursor-pointer">
            Cambiar datos personales
          </li>
          <li className="p-2 hover:bg-slate-400 cursor-pointer">
            Cambiar email de la cuenta
          </li>
          <li className="p-2 hover:bg-slate-400 cursor-pointer">
            Borrar historial de búsquedas
          </li>
          <li className="p-2 hover:bg-slate-400 cursor-pointer">Seguridad</li>
        </ul>
      </section>
    </main>
  );
};

export default Configurations;
