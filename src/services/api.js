import axios from 'axios';

const apiUsuarios = axios.create({ baseURL: 'http://localhost:8081/api/v1' });
const apiProductos = axios.create({ baseURL: 'http://localhost:8082/api/v1' });
const apiVentas = axios.create({ baseURL: 'http://localhost:8083/api/v1' });

const addToken = (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
};

apiUsuarios.interceptors.request.use(addToken);
apiProductos.interceptors.request.use(addToken);
apiVentas.interceptors.request.use(addToken);

export { apiUsuarios, apiProductos, apiVentas };