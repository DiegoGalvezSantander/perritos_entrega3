import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar({ rol }) {
    const { pathname } = useLocation();
    const items = [
        { to: '/admin', label: '📊 Dashboard', roles: ['ADMIN', 'VENDEDOR'] },
        { to: '/admin/productos', label: '📦 Productos', roles: ['ADMIN', 'VENDEDOR'] },
        { to: '/admin/productos-criticos', label: '⚠️ Stock Crítico', roles: ['ADMIN', 'VENDEDOR'] },
        { to: '/admin/categorias', label: '🏷️ Categorías', roles: ['ADMIN'] },
        { to: '/admin/usuarios', label: '👤 Usuarios', roles: ['ADMIN'] },
        { to: '/admin/ordenes', label: '📋 Órdenes', roles: ['ADMIN', 'VENDEDOR'] },
        { to: '/admin/historial', label: '📜 Historial', roles: ['ADMIN'] },
        { to: '/admin/reportes', label: '📈 Reportes', roles: ['ADMIN'] },
        { to: '/admin/perfil', label: '⚙️ Perfil', roles: ['ADMIN', 'VENDEDOR'] }
    ];
    return (
        <aside className="admin-sidebar">
            <h3>Menú</h3>
            {items.filter(i => i.roles.includes(rol)).map(i => (
                <Link key={i.to} to={i.to} className={pathname === i.to ? 'menu-admin activo' : 'menu-admin'}>
                    {i.label}
                </Link>
            ))}
        </aside>
    );
}