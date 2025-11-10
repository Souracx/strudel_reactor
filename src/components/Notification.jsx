function NotificationPopUp({ message, type, show }) {
    if (!show) return null;

    return (
        <div className="notification-popup-container">
            <div className={`notification-popup ${type}`} role="alert">
                <div className="notification-popup-header">
                    <strong>
                        {type === 'success' ? ' Success' : 
                         type === 'error' ? ' Error' : 
                         type === 'warning' ? ' Warning' : 'Info'}
                    </strong>
                </div>
                <div className="notification-popup-body">
                    {message}
                </div>
            </div>
        </div>
    );
}

export default NotificationPopUp;