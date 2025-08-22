import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userService from "../services/userServices"

const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

// Pegando dados do usuário
export const profile = createAsyncThunk(
    "user/profile", async (user, thunkAPI) => {

        // Pega o token do usuário logado que está salvo no slice "auth"
        const token = thunkAPI.getState().auth.user.token

        // Chama o service que faz a requisição na API passando user + token
        const data = await userService.profile(user, token)

        // Retorna os dados recebidos da API
        return data

    }
)

// Criação do slice "user"
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Função para resetar a mensagem (limpar feedback)
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (build) => {
        build
            // Quando a requisição está em andamento
            .addCase(profile.pending, (state) => {
                state.loading = true;  // ativa loading
                state.error = false;   // zera erros
            })
            // Quando a requisição foi concluída com sucesso
            .addCase(profile.fulfilled, (state, action) => {
                state.loading = false;     // desativa loading
                state.error = null;        // sem erros
                state.succes = true;       // marca sucesso
                state.user = action.payload; // salva usuário no estado
            })
    },
})

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;

