import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'})

export const fetchKid = () => axios.get('/kids');
export const createKid = (newKid) => axios.post(`/kids`, newKid);
export const updateKid = (id, updatedKid) => axios.patch(`/kids/${id}`, updatedKid);
export const deleteKid = (id) => axios.delete(`/kids/${id}`);

export const fetchRdv = () => axios.get('/rdv');
export const createRdv = (newRdv) => axios.post('/rdv', newRdv);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

