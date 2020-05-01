const reducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote => anecdote.id === action.data.id ?
        { ...anecdote, votes: anecdote.votes + 1 } :
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

export const makeAVote = (id) => ({
  type: 'VOTE',
  data: { id }
});

export const createAnecdote = (anecdote) => ({
  type: 'NEW_ANECDOTE',
  data: anecdote
});

export const initializeAnecdotes = (anecdotes = []) => ({
  type: 'INIT_ANECDOTES',
  data: anecdotes
});

export default reducer;
