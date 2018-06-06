import React from "react";
import { allSchoolsMockData } from "./TestData";
import { UnwrappedMcasContainer } from "./McasContainer";
import { shallow } from "enzyme";
import { McasChart } from "./components/McasChart";
import { SubjectSelect } from "./components/SubjectSelect";
import { SchoolDistrictSelect } from "./components/SchoolDistrictSelect";
import { AddSchoolButton } from "./components/AddSchoolButton";
import { SelectedSchoolsComponent } from "./components/SelectedSchoolsComponent";

let mockProps;

describe("McasContainer", () => {
  beforeEach(() => {
    mockProps = {
      allSchoolsBySubject: allSchoolsMockData,
      addAllSchools: jest.fn(),
      selectedSchools: [],
      dropdownCode: 0,
      addSchoolClick: jest.fn(),
      selectSchool: jest.fn(),
      deleteSchool: jest.fn()
    };
  });

  it("renders with correct structure if no school selected", () => {
    const wrapper = shallow(<UnwrappedMcasContainer {...mockProps} />);
    expect(wrapper.find(SchoolDistrictSelect)).toHaveLength(1);
    expect(wrapper.find(McasChart)).toHaveLength(0);
    expect(wrapper.find(SelectedSchoolsComponent)).toHaveLength(0);
  });

  it("renders with correct structure if no school selected", () => {
    mockProps.selectedSchools = [
      { code: 22, name: "Arlington", subject: "ELA" }
    ];
    const wrapper = shallow(<UnwrappedMcasContainer {...mockProps} />);
    expect(wrapper.find(SchoolDistrictSelect)).toHaveLength(1);
    expect(wrapper.find(McasChart)).toHaveLength(1);
    expect(wrapper.find(SelectedSchoolsComponent)).toHaveLength(1);
  });

  it("clicking add school button fires correct action", () => {
    const wrapper = shallow(<UnwrappedMcasContainer {...mockProps} />);
    const buttonWrapper = wrapper.find(AddSchoolButton);
    expect(buttonWrapper.props()).toHaveProperty("disabled", false);
    buttonWrapper.simulate("click");
    expect(mockProps.addSchoolClick).toHaveBeenCalledTimes(1);
    expect(mockProps.addSchoolClick).toHaveBeenCalledWith(
      mockProps.allSchoolsBySubject[0].code
    );
  });

  it("disables add school button when four schools are set", () => {
    mockProps.selectedSchools = allSchoolsMockData;
    const wrapper = shallow(<UnwrappedMcasContainer {...mockProps} />);
    const buttonWrapper = wrapper.find(AddSchoolButton);
    expect(buttonWrapper.props()).toHaveProperty("disabled", true);
  });

  it("disables add school button when four schools are set", () => {
    mockProps.selectedSchools = allSchoolsMockData;
    const wrapper = shallow(<UnwrappedMcasContainer {...mockProps} />);
    const schoolSelectWrapper = wrapper.find(SchoolDistrictSelect);
    expect(schoolSelectWrapper.props()).toHaveProperty("disabled", true);
  });
});
