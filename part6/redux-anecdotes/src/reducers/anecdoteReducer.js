import anecdoteService from '../services/anecdotes.service';

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'UPDATE_ANECDOTE':
      return state.map(anecdote => anecdote.id === action.data.id ?
        action.data :
        anecdote
      );
    case 'NEW_ANECDOTE':
      return state.concat(action.data);
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const makeAVote = (anecdote) => async dispatch => {
  const updatedAnecdote = await anecdoteService.updateAnecdote({ ...anecdote, votes: anecdote.votes + 1 });
  dispatch({
    type: 'UPDATE_ANECDOTE',
    data: updatedAnecdote
  });
};


export const createAnecdote = (content) => async dispatch => {
  const anecdote = await anecdoteService.addAnecdote(content);
  dispatch({
    type: 'NEW_ANECDOTE',
    data: anecdote
  });
};


export const initializeAnecdotes = () => async dispatch => {
  const anecdotes = await anecdoteService.getAll();
  dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes
  });
};

export default reducer;
