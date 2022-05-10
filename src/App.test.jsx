import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('<App />', () => {
  it('component test - renders a header consisted of a heading element and an image', async () => {
    render(
      <MemoryRouter>
        <App initialEntries={['/']} />
      </MemoryRouter>
    );

    screen.getByRole('heading', {
      name: 'Welcome to The Studio Ghibli Collection!',
    });
    await screen.findByAltText('header-image');
  });

  it('behavioral test - renders a list of clickable films by Studio Ghibli, on click, navigates to the film detail page', async () => {
    render(
      <MemoryRouter initialEntries={['/']} initialIndex={1}>
        <App />
      </MemoryRouter>
    );

    screen.getByText(/loading films/i);
    await waitForElementToBeRemoved(await screen.findByText(/loading films/i));

    const filmLink = await screen.findByRole('heading', {
      name: 'My Neighbor Totoro',
    });

    userEvent.click(filmLink);

    await screen.findByAltText('My Neighbor Totoro');

    await screen.findByRole('heading', { name: /my neighbor totoro/i });

    const backButton = screen.getByRole('button', {
      name: 'Back to All Films',
    });
    userEvent.click(backButton);

    screen.getByText(/welcome to the studio ghibli collection/i);
  });

  it('behavioral test - type in search bar and renders the searched film', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    screen.getByText(/loading films/i);
    await waitForElementToBeRemoved(await screen.findByText(/loading films/i));

    const searchBar = await screen.findByRole('textbox', 'My Neighbor Totoro');
    userEvent.type(searchBar);
    // expect(await screen.findByRole('textbox')).toHaveValue(
    //   'My Neighbor Totoro'
    // );

    await screen.findByRole('heading', { name: /my neighbor totoro/i });
  });
});
