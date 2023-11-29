import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "../../hooks/UseForm";
import { Google } from "../../components/Svg/Google";
import { Facebook} from "../../components/Svg/Facebook";
import { Apple} from "../../components/Svg/Apple";

const initialSignUpForm = {
  user: "",
  username: "",
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
  password: [
    (value) => value.length >= 6,
    "La contraseña debe tener al menos 6 caracteres",
  ],
};

export const Registerlogin = () => {
  const location = useLocation();

  console.log(location);

  // Estado para controlar si el formulario ha sido enviado
  const [formSubmited, setformSubmited] = useState(false);

  // Custom hook useForm para manejar el estado del formulario y las validaciones
  const {
    user,
    username,
    email,
    password,
    userValid,
    usernameValid,
    emailValid,
    passwordValid,
    isFormValid,
    onInputChange,
  } = useForm(initialSignUpForm, signUpValidations);

  // Manejador para el evento de envío del formulario
  const handleSignUp = (e) => {
    e.preventDefault();
    setformSubmited(true);

    // Lógica de registro si el formulario es válido
    if (isFormValid) {
      console.log("Registro exitoso con:", { user, username, email, password });
      // Agregar lógica de registro aquí
    } else {
      console.log("Formulario no válido. Por favor, corrija los errores.");
    }
  };

  // Renderizado del componente del formulario de registro
  // return (
  //   <main className=" font-Lexend font-sans flex min-h-screen justify-center items-center font-Lexend ">
  //     <div class="flex items-center justify-center h-screen">
  //       <div class="bg-gray-200 p-6 rounded-lg">
  //        
  //       </div>
  //       <div className=" flex justify-end">
  //         <button className="m-2 p-2">
  //           <Google />
  //         </button>
  //         <button className="m-2 p-2">
  //           <Facebook />
  //         </button>
  //         <button className=" m-2 p-2">
  //           <Apple />
  //         </button>
  //         {location.pathname === "/register" ? (
  //           <div>
  //             <p className=" mt-2 mb-[36px] text-[12px]">
  //               ¿Ya tienes una cuenta? <strong>Inicia sesión</strong>
  //             </p>
  //           </div>
  //         ) : (
  //           <div>
  //             <p className=" mt-2 mb-[36px] text-[12px]">
  //               ¿No tienes cuenta todavía?
  //               <strong>Regístrate</strong>
  //             </p>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </main>
  // );
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-200 p-6 rounded-lg">
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
                className="mb-[20px] flex w-96 h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30 bg-gray-400  bg-custom-color-2"
                type="text"
                name="user"
                value={user}
                placeholder="Usuario"
                onChange={onInputChange}
              />
              {!!userValid && formSubmited && (
                <div>
                  <span style={{ color: "red" }}>{userValid}</span>
                </div>
              )}

              {/* Input de Nombre y Apellido */}
              <input
                className="mb-[20px] flex w-96 h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30 bg-gray-400  bg-custom-color-2"
                type="text"
                name="username"
                placeholder="Nombre y apellido"
                value={username}
                onChange={onInputChange}
              />
              {!!usernameValid && formSubmited && (
                <div>
                  <span style={{ color: "red" }}>{usernameValid}</span>
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
              className="mb-[20px] flex w-96 h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30 bg-gray-400  bg-custom-color-2"
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={onInputChange}
            />
            {!!emailValid && formSubmited && (
              <div>
                <span style={{ color: "red" }}>{emailValid}</span>
              </div>
            )}

            {/* Input de Contraseña */}
            <input
              className="mb-[20px] flex w-96 h-16 p-2 items-center gap-2 flex-shrink-0 rounded-lg bg-opacity-30  bg-custom-color-2"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={onInputChange}
            />
            {!!passwordValid && formSubmited && (
              <div>
                <span style={{ color: "red" }}>{passwordValid}</span>
              </div>
            )}
          </div>
          {/* Botón de Envío */}
          <div className="form-control mt-6">
            <button
              className="btn text-white hover:bg-gray-500 flex w-96 h-14 px-10 justify-center items-center gap-4 flex-shrink-0 border rounded-md bg-custom-color-1"
              type="submit"
              //disabled={!isFormValid}
            >
              Continuar
            </button>
          </div>
          <div className="divider ">O continua con</div>
        </form>

        <div className="flex justify-center h-24 ">
          <button className="">
            <Google />
          </button>
          <button className="">
            <Facebook />
          </button>
          <button className="">
            <Apple />
          </button>
        </div>
        {location.pathname === "/register" ? (
          <div className="flex items-center justify-center">
            <p className="mt-2 mb-4 text-sm ">
              ¿Ya tienes una cuenta? <strong>Inicia sesión</strong>
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <p className="mt-2 mb-4 text-sm items-center">
              ¿No tienes cuenta todavía?
              <strong>Regístrate</strong>
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Registerlogin;
