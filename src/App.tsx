import * as React from 'react';
import './App.css';
import AvailableCash from './components/AvailableCash';
import GoalsTable from './components/GoalsTable';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <AvailableCash />
        <GoalsTable />
      </div>
    );
  }
}

export default App;
