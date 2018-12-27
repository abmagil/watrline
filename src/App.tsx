import * as React from 'react';
import './App.css';
import AvailableCash from './components/AvailableCash';
import GoalsTable from './components/GoalsTable';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

const Summary = () => (
  <div>Hello World</div>
);
{/* <AvailableCash />
<GoalsTable /> */}

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
        <nav>
          <ul>
            <li>
              <div>
                <NavLink to="/goals/">Goals</NavLink>
              </div>
            </li>
            <li>
              <div>
                <NavLink to="/summary/">Summary</NavLink>
              </div>
            </li>
          </ul>
        </nav>
          <Route path="/goals/" component={GoalsTable} />
          <Route path="/summary/" component={Summary} />
        </div>
      </Router>
    );
  }
}

export default App;
