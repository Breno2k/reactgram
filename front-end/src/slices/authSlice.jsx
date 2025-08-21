// Importa funções do Redux Toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// Importa o serviço de autenticação (comunicação com API)
import authService from "../services/authServices"

// Pega o usuário do localStorage (se já estiver logado)
const user = JSON.parse(localStorage.getItem("user"))

// Estado inicial do slice de autenticação
const initialState = {
    user: user ? user : null, // Se houver usuário no localStorage, coloca no estado
    error: false,  // Guarda mensagem de erro (se houver)
    succes: false, // Indica se a ação foi bem-sucedida
    loading: false, // Mostra se está carregando (ex.: requisição em andamento)
}

// Thunk assíncrono para registrar o usuário
// → dispara a requisição e espera resposta da API
export const register = createAsyncThunk("auth/register",
    async (user, thunkAPI) => {

        const data = await authService.register(user) // chama o serviço de registro

        // Se a API retornou erros, rejeita a requisição
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        // Se deu certo, retorna os dados do usuário
        return data;
    }
)

// Função assíncrona (thunk) para deslogar o usuário
export const logout = createAsyncThunk("auth/logout", async () => {
    // Remove usuário do localStorage
    await authService.logout()
})

// Criação do slice (parte do estado global para autenticação)
export const authSlice = createSlice({
    name: "auth", // nome do slice
    initialState, // estado inicial
    reducers: {
        // Função para resetar os estados de controle
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.succes = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Quando a requisição está em andamento
            .addCase(register.pending, (state) => {
                state.loading = true;  // ativa loading
                state.error = false;   // zera erros
            })
            // Quando a requisição foi concluída com sucesso
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;     // desativa loading
                state.error = null;        // sem erros
                state.succes = true;       // marca sucesso
                state.user = action.payload; // salva usuário no estado
            })
            // Quando a requisição falhou
            .addCase(register.rejected, (state, action) => {
                state.loading = false;     // desativa loading
                state.error = action.payload; // salva erro retornado
                state.user = null;         // garante que não tem usuário logado
            })
            // Quando a requisição for de logout
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;     // desativa loading
                state.error = null;        // sem erros
                state.succes = true;       // marca sucesso
                state.user = null   // lipa campo usuário
            })
    },
})

// Exporta a action reset (para limpar estados de erro/sucesso/loading)
export const { reset } = authSlice.actions;

// Exporta o reducer para ser usado no store
export default authSlice.reducer;
