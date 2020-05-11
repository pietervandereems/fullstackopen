import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addBlog = async (blog = {}, { token }) => {
  const request = await axios
    .post(baseUrl, blog, { headers: { Authorization: `Bearer ${token}` } });
  return request.data;
};

const updateBlog = async (blog = {}, { token }) => {
  const mongoBlog = {
    ...blog,
    user: blog.user.id
  };
  const response = await axios
    .put(`${baseUrl}/${blog.id}`, mongoBlog, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

const likeBlog = async (id, { token }) => {
  const response = await axios
    .put(`${baseUrl}/${id}/like`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

const deleteBlog = async (blog = {}, { token }) => {
  const response = await axios
    .delete(`${baseUrl}/${blog.id}`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export default { getAll, addBlog, updateBlog, deleteBlog, likeBlog };
