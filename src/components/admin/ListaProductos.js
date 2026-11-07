import React from 'react';

export default function ListaProductos({ productos, onEditar, onEliminar }) {
    return (
        <div className="card">
            <ul className="list-group list-group-flush">
                {productos.map(p => (
                    <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                            {p.nombre} - ${p.precio.toLocaleString()} (Stock: {p.stock})
                            {p.stock <= p.stockCritico ? ' ⚠️' : ''}
                            {p.enOferta ? ' 🔥' : ''}
                        </span>
                        <div>
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEditar(p)}>✏️</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(p.id)}>✕</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}