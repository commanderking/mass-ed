import { mcasActionTypes } from "./mcasActions";

const initialState = {
  allSchools: [],
  selectedSubject: null,
  selectedSchools: [],
  dropdownSchoolIndex: null
};

export const mcasReducerPath = "mcas";

export const selectAllSchools = state => state.mcas.allSchools;
export const selectSelectedSubject = state =>
  state.mcas.selectedSubject || "ela";
export const selectSelectedSchools = state => state.mcas.selectedSchools;
export const selectDropdownSchoolIndex = state =>
  state.mcas.dropdownSchoolIndex;

const mcas = (state = initialState, action) => {
  switch (action.type) {
    case mcasActionTypes.LOAD_ALL_SCHOOLS_REQUESTED:
      return state;
    case mcasActionTypes.LOAD_ALL_SCHOOLS_SUCCEEDED:
      return {
        ...state,
        allSchools: action.payload.allSchoolData
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
      return state;
    case mcasActionTypes.ADD_SCHOOL_SUCCEEDED:
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
