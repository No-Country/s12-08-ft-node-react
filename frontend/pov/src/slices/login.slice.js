// Importa la función createSlice del paquete "@reduxjs/toolkit" y el módulo axios
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define el estado inicial del slice
const initialState = {
  token: "", // Un campo para almacenar el token de autenticación
  user:{
    date_of_birth: "",
    email:"",
    id: "",
    name: "",
    profile_picture:"",
    role: "",
    username: "",
  }
};

const BASE_URL = "https://pov.azurewebsites.net/api/auth";

export const userLogin = createAsyncThunk("post/loginUser", async (payload) => {
  console.log(payload);
  const DATA = {
    identifier: payload.email,
    password: payload.password,
  };
  try {
    const response = await axios.post(`${BASE_URL}/login`, DATA);
    console.log(response);
    return response;
  } catch (error) {
    return error.message;
  }
});

// Crea un slice de Redux llamado "login" utilizando createSlice
const loginSlice = createSlice({
  name: "login", // Nombre del slice
  initialState, // Estado inicial del slice
  reducers: {
   
    userLogout: (state, action) => {
      // Actualiza el estado con el token proporcionado en la acción
      state.token = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log(action.payload);
      state.token = action.payload.data.token;
      state.user.date_of_birth = action.payload.data.user.date_of_birth;
      state.user.email = action.payload.data.user.email;
      state.user.id = action.payload.data.user.id;
      state.user.name = action.payload.data.user.name;
      state.user.profile_picture = action.payload.data.user.profile_picture;
      state.user.role = action.payload.data.user.role;
      state.user.username = action.payload.data.user.username;
    });
  },
});

// Exporta la acción 'login' y el reducer del slice
export const { userLogout } = loginSlice.actions;
export default loginSlice.reducer;
