import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiProductos } from '../../services/api';

export default function AdminProductosCriticos() {
    const [criticos, setCriticos] = useState([]);

    useEffect(() => {
        apiProductos.get('/productos/criticos').then(res => setCriticos(res.data)).catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>⚠️ Productos con Stock Crítico</h2>
            <p className="text-muted">Productos que necesitan reposición urgente</p>
            {criticos.length === 0 ? (
                <div className="alert alert-success">✅ No hay productos con stock crítico</div>
            ) : (
                <div className="card">
                    <ul className="list-group list-group-flush">
                        {criticos.map(p => (
                            <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{p.nombre}</strong><br />
                                    <small className="text-muted">Stock actual: {p.stock} / Crítico: {p.stockCritico}</small>
                                </div>
                                <Link to="/admin/productos" className="btn btn-sm btn-warning">📦 Reponer</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="mt-3"><Link to="/admin" className="btn btn-outline-secondary">← Volver</Link></div>
        </div>
    );
}