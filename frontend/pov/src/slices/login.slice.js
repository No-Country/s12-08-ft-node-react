// Importa la función createSlice del paquete "@reduxjs/toolkit" y el módulo axios
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define el estado inicial del slice
const initialState = {
  token: "",  // Un campo para almacenar el token de autenticación
};

// Crea un slice de Redux llamado "login" utilizando createSlice
const loginSlice = createSlice({
  name: "login",  // Nombre del slice
  initialState,  // Estado inicial del slice
  reducers: {
    // Reducer para la acción userLogin
    userLogin: (state, action) => {
      // Actualiza el estado con el token proporcionado en la acción
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    // Manejo de acciones adicionales (fuera del slice) con extraReducers

    // Agrega un caso para la acción 'login' (que parece un error de nombre, debería ser 'userLogin')
    builder.addCase(loginSlice.actions.login, async (state, action) => {
      try {
        // Crea un objeto DATA con email y password de la acción
        const DATA = {
          email: action.payload.email,
          password: action.payload.password,
        }

        // Realiza una solicitud POST al servidor para autenticar al usuario
        const response = await axios.post("https://api.example.com/login", DATA);

        // Actualiza el estado con el token de la respuesta del servidor
        state.token = response.data.token;
      } catch (error) {
        // Maneja errores en caso de fallo en la solicitud
        console.error("Error en el login:", error);
      }
    });
  },
});

// Exporta la acción 'login' y el reducer del slice
export const { login } = loginSlice.actions;
export default loginSlice.reducer;
