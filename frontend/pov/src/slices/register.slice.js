// Importa la función createSlice del paquete "@reduxjs/toolkit" y el módulo axios
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define el estado inicial del slice
const initialState = {
  token: "", // Un campo para almacenar el token de autenticación
};

// Crea un slice de Redux llamado "register" utilizando createSlice
const registerSlice = createSlice({
  name: "login", // Nombre del slice
  initialState, // Estado inicial del slice
  reducers: {
    // Reducer para la acción userLogin
    userRegister: async (state, action) => {
      console.log(action.payload);
      const url = "https://pov.azurewebsites.net/api/auth";
      try {
        const DATA = {
          email: action.payload.email, 
          name: action.payload.mame,
          password: action.payload.password,
          date_of_birth: action.payload.date_of_birth
        };

        const response = await axios.post(`${url}/register`, DATA);
        state.token = response.data.token;
      } catch (error) {
        console.error("Error en el register", error);
      }

      // Actualiza el estado con el token proporcionado en la acción
      state.token = action.payload.token;
    },
  },
});

// Exporta la acción 'register' y el reducer del slice
export const { userRegister } = registerSlice.actions;
export default registerSlice.reducer;
