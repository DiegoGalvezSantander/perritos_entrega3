import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiVentas } from '../../services/api';

export default function AdminHistorial() {
    const [ordenes, setOrdenes] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        apiVentas.get('/boletas').then(res => setOrdenes(res.data)).catch(err => console.error(err));
    }, []);

    const filtradas = ordenes.filter(o => 
        o.nombreCliente.toLowerCase().includes(busqueda.toLowerCase()) || 
        o.correoCliente.toLowerCase().includes(busqueda.toLowerCase())
    );

    const totalFiltrado = filtradas.reduce((s, o) => s + o.total, 0);

    return (
        <div>
            <h2>📜 Historial de Compras</h2>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="🔍 Buscar cliente o email..." value={busqueda} onChange={e => setBusqueda(e.target.value)} />
            </div>
            <div className="alert alert-info">
                <strong>Total de compras:</strong> {filtradas.length} | <strong>Monto total:</strong> ${totalFiltrado.toLocaleString()}
            </div>
            {filtradas.map(o => (
                <div key={o.id} className="card p-3 mb-2">
                    <div className="d-flex justify-content-between">
                        <div>
                            <strong>Orden #{o.id}</strong> - {new Date(o.fecha).toLocaleDateString()}<br />
                            👤 {o.nombreCliente} ({o.correoCliente})<br />
                            💰 ${o.total.toLocaleString()}
                        </div>
                        <Link to={`/admin/boleta/${o.id}`} className="btn btn-sm btn-outline-success align-self-center">Ver boleta</Link>
                    </div>
                </div>
            ))}
        </div>
    );
}