import React, { useState, useEffect } from 'react';
import { apiVentas, apiProductos } from '../../services/api';

export default function AdminReportes() {
    const [resumen, setResumen] = useState({ totalVendido: 0, cantidadBoletas: 0, ticketPromedio: 0 });
    const [criticos, setCriticos] = useState([]);

    useEffect(() => {
        const cargar = async () => {
            try {
                const [resRep, resCrit] = await Promise.all([
                    apiVentas.get('/reportes/resumen'),
                    apiProductos.get('/productos/criticos')
                ]);
                setResumen(resRep.data);
                setCriticos(resCrit.data);
            } catch (error) {
                console.error(error);
            }
        };
        cargar();
    }, []);

    return (
        <div>
            <h2>📈 Reportes</h2>
            <div className="row g-3 mb-4">
                <div className="col-md-4"><div className="card p-3 text-center"><small className="text-muted">Total de ventas</small><h4>${resumen.totalVendido.toLocaleString()}</h4></div></div>
                <div className="col-md-4"><div className="card p-3 text-center"><small className="text-muted">Órdenes</small><h4>{resumen.cantidadBoletas}</h4></div></div>
                <div className="col-md-4"><div className="card p-3 text-center"><small className="text-muted">Ticket promedio</small><h4>${Math.round(resumen.ticketPromedio).toLocaleString()}</h4></div></div>
            </div>
            {criticos.length > 0 && (
                <div className="alert alert-warning">
                    <h5>Productos con stock crítico:</h5>
                    {criticos.map(p => <p key={p.id} className="mb-0">⚠️ {p.nombre} - Stock: {p.stock}</p>)}
                </div>
            )}
        </div>
    );
}