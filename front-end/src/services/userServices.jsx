import { api, requestConfig } from "../utils/config"

// Get user details
const profile = async (data, token) => {
    // Monta a configuração da requisição
    const config = requestConfig("GET", data, token);

    try {
        // Faz a requisição para a rota de registro da API
        const res = await fetch(api + "/users/profile", config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error)
    }
}

const userService = {
    profile,
}

export default userService;