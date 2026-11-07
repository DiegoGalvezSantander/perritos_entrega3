import React from 'react';
import { useSesion } from '../../context/SesionContext';

export default function AdminPerfil() {
    const { sesion } = useSesion();
    return (
        <div>
            <h2>⚙️ Perfil</h2>
            <div className="card p-3">
                <p><strong>Nombre:</strong> {sesion?.nombre}</p>
                <p><strong>Email:</strong> {sesion?.email}</p>
                <p><strong>Rol:</strong> <span className="badge bg-info">{sesion?.tipo}</span></p>
            </div>
        </div>
    );
}