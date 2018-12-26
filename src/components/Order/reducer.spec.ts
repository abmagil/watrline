import reducer, { SetIndexAction } from './reducer';
import { GoalRecord } from '../../models/Goal';
import v4 from 'uuid';
import { DropResult, DraggableLocation } from 'react-beautiful-dnd';

const makePayload = (draggableId: string, sourceIndex: number, destinationIndex: number): DropResult => ({
  reason: "DROP",
  type: "MyType",
  mode: "SNAP",
  draggableId,
  source: {
    droppableId: "droppable",
    index: sourceIndex
  },
  destination: {
    droppableId: "droppable",
    index: destinationIndex
  },
})

describe('Order Reducer', () => {
  describe('SET_INDEX', () => {
    it('moves the given item from its original index to one passed', () => {
      const initState = [
        v4(),
        v4(),
        'myGoal'
      ];

      const setIndexAction = {
        type: 'GOAL:SET_INDEX' as 'GOAL:SET_INDEX', // damn you typescript
        payload: makePayload('myGoal', 2, 0),
      };

      const newState = reducer(initState, setIndexAction);

      expect(newState.indexOf('myGoal')).toBe(0);
    });
    it('ignores actions where destination is null', () => {
      const initState = [
        v4(),
        v4(),
        'myGoal'
      ];

      const setIndexAction = {
        type: 'GOAL:SET_INDEX' as 'GOAL:SET_INDEX', // damn you typescript
        payload: makePayload('myGoal', 2, 0),
      };
      setIndexAction.payload.destination = null;

      const newState = reducer(initState, setIndexAction);

      expect(newState.indexOf('myGoal')).toBe(2);
    });
  })
});
