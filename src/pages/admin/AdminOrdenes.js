import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiVentas } from '../../services/api';

export default function AdminOrdenes() {
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        apiVentas.get('/boletas').then(res => setOrdenes(res.data)).catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>📋 Órdenes</h2>
            {ordenes.length === 0 ? (
                <div className="alert alert-info">No hay órdenes.</div>
            ) : ordenes.map(o => (
                <div key={o.id} className="card p-3 mb-2">
                    <div className="d-flex justify-content-between">
                        <div>
                            <strong>Orden #{o.id}</strong> - {new Date(o.fecha).toLocaleDateString()}<br />
                            👤 {o.nombreCliente} {o.apellidosCliente}<br />
                            💰 ${o.total.toLocaleString()}<br />
                        </div>
                        <Link to={`/admin/boleta/${o.id}`} className="btn btn-sm btn-outline-success align-self-center">Ver boleta</Link>
                    </div>
                </div>
            ))}
        </div>
    );
}