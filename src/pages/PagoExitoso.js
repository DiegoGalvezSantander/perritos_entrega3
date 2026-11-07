import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiVentas } from '../services/api';

export default function PagoExitoso() {
    const { id } = useParams();
    const [orden, setOrden] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        apiVentas.get(`/boletas/${id}`)
            .then(res => {
                setOrden(res.data);
                setCargando(false);
            })
            .catch((err) => {
                console.error(err);
                setCargando(false);
            });
    }, [id]);

    if (cargando) return <main className="container py-5 text-center"><h3>Cargando boleta...</h3></main>;
    if (!orden) return <main className="container py-5"><div className="alert alert-danger">Orden no encontrada.</div></main>;

    return (
        <main className="container py-5">
            <div className="card p-4 mx-auto shadow-sm" style={{ maxWidth: '700px' }}>
                <div className="alert alert-success"><h2 className="mb-0">✅ Compra realizada</h2></div>
                <p><strong>Orden #:</strong> {orden.id}</p>
                <p><strong>Fecha:</strong> {orden.fecha ? new Date(orden.fecha).toLocaleDateString() : ''}</p>
                <p><strong>Cliente:</strong> {orden.nombreCliente} {orden.apellidosCliente}</p>
                <p><strong>Email:</strong> {orden.correoCliente}</p>
                <p><strong>Dirección:</strong> {orden.calle}, {orden.comuna}</p>
                <h5 className="mt-3">Productos:</h5>
                {orden.detalles?.map(p => (
                    <p key={p.id}>• {p.nombreProducto} × {p.cantidad} = ${p.subtotal.toLocaleString()}</p>
                ))}
                <h4 className="mt-3">Total: ${orden.total.toLocaleString()}</h4>
                <Link to="/" className="btn btn-success mt-3">Volver al inicio</Link>
            </div>
        </main>
    );
}