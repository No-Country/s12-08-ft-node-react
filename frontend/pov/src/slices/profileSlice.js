import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from "../router/routes";
import { useToken } from '../hooks/useToken';

// Thunk asíncrono para cargar mensajes de chat
export const fetchEdictProfile = createAsyncThunk(
  'profile/fetchEdictProfile',
  async ( userInformacion, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${URL}/api/users/edit`, userInformacion)
      // .then((res) => {
      //     useToken(res.data.token, new Date().getTime() + 3 * 60 * 60 * 1000);
      //     localStorage.setItem("user", JSON.stringify(res.data));
      //     return res.data;
      //   })
        console.log(response.data);
   //   return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Error fetching messages');
  }
}
);

// Slice de Redux para el estado del chat
const profileSlice = createSlice({
  name: 'EdictProfile',
  initialState: {
  email: "",
  name: "",
  username: "",
  //"password": "prueba",
 // "profile_picture": null,
  date_of_birth: ""
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEdictProfile.pending, (state) => {
        state.email = '';
        state.name= '';
        state.username = '';
        state.date_of_birth = '';
        state.error = null;
        state.message= 'cargando'
      })
      .addCase(fetchEdictProfile.fulfilled, (state, action) => {
        state.email =action.payload;
        state.name= action.payload;
        state.username = action.payload;
        state.date_of_birth = action.payload;
        state.error = null;   
        state.message= 'cargado'
      })
      .addCase(fetchEdictProfile.rejected, (state,action) => {
        state.email = '';
        state.name= '';
        state.username = '';
        state.date_of_birth = '';
        state.error = action.payload;   
        state.message= 'Error de carga'
      });
  },
});

//export const { /* Puedes exportar acciones sincrónicas aquí si es necesario */ } = chatSlice.actions;
export default profileSlice.reducer;
