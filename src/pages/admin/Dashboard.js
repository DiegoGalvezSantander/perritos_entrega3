import React, { useState, useEffect } from 'react';
import { apiProductos, apiUsuarios, apiVentas } from '../../services/api';

export default function Dashboard() {
    const [stats, setStats] = useState({ productos: 0, usuarios: 0, ordenes: 0, ventas: 0 });

    useEffect(() => {
        const cargar = async () => {
            try {
                const [resProd, resUsu, resVen] = await Promise.all([
                    apiProductos.get('/productos'),
                    apiUsuarios.get('/usuarios'),
                    apiVentas.get('/boletas')
                ]);
                const boletas = resVen.data;
                const totalVentas = boletas.reduce((s, o) => s + o.total, 0);
                
                setStats({
                    productos: resProd.data.length,
                    usuarios: resUsu.data.length,
                    ordenes: boletas.length,
                    ventas: totalVentas
                });
            } catch (error) {
                console.error(error);
            }
        };
        cargar();
    }, []);

    return (
        <div>
            <h2>📊 Dashboard</h2>
            <p className="text-muted">Resumen de actividades</p>
            <div className="row g-3 mt-3">
                <div className="col-md-3"><div className="text-white p-4 rounded-3" style={{ background: '#2563eb' }}><h5>Órdenes</h5><p className="display-5 mb-0">{stats.ordenes}</p></div></div>
                <div className="col-md-3"><div className="text-white p-4 rounded-3" style={{ background: '#16a34a' }}><h5>Productos</h5><p className="display-5 mb-0">{stats.productos}</p></div></div>
                <div className="col-md-3"><div className="text-white p-4 rounded-3" style={{ background: '#f59e0b' }}><h5>Usuarios</h5><p className="display-5 mb-0">{stats.usuarios}</p></div></div>
                <div className="col-md-3"><div className="text-white p-4 rounded-3" style={{ background: '#8b5cf6' }}><h5>Ventas totales</h5><p className="display-6 mb-0">${stats.ventas.toLocaleString()}</p></div></div>
            </div>
        </div>
    );
}