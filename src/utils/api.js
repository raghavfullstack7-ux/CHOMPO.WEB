import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to request if available
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const fetchMenuItems = () => API.get('/menu');
export const fetchMenuItem = (id) => API.get(`/menu/${id}`);
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const updateMe = (data) => API.patch('/auth/updateMe', data);
export const updatePassword = (data) => API.patch('/auth/updatePassword', data);
export const createOrder = (data) => API.post('/orders', data);
export const getOrderById = (id) => API.get(`/orders/${id}`);
export const getMyOrders = () => API.get('/orders/myorders');

// Admin API
export const getAdminOrders = () => API.get('/admin/orders');
export const updateOrderStatus = (id, status) => API.patch(`/admin/orders/${id}/status`, { status });
export const createMenuItem = (data) => API.post('/admin/menu', data);
export const updateMenuItem = (id, data) => API.patch(`/admin/menu/${id}`, data);
export const deleteMenuItem = (id) => API.delete(`/admin/menu/${id}`);

export default API;
