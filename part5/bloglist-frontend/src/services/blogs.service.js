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

export default { getAll, addBlog, updateBlog };
