import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  const dummyFunc = () => true;
  let component;

  beforeEach(() => {
    const blog = {
      id: 'blog123',
      likes: 1,
      author: 'testy tester',
      url: 'http://test',
      title: 'A test blog title',
      user: {
        id: 'user321'
      }
    };

    component = render(
      <Blog blog={blog} updateBlog={dummyFunc} deleteBlog={dummyFunc} />
    );
  });

  test('renders content', () => {
    const element = component.getByText(
      'A test blog title testy tester'
    );
    expect(element).toBeDefined();
  });


});
