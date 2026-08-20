import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCSRF = async () => {
        try {
            await api.get('/api/auth/csrf/');
        } catch (error) {
            console.error("Failed to fetch CSRF token", error);
        }
    };

    const checkAuth = async () => {
        try {
            const response = await api.get('/api/auth/me/');
            setUser(response.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCSRF().then(checkAuth);
    }, []);

    const login = async (username, password) => {
        const response = await api.post('/api/auth/login/', { username, password }, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        });
        setUser(response.data);
    };

    const register = async (userData) => {
        const response = await api.post('/api/auth/register/', userData, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        });
        setUser(response.data);
    };

    const logout = async () => {
        await api.post('/api/auth/logout/', {}, {
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

// Utility to get cookie by name
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
