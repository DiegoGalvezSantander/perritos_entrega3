import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { rutaImagen } from '../utils/productos';

export default function ProductoCard({ producto }) {
    const { agregar } = useCarrito();

    const handleAgregar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        agregar(producto);
    };

    const precioVenta = Number(producto.precio);
    const mostrarOferta = producto.enOferta === true || producto.nombre === 'Rascador Premium';

    return (
        <div className="card h-100 shadow-sm">
            <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img
                    src={rutaImagen(producto.imagen)}
                    className="card-img-top"
                    alt={producto.nombre}
                    style={{ height: '180px', objectFit: 'cover' }}
                />
            </Link>
            <div className="card-body d-flex flex-column text-center">
                
                <Link to={`/producto/${producto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h5 className="card-title" style={{ color: '#334b36' }}>{producto.nombre}</h5>
                </Link>

                {mostrarOferta && (
                    <div className="mb-2">
                        <span className="badge bg-danger">🔥 Oferta</span>
                    </div>
                )}

                <p className="card-text fw-bold fs-4 mt-auto" style={{ color: '#334b36' }}>
                    ${precioVenta.toLocaleString()}
                </p>
                
                <button
                    className="btn btn-success w-100 mt-3"
                    onClick={handleAgregar}
                    aria-label={`Añadir ${producto.nombre} al carrito`}
                >
                    🛒 Añadir al carrito
                </button>
            </div>
        </div>
    );
}