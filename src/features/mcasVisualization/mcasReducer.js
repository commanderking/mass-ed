import { mcasActionTypes } from "./mcasActions";
import { subjectsConstants, schoolGroupConstants } from "./mcasConstants";

const initialState = {
  schoolGroup: null,
  allSchools: [],
  allDistricts: [],
  selectedSubject: null,
  dropdownDistrictIndex: null,
  selectedSchools: [],
  selectedDistricts: [],
  dropdownCode: null
};

export const mcasReducerPath = "mcas";

export const selectAllSchools = state => state.mcas.allSchools;
export const selectAllDistricts = state => state[mcasReducerPath].allDistricts;
export const selectSelectedSubject = state =>
  state.mcas.selectedSubject || subjectsConstants.ELA;
export const selectSelectedSchools = state => state.mcas.selectedSchools;
export const selectSelectedDistricts = state =>
  state[mcasReducerPath].selectedDistricts;
export const selectDropdownCode = state => state.mcas.dropdownCode;
export const selectDropdownDistrictIndex = state =>
  state[mcasReducerPath].dropdownDistrictIndex;
export const selectSchoolGroup = state =>
  state.mcas.schoolGroup || schoolGroupConstants.DISTRICT;

const mcas = (state = initialState, action) => {
  switch (action.type) {
    case mcasActionTypes.SET_SCHOOL_GROUP:
      return {
        ...state,
        schoolGroup: action.payload
      };
    case mcasActionTypes.LOAD_ALL_SCHOOLS_REQUESTED:
      return state;
    case mcasActionTypes.LOAD_ALL_SCHOOLS_SUCCEEDED:
      return {
        ...state,
        allSchools: action.payload.allSchoolData
      };
    case mcasActionTypes.LOAD_ALL_DISTRICTS_SUCCEEDED:
      console.log("action", action);
      return {
        ...state,
        allDistricts: action.payload.data
      };
    case mcasActionTypes.LOAD_ALL_SCHOOLS_FAILED:
      return state;

    case mcasActionTypes.SET_SUBJECT:
      return {
        ...state,
        selectedSubject: action.payload.subject
      };

    case mcasActionTypes.SET_SUBJECT_SUCCEEDED:
      return {
        ...state,
        selectedSchools: action.payload.selectedSchoolsData.data.schools
      };
    case mcasActionTypes.SET_SUBJECT_FAILED:
      return state;
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
        return school.code !== action.payload.code;
      });
      return {
        ...state,
        selectedSchools: newSelectedSchools
      };
    case mcasActionTypes.DELETE_DISTRICT_MCAS:
      const newDistrictMcas = state.selectedDistricts.filter(
        district => district.code !== action.payload.code
      );
      return {
        ...state,
        selectedDistricts: newDistrictMcas
      };
    case mcasActionTypes.SELECT_SCHOOL:
      return {
        ...state,
        dropdownCode: action.schoolIndex
      };
    case mcasActionTypes.SELECT_DISTRICT:
      return {
        ...state,
        dropdownDistrictIndex: action.index
      };
    case mcasActionTypes.LOAD_ALL_DISTRICT_MCAS_DATA_REQUESTED:
      return state;
    case mcasActionTypes.LOAD_ALL_DISTRICT_MCAS_DATA_SUCCEEDED:
      return {
        ...state,
        selectedDistricts: [
          ...state.selectedDistricts,
          action.payload.districtMcas[0]
        ]
      };
    case mcasActionTypes.SET_DISTRICT_SUBJECT:
      return {
        ...state,
        selectedSubject: action.payload.subject
      };
    case mcasActionTypes.SET_DISTRICT_SUBJECT_SUCCEEDED:
      return {
        ...state,
        selectedDistricts: action.payload.districtMcas
      };
    default:
      return state;
  }
};

export { mcas };
