import React, { useState } from 'react';
import { validarRut, validarEmail } from '../../utils/productos';

const FORM_VACIO = { rut: '', nombre: '', apellidos: '', email: '', tipo: 'CLIENTE' };

export default function FormUsuario({ usuario, onSubmit, onCancelar }) {
    const [form, setForm] = useState(usuario || FORM_VACIO);

    const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarRut(form.rut)) { alert('❌ RUT inválido'); return; }
        if (!form.nombre || form.nombre.length > 50) { alert('❌ Nombre (máx 50)'); return; }
        if (!form.apellidos || form.apellidos.length > 100) { alert('❌ Apellidos (máx 100)'); return; }
        if (!validarEmail(form.email)) { alert('❌ Email inválido'); return; }
        onSubmit(form);
    };

    return (
        <div className="card p-3 mb-4">
            <h5>{usuario ? '✏️ Editar Usuario' : '➕ Crear Usuario'}</h5>
            <form onSubmit={handleSubmit}>
                <div className="row g-2">
                    <div className="col-md-4"><input id="rut" className="form-control" placeholder="RUT" value={form.rut} onChange={handleChange} required /></div>
                    <div className="col-md-4"><input id="nombre" className="form-control" placeholder="Nombre" value={form.nombre} onChange={handleChange} required /></div>
                    <div className="col-md-4"><input id="apellidos" className="form-control" placeholder="Apellidos" value={form.apellidos} onChange={handleChange} required /></div>
                    <div className="col-md-8"><input id="email" type="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange} required /></div>
                    <div className="col-md-4">
                        <select id="tipo" className="form-select" value={form.tipo} onChange={handleChange}>
                            <option value="ADMIN">Administrador</option>
                            <option value="VENDEDOR">Vendedor</option>
                            <option value="CLIENTE">Cliente</option>
                        </select>
                    </div>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-success">{usuario ? 'Guardar cambios' : 'Crear usuario'}</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={onCancelar}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}