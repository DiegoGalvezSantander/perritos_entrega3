import React, { useState, useEffect } from 'react';
import { apiUsuarios } from '../../services/api';
import FormUsuario from '../../components/admin/FormUsuario';
import ListaUsuarios from '../../components/admin/ListaUsuarios';

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [editando, setEditando] = useState(null);
    const [creando, setCreando] = useState(false);

    const cargarUsuarios = async () => {
        try {
            const res = await apiUsuarios.get('/usuarios');
            setUsuarios(res.data);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
    };

    useEffect(() => { cargarUsuarios(); }, []);

    const handleSubmit = async (form) => {
        try {
            if (editando) {
                await apiUsuarios.put(`/usuarios/${editando.id}`, form);
                alert('✅ Usuario actualizado');
            } else {
                await apiUsuarios.post('/usuarios', form);
                alert('✅ Usuario creado');
            }
            resetForm();
            cargarUsuarios();
        } catch (error) {
            alert('❌ Error al guardar usuario: ' + (error.response?.data?.error || error.message));
        }
    };

    const resetForm = () => { setEditando(null); setCreando(false); };

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Eliminar este usuario?')) return;
        try {
            await apiUsuarios.delete(`/usuarios/${id}`);
            cargarUsuarios();
        } catch (error) {
            alert('❌ No puedes eliminarte a ti mismo o el usuario tiene dependencias.');
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>👤 Usuarios</h2>
                <button className="btn btn-success" onClick={() => { setEditando(null); setCreando(true); }}>➕ Nuevo Usuario</button>
            </div>
            {(editando || creando) && (
                <FormUsuario usuario={editando} onSubmit={handleSubmit} onCancelar={resetForm} />
            )}
            <ListaUsuarios usuarios={usuarios} onEditar={setEditando} onEliminar={handleEliminar} />
        </div>
    );
}