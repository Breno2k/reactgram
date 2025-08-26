import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

// Publish user a photo
export const publishPhoto = createAsyncThunk(
    "photo/publish",
    async (photo, thunkAPI) => {

        // Pega o token do usuário logado no estado global (auth)
        const token = thunkAPI.getState().auth.user.token

        // Chama o serviço que publica a foto, enviando a foto e o token
        const data = await photoService.publishPhoto(photo, token)

        // check errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        // Se deu certo, retorna os dados da publicação
        return data

    }
)

// Criação do slice para fotos
export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        // Reseta a mensagem, deixando-a como null
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (build) => {
        build
            .addCase(publishPhoto.pending, (state) => {
                state.loading = true;  // ativa loading
                state.error = false;   // zera erros
            })
            // Quando a requisição foi concluída com sucesso
            .addCase(publishPhoto.fulfilled, (state, action) => {
                state.loading = false;     // desativa loading
                state.error = null;        // sem erros
                state.success = true;       // marca sucesso
                state.photo = action.payload; // salva foto no estado
                state.photos.unshift(state.photo) // adiciona mais uma foto na lista
                state.message = "Foto publicada com sucesso!"
            })
            // Quando a requisição falhou
            .addCase(publishPhoto.rejected, (state, action) => {
                console.log(state, action)
                state.loading = false;     // desativa loading
                state.error = action.payload; // salva erro retornado
                state.foto = {};         // garante que não tem foto
            })
    },
})

export const { resetMessage } = photoSlice.actions
export default photoSlice.reducer