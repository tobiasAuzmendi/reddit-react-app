import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spinner from './Spinner';

afterEach(cleanup);

it('renders', () => {
  const { asFragment } = render(<Spinner />);
  expect(asFragment()).toMatchSnapshot();
});

it('renders a font awesome icon', ()=> {
  const { container } = render(<Spinner />);
  const iconItem = container.querySelector('i');

  expect(iconItem).toBeTruthy();
  expect(iconItem.classList.contains('fa-spinner')).toBe(true);
});