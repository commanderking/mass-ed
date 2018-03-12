// @flow
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  addSchoolAction,
  selectSchoolAction,
  deleteSchoolAction,
  addAllSchoolsAction
} from "./mcasActions";
import { McasChart } from "./components/McasChart";
import { SchoolSelect } from "./components/SchoolSelect";
import { AddSchoolButton } from "./components/AddSchoolButton";
import { SelectedSchoolsComponent } from "./components/SelectedSchoolsComponent";
import type { schoolMcasType } from "./mcas.flow.js";

type Props = {
  selectedSchools: Array<schoolMcasType>,
  dropdownSchoolIndex: number,
  // TODO: Need to figure out how to handle functions
  addSchoolClick: any,
  selectSchool: any,
  deleteSchool: any
};

type State = {
  loading: boolean
};

class UnwrappedMcasContainer extends Component<Props, State> {
  mcasData: Array<*>;
  constructor(props) {
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
      selectSchool,
      deleteSchool
    } = this.props;
    const { loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className="schoolSelectWrapper">
          <SchoolSelect selectSchool={selectSchool} allSchools={allSchools} />
          <AddSchoolButton
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
  const { allSchools, selectedSchools, dropdownSchoolIndex } = state;
  return {
    allSchools,
    selectedSchools,
    dropdownSchoolIndex
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
    }
  };
};

const McasContainer = connect(mapStateToProps, mapDispatchToProps)(
  UnwrappedMcasContainer
);

export { McasContainer, UnwrappedMcasContainer };
