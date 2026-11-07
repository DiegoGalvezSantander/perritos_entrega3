import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { rutaImagen } from '../utils/productos';
import { useCarrito } from '../context/CarritoContext';
import { apiProductos } from '../services/api';

export default function DetalleProducto() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const { agregar } = useCarrito();

    useEffect(() => {
        apiProductos.get(`/productos/${id}`)
            .then(res => {
                setProducto(res.data);
                setCargando(false);
            })
            .catch((err) => {
                console.error("Error al buscar producto:", err);
                setCargando(false);
            });
    }, [id]);

    if (cargando) return <main className="container py-5 text-center"><h3>Cargando producto...</h3></main>;
    if (!producto) return <main className="container py-5"><div className="alert alert-danger">Producto no encontrado. Verifica que el ID exista en la base de datos.</div></main>;

    const tieneDescuento = producto.enOferta && producto.precioOriginal > producto.precio;

    return (
        <main className="container py-5">
            <div className="row g-4 bg-white p-4 rounded-3 shadow-sm">
                <div className="col-md-6">
                    <img src={rutaImagen(producto.imagen)} alt={producto.nombre} className="img-fluid rounded" />
                </div>
                <div className="col-md-6">
                    <span className="badge bg-success">{producto.categoria}</span>
                    {tieneDescuento && <span className="badge bg-danger ms-2">🔥 Oferta</span>}
                    <h1 className="mt-2">{producto.nombre}</h1>
                    {tieneDescuento && (
                        <p className="text-muted text-decoration-line-through mb-0">${producto.precioOriginal.toLocaleString()}</p>
                    )}
                    <p className="fs-3 fw-bold" style={{ color: '#334b36' }}>${producto.precio.toLocaleString()}</p>
                    <p className="text-muted">📦 Stock: {producto.stock} unidades</p>
                    <p>{producto.descripcion}</p>
                    <button className="btn btn-success btn-lg w-100 mt-3" onClick={() => agregar(producto)}>🛒 Añadir al carrito</button>
                    <Link to="/productos" className="btn btn-outline-secondary w-100 mt-2">← Volver</Link>
                </div>
            </div>
        </main>
    );
}