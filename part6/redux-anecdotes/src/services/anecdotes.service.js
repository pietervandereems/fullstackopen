import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addAnecdote = async (content) => {
  const savedAnecdote = await axios.post(baseUrl, { content, votes: 0 });
  return savedAnecdote.data;
};

const updateAnecdote = async (anecdote) => {
  const updatedAnecdote = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  return updatedAnecdote.data;
};

export default { getAll, addAnecdote, updateAnecdote };
