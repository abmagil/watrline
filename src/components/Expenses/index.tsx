import React from 'react';
import { connect } from 'react-redux';
import { StoreShape } from '../../store';
import ExpensesDriver from './ExpensesDriver';
import ExpensesGraph from './ExpensesGraph';
import { calculateData } from './ExpensesDriver/calculateData';
import { flatToNested } from '../../utils/categoryMapper';
import throttle from 'lodash/throttle';
import ExpensesForm from "./ExpensesForm";

const mapStateToProps = (state: StoreShape) => ({
  expenseData: calculateData(flatToNested(state.expenses)),
});

interface ExpensesProps {
  expenseData: ReturnType<typeof calculateData>
}

interface ExpensesState {
  width: number;
  height: number;
}

class Expenses extends React.Component<ExpensesProps, ExpensesState> {
  constructor(props: ExpensesProps){
    super(props);

    this.state = {
      height: Math.min(window.innerHeight, 400),
      width: Math.min(window.innerWidth, 600),
    }

    this.updateDimensions = throttle(this.updateDimensions.bind(this), 500);
  }
  
  updateDimensions() {
    this.setState({
      height: Math.min(window.innerHeight, 400),
      width: Math.min(window.innerWidth, 600),
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  render() {
    const { nodes, links } = this.props.expenseData;
    const { width, height } = this.state;
    return (
      <>
        <ExpensesForm />
        <ExpensesDriver width={width} height={height} nodes={nodes} links={links} >
          {({ nodes, links, width, height }) => <ExpensesGraph nodes={nodes} links={links} width={width} height={height} />}
        </ExpensesDriver>
      </>
    )
  }
}

export default connect(mapStateToProps, {})(Expenses);
