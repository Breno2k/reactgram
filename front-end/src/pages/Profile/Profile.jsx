import styles from './Profile.module.css'

import { uploads } from '../../utils/config'

// Components
import Message from '../../components/Message/Message'
import { Link } from 'react-router-dom'
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'

// Hooks
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

// Redux
import { publishPhoto, resetMessage, getUserPhotos, deletePhotos, updatePhoto } from '../../slices/photoSlice'
import { getUserDetails } from '../../slices/userSlice'

const Profile = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { user, loading } = useSelector((state) => state.user)
    const { user: userAuth } = useSelector((state) => state.auth)
    const { photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto } = useSelector((state) => state.photo)

    // States de inclusão
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    // States de edição
    const [editId, setEditId] = useState("")
    const [editImage, setEditImage] = useState("")
    const [editTitle, setEditTitle] = useState("")

    // New form and edir form refs
    const newPhotoForm = useRef()
    const editPhotoForm = useRef()


    // loading user data
    // Executa um efeito quando o componente monta ou quando as dependências mudam
    useEffect(() => {
        // Dispara a ação para buscar os detalhes e as fotos do usuário pelo id
        dispatch(getUserDetails(id))
        dispatch(getUserPhotos(id))
    }, [dispatch, id])

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const photoData = {
            title,
            image
        }

        // build form data
        const formData = new FormData()

        const photoFormData = Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]))

        formData.append("photo", photoFormData);

        dispatch(publishPhoto(formData))

        setTitle("")

        resetComponentMessage()
    }

    // Delete a photo
    const handleDelete = (id) => {
        dispatch(deletePhotos(id))

        resetComponentMessage()
    }

    // Show or hide forms
    const hideOrShowForms = () => {
        newPhotoForm.current.classList.toggle(styles.hide)
        editPhotoForm.current.classList.toggle(styles.hide)
    }

    // Update a photo
    const handleUpdate = (e) => {
        e.preventDefault()

        const photoData = {
            title: editTitle,
            id: editId
        }

        dispatch(updatePhoto(photoData))

        resetComponentMessage()

    }

    // Cancel edit
    const handleCancelEdit = (e) => {
        hideOrShowForms()
    }

    // Open edit form
    const handleEdit = (photo) => {
        if (editPhotoForm.current.classList.contains(styles.hide)) {
            hideOrShowForms()
        }

        // Atualizando os estados
        setEditId(photo._id)
        setEditTitle(photo.title)
        setEditImage(photo.image)
    }

    const handleFile = (e) => {
        // Image
        const image = e.target.files[0];

        setImage(image)
    }

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div className={styles.profile}>
            {/* Cabeçalho do perfil */}
            <div className={styles.profile_header}>
                {user.profileImage && (
                    <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                )}
                <div className={styles.profile_description}>
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
            {id === userAuth._id && (
                <>
                    <div className={styles.new_photo} ref={newPhotoForm}>
                        <h3>Compartilhe algum momento seu:</h3>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <span>Título para a foto:</span>
                                <input type="text" placeholder='Insira um título' onChange={(e) => setTitle(e.target.value)} value={title || ""} />
                            </label>
                            <label>
                                <span>Imagem:</span>
                                <input type="file" onChange={handleFile} />
                            </label>
                            {!loading && <input type="submit" value="Postar" />}
                            {loading && <input type="submit" value="Aguarde..." disabled />}
                        </form>
                    </div>
                    <div className={`${styles.edit_photo} ${styles.hide}`} ref={editPhotoForm}>
                        <p>Editando:</p>
                        {editImage && (
                            <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
                        )}
                        <form onSubmit={handleUpdate}>
                            <input type="text" placeholder='Insira um novo título' onChange={(e) => setEditTitle(e.target.value)} value={editTitle || ""} />
                            <input type="submit" value="Atualizar" />
                            <button className={styles.cancel_btn} onClick={handleCancelEdit}>Cancelar edição</button>
                        </form>
                    </div>
                    {errorPhoto && <Message msg={errorPhoto} type="error" />}
                    {messagePhoto && <Message msg={messagePhoto} type="success" />}
                </>
            )}
            {/*  */}
            <div className={styles.user_photos}>
                <h2>Fotos publicadas</h2>
                <div className={styles.photos_container}>
                    {photos && photos.map((photo) => (
                        <div className={styles.photo} key={photo._id}>
                            {photo.image && (<img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />)}
                            {id === userAuth._id ? (
                                <div className={styles.actions}>
                                    <Link to={`/photos/${photo._id}`}>
                                        <BsFillEyeFill />
                                    </Link>
                                    <BsPencilFill onClick={() => handleEdit(photo)} />
                                    <BsXLg onClick={() => handleDelete(photo._id)} />
                                </div>
                            ) : (
                                <Link className="btn" to={`/photos/${photo._id}`}>Ver</Link>
                            )}
                        </div>
                    ))}
                    {photos.lenght === 0 && <p>Ainda não há fotos publicadas</p>}
                </div>
            </div>
        </div>
    )
}

export default Profile