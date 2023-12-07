import { useNavigate } from "react-router-dom";
import BackBtn from "../components/Svg/BackBtn";

const Configurations = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className="w-full px-[24px] mb-2 p-2 bg-black">
        <div className="w-full md:max-w-[1000px] lg:mx-auto flex gap-4 items-center ">
          <button
            className="btn btn-circle btn-ghost bg-gray-200 text-white hover:bg-slate-100"
            onClick={() => navigate("/home")}
          >
            <BackBtn color="black" />
          </button>
          <h2 className="text-xl text-white">Configuracion de Perfil</h2>
        </div>
      </header>
      <main className="w-full md:max-w-[1000px] lg:mx-auto px-[24px]">
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
    </>
  );
};

export default Configurations;
