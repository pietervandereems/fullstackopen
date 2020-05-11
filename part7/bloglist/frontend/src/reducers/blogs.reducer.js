import blogService from '../services/blogs.service';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'NEW_BLOG':
      return state.concat(action.data);
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data.id);
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id === action.data.id ? action.data : blog);
    default:
      return state;
  }
};

export const addBlog = (blog) => async (dispatch, getState) => {
  const { user } = getState();
  const savedBlog = await blogService.addBlog(blog, user);
  dispatch({
    type: 'NEW_BLOG',
    data: {
      ...savedBlog,
      user
    }
  });
  return {
    ...savedBlog,
    user
  };
};

export const deleteBlog = (blog) => async (dispatch, getState) => {
  const { user } = getState();
  await blogService.deleteBlog(blog, user);
  dispatch({
    type: 'REMOVE_BLOG',
    data: blog
  });
  return blog;
};

export const updateBlog = (blog) => async (dispatch, getState) => {
  const { user } = getState();
  const updatedBlog = await blogService.updateBlog(blog, user);
  dispatch({
    type: 'UPDATE_BLOG',
    data: {
      ...updatedBlog,
      user: blog.user
    }
  });
  return {
    ...updatedBlog,
    user: blog.user
  };
};

export const likeBlog = (blog) => async (dispatch) => {
  const updatedBlog = await blogService.likeBlog(blog.id);
  dispatch({
    type: 'UPDATE_BLOG',
    data: {
      ...updatedBlog,
      user: blog.user
    }
  });
  return {
    ...updatedBlog,
    user: blog.user
  };
};

export const addComment = (blog, comment) => async (dispatch) => {
  const updatedBlog = await blogService.addComment(blog.id, comment);
  dispatch({
    type: 'UPDATE_BLOG',
    data: {
      ...updatedBlog,
      user: blog.user
    }
  });
  return {
    ...updatedBlog,
    user: blog.user
  };
};

export const initializeBlogs = () => async dispatch => {
  const blogs = await blogService.getAll();
  dispatch({
    type: 'INIT_BLOGS',
    data: blogs
  });
};

export default reducer;
