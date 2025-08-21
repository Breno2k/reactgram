import "./Auth.css"

// Componentes
import { Link } from 'react-router-dom'
import Message from "../../components/Message/Message"

// Hooks
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// Redux

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div id="login">
            <h2>Reactgram</h2>
            <p className="subtitle">Faço o login para ver o que há de novo</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email || ""} />
                <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password || ""} />
                <input type="submit" placeholder="Entrar" />
            </form>
            <p>Não tem uma conta ? <Link to="/register">Clique aqui</Link></p>
        </div>
    )
}

export default Login