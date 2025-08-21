import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuth = () => {

    // Pega o usuário do Redux (state.auth.user)
    const { user } = useSelector((state) => state.auth);

    // Estado local para indicar se está autenticado
    const [auth, setAuth] = useState(false);
    // Estado local para indicar carregamento
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (user) {
            setAuth(true)
        } else {
            setAuth(false)
        }

        setLoading(false);

    }, [user])

    return { auth, loading }
}