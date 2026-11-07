import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSesion } from '../context/SesionContext';
import { validarEmail } from '../utils/productos';
import { apiUsuarios } from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const { iniciar } = useSesion();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!validarEmail(email)) { setError('❌ Email inválido.'); return; }
        if (pass.length < 4 || pass.length > 20) { setError('❌ Contraseña incorrecta.'); return; }
        
        try {
            const res = await apiUsuarios.post('/auth/login', { email, password: pass });
            iniciar(res.data);
            alert('✅ Bienvenido ' + res.data.nombre);
            if (res.data.tipo === 'ADMIN' || res.data.tipo === 'VENDEDOR') navigate('/admin');
            else navigate('/');
        } catch (err) {
            setError('❌ Credenciales incorrectas.');
        }
    };

    return (
        <main className="container py-5">
            <div className="card p-4 mx-auto shadow-sm" style={{ maxWidth: '480px' }}>
                <h2 className="text-center mb-4">🔐 Iniciar Sesión</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Email *</label>
                        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@duoc.cl" required />
                        <small className="text-muted">Solo @duoc.cl, @profesor.duoc.cl o @gmail.com</small>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Contraseña *</label>
                        <input type="password" className="form-control" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" required />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Ingresar</button>
                </form>
                <div className="text-center mt-3">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></div>
                <div className="alert alert-info mt-3 small text-center mb-0">
                    Credenciales por defecto: <strong>admin@duoc.cl / Admin1234</strong>
                </div>
            </div>
        </main>
    );
}