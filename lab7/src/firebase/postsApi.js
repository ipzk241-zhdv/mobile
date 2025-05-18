import api from "./api"; 

export const fetchPosts = async (userId) => {
  const res = await api.get(`/users/${userId}/posts.json`);
  const data = res.data || {};
  return Object.entries(data).map(([id, post]) => ({ id, ...post }));
};

export const createPost = async (userId, post) => {
  const res = await api.post(`/users/${userId}/posts.json`, post);
  return res.data.name; // Firebase returns { name: generatedId }
};

export const updatePost = async (userId, postId, updates) => {
  await api.patch(`/users/${userId}/posts/${postId}.json`, updates);
};

export const deletePost = async (userId, postId) => {
  await api.delete(`/users/${userId}/posts/${postId}.json`);
};