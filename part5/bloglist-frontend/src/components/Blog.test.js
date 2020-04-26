import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
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

    const details = component.container.querySelector('p');
    expect(details).toHaveStyle('display: none');

    const likes = component.getByText(/likes 1/);
    expect(likes).not.toBeVisible();
    const url = component.getByText(/http:\/\/test/);
    expect(url).not.toBeVisible();
  });

  test('shows details when view clicked', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    const details = component.container.querySelector('p');
    expect(details).not.toHaveStyle('display: none');


    const likes = component.getByText(/likes 1/);
    expect(likes).toBeVisible();
    const url = component.getByText(/http:\/\/test/);
    expect(url).toBeVisible();
  });


});
