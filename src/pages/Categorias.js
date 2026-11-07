import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categorias } from '../utils/productos';
import { apiProductos } from '../services/api';

export default function Categorias() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        apiProductos.get('/productos').then(res => setProductos(res.data)).catch(() => {});
    }, []);

    return (
        <main className="container py-5">
            <h2 className="text-center mb-4" style={{ color: '#334b36' }}>🏷️ Categorías</h2>
            <div className="row g-4">
                {categorias.map(c => {
                    const count = productos.filter(p => p.categoria === c.nombre).length;
                    return (
                        <div key={c.id} className="col-md-6 col-lg-4">
                            <Link to={`/categoria/${encodeURIComponent(c.nombre)}`} className="card text-center p-4 text-decoration-none h-100 shadow-sm" style={{ color: 'inherit' }}>
                                <h4 style={{ color: '#334b36' }}>{c.nombre}</h4>
                                <p className="text-muted mb-0">{count} productos</p>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}