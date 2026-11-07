import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiProductos } from '../services/api';
import ProductoCard from '../components/ProductoCard';

export default function Home() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        apiProductos.get('/productos')
            .then(res => {
                const ordenados = res.data.sort((a, b) => (b.enOferta === true) - (a.enOferta === true));
                setProductos(ordenados.slice(0, 4));
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <main>
            <section className="hero">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-md-6">
                            <h1 className="display-4 fw-bold" style={{ color: '#334b36' }}>
                                Porque ellos también <span style={{ color: '#8a6950' }}>merecen lo mejor</span>
                            </h1>
                            <p className="lead text-muted mt-3">Encuentra alimento, juguetes y accesorios para cuidar a tus compañeros.</p>
                            <Link to="/productos" className="btn btn-success btn-lg mt-3">Ver productos</Link>
                        </div>
                        <div className="col-md-6 text-center">
                            <img src="/IMG/PerroYgato.jpg" alt="Perro y gato" className="img-fluid rounded shadow" style={{ maxHeight: '400px' }} />
                        </div>
                    </div>
                </div>
            </section>
            <section className="container py-5">
                <h2 className="text-center mb-4" style={{ color: '#334b36' }}>Productos destacados</h2>
                <div className="row g-4">
                    {productos.map(p => (
                        <div key={p.id} className="col-md-6 col-lg-3"><ProductoCard producto={p} /></div>
                    ))}
                </div>
            </section>
        </main>
    );
}