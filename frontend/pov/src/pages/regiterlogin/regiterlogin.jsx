import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/UseForm";
import { userLogin } from "../../slices/login.slice";
import { userRegister } from "../../slices/register.slice";

const location = window.location;
const pathname = location.pathname;

const initialSignUpForm = {
  
  user: pathname ==="/register"? "" : "usuario",
  username: pathname==="/register"? "" : "username",
  date_of_birth: pathname==="/register"? "" : "",
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
  date_of_birth:[
    (value) => value.trim() !== "","La fecha de nacimiento es obligtoria",
  ],
};

export const Registerlogin = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  console.log(location);

  // Estado para controlar si el formulario ha sido enviado
  const [formSubmited, setformSubmited] = useState(false);

  // Custom hook useForm para manejar el estado del formulario y las validaciones

  
  let user, username, email, password, date_of_birth, date_of_birthvalid, userValid, usernameValid, emailValid, passwordValid, isFormValid, onInputChange;

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
  } else if (location.pathname === "/login") {
    ({
      email,
      password,
      emailValid,
      passwordValid,
      isFormValid,
      onInputChange,
    } = useForm(initialSignUpForm, signUpValidations));
  }
  

  // Manejador para el evento de envío del formulario
  const handleSignUp = (e) => {
    e.preventDefault();
    setformSubmited(true);
    console.log("hola", isFormValid, email, password, date_of_birth)
    // Lógica de registro si el formulario es válido
    if (isFormValid) {
      if (location.pathname === "/register") {
        dispatch(userRegister({user, username, email, password, date_of_birth}));
        console.log("Registro exitoso con:", user, username, email, password);
      } else if (location.pathname === "/login") {
        console.log("login exitoso con:", email, password);
        dispatch(userLogin({email, password}));
      }
    } else {
        console.log("Formulario no válido. Por favor, corrija los errores.");
      }
    };

  // Renderizado del componente del formulario de registro
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          {location.pathname === "/register" ? (
            <div>
              <h4 className="text-5xl font-">Crea tu cuenta</h4>
              <p className="py-6">
                Regístrate y disfruta de tus famosos favoritos
              </p>
            </div>
          ) : null}
          <form className="card-body" onSubmit={handleSignUp}>
            {location.pathname === "/register" ? (
              <div className="form-control">
                {/* Input de Usuario */}
                <input
                  className="input input-bordered"
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
                  className="input input-bordered"
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

                {/* Input de Fecha nacimiento */}
              <input
                className="input input-bordered"
                type="date"
                name="date_of_birth"
                placeholder="Fecha naciimiento"
                value={date_of_birth}
                onChange={onInputChange}
              />
              {!!date_of_birthvalid && formSubmited && (
                <div>
                  <span style={{ color: "red" }}>{date_of_birthvalid}</span>
                </div>
              )}

              </div>
            ) : (
              <h4 className="text-5xl font-">Ingresar</h4>
            )}

            <div className="form-control">
              {/* Input de Correo Electrónico */}
              <input
                className="input input-bordered"
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
                className="input input-bordered"
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
                className="btn sm:btn-sm md:btn-md lg:btn-lg"
                type="submit"
                //disabled={!isFormValid}
              >
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registerlogin;
