import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validarRut, validarEmail, validarPassword, validarNombre, regiones, comunas } from '../utils/productos';
import { apiUsuarios } from '../services/api';

export default function Registro() {
    const [form, setForm] = useState({
        rut: '', nombre: '', apellidos: '', email: '', password: '',
        region: '', comuna: '', direccion: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validarRut(form.rut)) { setError('❌ RUT inválido.'); return; }
        if (!validarNombre(form.nombre, 50)) { setError('❌ Nombre (máx 50).'); return; }
        if (!form.apellidos || form.apellidos.length > 100) { setError('❌ Apellidos (máx 100).'); return; }
        if (!validarEmail(form.email)) { setError('❌ Email inválido.'); return; }

        const passResult = validarPassword(form.password);
        if (!passResult.valido) { setError('❌ ' + passResult.error); return; }

        if (!form.region) { setError('❌ Región.'); return; }
        if (!form.comuna) { setError('❌ Comuna.'); return; }
        if (!form.direccion || form.direccion.length > 300) { setError('❌ Dirección.'); return; }

        try {
            await apiUsuarios.post('/auth/registro', form);
            alert('✅ Registro exitoso.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || '❌ Error al registrar usuario.');
        }
    };

    const comunasDisponibles = form.region ? comunas[form.region] : [];

    return (
        <main className="container py-5">
            <div className="card p-4 mx-auto shadow-sm" style={{ maxWidth: '600px' }}>
                <h2 className="text-center mb-4">📝 Crear cuenta</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">RUT *</label>
                        <input id="rut" className="form-control" value={form.rut} onChange={handleChange} placeholder="19011022K" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Nombre *</label>
                        <input id="nombre" className="form-control" value={form.nombre} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Apellidos *</label>
                        <input id="apellidos" className="form-control" value={form.apellidos} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Email *</label>
                        <input id="email" type="email" className="form-control" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Contraseña *</label>
                        <input id="password" type="password" className="form-control" value={form.password} onChange={handleChange} required />
                        <small className="text-muted">4-10 caracteres, con mayúscula y número</small>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Región *</label>
                        <select id="region" className="form-select" value={form.region} onChange={handleChange} required>
                            <option value="">Selecciona</option>
                            {regiones.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Comuna *</label>
                        <select id="comuna" className="form-select" value={form.comuna} onChange={handleChange} required>
                            <option value="">Selecciona</option>
                            {comunasDisponibles.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Dirección *</label>
                        <input id="direccion" className="form-control" value={form.direccion} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Registrarse</button>
                </form>
                <div className="text-center mt-3">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></div>
            </div>
        </main>
    );
}