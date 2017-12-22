export const mcasActionTypes = {
  ADD_SCHOOL: 'ADD_SCHOOL',
  SELECT_SCHOOL: 'SELECT_SCHOOL',
  DELETE_SCHOOL: 'DELETE_SCHOOL'
};

export const addSchoolAction = schoolIndex => {
  return {
    type: mcasActionTypes.ADD_SCHOOL,
    schoolIndex
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
