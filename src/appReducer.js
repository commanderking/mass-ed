import { mcasActionTypes } from "mcasVisualization/mcasActions";
import { combineReducers } from "redux";

const allSchools = (state = [], action) => {
  switch (action.type) {
    case mcasActionTypes.LOAD_ALL_SCHOOLS_REQUESTED:
      return [...state];
    case mcasActionTypes.LOAD_ALL_SCHOOLS_SUCCEEDED:
      return [...state, ...action.payload.allSchoolData.data.schools];
    case mcasActionTypes.LOAD_ALL_SCHOOLS_FAILED:
      return [...state];
    default:
      return state;
  }
};

const selectedSchools = (state = [], action) => {
  switch (action.type) {
    case mcasActionTypes.ADD_SCHOOL_REQUESTED:
      return [...state];
    case mcasActionTypes.ADD_SCHOOL_SUCCEEDED:
      return [...state, action.payload.schoolData];
    case mcasActionTypes.ADD_SCHOOL_FAILED:
      return [...state];
    case mcasActionTypes.ADD_SCHOOL:
      return [...state, action.schoolIndex];
    case mcasActionTypes.DELETE_SCHOOL:
      const newState = state.filter(school => {
        return school.schoolCode !== action.payload.schoolCode;
      });
      return newState;
    default:
      return state;
  }
};

const dropdownSchoolIndex = (index = null, action) => {
  switch (action.type) {
    case mcasActionTypes.SELECT_SCHOOL:
      return action.schoolIndex;
    default:
      return index;
  }
};

const mcasVisualizationData = combineReducers({
  allSchools,
  selectedSchools,
  dropdownSchoolIndex
});

export { mcasVisualizationData };
