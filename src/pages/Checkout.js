import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useSesion } from '../context/SesionContext';
import { regiones, comunas, validarEmail } from '../utils/productos';
import { apiVentas } from '../services/api';

export default function Checkout() {
    const { carrito, total, vaciar } = useCarrito();
    const { sesion } = useSesion();
    const navigate = useNavigate();
    const [form, setForm] = useState({ nombre: '', apellidos: '', email: '', calle: '', region: '', comuna: '', indicaciones: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        if (sesion) setForm(prev => ({ ...prev, nombre: sesion.nombre || '', email: sesion.email || '' }));
    }, [sesion]);

    const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });
    const comunasDisponibles = form.region ? comunas[form.region] : [];

    const handlePagar = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.nombre) { setError('❌ Nombre requerido.'); return; }
        if (!form.apellidos) { setError('❌ Apellidos requeridos.'); return; }
        if (!validarEmail(form.email)) { setError('❌ Email inválido.'); return; }
        if (!form.calle) { setError('❌ Dirección requerida.'); return; }
        if (!form.region || !form.comuna) { setError('❌ Región y comuna requeridas.'); return; }

        const productosParaVenta = carrito.map(item => ({
            productoId: item.id,
            cantidad: item.cantidad
        }));

        try {
            const payload = {
                nombre: form.nombre,
                apellidos: form.apellidos,
                email: form.email,
                calle: form.calle,
                region: form.region,
                comuna: form.comuna,
                indicaciones: form.indicaciones,
                productos: productosParaVenta
            };
            
            const res = await apiVentas.post('/boletas', payload);
            vaciar();
            navigate('/pago-exitoso/' + res.data.id);
        } catch (err) {
            const mensajeError = err.response?.data?.error || err.message;
            alert('❌ Error del backend: ' + mensajeError);
            navigate('/pago-error');
        }
    };

    if (carrito.length === 0) return <main className="container py-5"><div className="alert alert-info text-center">Tu carrito está vacío.</div></main>;

    return (
        <main className="container py-5">
            <div className="card p-4 mx-auto shadow-sm" style={{ maxWidth: '800px' }}>
                <h2 style={{ color: '#334b36' }}>💳 Checkout</h2>
                <div className="alert alert-success"><strong>Total a pagar:</strong> ${total.toLocaleString()}</div>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handlePagar}>
                    <h5>Información del cliente</h5>
                    <div className="row g-3">
                        <div className="col-md-6"><label className="form-label fw-bold">Nombre *</label><input id="nombre" className="form-control" value={form.nombre} onChange={handleChange} /></div>
                        <div className="col-md-6"><label className="form-label fw-bold">Apellidos *</label><input id="apellidos" className="form-control" value={form.apellidos} onChange={handleChange} /></div>
                    </div>
                    <div className="mt-3"><label className="form-label fw-bold">Email *</label><input id="email" type="email" className="form-control" value={form.email} onChange={handleChange} /></div>
                    <h5 className="mt-4">Dirección de entrega</h5>
                    <div className="mt-3"><label className="form-label fw-bold">Calle *</label><input id="calle" className="form-control" value={form.calle} onChange={handleChange} /></div>
                    <div className="row g-3 mt-2">
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Región *</label>
                            <select id="region" className="form-select" value={form.region} onChange={handleChange}>
                                <option value="">Selecciona</option>
                                {regiones.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Comuna *</label>
                            <select id="comuna" className="form-select" value={form.comuna} onChange={handleChange}>
                                <option value="">Selecciona</option>
                                {comunasDisponibles.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="mt-3"><label className="form-label fw-bold">Indicaciones (opcional)</label><textarea id="indicaciones" rows="2" className="form-control" value={form.indicaciones} onChange={handleChange}></textarea></div>
                    <button type="submit" className="btn btn-success w-100 mt-4">Pagar ahora ${total.toLocaleString()}</button>
                </form>
            </div>
        </main>
    );
}