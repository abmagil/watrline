import * as React from 'react';
import './App.css';
import AvailableCash from './components/AvailableCash';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <AvailableCash />
      </div>
    );
  }
}

export default App;
