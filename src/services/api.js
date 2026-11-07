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

const handleResponseError = async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (refreshToken) {
            try {
                const res = await axios.post('http://localhost:8081/api/v1/auth/refresh', {}, {
                    headers: { Authorization: `Bearer ${refreshToken}` }
                });
                
                localStorage.setItem('accessToken', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                
                originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }
    }
    return Promise.reject(error);
};

apiUsuarios.interceptors.response.use((response) => response, handleResponseError);
apiProductos.interceptors.response.use((response) => response, handleResponseError);
apiVentas.interceptors.response.use((response) => response, handleResponseError);

export { apiUsuarios, apiProductos, apiVentas };