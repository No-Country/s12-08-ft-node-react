import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useToken } from "../hooks/useToken";

export const fetchEditProfile = createAsyncThunk(
  "EditProfile/fetchEditProfile",
  async (userInformacion, { rejectWithValue }) => {
    const { token } = useToken();
    const TOKEN = JSON.parse(token);

    try {
      console.log(userInformacion);
      const response = await fetch(
        "https://pov.azurewebsites.net/api/users/edit",
        {
          method: "PUT",
          body: JSON.stringify({
            ...userInformacion,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        // Lanza un error si la respuesta no es exitosa
        const errorData = await response.json();
        const errorMessage = errorData.message || "Error en la solicitud";
        // Lanza un nuevo error con el mensaje personalizado
        throw new Error(errorMessage);
      }
      const responseData = await response.json();
      console.log("response Data", responseData); // Aquí puedes acceder a los datos en formato JSON
      return responseData;
    } catch (error) {
      console.error("Error en la función asíncrona:", error);
      return rejectWithValue("Error fetching messages");
    }
  }
);

const profileSlice = createSlice({
  name: "EditProfile",
  initialState: {
    email: "",
    name: "",
    username: "",
    //"password": "prueba",
    profile_picture: null,
    date_of_birth: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEditProfile.pending, (state) => {
      state.email = "";
      state.name = "";
      state.username = "";
      state.date_of_birth = "";
      state.profile_picture = "";
      state.error = null;
      state.message = "cargando";
    }),
      builder.addCase(fetchEditProfile.rejected, (state, action) => {
        state.email = "";
        state.name = "";
        state.username = "";
        state.date_of_birth = "";
        state.profile_picture = "";
        state.error = action.error;
        state.message = action.message;
      }),
      builder.addCase(fetchEditProfile.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        state.username = action.payload.user.username;
        state.date_of_birth = action.payload.user.date_of_birth;
        state.profile_picture = action.payload.user.profile_picture;
        state.error = null;
        state.message = action.payload.message;
      });
  },
});

export default profileSlice.reducer;
