import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://127.0.0.1:5000/api/recipes';

export const fetchRecipes = (params) => axios.get(API_BASE, { params });

export const searchRecipes = (params) => axios.get(`${API_BASE}/search`, { params });
