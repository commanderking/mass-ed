// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  addSchoolAction,
  selectSchoolAction,
  deleteSchoolAction,
  addAllSchoolsAction,
  loadAllDistrictsAction,
  setSubjectAction
} from "./mcasActions";
import { McasChart } from "./components/McasChart";
import { SchoolDistrictSelect } from "./components/SchoolDistrictSelect";
import { AddSchoolButton } from "./components/AddSchoolButton";
import { SelectedSchoolsComponent } from "./components/SelectedSchoolsComponent";
import { selectAllSchoolsBySubject } from "./mcasSelector";
import type {
  SchoolMcasType,
  SchoolCodeType,
  SubjectType
} from "./mcas.flow.js";

import {
  selectSelectedSubject,
  selectSelectedSchools,
  selectDropdownCode
} from "./mcasReducer";
import { schoolGroupConstants } from "./mcasConstants";

type Props = {
  selectedSchools: Array<SchoolMcasType>,
  dropdownCode: number,
  allSchools: Array<SchoolMcasType>,
  allSchoolsBySubject: Array<SchoolMcasType>,
  selectedSubject: SubjectType,
  // TODO: Type actions better here
  addAllSchools: () => void,
  addSchoolClick: SchoolCodeType => void,
  selectSchool: SchoolCodeType => void,
  deleteSchool: SchoolCodeType => void,
  setSubject: SubjectType => void
};

type State = {
  loading: boolean
};

class UnwrappedMcasContainer extends Component<Props, State> {
  mcasData: Array<*>;
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  componentDidMount() {
    this.props.addAllSchools();
  }
  render() {
    const {
      allSchoolsBySubject,
      selectedSchools,
      dropdownCode,
      addSchoolClick,
      setSubject,
      selectedSubject,
      selectSchool,
      deleteSchool
    } = this.props;
    const { loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    const hasReachedMaxSchools = selectedSchools.length >= 4;
    const hasSelectedSchool = selectedSchools.length > 0;
    return (
      <div>
        <div className="schoolSelectWrapper">
          <SchoolDistrictSelect
            selectSchool={selectSchool}
            allSchools={allSchoolsBySubject}
            disabled={hasReachedMaxSchools}
          />
          <AddSchoolButton
            schoolGroup={schoolGroupConstants.SCHOOL}
            disabled={hasReachedMaxSchools}
            onClick={() => {
              console.log("dropdownCode", dropdownCode);
              if (dropdownCode || dropdownCode === 0) {
                addSchoolClick(dropdownCode);
              }
            }}
          />
        </div>

        {hasSelectedSchool ? (
          <div>
            <McasChart
              selectedSchools={selectedSchools}
              setSubject={setSubject}
              selectedSubject={selectedSubject}
            />
            <SelectedSchoolsComponent
              selectedSchools={selectedSchools}
              deleteSchool={deleteSchool}
            />
          </div>
        ) : (
          <div>Awaiting School to Be Added </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allSchoolsBySubject: selectAllSchoolsBySubject(state),
    selectedSchools: selectSelectedSchools(state),
    dropdownCode: selectDropdownCode(state),
    selectedSubject: selectSelectedSubject(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAllSchools: () => {
      dispatch(addAllSchoolsAction());
    },
    addSchoolClick: code => {
      dispatch(addSchoolAction(code));
    },
    fetchAllDistricts: () => {
      dispatch(loadAllDistrictsAction());
    },
    selectSchool: schoolIndex => {
      dispatch(selectSchoolAction(schoolIndex));
    },
    deleteSchool: schoolIndex => {
      dispatch(deleteSchoolAction(schoolIndex));
    },
    setSubject: subject => {
      dispatch(setSubjectAction(subject));
    }
  };
};

const McasContainer = connect(mapStateToProps, mapDispatchToProps)(
  UnwrappedMcasContainer
);

export { McasContainer, UnwrappedMcasContainer };
