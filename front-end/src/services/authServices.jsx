// Importa a URL base da API e a função que monta a configuração da requisição
import { api, requestConfig } from '../utils/config'

// Função para registrar um novo usuário
const register = async (data) => {

    // Monta a configuração da requisição (POST com os dados do usuário)
    const config = requestConfig("POST", data)

    try {
        // Faz a requisição para a rota de registro da API
        const res = await fetch(api + "/users/register", config)
            .then((res) => res.json()) // transforma a resposta em JSON
            .catch((err) => err) // se algo der errado é mandado para o catch

        // Se houver resposta, salva os dados do usuário no localStorage
        // Isso mantém o usuário logado mesmo ao atualizar a página
        if (res._id) {
            localStorage.setItem("user", JSON.stringify(res))
        }

        // aqui ele retorna os dados para o usuário
        return res;

    } catch (error) {
        // Se algo der errado, mostra o erro no console
        console.log(error)
    }
}

// Logout an user
const logout = () => {

    // Removendo o usuário do localStorage
    localStorage.removeItem("user");

}

// Sing in an user 
const login = async (data) => {

    const config = requestConfig("POST", data)

    try {

        const res = await fetch(api + "/users/login", config)
            .then((res) => res.json())
            .catch((err) => err)

        if (res._id) {
            localStorage.setItem("user", JSON.stringify(res))
        }

        return res

    } catch (error) {
        console.log(error)
    }

}

// Agrupa as funções relacionadas à autenticação em um objeto
const authService = {
    register,
    logout,
    login,
}

// Exporta para poder usar em outras partes do projeto
export default authService;
