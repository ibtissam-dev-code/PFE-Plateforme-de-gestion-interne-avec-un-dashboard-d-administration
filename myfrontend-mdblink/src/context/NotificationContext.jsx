import React, { createContext, useContext, useState } from 'react';
import notificationsData from '../data/notificationsData';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState(notificationsData);
    const [hasUnread, setHasUnread] = useState(true); // Bach n-7kmo f s-siwra l-7mra

    const markAllAsRead = () => {
        setHasUnread(false);
    };

    const clearNotifications = () => {
        setNotifications([]);
        setHasUnread(false);
    };

    return (
        <NotificationContext.Provider value={{ notifications, hasUnread, markAllAsRead, clearNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);