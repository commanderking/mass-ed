export const mcasActionTypes = {
  ADD_SCHOOL_REQUESTED: 'ADD_SCHOOL_REQUESTED',
  ADD_SCHOOL_SUCCEEDED: 'ADD_SCHOOL_SUCCEEDED',
  ADD_SCHOOL_FAILED: 'ADD_SCHOOL_FAILED',
  ADD_SCHOOL: 'ADD_SCHOOL',
  SELECT_SCHOOL: 'SELECT_SCHOOL',
  DELETE_SCHOOL: 'DELETE_SCHOOL'
};

export const addSchoolAction = schoolCode => {
  return {
    type: mcasActionTypes.ADD_SCHOOL_REQUESTED,
    payload: { schoolCode }
  }
}

export const selectSchoolAction = schoolIndex => {
  return {
    type: mcasActionTypes.SELECT_SCHOOL,
    schoolIndex
  }
}

export const deleteSchoolAction = schoolIndex => ({
    type: mcasActionTypes.DELETE_SCHOOL,
    schoolIndex
})
