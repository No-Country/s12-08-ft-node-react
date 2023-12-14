import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Ejemplo básico de gestión de tokens (puede variar)
const getToken = () => {
    const storedToken = localStorage.getItem('userToken');

    if (storedToken) {
        return storedToken;
    } else {
        // Simulo un token de prueba para propósitos de ejemplo.
        const generatedToken = 'token_de_prueba';
        localStorage.setItem('userToken', generatedToken);
        return generatedToken;
    }
};

const initialState = {
    subscriptions: [],
    status: "idle",
    error: null,
};

const BASE_URL = "https://pov.azurewebsites.net/api";

export const fetchSubscriptions = createAsyncThunk(
    "subscriptions/fetchSubscriptions",
    async (_, thunkAPI) => {
        try {
            console.log("Fetching subscriptions...");

            // Obtengo el token utilizando la función getToken.
            const token = getToken();

            // Realizo la solicitud con el token y parámetros de consulta.
            const response = await axios.get(`${BASE_URL}/subscriptions/info/{id}`,
                {
                    params: {
                        email: '',
                        name: '',
                        role: '',
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            console.log("Response:", response.data);

            // Verificar el formato de la respuesta según la API
            return response.data;
        } catch (error) {
            console.error("Error fetching subscriptions:", error.response || error);

            // Accedo al estado del thunkAPI para realizar acciones adicionales si es necesario
            thunkAPI.rejectWithValue(error);

            // Re-lanzo el error para que la acción refleje el estado "rejected".
            throw error;
        }
    }
);

const subscriptionsSlice = createSlice({
    name: "subscriptions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscriptions.pending, (state) => {
                console.log("Subscriptions are pending...");
                state.status = "loading";
            })
            .addCase(fetchSubscriptions.fulfilled, (state, action) => {
                console.log("Subscriptions fetching succeeded:", action.payload);
                state.status = "succeeded";
                // Ensure action.payload.userSubscriptions is an array, or default to an empty array
                state.subscriptions = action.payload.userSubscriptions || [];
            })
            .addCase(fetchSubscriptions.rejected, (state, action) => {
                console.error("Subscriptions fetching failed:", action.error.message);
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default subscriptionsSlice.reducer;
