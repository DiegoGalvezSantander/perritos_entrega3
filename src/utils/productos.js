export const categorias = [
    { id: 1, nombre: "Alimento Seco" },
    { id: 2, nombre: "Alimento Húmedo" },
    { id: 3, nombre: "Juguetes" },
    { id: 4, nombre: "Rascadores y Gimnasios" },
    { id: 5, nombre: "Correas, Collares y Arneses" }
];

export const regiones = [
    { id: 1, nombre: "Región Metropolitana" },
    { id: 2, nombre: "Región de Valparaíso" },
    { id: 3, nombre: "Región del Biobío" },
    { id: 4, nombre: "Región de Coquimbo" },
    { id: 5, nombre: "Región de O'Higgins" }
];

export const comunas = {
    1: ["Santiago", "Providencia", "Las Condes", "Ñuñoa", "La Florida", "Maipú"],
    2: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
    3: ["Concepción", "Talcahuano", "Chillán", "Los Ángeles"],
    4: ["La Serena", "Coquimbo", "Ovalle"],
    5: ["Rancagua", "San Fernando", "Santa Cruz"]
};

export function rutaImagen(img) {
    if (!img) return 'IMG/placeholder.png';
    return img.startsWith('/') ? img : `/${img}`;
}

export function validarEmail(email) {
    if (!email || email.length > 100) return false;
    const dominios = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominios.some(d => email.toLowerCase().endsWith(d));
}

export function validarRut(rut) {
    if (!rut || typeof rut !== 'string') return false;
    rut = rut.replace(/[.-]/g, '').trim();
    if (!/^[0-9]{6,8}[0-9Kk]$/.test(rut)) return false;
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    let suma = 0, mult = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * mult;
        mult = mult < 7 ? mult + 1 : 2;
    }
    const dvE = 11 - (suma % 11);
    const dvC = dvE === 11 ? '0' : dvE === 10 ? 'K' : dvE.toString();
    return dv === dvC;
}

export function validarPassword(password) {
    if (!password || password.length < 4 || password.length > 10) {
        return { valido: false, error: 'Contraseña: 4-10 caracteres.' };
    }
    if (!/[A-Z]/.test(password)) {
        return { valido: false, error: 'Contraseña: al menos una mayúscula.' };
    }
    if (!/[0-9]/.test(password)) {
        return { valido: false, error: 'Contraseña: al menos un número.' };
    }
    return { valido: true };
}

export function validarNombre(nombre, max = 50) {
    return !!nombre && nombre.length <= max;
}

export function calcularTotal(carrito) {
    return carrito.reduce((s, p) => s + p.precio * p.cantidad, 0);
}

export function filtrarProductos(productos, { busqueda = '', categoria = '' } = {}) {
    return productos.filter(p => {
        const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCat = !categoria || p.categoria === categoria;
        return coincideNombre && coincideCat;
    });
}