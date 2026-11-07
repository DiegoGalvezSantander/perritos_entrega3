import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiVentas } from '../../services/api';

export default function AdminBoleta() {
    const { id } = useParams();
    const [orden, setOrden] = useState(null);

    useEffect(() => {
        apiVentas.get(`/boletas/${id}`).then(res => setOrden(res.data)).catch(err => console.error(err));
    }, [id]);

    if (!orden) return <div className="alert alert-danger">Cargando o boleta no encontrada...</div>;

    return (
        <div>
            <h2>🧾 Boleta Orden #{orden.id}</h2>
            <div className="card p-4" style={{ maxWidth: '700px' }}>
                <div className="text-center mb-3"><h4>🐾 TiendaDeMascotas</h4></div>
                <hr />
                <p><strong>Fecha:</strong> {new Date(orden.fecha).toLocaleDateString()}</p>
                <p><strong>Cliente:</strong> {orden.nombreCliente} {orden.apellidosCliente}</p>
                <p><strong>Email:</strong> {orden.correoCliente}</p>
                <p><strong>Dirección:</strong> {orden.calle}, {orden.comuna}, {orden.region}</p>
                <hr />
                <table className="table">
                    <thead><tr><th>Producto</th><th>Cant.</th><th>Precio</th><th>Subtotal</th></tr></thead>
                    <tbody>
                        {orden.detalles?.map(p => (
                            <tr key={p.id}>
                                <td>{p.nombreProducto}</td>
                                <td>{p.cantidad}</td>
                                <td>${p.precioUnitario.toLocaleString()}</td>
                                <td>${p.subtotal.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-end"><h4>Total: ${orden.total.toLocaleString()}</h4></div>
                <div className="d-flex gap-2 mt-3">
                    <Link to="/admin/ordenes" className="btn btn-outline-secondary">← Volver</Link>
                    <button onClick={() => window.print()} className="btn btn-success">🖨️ Imprimir</button>
                </div>
            </div>
        </div>
    );
}