import { mcasActionTypes } from 'mcasVisualization/mcasActions';
import { combineReducers } from 'redux';

const selectedSchoolIndexes = (state = [], action) => {
  switch (action.type) {
    case mcasActionTypes.ADD_SCHOOL:
      return [
        ...state,
        action.schoolIndex
      ]
    case mcasActionTypes.DELETE_SCHOOL:
      const newState = state.filter(schoolIndex => {
        return schoolIndex !== action.schoolIndex
      })
      return newState;
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
