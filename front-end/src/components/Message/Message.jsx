import styles from './Message.module.css'

const Message = (msg, type) => {
    return (
        <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
    )
}

export default Message