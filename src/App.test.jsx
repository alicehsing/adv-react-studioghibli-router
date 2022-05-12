import {
  render,
  screen,
  waitFor,
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
      <MemoryRouter initialEntries={['/', '/films/:id']} initialIndex={0}>
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

    screen.getByRole('textbox');

    const onLoadImage = await screen.findAllByAltText('film-image');
    expect(onLoadImage).toHaveLength(22);

    const searchBar = screen.getByRole('textbox');
    userEvent.type(searchBar, 'My Neighbor Totoro');

    // waitFor(() => {
    //   userEvent.type(searchBar, 't');
    //   userEvent.type(searchBar, 'o');
    //   userEvent.type(searchBar, 't');
    // });

    // await waitFor(() => {
    //   const result = screen.getAllByAltText('film-image');
    //   expect(result).toHaveLength(1);
    // });

    await screen.findByRole('heading', { name: /my neighbor totoro/i });
  });

  it('behavioral test - renders detail view', async () => {
    render(
      <MemoryRouter
        initialEntries={['/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49']}
      >
        <App />
      </MemoryRouter>
    );

    screen.getByText(/loading film/i);
    await waitForElementToBeRemoved(await screen.findByText(/loading film/i));

    const onLoadImage = await screen.findAllByAltText('My Neighbor Totoro');
    expect(onLoadImage).toHaveLength(1);

    const backButton = screen.getByRole('button', {
      name: /Back to All Films/i,
    });
    expect(backButton).toHaveClass('back');
    userEvent.click(backButton);

    const onLoadImages = await screen.findAllByAltText('film-image');
    expect(onLoadImages).toHaveLength(22);
  });
});
