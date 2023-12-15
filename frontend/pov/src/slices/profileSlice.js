import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useToken } from "../hooks/useToken";


export const fetchEditProfile = createAsyncThunk(
  'profile/fetchEditProfile',
  async ( userInformacion, { rejectWithValue }) => {
  const { token } = useToken();
  const TOKEN = JSON.parse(token);
  console.log(TOKEN);

    try {
      console.log(userInformacion);
        const response = await fetch( "https://pov.azurewebsites.net/api/users/edit", {
        method: 'PUT',
        body: JSON.stringify({
        ...userInformacion
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      });
          console.log(response);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Error fetching messages');
  }
}
);


const profileSlice = createSlice({
  name: 'EditProfile',
  initialState: {
  email: "",
  name: "",
  username: "",
  //"password": "prueba",
  profile_picture: null,
  date_of_birth: "",
  },
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditProfile.pending, (state) => {
        state.email = '';
        state.name= '';
        state.username = '';
        state.date_of_birth = '';
        state. profile_picture= '';
        state.error = null;
        state.message= 'cargando'
      })
      .addCase(fetchEditProfile.fulfilled, (state, action) => {
        state.email =action.payload;
        state.name= action.payload;
        state.username = action.payload;
        state.date_of_birth = action.payload;
        state. profile_picture=action.payload;
        state.error = null;   
        state.message= action.payload;
      })
      .addCase(fetchEditProfile.rejected, (state,action) => {
        state.email = '';
        state.name= '';
        state.username = '';
        state.date_of_birth = '';
        state. profile_picture= '';
        state.error = action.payload;   
        state.message= action.payload
      });
  },
});

export default profileSlice.reducer;
