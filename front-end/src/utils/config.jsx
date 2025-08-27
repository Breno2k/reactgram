// URL base da API que será usada nas requisições
export const api = "http://localhost:5000/api"

// URL base para acessar os uploads (como imagens salvas no servidor)
export const uploads = "http://localhost:5000/uploads"

// Função que monta a configuração (headers, body, etc) de uma requisição
export const requestConfig = (method, data, token = null, image = null) => {

    let config

    // Caso seja enviado um arquivo (imagem), a requisição não terá "Content-Type"
    // porque o navegador já define automaticamente quando usamos FormData
    if (image) {
        config = {
            method,   // tipo da requisição (GET, POST, PUT, DELETE...)
            body: data, // o corpo será o FormData com a imagem
            headers: {}, // sem cabeçalhos extras aqui
        }
    }
    // Caso seja uma requisição DELETE ou não exista nenhum dado para enviar
    else if (method === "DELETE" || data === null) {
        config = {
            method,
            headers: {}, // apenas define o método
        }
    }
    // Caso contrário (ex.: POST ou PUT com dados em JSON)
    else {
        config = {
            method,
            body: JSON.stringify(data), // transforma o objeto JS em JSON
            headers: {
                "Content-Type": "application/json" // avisa ao servidor que o body é JSON
            },
        }
    }

    // Se o usuário estiver autenticado, adiciona o token no cabeçalho
    if (token) {
        config.headers = {
            ...config.headers, // mantém headers anteriores (caso haja)
            Authorization: `Bearer ${token}`,
        };
    }

    // Retorna a configuração pronta para usar no fetch
    return config;
}
