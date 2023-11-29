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
    userLogin: async (state, action) => {

      const url = "https://pov.azurewebsites.net/api/auth";
      try {
        const DATA = {
          identifier: action.payload.email,
          password: action.payload.password,
        };

        const response = await axios.post(`${url}/login`, DATA);
        state.token = response.data.token;
      } catch (error) {
        console.error("Error en el login:", error);
      }
    },
    userLogout: (state, action) => {
      // Actualiza el estado con el token proporcionado en la acción
      state.token = "";
    },
  },
});

// Exporta la acción 'login' y el reducer del slice
export const { userLogout, userLogin } = loginSlice.actions;
export default loginSlice.reducer;
