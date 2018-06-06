export const mcasActionTypes = {
  ADD_SCHOOL_REQUESTED: "ADD_SCHOOL_REQUESTED",
  ADD_SCHOOL_SUCCEEDED: "ADD_SCHOOL_SUCCEEDED",
  ADD_SCHOOL_FAILED: "ADD_SCHOOL_FAILED",

  LOAD_ALL_SCHOOLS_REQUESTED: "LOAD_ALL_SCHOOLS_REQUESTED",
  LOAD_ALL_SCHOOLS_SUCCEEDED: "LOAD_ALL_SCHOOLS_SUCCEEDED",
  LOAD_ALL_SCHOOLS_FAILED: "LOAD_ALL_SCHOOLS_FAILED",
  LOAD_ALL_DISTRICTS_REQUESTED: "LOAD_ALL_DISTRICTS_REQUESTED",
  LOAD_ALL_DISTRICTS_SUCCEEDED: "LOAD_ALL_DISTRICTS_SUCCEEDED",
  LOAD_ALL_DISTRICTS_FAILED: "LOAD_ALL_DISTRICTS_FAILED",

  LOAD_ALL_DISTRICT_MCAS_DATA_REQUESTED:
    "LOAD_ALL_DISTRICT_MCAS_DATA_REQUESTED",
  LOAD_ALL_DISTRICT_MCAS_DATA_SUCCEEDED:
    "LOAD_ALL_DISTRICT_MCAS_DATA_SUCCEEDED",
  LOAD_ALL_DISTRICTS_MCAS_DATA_FAILED: "LOAD_ALL_DISTRICT_MCAS_DATA_FAILED",

  SET_SUBJECT: "SET_SUBJECT",
  SET_SUBJECT_SUCCEEDED: "SET_SUBJECT_SUCCEEDED",
  SET_SUBJECT_FAILED: "SET_SUBJECT_FAILED",
  SELECT_SCHOOL: "SELECT_SCHOOL",
  DELETE_SCHOOL: "DELETE_SCHOOL",
  SET_SCHOOL_GROUP: "SET_SCHOOL_GROUP",
  SELECT_DISTRICT: "SELECT_DISTRICT",
  DELETE_DISTRICT_MCAS: "DELETE_DISTRICT_MCAS"
};

export const setSchoolGroupAction = schoolGroup => {
  return {
    type: mcasActionTypes.SET_SCHOOL_GROUP,
    payload: schoolGroup
  };
};

export const addAllSchoolsAction = allSchools => {
  return {
    type: mcasActionTypes.LOAD_ALL_SCHOOLS_REQUESTED,
    payload: allSchools
  };
};

export const loadAllDistrictsAction = allDistricts => {
  return {
    type: mcasActionTypes.LOAD_ALL_DISTRICTS_REQUESTED,
    payload: allDistricts
  };
};

export const selectDistrictAction = index => {
  return {
    type: mcasActionTypes.SELECT_DISTRICT,
    index
  };
};

export const loadDistrictMcas = code => {
  return {
    type: mcasActionTypes.LOAD_ALL_DISTRICT_MCAS_DATA_REQUESTED,
    payload: { code }
  };
};

export const addSchoolAction = code => {
  return {
    type: mcasActionTypes.ADD_SCHOOL_REQUESTED,
    payload: { code }
  };
};

export const setSubjectAction = subject => {
  return {
    type: mcasActionTypes.SET_SUBJECT,
    payload: { subject }
  };
};

export const selectSchoolAction = schoolIndex => {
  return {
    type: mcasActionTypes.SELECT_SCHOOL,
    schoolIndex
  };
};

export const deleteSchoolAction = code => ({
  type: mcasActionTypes.DELETE_SCHOOL,
  payload: { code }
});

export const deleteDistrictAction = code => ({
  type: mcasActionTypes.DELETE_DISTRICT_MCAS,
  payload: { code }
});
