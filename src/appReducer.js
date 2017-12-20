import { mcasActionTypes } from 'mcasVisualization/mcasActions';
import { combineReducers } from 'redux';

const selectedSchoolIndexes = (state = [], action) => {
  console.log('Im in the reducer');
  console.log(action);
  switch (action.type) {
    case mcasActionTypes.ADD_SCHOOL:
      console.log('in add school');
      console.log([
        ...state,
        action.schoolIndex
      ])
      return [
        ...state,
        action.schoolIndex
      ]
    default:
      return state
  }
}

const dropdownSchoolIndex = (index = 0, action) => {
  switch(action.type) {
    case mcasActionTypes.SELECT_SCHOOL:
      return action.schoolIndex;
    default:
    return index;
  }
}

const mcasVisualizationData = combineReducers({
  selectedSchoolIndexes,
  dropdownSchoolIndex
})

export { mcasVisualizationData }
