import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import GoalsView from './components/GoalsView';
import Expenses from './components/Expenses';

const Incomes = () => {
  return (<div>Enter your income</div>);
};

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
                <NavLink to="/income/">Incomes</NavLink>
              </div>
            </li>
            <li>
              <div>
                <NavLink to="/summary/">Expenses</NavLink>
              </div>
            </li>
          </ul>
        </nav>
        <Route path="/income/" component={Incomes}/>
        <Route path="/goals/" component={GoalsView} />
        <Route path="/summary/" component={Expenses} />
        </div>
      </Router>
    );
  }
}

export default App;
