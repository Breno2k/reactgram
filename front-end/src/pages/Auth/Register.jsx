import "./Auth.css"

// Componentes
import { Link } from 'react-router-dom'
import Message from "../../components/Message/Message"

// Hooks
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// Redux
import { register, reset } from "../../slices/authSlice"


const Register = () => {

    // Criando os states de registro
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // Hook do Redux para poder disparar ações
    const dispatch = useDispatch()

    // Pega do estado global (Redux) os valores "loading" e "error" dentro de "auth"
    const { loading, error } = useSelector((state) => state.auth)

    // função de envio de formulário
    const handleSubmit = (e) => {
        e.preventDefault()

        // Aqui se cria um usuário com esses dados
        const user = {
            name,
            email,
            password,
            confirmPassword,
        }

        console.log(user)

        // Envia a ação "register(user)" para o Redux
        // Isso dispara o thunk register → chama authService → faz a requisição na API
        dispatch(register(user))
    }

    // Sempre que disparar um "dispatch" vou chamar a função de reset
    useEffect(() => {
        dispatch(reset())
    }, [dispatch])


    return <div id="register">
        <h2>Reactgram</h2>
        <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password} />
            <input type="password" placeholder="Confirme sua senha" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
            {!loading && <input type="submit" value="Cadastrar" />}
            {loading && <input type="submit" value="Aguarde..." disabled />}
            {error && <Message msg={error} type="error" />}
        </form>
        <p>Já tem conta ? <Link to="/login">Click aqui</Link></p>
    </div>
}

export default Register