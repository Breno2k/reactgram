import styles from './Navbar.module.css'

// Components
import { NavLink, Link } from 'react-router-dom'
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs'

// Hooks
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Navbar = () => {

    const { auth } = useAuth();
    const { user } = useSelector((state) => state.auth)


    return (
        <nav className={styles.nav}>
            <Link to="/">Reactgram</Link>
            <form className={styles.search_form}>
                <BsSearch />
                <input type="text" placeholder="Pesquisar" />
            </form>
            <ul>
                {auth ? (
                    <>
                        <li>
                            <NavLink to="/">
                                <BsHouseDoorFill />
                            </NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink to={`/users/${user._id}`} >
                                    <BsFillCameraFill />
                                </NavLink>
                            </li>
                        )}
                        <li>
                            <NavLink to="/profile">
                                <BsFillPersonFill />
                            </NavLink>
                        </li>
                        <li>
                            <span>Sair</span>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/login">
                                Entrar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">
                                Cadastrar
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar