import { useEffect, useState } from 'react';
import { Apple } from '../../components/Svg/Apple';
import { Facebook } from '../../components/Svg/Facebook';
import { Google } from '../../components/Svg/Google';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../slices/register.slice';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const thirteenYearsAgo = () => {
  const today = new Date();
  return new Date(
    today.getFullYear() - 13,
    today.getMonth(),
    today.getDay() + 1
  );
};

const schemaRegister = z.object({
  name: z.string().min(1, { message: 'El usuario es obligatorio.' }),
  username: z
    .string()
    .min(1, { message: 'El nombre y apellido es obligatorio.' }),
  email: z.string().email({ message: 'El email es obligatorio.' }),
  date_of_birth: z.coerce
    .date()
    .refine(
      (date) => date < thirteenYearsAgo(),
      'Necesitas ser mayor de 13 años'
    ),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaRegister),
  });
  const [showAlert, setShowAlert] = useState(false);
  const { loading, error, message } = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SubmitLogin = (data) => {
    dispatch(registerUser(data));
  };

  const getToken = localStorage.getItem('token')


  useEffect(() => {
    if (message) {
      setShowAlert(true);
      toast.success(message);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else if (error) {
      setShowAlert(true);
      toast.error(error);
    }
    if (getToken) {
      navigate('/home');
    }
  }, [message, error]);


  return (
    <main className="flex items-center justify-center min-h-screen min-w-screen">
      <div className="bg-[#ffffff] p-6 rounded-lg w-full">
        <form onSubmit={handleSubmit(SubmitLogin)}>
          <div>
            <h4 className="text-5xl font-bold  md:text-[40px] text-[24px]">
              Crea tu cuenta
            </h4>
            <p className="mt-2 mb-[36px] text-[12px]">
              Regístrate y disfruta de tus famosos favoritos
            </p>
          </div>

          <div className="form-control">
            <input
              className="mb-2 flex w-full h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30  bg-[#A5A5A5]"
              type="text"
              name="name"
              placeholder="Usuario"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-red-500">{errors?.name?.message}</p>
            )}
            <input
              className="mb-2 flex w-full h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30   bg-[#A5A5A5]"
              type="text"
              name="username"
              placeholder="Nombre y apellido"
              {...register('username')}
            />
            {errors.username && (
              <p className="text-red-500">{errors?.username?.message}</p>
            )}
            <input
              className="mb-2 flex w-full h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30  bg-[#A5A5A5] "
              type="email"
              name="email"
              placeholder="Correo electrónico"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500">{errors?.email?.message}</p>
            )}
            <input
              className="input mb-2 flex w-full h-16  items-center gap-2 flex-shrink-0 border border-gray-300 p-2"
              type="date"
              name="date_of_birth"
              placeholder="Fecha Nacimiento"
              {...register('date_of_birth')}
            />
            {errors.date_of_birth && (
              <p className="text-red-500">{errors?.date_of_birth?.message}</p>
            )}
          </div>
          <input
            className="mb-2 flex w-full h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30  bg-[#A5A5A5]"
            type="password"
            name="password"
            placeholder="Contraseña"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500">{errors?.password?.message}</p>
          )}
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
          <div className="flex justify-between w-full ">
            <button className="btn w-[80px] sm:w-[200px] text-white  hover:bg-gray-500 flex border rounded-md bg-[#232322] ">
              <Google />
            </button>
            <button className="btn w-[80px] sm:w-[200px] text-white  hover:bg-gray-500 flex boder rounded-md bg-[#232322]">
              <Facebook />
            </button>
            <button className="btn w-[80px] sm:w-[200px] text-white  hover:bg-gray-500 flex boder rounded-md   bg-[#232322]">
              <Apple />
            </button>
          </div>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <div className="flex items-center justify-center">
              <p className="mt-2 mb-4 text-sm ">
                ¿Ya tienes una cuenta?
                <strong>
                  <Link to="/" className="text-[#5D73E9]">
                    Inicia sesión
                  </Link>
                </strong>
              </p>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};
