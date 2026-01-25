const Notification = ({ message, messageType }) => {
    const style = {
        fontSize: 20,
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    const error = {
        color: 'red',
    }
    const warning = {
        color: 'orange',
    }
    const success = {
        color: 'green',
    }

    if (message === null) {
        return null
    }

    return (
        <div style={{
            ...style,
            ...(messageType === 'error' && error),
            ...(messageType === 'warning' && warning),
            ...(messageType === 'success' && success)
        }}>
            {message}
        </div>
    )
}

export default Notification