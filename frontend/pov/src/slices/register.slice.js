// Importa la función createSlice del paquete "@reduxjs/toolkit" y el módulo axios
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define el estado inicial del slice
const initialState = {
  message: "",
  user: {
    id: "",
    role: "",
    email: "",
    name: "",
    username: "",
    date_of_birth: "",
  }
};

const BASE_URL = "https://pov.azurewebsites.net/api/auth";

export const userRegister = createAsyncThunk("post/registerUser", async (payload) => {
  console.log(payload);
  const DATA = {
    email: payload.email,
    username: payload.username,
    name: payload.user,
    password: payload.password,
    date_of_birth: payload.date_of_birth,
  };
  console.log(DATA)
  try {
    const response = await axios.post(`${BASE_URL}/sign-up`, (DATA));
    console.log(response);
    return response;
  } catch (error) {
    return error.message;
  }
});

// Crea un slice de Redux llamado "register" utilizando createSlice
const registerSlice = createSlice({
  name: "login", // Nombre del slice
  initialState, // Estado inicial del slice
  reducers: {},
  extraReducers(builder) {
    builder.addCase(userRegister.fulfilled, (state, action) => {
      
      state.message= action.payload.data.message
      state.user.id= action.payload.data.user.id
      state.user.role= action.payload.data.user.role
      state.user.email= action.payload.data.user.email
      state.user.name= action.payload.data.user.name
      state.user.username= action.payload.data.user.username
      state.user.date_of_birth= action.payload.data.user.date_of_birth
      
      console.log(action);
    });
  },
});

// Exporta la acción 'register' y el reducer del slice
export default registerSlice.reducer;
