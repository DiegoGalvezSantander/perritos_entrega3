import React, { useState, useEffect } from 'react';
import { categorias, filtrarProductos } from '../utils/productos';
import { apiProductos } from '../services/api';
import ProductoCard from '../components/ProductoCard';

export default function Productos() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [catFiltro, setCatFiltro] = useState('');

    useEffect(() => {
        apiProductos.get('/productos')
            .then(res => {
                setProductos(res.data);
                setCargando(false);
            })
            .catch(err => {
                console.error(err);
                setCargando(false);
            });
    }, []);

    const filtrados = filtrarProductos(productos, { busqueda, categoria: catFiltro });
    
    const productosOrdenados = [...filtrados].sort((a, b) => (b.enOferta === true) - (a.enOferta === true));

    if (cargando) return <main className="container py-5 text-center"><h3>Cargando productos...</h3></main>;

    return (
        <main className="container py-4">
            <h2 className="text-center mb-4" style={{ color: '#334b36' }}>
                🐾 Todos nuestros productos
            </h2>
            <div className="row mb-4 g-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="🔍 Buscar producto..."
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <select
                        className="form-select"
                        value={catFiltro}
                        onChange={e => setCatFiltro(e.target.value)}
                    >
                        <option value="">Todas las categorías</option>
                        {categorias.map(c => (
                            <option key={c.id} value={c.nombre}>{c.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>
            {productosOrdenados.length === 0 ? (
                <div className="alert alert-info text-center">
                    No se encontraron productos.
                </div>
            ) : (
                <div className="row g-4">
                    {productosOrdenados.map(p => (
                        <div key={p.id} className="col-md-6 col-lg-3">
                            <ProductoCard producto={p} />
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}