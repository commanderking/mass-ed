export const mcasActionTypes = {
  ADD_SCHOOL_REQUESTED: "ADD_SCHOOL_REQUESTED",
  ADD_SCHOOL_SUCCEEDED: "ADD_SCHOOL_SUCCEEDED",
  ADD_SCHOOL_FAILED: "ADD_SCHOOL_FAILED",
  ADD_SCHOOL: "ADD_SCHOOL",
  LOAD_ALL_SCHOOLS_REQUESTED: "LOAD_ALL_SCHOOLS_REQUESTED",
  LOAD_ALL_SCHOOLS_SUCCEEDED: "LOAD_ALL_SCHOOLS_SUCCEEDED",
  LOAD_ALL_SCHOOLS_FAILED: "LOAD_ALL_SCHOOLS_FAILED",
  SET_SUBJECT: "SET_SUBJECT",
  SET_SUBJECT_SUCCEEDED: "SET_SUBJECT_SUCCEEDED",
  SET_SUBJECT_FAILED: "SET_SUBJECT_FAILED",
  SELECT_SCHOOL: "SELECT_SCHOOL",
  DELETE_SCHOOL: "DELETE_SCHOOL"
};

export const addAllSchoolsAction = allSchools => {
  return {
    type: mcasActionTypes.LOAD_ALL_SCHOOLS_REQUESTED,
    payload: allSchools
  };
};

export const addSchoolAction = schoolCode => {
  return {
    type: mcasActionTypes.ADD_SCHOOL_REQUESTED,
    payload: { schoolCode }
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

export const deleteSchoolAction = schoolCode => ({
  type: mcasActionTypes.DELETE_SCHOOL,
  payload: { schoolCode }
});
