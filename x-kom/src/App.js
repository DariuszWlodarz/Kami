import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import {store} from './app/store'
import Confirmation from './features/Confirmation/Confirmation'
import Home from './features/Home/Home'
import Reservation from './features/Reservation/Reservation'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/reservation">reservation</Link>
              </li>
              <li>
                <Link to="/confirmation">confirmation</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/reservation">
              <Reservation/>
            </Route>
            <Route path="/confirmation">
              <Confirmation/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
      </Router>
      </Provider>
    )
  }
}

export default App;
