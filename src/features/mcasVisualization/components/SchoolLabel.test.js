import React from "react";
import { shallow } from "enzyme";
import { SchoolLabel } from "./SchoolLabel";
import { Button } from "reactstrap";

describe("School Label", () => {
  let mockProps = {
    schoolName: "mock-school-name",
    schoolCode: 12345,
    deleteSchool: jest.fn(),
    index: 1
  };
  let wrapper = shallow(<SchoolLabel {...mockProps} />);

  it("renders correct structure", () => {
    expect(wrapper.find(".schoolLabelWrapper")).toHaveLength(1);
    expect(wrapper.find(".selectedSchoolsIcon")).toHaveLength(1);
    expect(wrapper.find(".selectedSchoolsIcon")).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it("button calls deleteSchool prop function", () => {
    const deleteSchoolButton = wrapper.find(Button);
    deleteSchoolButton.simulate("click");
    expect(mockProps.deleteSchool).toHaveBeenCalledTimes(1);
    expect(mockProps.deleteSchool).toHaveBeenCalledWith(mockProps.schoolCode);
  });
});
