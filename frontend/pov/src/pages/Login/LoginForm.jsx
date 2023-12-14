import { Link, useNavigate } from "react-router-dom";
import { Apple } from "../../components/Svg/Apple";
import { Facebook } from "../../components/Svg/Facebook";
import { Google } from "../../components/Svg/Google";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/login.slice";
import { useForm } from "react-hook-form";

const schemaLogin = z.object({
  identifier: z
    .string()
    .email({ message: "El correo electronico es requerido." }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al minimo 6 caracteres." }),
});
export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaLogin),
  });
  const [showAlert, setShowAlert] = useState(false);
  const { error, loading } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const getToken = localStorage.getItem("token");

  const SubmitLogin = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (getToken) {
      navigate("/home");
    } else if (error) {
      setShowAlert(true);
      toast.error(error);
    }
  }, [error, loading, navigate]);

  return (
    <main className="flex items-center justify-center min-h-screen min-w-screen">
      <div className="bg-[#ffffff] p-6 rounded-lg w-full">
        <form
          onSubmit={handleSubmit(SubmitLogin)}
          className="w-full md:max-w-[600px] mx-auto"
        >
          <div>
            <h4 className="text-5xl font-bold  md:text-[40px] text-[24px]">
              ¡Hola de nuevo!
            </h4>
            <p className=" mt-2 mb-[36px] text-[12px]">
              Ingresa tus datos para continuar
            </p>
          </div>

          <div className="form-control">
            <input
              className="mb-2 flex w-full h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30  bg-[#A5A5A5] "
              type="email"
              name="identifier"
              placeholder="Correo electrónico"
              {...register("identifier")}
            />
            {errors.identifier && (
              <p className="text-red-500">{errors?.identifier?.message}</p>
            )}

            <input
              className="mb-2 flex w-full h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30  bg-[#A5A5A5]"
              type="password"
              name="password"
              placeholder="Contraseña"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">{errors?.password?.message}</p>
            )}
          </div>

          <div className="form-control mt-6">
            <button
              className="btn text-white hover:bg-gray-500 flex w-full h-14 px-10 justify-center items-center gap-4 flex-shrink-0 border rounded-md bg-[#5D73E9] "
              type="submit"
            >
              Continuar
            </button>

            {showAlert && (
              <>
                <div>
                  <Toaster position="top-center" reverseOrder={false} />
                </div>
              </>
            )}
          </div>

          <div className="divider divider-neutral ">O continua con</div>

          <div className="flex gap-2 justify-between w-full ">
            <button className="btn w-[88px] xs:w-[120px] sm:w-[160px] md:w-[180px] text-white hover:bg-gray-500 flex rounded-md bg-[#232322]">
              <Google />
            </button>
            <button className="btn w-[88px] xs:w-[120px] sm:w-[160px] md:w-[180px] text-white hover:bg-gray-500 flex rounded-md bg-[#232322]">
              <Facebook />
            </button>
            <button className="btn w-[88px] xs:w-[120px] sm:w-[160px] md:w-[180px] text-white hover:bg-gray-500 flex rounded-md bg-[#232322]">
              <Apple />
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center">
          <p className="mt-2 mb-4 text-sm items-center">
            ¿No tienes cuenta todavía?
            <strong>
              <Link to="/register" className="ml-1 text-[#5D73E9]">
                Regístrate
              </Link>
            </strong>
          </p>
        </div>
      </div>
    </main>
  );
};
