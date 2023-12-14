import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../router/routes';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userInformation, { rejectWithValue }) => {
    try {
      const response = await axios
        .post(`${URL}/auth/sign-up`, userInformation)
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          return res.data;
        });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const createUsers = createSlice({
  name: 'register',
  initialState: {
    message: '',
    user: {
      date_of_birth: '',
      email: '',
      id: '',
      name: '',
      profile_picture: '',
      role: '',
      username: '',
    },
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
        (state.user = null),
        (state.error = null),
        (state.loading = true),
        (state.message = '');
    }),
      builder.addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
        state.loading = false;
        state.message = '';
      }),
      builder.addCase(registerUser.fulfilled, (state, action) => {
          (state.user = action.payload.user),
          (state.error = null),
          (state.loading = false),
          (state.message = action.payload.message);
      });
  },
});

export default createUsers.reducer;
