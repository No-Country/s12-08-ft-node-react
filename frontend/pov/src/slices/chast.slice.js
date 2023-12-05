import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk asíncrono para cargar mensajes de chat
export const fetchChatMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (chatId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/chats/${chatId}/messages`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Error fetching messages');
    }
  }
);

// Slice de Redux para el estado del chat
const chatSlice = createSlice({
  name: 'chat',
  initialState: {
   messages: [],
   loading: false, 
   error: null,
  },
  reducers: {
    // Puedes agregar otras acciones síncronas aquí si es necesario
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exporta las acciones y el reducer del slice
//export const { /* Puedes exportar acciones sincrónicas aquí si es necesario */ } = chatSlice.actions;
export default chatSlice.reducer;
