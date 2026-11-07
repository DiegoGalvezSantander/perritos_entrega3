import React, { useState, useEffect } from 'react';
import { apiProductos } from '../../services/api';
import FormProducto from '../../components/admin/FormProducto';
import ListaProductos from '../../components/admin/ListaProductos';

export default function AdminProductos() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [editando, setEditando] = useState(null);

    const cargarDatos = async () => {
        try {
            const [resProd, resCat] = await Promise.all([
                apiProductos.get('/productos'),
                apiProductos.get('/categorias')
            ]);
            setProductos(resProd.data);
            setCategorias(resCat.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { cargarDatos(); }, []);

    const handleSubmit = async (datos) => {
        try {
            const catEncontrada = categorias.find(c => c.nombre === datos.categoria);
            const payload = { ...datos, categoriaId: catEncontrada ? catEncontrada.id : 1 };

            if (editando) {
                await apiProductos.put(`/productos/${editando.id}`, payload);
                alert('✅ Producto actualizado');
            } else {
                await apiProductos.post('/productos', payload);
                alert('✅ Producto creado');
            }
            cargarDatos();
            setEditando(null);
        } catch (error) {
            alert('❌ Error al guardar: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Eliminar?')) return;
        try {
            await apiProductos.delete(`/productos/${id}`);
            cargarDatos();
        } catch (error) {
            alert('❌ Error al eliminar');
        }
    };

    return (
        <div>
            <h2>📦 Productos</h2>
            <FormProducto
                producto={editando}
                onSubmit={handleSubmit}
                onCancelar={() => setEditando(null)}
                categorias={categorias}
            />
            <ListaProductos
                productos={productos}
                onEditar={setEditando}
                onEliminar={handleEliminar}
            />
        </div>
    );
}