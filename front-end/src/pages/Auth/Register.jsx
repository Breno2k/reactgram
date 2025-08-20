import { useState } from "react"
import "./Auth.css"

// Componentes
import { Link } from 'react-router-dom'

// Hooks


const Register = () => {

    // Criando os states de registro
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    // função de envio de formulário
    const handleSubmit = (e) => {
        e.preventDefault()

        // Aqui se cria um usuário com esses dados
        const user = {
            name,
            email,
            password,
            confirmPassword
        }

        console.log(user)
    }


    return <div id="register">
        <h2>Reactgram</h2>
        <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password} />
            <input type="password" placeholder="Confirme sua senha" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
            <input type="submit" value="Cadastrar" />
        </form>
        <p>Já tem conta ? <Link to="/login">Click aqui</Link></p>
    </div>
}

export default Register