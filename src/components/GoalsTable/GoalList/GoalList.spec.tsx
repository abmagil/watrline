import * as React from 'react';
import { shallow } from 'enzyme';
import GoalList from './index';

function setup() {
  const props = {
    orderedGoals: [],
    cumulativeGoalSpending: [],
    children: [],
  };
  return {
    wrapper: shallow(<GoalList {...props} />),
  };
}

describe('GoalList', () => {
  it('should render one GoalRow into the tbody for each element in orderedGoals prop', () => {
    const { wrapper } = setup();
    expect(wrapper.find('tbody tr').length).toBe(0);

    wrapper.setProps({
      orderedGoals: [
        {id: '1', goalTotal: 12, deadlineYear: new Date().getFullYear(), spendingPerMonth: 1},
        {id: '2', goalTotal: 12, deadlineYear: new Date().getFullYear(), spendingPerMonth: 1},
        {id: '3', goalTotal: 12, deadlineYear: new Date().getFullYear(), spendingPerMonth: 1},
        {id: '4', goalTotal: 12, deadlineYear: new Date().getFullYear(), spendingPerMonth: 1},
      ],
    });
    expect(wrapper.find('tbody').children().length).toBe(4);
  });
});

