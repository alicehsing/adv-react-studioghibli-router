import { Route, Switch } from 'react-router-dom';
import Header from './components/header';
import FilmList from './views/FilmList';

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/">
          <Header />
          <FilmList />
        </Route>
      </Switch>
    </>
  );
}
