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

export default { getAll, addBlog };
