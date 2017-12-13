import { mcasActionTypes } from 'mcasVisualization/mcasActions';
import { combineReducers } from 'redux'

const firstSchool = {
  "School Name": "Abby Kelley Foster Charter Public (District) - Abby Kelley Foster Charter Public School",
  "School Code": 4450105,
  "Subject": "ELA",
  "M+E #": 307,
  "M+E %": 42,
  "E #": 23,
  "E %": 3,
  "M #": 284,
  "M %": 39,
  "PM #": 362,
  "PM %": 50,
  "NM #": 55,
  "NM %": 8,
  "Student Included": 724,
  "Avg. Scaled Score": 496.2,
  "SGP": 55,
  "Included In SGP": 587,
  "Ach. PCTL": 36
}

const selectedSchoolIndexes = (state = [0], action) => {
  console.log('Im in the reducer');
  console.log(action);
  switch (action.type) {
    case mcasActionTypes.ADD_SCHOOL:
      console.log('in add school');
      console.log([
        ...state,
        action.schoolIndex
      ])
      return [
        ...state,
        action.schoolIndex
      ]
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
