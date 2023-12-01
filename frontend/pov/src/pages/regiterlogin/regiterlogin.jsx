import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/UseForm";
import { userLogin } from "../../slices/login.slice";
import { userRegister } from "../../slices/register.slice";
import { Google } from "../../components/Svg/Google";
import { Facebook } from "../../components/Svg/Facebook";
import { Apple } from "../../components/Svg/Apple";
import toast, { Toaster } from "react-hot-toast";

const location = window.location;
const pathname = location.pathname;

const initialSignUpForm = {
  user: pathname === "/register" ? "" : "Usuario",
  username: pathname === "/register" ? "" : "Username",
  date_of_birth: "2023-12-12",
  email: "",
  password: "",
};
const signUpValidations = {
  user: [(value) => value.trim() !== "", "El Usuario es obligatorio"],
  username: [
    (value) => value.trim() !== "",
    "El nombre y apellido es obligatorio",
  ],
  email: [
    (value) => value.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    "Ingrese un correo electrónico válido",
  ],
  //anexe las validaciones de la contrase;a
  password: [
    (value) =>
      value.length >= 6 &&
      /[0-9]/.test(value) &&
      /[A-Z]/.test(value) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(value),
    "Contraseña: 6 caracteres, 1 mayúscula, 1 carácter especial.",
  ],
  date_of_birth: [
    (value) => value.trim() !== "",
    "La fecha de nacimiento es obligtoria",
  ],
};

