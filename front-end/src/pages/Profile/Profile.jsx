import styles from './Profile.module.css'

import { uploads } from '../../utils/config'

// Components
import Message from '../../components/Message/Message'
import { Link } from 'react-router-dom'
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'

// Hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserDetails } from '../../slices/userSlice'

// Redux

const Profile = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user)
    const { user: userAuth } = useSelector((state) => state.auth)

    // loading user data
    // Executa um efeito quando o componente monta ou quando as dependências mudam
    useEffect(() => {
        // Dispara a ação para buscar os detalhes do usuário pelo id
        dispatch(getUserDetails(id))
    }, [dispatch, id])

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div className={styles.profile}>
            <div className={styles.profile_header}>
                {user.profileImage && (
                    <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                )}
                <div className={styles.profile_description}>
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile