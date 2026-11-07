import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useSesion } from '../context/SesionContext';

export default function Header() {
    const { carrito } = useCarrito();
    const { sesion, cerrarSesion } = useSesion();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const totalItems = carrito.reduce((s, p) => s + p.cantidad, 0);

    const esActivo = (ruta) => pathname === ruta ? 'nav-link activo' : 'nav-link';

    const handleCerrarSesion = () => {
        cerrarSesion();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
            <div className="container">
                <Link to="/" className="navbar-brand d-flex align-items-center gap-2" aria-label="Ir al inicio">
                    <span style={{ fontSize: '24px' }} aria-hidden="true">🐾</span>
                    <div>
                        <div style={{ fontWeight: 'bold', color: '#334b36', lineHeight: 1 }}>TiendaDeMascotas</div>
                        <small style={{ fontSize: '11px', color: '#777' }}>Todo para ellos</small>
                    </div>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menuPrincipal"
                    aria-label="Abrir menú de navegación"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="menuPrincipal">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item"><Link to="/" className={esActivo('/')}>Inicio</Link></li>
                        <li className="nav-item"><Link to="/productos" className={esActivo('/productos')}>Productos</Link></li>
                        <li className="nav-item"><Link to="/categorias" className={esActivo('/categorias')}>Categorías</Link></li>
                        <li className="nav-item"><Link to="/ofertas" className={esActivo('/ofertas')}>Ofertas</Link></li>
                        <li className="nav-item"><Link to="/noticias" className={esActivo('/noticias')}>Noticias</Link></li>
                        <li className="nav-item"><Link to="/nosotros" className={esActivo('/nosotros')}>Nosotros</Link></li>
                        <li className="nav-item"><Link to="/contacto" className={esActivo('/contacto')}>Contacto</Link></li>
                    </ul>
                    <div className="d-flex align-items-center gap-2">
                        {sesion ? (
                            <>
                                <span className="text-muted small">👤 {sesion.nombre}</span>
                                {(sesion.tipo === 'ADMIN' || sesion.tipo === 'VENDEDOR') && (
                                    <Link to="/admin" className="btn btn-outline-secondary btn-sm" aria-label="Ir al panel de administración">
                                        ⚙️ Admin
                                    </Link>
                                )}
                                <button
                                    onClick={handleCerrarSesion}
                                    className="btn btn-outline-danger btn-sm"
                                    aria-label="Cerrar sesión"
                                >
                                    Salir
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline-secondary btn-sm">Iniciar sesión</Link>
                                <Link to="/registro" className="btn btn-success btn-sm">Registrarse</Link>
                            </>
                        )}
                        <Link to="/carrito" className="btn btn-success btn-sm position-relative" aria-label={`Carrito con ${totalItems} productos`}>
                            🛒 Carrito
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {totalItems}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}