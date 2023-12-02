import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '../router/routes';
import axios from 'axios';
import { useToken } from '../hooks/useToken';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userInformation, { rejectWithValue }) => {
    try {
      const response = await axios
        .post(`${URL}/login`, userInformation)
        .then((res) => {
          useToken(res.data.token, new Date().getTime() + 3 * 60 * 60 * 1000);
          localStorage.setItem('user', JSON.stringify(res.data));
          return res.data;
        });
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: '',
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
  reducers: {
    logout: (state) => {
      state.token = '';
      state.user = {};
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.token = '';
      state.user = {};
      state.loading = true;
      state.error = null;
    }),
    builder.addCase(loginUser.rejected, (state, action) => {
      state.token = '';
      state.user = {};
      state.loading = false;
      state.error = action.payload;
    }),
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
    });
  },
});

export default loginSlice.reducer;
export const { logout } = loginSlice.actions;
