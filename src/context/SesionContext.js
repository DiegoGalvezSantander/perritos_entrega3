import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiUsuarios } from '../services/api';

const SesionContext = createContext();

export function SesionProvider({ children }) {
    const [sesion, setSesion] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarSesion = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const res = await apiUsuarios.get('/auth/me');
                    setSesion(res.data);
                } catch (error) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    setSesion(null);
                }
            }
            setCargando(false);
        };
        cargarSesion();
    }, []);

    const iniciar = (usuario) => {
        setSesion(usuario);
        localStorage.setItem('accessToken', usuario.accessToken);
        localStorage.setItem('refreshToken', usuario.refreshToken);
    };

    const cerrarSesion = () => {
        setSesion(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };

    return (
        <SesionContext.Provider value={{ sesion, iniciar, cerrarSesion, cargando }}>
            {children}
        </SesionContext.Provider>
    );
}

export const useSesion = () => useContext(SesionContext);