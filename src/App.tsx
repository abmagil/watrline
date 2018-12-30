import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import GoalsView from './components/GoalsView';
import Expenses from './components/Expenses';
import Header from './components/Header';

const Incomes = () => {
  return (<div>Enter your income</div>);
};

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
        <Header />
        <Route path="/income/" component={Incomes}/>
        <Route path="/goals/" component={GoalsView} />
        <Route path="/summary/" component={Expenses} />
        </div>
      </Router>
    );
  }
}

export default App;
