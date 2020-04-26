import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import CreateBlogs from './CreateBlog';

describe('<CreateBlog />', () => {

  const mockSave = jest.fn();
  let component;

  beforeEach(() => {
    component = render(
      <CreateBlogs saveBlog={mockSave} />
    );
  });

  test('should render', () => {
    expect(component.getByLabelText('title')).toBeDefined();
    expect(component.getByLabelText('author')).toBeDefined();
    expect(component.getByLabelText('url')).toBeDefined();
    expect(component.getByLabelText('submit')).toBeDefined();
  });

  test('save the inputed correct blog', () => {
    fireEvent.change(component.getByLabelText('title'), { target: { value: 'test-title' } });
    fireEvent.change(component.getByLabelText('author'), { target: { value: 'test-author' } });
    fireEvent.change(component.getByLabelText('url'), { target: { value: 'test-url' } });
    fireEvent.click(component.getByLabelText('submit'));

    expect(mockSave.mock.calls[0][0]).toEqual({ title: 'test-title', author: 'test-author', url: 'test-url' });
  });


});
