import React from 'react';

export default function ListaUsuarios({ usuarios, onEditar, onEliminar }) {
    return (
        <div className="card">
            <ul className="list-group list-group-flush">
                {usuarios.map(u => (
                    <li key={u.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                            <strong>{u.nombre} {u.apellidos}</strong><br />
                            <small className="text-muted">{u.email}</small>{' '}
                            <span className="badge bg-info">{u.tipo || 'CLIENTE'}</span>
                        </span>
                        <div>
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEditar(u)}>✏️</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(u.id)}>✕</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}