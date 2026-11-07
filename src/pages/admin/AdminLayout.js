import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSesion } from '../../context/SesionContext';
import AdminSidebar from '../../components/AdminSidebar';

export default function AdminLayout() {
    const { sesion, cerrarSesion } = useSesion();
    const navigate = useNavigate();

    const autorizado = sesion && (sesion.tipo === 'ADMIN' || sesion.tipo === 'VENDEDOR');

    useEffect(() => {
        if (!autorizado) {
            navigate('/login');
        }
    }, [autorizado, navigate]);

    if (!autorizado) return null;

    return (
        <main className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 style={{ color: '#334b36' }}>Panel Admin</h1>
                <div>
                    <span className="me-2 badge bg-secondary">👤 {sesion.nombre} ({sesion.tipo})</span>
                    <button onClick={cerrarSesion} className="btn btn-outline-danger btn-sm">Cerrar sesión</button>
                </div>
            </div>
            <div className="admin-layout">
                <AdminSidebar rol={sesion.tipo} />
                <div className="admin-content">
                    <Outlet />
                </div>
            </div>
        </main>
    );
}