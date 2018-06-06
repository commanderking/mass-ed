// @flow
import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setSchoolGroupAction } from "./mcasActions";
const options = [
  { name: "DISTRICT", displayName: "District", route: "/mcas/district" },
  { name: "SCHOOL", displayName: "School", route: "/mcas/school" }
];

const renderSchoolOrDistrictButtons = setSchoolGroup =>
  options.map(option => {
    return (
      <Link key={option.displayName} to={option.route}>
        <Button
          key={option.displayName}
          onClick={() => {
            setSchoolGroup(option.name);
          }}
        >
          {option.displayName}
        </Button>
      </Link>
    );
  });

const mapStateToProps = state => ({});

class UnwrappedMcasSchoolGroupOptions extends React.Component<*> {
  render() {
    const { setSchoolGroup } = this.props;
    return (
      <div className="schoolGroupToggle">
        {renderSchoolOrDistrictButtons(setSchoolGroup)}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setSchoolGroup: schoolGroup => {
    dispatch(setSchoolGroupAction(schoolGroup));
  }
});
const McasSchoolGroupOptions = connect(mapStateToProps, mapDispatchToProps)(
  UnwrappedMcasSchoolGroupOptions
);

export { McasSchoolGroupOptions };
