import React from 'react';
import { IncomeData, IncomeCadenceOptions, IncomeCadence } from '../../models/Income';
import { addIncome } from './reducer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import includes from 'lodash/fp/includes';

interface IncomeAdderProps {
  addIncome: (data: IncomeData) => void;
}
type IncomeAdderState = Stringified<IncomeData>
class IncomeAdder extends React.Component<IncomeAdderProps, IncomeAdderState> {
  static blankIncome: Stringified<IncomeData> = {
    name: '',
    amount: '',
    cadence: IncomeCadenceOptions[3],
  }
  maybeAddIncome: () => void;

  constructor(props: IncomeAdderProps) {
    super(props);
    this.maybeAddIncome = () => {
      if (this.incomeIsValid()) {
        this.props.addIncome({
          name: this.state.name,
          amount: parseInt(this.state.amount, 10),
          cadence: this.state.cadence as IncomeCadence
        })
      }
    }
    
    this.state = {
      ...IncomeAdder.blankIncome
    }
  }

  incomeIsValid() {
    const state = this.state;
    
    return (
      state.name !== "" &&
      state.amount !== "" &&
      Number(state.amount) > 0 &&
      state.cadence !== "" &&
      includes(state.cadence, IncomeCadenceOptions)
    )
  }
  
  render() {
    const {name, amount, cadence} = this.state;
    
    return (
      <div className="IncomeAdder">
        <label>
          Name: <input value={name} onChange={(e) => this.setState({name: e.target.value})}/>
        </label>
        <label>
          Amount: <input value={amount} onChange={(e) => this.setState({amount: e.target.value})}/>
        </label>
        <label>
          Cadence: <select value={cadence} onChange={(e) => this.setState({cadence: e.target.value})}>
            {IncomeCadenceOptions.map(option => (<option key={option}>{option}</option>))}
          </select>
        </label>
        <button onClick={this.maybeAddIncome}>Add</button>
      </div>
    )
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addIncome: (data: IncomeData) => {
    dispatch(
      addIncome(data)
    )
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(IncomeAdder);
