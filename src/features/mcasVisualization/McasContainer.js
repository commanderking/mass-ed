// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  addSchoolAction,
  selectSchoolAction,
  deleteSchoolAction,
  addAllSchoolsAction,
  setSubjectAction
} from "./mcasActions";
import { McasChart } from "./components/McasChart";
import { SchoolSelect } from "./components/SchoolSelect";
import { SubjectSelect } from "./components/SubjectSelect";
import { AddSchoolButton } from "./components/AddSchoolButton";
import { SelectedSchoolsComponent } from "./components/SelectedSchoolsComponent";
import type { SchoolMcasType, SchoolCodeType } from "./mcas.flow.js";

import {
  selectAllSchools,
  selectSelectedSubject,
  selectSelectedSchools,
  selectDropdownSchoolIndex
} from "./mcasReducer";

type Props = {
  selectedSchools: Array<SchoolMcasType>,
  dropdownSchoolIndex: number,
  // TODO: Need to figure out how to handle functions
  allSchools: Array<SchoolMcasType>,
  addAllSchools: () => void,
  addSchoolClick: SchoolCodeType => void,
  selectSchool: SchoolCodeType => void,
  deleteSchool: SchoolCodeType => void
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
      allSchools,
      selectedSchools,
      dropdownSchoolIndex,
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
    return (
      <div>
        <div className="schoolSelectWrapper">
          <SubjectSelect
            setSubject={setSubject}
            selectedSubject={selectedSubject}
          />
          <SchoolSelect
            selectSchool={selectSchool}
            allSchools={allSchools}
            disabled={hasReachedMaxSchools}
          />
          <AddSchoolButton
            disabled={hasReachedMaxSchools}
            onClick={() => {
              if (dropdownSchoolIndex || dropdownSchoolIndex === 0) {
                addSchoolClick(allSchools[dropdownSchoolIndex].schoolCode);
              }
            }}
          />
        </div>
        <McasChart selectedSchools={selectedSchools} />
        <SelectedSchoolsComponent
          selectedSchools={selectedSchools}
          deleteSchool={deleteSchool}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  /*
  const {
    allSchools,
    selectedSchools,
    dropdownSchoolIndex,
    selectedSubject
  } = state;
  return {
    allSchools,
    selectedSchools,
    dropdownSchoolIndex,
    selectedSubject
  };
  */
  return {
    allSchools: selectAllSchools(state),
    selectedSchools: selectSelectedSchools(state),
    dropdownSchoolIndex: selectDropdownSchoolIndex(state),
    selectedSubject: selectSelectedSubject(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAllSchools: () => {
      dispatch(addAllSchoolsAction());
    },
    addSchoolClick: schoolCode => {
      dispatch(addSchoolAction(schoolCode));
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
