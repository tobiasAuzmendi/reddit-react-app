import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostCreationInformation from './PostCreationInformation';


describe('PostCreationInformation', () => {
  let mockPost;

  beforeEach(() => {
    mockPost = {
      author: 'Jhon Doe',
      passedTime: 'a fer minutes ago'
    };
  });

  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(<PostCreationInformation post={mockPost}/>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders expected text', ()=> {
    const { container } = render(<PostCreationInformation post={mockPost}/>);
    const postInfo = container.querySelector('.post-creation-information');
    const authorName = container.querySelector('.author-name');

    expect(postInfo.textContent).toBe(`Posted by ${mockPost.author} ${mockPost.passedTime}`);
    expect(authorName.textContent).toBe(mockPost.author);
  });
});
