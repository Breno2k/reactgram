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
        if (res) {
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
    localStorage.removeItem("user");
}

// Agrupa as funções relacionadas à autenticação em um objeto
const authService = {
    register,
    logout,
}

// Exporta para poder usar em outras partes do projeto
export default authService;
