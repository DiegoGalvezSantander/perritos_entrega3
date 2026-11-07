import React, { useState } from 'react';

const FORM_VACIO = {
    codigo: '', nombre: '', descripcion: '', precio: '', stock: '',
    stockCritico: '', categoria: 'Alimento Seco', imagenUrl: '',
    precioOferta: ''
};

export default function FormProducto({ producto, onSubmit, onCancelar, categorias = [] }) {
    const [form, setForm] = useState(() => {
        if (!producto) return FORM_VACIO;
        return {
            ...producto,
            precio: String(producto.precio),
            stock: String(producto.stock),
            stockCritico: String(producto.stockCritico || ''),
            precioOferta: String(producto.precioOriginal || ''),
            categoria: producto.categoria || 'Alimento Seco'
        };
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setForm({ ...form, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!form.codigo.trim()) { setError('❌ Código requerido.'); return; }
        if (!form.nombre.trim()) { setError('❌ Nombre requerido.'); return; }

        const precio = parseFloat(form.precio);
        const stock = parseInt(form.stock);
        const stockCritico = parseInt(form.stockCritico) || 0;

        if (isNaN(precio) || precio <= 0) { setError('❌ Precio debe ser mayor a 0.'); return; }
        if (isNaN(stock) || stock < 0) { setError('❌ Stock debe ser mayor o igual a 0.'); return; }

        onSubmit({
            ...form,
            precio,
            stock,
            stockCritico,
            precioOferta: form.precioOferta ? parseFloat(form.precioOferta) : null,
            imagenUrl: form.imagenUrl || 'IMG/ProductosGato/SuperRascadorGato.png'
        });
    };

    return (
        <div className="card p-3 mb-4">
            <h5>{producto ? 'Editar' : 'Nuevo'} Producto</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="row g-2">
                    <div className="col-md-4"><input id="codigo" className="form-control" placeholder="Código" value={form.codigo} onChange={handleChange} required /></div>
                    <div className="col-md-4"><input id="nombre" className="form-control" placeholder="Nombre" value={form.nombre} onChange={handleChange} required /></div>
                    <div className="col-md-4">
                        <select id="categoria" className="form-select" value={form.categoria} onChange={handleChange}>
                            {categorias.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                        </select>
                    </div>
                    <div className="col-12"><textarea id="descripcion" className="form-control" placeholder="Descripción" value={form.descripcion} onChange={handleChange} /></div>
                    <div className="col-md-4"><input id="precio" type="number" min="0" step="0.01" className="form-control" placeholder="Precio" value={form.precio} onChange={handleChange} required /></div>
                    <div className="col-md-4"><input id="precioOferta" type="number" min="0" step="0.01" className="form-control" placeholder="Precio original (opcional)" value={form.precioOferta} onChange={handleChange} /></div>
                    <div className="col-md-4"><input id="stock" type="number" min="0" className="form-control" placeholder="Stock" value={form.stock} onChange={handleChange} required /></div>
                    <div className="col-md-4"><input id="stockCritico" type="number" min="0" className="form-control" placeholder="Stock crítico" value={form.stockCritico} onChange={handleChange} /></div>
                    <div className="col-md-8"><input id="imagenUrl" className="form-control" placeholder="Ruta imagen" value={form.imagenUrl} onChange={handleChange} /></div>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-success">{producto ? 'Actualizar' : 'Crear'}</button>
                    {producto && <button type="button" className="btn btn-secondary ms-2" onClick={onCancelar}>Cancelar</button>}
                </div>
            </form>
        </div>
    );
}