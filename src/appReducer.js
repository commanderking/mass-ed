import { mcasActionTypes } from 'mcasVisualization/mcasActions';
import { combineReducers } from 'redux';

const selectedSchools = (state = [], action) => {
  switch (action.type) {
    case mcasActionTypes.ADD_SCHOOL_REQUESTED:
      return [
        ...state
      ];
    case mcasActionTypes.ADD_SCHOOL_SUCCEEDED:
      return [
        ...state,
        action.payload.schoolData
      ];
    case mcasActionTypes.ADD_SCHOOL_FAILED:
      return [
        ...state
      ];
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
  selectedSchools,
  dropdownSchoolIndex
})

export { mcasVisualizationData }
