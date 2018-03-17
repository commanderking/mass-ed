import { mcasActionTypes } from "./mcasActions";
import { createSelector } from "reselect";

const initialState = {
  allSchools: [],
  selectedSubject: null,
  selectedSchools: [],
  dropdownSchoolIndex: null
};

export const selectAllSchools = state => state.allSchools;
export const selectSelectedSubject = state => state.selectedSubject;
export const selectSelectedSchools = state => state.selectedSchools;
export const selectDropdownSchoolIndex = state => state.dropdownSchoolIndex;

const mcas = (state = initialState, action) => {
  switch (action.type) {
    case mcasActionTypes.LOAD_ALL_SCHOOLS_REQUESTED:
      return state;
    case mcasActionTypes.LOAD_ALL_SCHOOLS_SUCCEEDED:
      return {
        ...state,
        allSchools: action.payload.allSchoolData.data.schools
      };
    case mcasActionTypes.LOAD_ALL_SCHOOLS_FAILED:
      return state;

    case mcasActionTypes.SET_SUBJECT:
      return {
        ...state,
        selectedSubject: action.payload.subject
      };

    // Add School
    case mcasActionTypes.ADD_SCHOOL_REQUESTED:
      console.log("requested");
      return state;
    case mcasActionTypes.ADD_SCHOOL_SUCCEEDED:
      console.log("succeeded");
      console.log(action);
      console.log(state);
      return {
        ...state,
        selectedSchools: [...state.selectedSchools, action.payload.schoolData]
      };
    case mcasActionTypes.ADD_SCHOOL_FAILED:
      return state;

    // Delete School
    case mcasActionTypes.DELETE_SCHOOL:
      const newSelectedSchools = state.selectedSchools.filter(school => {
        return school.schoolCode !== action.payload.schoolCode;
      });
      console.log("newSelectedSchools", newSelectedSchools);
      console.log(action);
      return {
        ...state,
        selectedSchools: newSelectedSchools
      };
    case mcasActionTypes.SELECT_SCHOOL:
      return {
        ...state,
        dropdownSchoolIndex: action.schoolIndex
      };
    default:
      return state;
  }
};

export { mcas };
