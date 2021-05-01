import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'})


export const fetchPosts = () => axios.get('/posts');
export const createPost = (newPost) => axios.post('/posts', newPost);
export const likePost = (id) => axios.patch(`'/posts'/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`'/posts'/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`'/posts/${id}`);


export const fetchKid = () => axios.get('/kids');
export const createKid = (newKid) => axios.post('/kids', newKid);
export const updateKid = (id, updatedKid) => axios.patch(`/kids/${id}`, updatedKid);
export const deleteKid = (id) => axios.delete(`/kids/${id}`);


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

