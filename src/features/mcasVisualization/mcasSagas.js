import { call, put, select, takeEvery } from "redux-saga/effects";
import { mcasActionTypes } from "./mcasActions";
import {
  selectSelectedSchools,
  selectSelectedSubject,
  selectSelectedDistricts
} from "./mcasReducer";
import { subjectsConstants } from "./mcasConstants";
import {
  fetchSchoolArray,
  fetchAllSchools,
  fetchAllSelectedSchools,
  fetchAllDistricts,
  fetchDistrictsMcas
} from "./mcasDataRequests";
const {
  ADD_SCHOOL_SUCCEEDED,
  ADD_SCHOOL_FAILED,
  LOAD_ALL_SCHOOLS_SUCCEEDED,
  LOAD_ALL_SCHOOLS_FAILED,
  LOAD_ALL_DISTRICTS_SUCCEEDED,
  LOAD_ALL_DISTRICTS_FAILED,
  LOAD_ALL_DISTRICT_MCAS_DATA_SUCCEEDED,
  LOAD_ALL_DISTRICT_MCAS_DATA_FAILED
} = mcasActionTypes;

// TODO: Should be able to refactors this with fetchSelectedSchoolsForSubjectSwitch
function* fetchSchoolMcasData(action) {
  try {
    const schoolData = yield call(fetchSchoolArray, action.payload.code);
    yield put({
      type: ADD_SCHOOL_SUCCEEDED,
      payload: { schoolData: schoolData.data.school }
    });
  } catch (e) {
    yield put({ type: ADD_SCHOOL_FAILED, message: e.message });
  }
}

function* fetchSelectedSchoolsForSubjectSwitch(action) {
  try {
    const selectedSchools = yield select(selectSelectedSchools);
    // TODO: SetSubject should not fire graphql request if subject is the same
    // const selectedSubject = yield select(selectSelectedSubject);
    const schoolCodes = selectedSchools.map(school => school.code);
    const subject = subjectsConstants[action.payload.subject];
    // TODO: This toUpperCase is needed for graphQL call - should make ENUM to make graphql and this consistent
    const selectedSchoolsData = yield call(fetchAllSelectedSchools, {
      subject,
      schoolCodes
    });
    yield put({
      type: mcasActionTypes.SET_SUBJECT_SUCCEEDED,
      payload: { selectedSchoolsData }
    });
  } catch (e) {
    yield put({
      type: mcasActionTypes.SET_SUBJECT_FAILED,
      message: e.message
    });
  }
}

function* fetchAllSchoolData(action) {
  try {
    const allSchoolsData = yield call(fetchAllSchools);
    yield put({
      type: LOAD_ALL_SCHOOLS_SUCCEEDED,
      payload: { allSchoolData: allSchoolsData.data.allSchools }
    });
  } catch (e) {
    yield put({
      type: LOAD_ALL_SCHOOLS_FAILED,
      message: e.message
    });
  }
}

function* fetchAllDistrictData(action) {
  try {
    const allDistrictData = yield call(fetchAllDistricts);
    console.log("allDistrictData", allDistrictData);
    yield put({
      type: LOAD_ALL_DISTRICTS_SUCCEEDED,
      payload: { data: allDistrictData.data.allDistricts }
    });
  } catch (e) {
    yield put({
      type: LOAD_ALL_DISTRICTS_FAILED
    });
  }
}

function* fetchDistrictMcasData(action) {
  try {
    const subject = yield select(selectSelectedSubject);
    const studentGroup = "ALL";
    const districtMcasData = yield call(fetchDistrictsMcas, {
      codes: [action.payload.code],
      subject,
      studentGroup
    });
    console.log("districtMcasData", districtMcasData);
    yield put({
      type: LOAD_ALL_DISTRICT_MCAS_DATA_SUCCEEDED,
      payload: { districtMcas: districtMcasData.data.districtMcas }
    });
  } catch (e) {
    yield put({ type: LOAD_ALL_DISTRICT_MCAS_DATA_FAILED, message: e.message });
  }
}

// TODO: Need to reload the selectDistricts after subject change
/*
function* fetchDistrictMcasDataForSelectedDistricts() {
  try {
    const subject = yield select(selectSelectedSubject);
    const studentGroup = "ALL";
    const districts = yield select(selectSelectedDistricts);
    if (districts) {
      const districtMcasData = yield call(fetchDistrictsMcas, {
        codes: districts,
        subject,
        studentGroup
      });
    }
  } catch (e) {
    console.log('')
  }
}
*/

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* fetchSchoolMcasDataSaga() {
  yield takeEvery("ADD_SCHOOL_REQUESTED", fetchSchoolMcasData);
  yield takeEvery("LOAD_ALL_SCHOOLS_REQUESTED", fetchAllSchoolData);
  yield takeEvery("SET_SUBJECT", fetchSelectedSchoolsForSubjectSwitch);
  // yield takeEvery("SET_SUBJECT", fetchDistrictMcasDataForSelectedDistricts);
  yield takeEvery(
    mcasActionTypes.LOAD_ALL_DISTRICTS_REQUESTED,
    fetchAllDistrictData
  );
  yield takeEvery(
    mcasActionTypes.LOAD_ALL_DISTRICT_MCAS_DATA_REQUESTED,
    fetchDistrictMcasData
  );
}

export { fetchSchoolMcasDataSaga };
