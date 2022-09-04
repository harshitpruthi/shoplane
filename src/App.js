import './App.css';

import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import CartPage from './views/CartPage';
import HomePage from './views/HomePage';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route path="/cart" exact>
                <CartPage />
              </Route>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