export const Registerlogin = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Estado para controlar si el formulario ha sido enviado
  const [formSubmited, setformSubmited] = useState(false);
  // Anexe : Estado para controlar las alertas de envio
  const [showAlert, setShowAlert] = useState(false);

  // Custom hook useForm para manejar el estado del formulario y las validaciones

  let user,
    username,
    email,
    password,
    date_of_birth,
    date_of_birthvalid,
    userValid,
    usernameValid,
    emailValid,
    passwordValid,
    isFormValid,
    onInputChange;

  if (location.pathname === "/register") {
    ({
      user,
      username,
      email,
      password,
      userValid,
      usernameValid,
      emailValid,
      date_of_birth,
      date_of_birthvalid,
      passwordValid,
      isFormValid,
      onInputChange,
    } = useForm(initialSignUpForm, signUpValidations));
  } else if (location.pathname === "/") {
    ({
      email,
      password,
      emailValid,
      passwordValid,
      isFormValid,
      onInputChange,
    } = useForm(initialSignUpForm, signUpValidations));
  }

  const navigate = useNavigate();

  // Manejador para el evento de envío del formulario
  const handleSignUp = (e) => {
    e.preventDefault();
    setformSubmited(true);
    console.log("hola", isFormValid, email, password, date_of_birth);
    // Lógica de registro si el formulario es válido
    if (isFormValid) {
      if (location.pathname === "/register") {
        dispatch(
          userRegister({ user, username, email, password, date_of_birth })
        );
        //Anexe esto para las validaciones 
        setShowAlert(true);
        toast.success("Su cuenta fue Creada con Exito!!");
        setTimeout(() => {
          navigate("/");
        }, 3000);

        console.log("Registro exitoso con:", user, username, email, password);
      } else if (location.pathname === "/") {
        console.log("login exitoso con:", email, password);
        dispatch(userLogin({ email, password }));
        //Anexe esto para las validaciones
        setShowAlert(true);
        toast.success("Bienvenido a POV");
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      }
    } else {
      //Anexe esto para las validaciones
      toast.error("Formulario no válido. Por favor, corrija los errores.");
      console.log("Formulario no válido. Por favor, corrija los errores.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen min-w-screen">
      <div className="bg-[#ffffff] p-6 rounded-lg w-full">
        <form onSubmit={handleSignUp}>
          {location.pathname === "/register" ? (
            <div>
              <h4 className=" text-5xl font-bold  md:text-[40px] text-[24px]">
                Crea tu cuenta
              </h4>
              <p className=" mt-2 mb-[36px] text-[12px]">
                Regístrate y disfruta de tus famosos favoritos
              </p>
            </div>
          ) : null}
          {location.pathname === "/register" ? (
            <div className=" form-control">
              {/* Input de Usuario */}
              <input
                className="mb-2 flex w-full h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30  bg-[#A5A5A5]"
                type="text"
                name="user"
                value={user}
                placeholder="Usuario"
                onChange={onInputChange}
              />
              {!!userValid && formSubmited && (
                <div className="mb-2">
                  <span style={{ color: "red" }}>{userValid}</span>
                </div>
              )}
              {/* Input de Nombre y Apellido */}
              <input
                className="mb-2 flex w-full h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30   bg-[#A5A5A5]"
                type="text"
                name="username"
                placeholder="Nombre y apellido"
                value={username}
                onChange={onInputChange}
              />
              {!!usernameValid && formSubmited && (
                <div className="mb-2">
                  <span style={{ color: "red" }}>{usernameValid}</span>
                </div>
              )}

              <input
                className="input mb-2 flex w-full h-16  items-center gap-2 flex-shrink-0 border border-gray-300 p-2"
                type="date"
                name="date_of_birth"
                value={date_of_birth}
                onChange={onInputChange}
                placeholder="Fecha Nacimiento"
              />
              {!!date_of_birthvalid && formSubmited && (
                <div className="mb-2">
                  <span style={{ color: "red" }}>{date_of_birthvalid}</span>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h4 className="text-5xl font-bold  md:text-[40px] text-[24px]">
                ¡Hola de nuevo!
              </h4>
              <p className=" mt-2 mb-[36px] text-[12px]">
                Ingresa tus datos para continuar
              </p>
            </div>
          )}

          <div className="form-control">
            {/* Input de Correo Electrónico */}
            <input
              className="mb-2 flex w-full h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30  bg-[#A5A5A5] "
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={onInputChange}
            />
            {!!emailValid && formSubmited && (
              <div className="mb-2">
                <span style={{ color: "red" }}>{emailValid}</span>
              </div>
            )}

            {/* Input de Contraseña */}
            <input
              className="mb-2 flex w-full h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30  bg-[#A5A5A5]"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={onInputChange}
            />
            {!!passwordValid && formSubmited && (
              <div className="mb-2">
                <span style={{ color: "red" }}>{passwordValid}</span>
              </div>
            )}
          </div>
          {/* Botón de Envío */}
          <div className="form-control mt-6">
            <button
              className="btn text-white hover:bg-gray-500 flex w-full h-14 px-10 justify-center items-center gap-4 flex-shrink-0 border rounded-md bg-[#5D73E9] "
              type="submit"
              //  disabled={!isFormValid}
            >
              Continuar
            </button>

            {/* anexe este div para las alerta Alerta */}
            {showAlert && (
              <>
                <div>
                  <Toaster position="top-center" reverseOrder={false} />
                </div>
              </>
            )}
          </div>
          <div className="divider divider-neutral ">O continua con</div>
        </form>

        <div className="flex justify-between w-full ">
          <button className="btn  w-[80px] sm:w-[200px] text-white  hover:bg-gray-500 flex border rounded-md bg-[#232322] ">
            <Google />
          </button>
          <button className="btn   w-[80px] sm:w-[200px] text-white  hover:bg-gray-500 flex boder rounded-md bg-[#232322]">
            <Facebook />
          </button>
          <button className="btn   w-[80px] sm:w-[200px] text-white  hover:bg-gray-500 flex boder rounded-md   bg-[#232322]">
            <Apple />
          </button>
        </div>
        {/* **Anexe lanavegacion entre login y registro */}
        {location.pathname === "/register" ? (
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
        ) : (
          <div className="flex items-center justify-center">
            <p className="mt-2 mb-4 text-sm items-center">
              ¿No tienes cuenta todavía?
              <strong>
                <Link to="/register" className="text-[#5D73E9]">
                  Regístrate
                </Link>
              </strong>
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Registerlogin;
