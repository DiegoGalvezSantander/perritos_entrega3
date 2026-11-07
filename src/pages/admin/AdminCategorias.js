import React, { useState, useEffect } from 'react';
import { apiProductos } from '../../services/api';

export default function AdminCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [editando, setEditando] = useState(null);
    const [nombre, setNombre] = useState('');

    const cargar = async () => {
        const res = await apiProductos.get('/categorias');
        setCategorias(res.data);
    };

    useEffect(() => { cargar(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nombre.trim()) return;
        try {
            if (editando) {
                await apiProductos.put(`/categorias/${editando}`, { nombre });
                alert('✅ Categoría actualizada');
            } else {
                await apiProductos.post('/categorias', { nombre });
                alert('✅ Categoría creada');
            }
            setNombre('');
            setEditando(null);
            cargar();
        } catch (error) {
            alert('❌ Error al guardar categoría');
        }
    };

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Eliminar categoría?')) return;
        try {
            await apiProductos.delete(`/categorias/${id}`);
            cargar();
        } catch (error) {
            alert('❌ No se puede eliminar. Tiene productos asociados.');
        }
    };

    return (
        <div>
            <h2>🏷️ Categorías</h2>
            <div className="card p-3 mb-4">
                <h5>{editando ? '✏️ Editar' : '➕ Nueva'} Categoría</h5>
                <form onSubmit={handleSubmit} className="d-flex gap-2">
                    <input type="text" className="form-control" placeholder="Nombre de la categoría" value={nombre} onChange={e => setNombre(e.target.value)} required />
                    <button type="submit" className="btn btn-success">{editando ? 'Actualizar' : 'Crear'}</button>
                </form>
            </div>
            <div className="card">
                <ul className="list-group list-group-flush">
                    {categorias.map(c => (
                        <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <strong>{c.nombre}</strong>
                            <div>
                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => { setEditando(c.id); setNombre(c.nombre); }}>✏️</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(c.id)}>✕</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}