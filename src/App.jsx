import { Route, Switch } from 'react-router-dom';
import Header from './components/header';
import FilmDetail from './views/FilmDetail';
import FilmList from './views/FilmList';

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/films/:id">
          <FilmDetail />
        </Route>
        <Route exact path="/">
          <Header />
          <FilmList />
        </Route>
      </Switch>
    </>
  );
}
