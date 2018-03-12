import React from "react";
import { allSchoolsMockData } from "./TestData";
import { UnwrappedMcasContainer } from "./McasContainer";
import { shallow } from "enzyme";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from "victory";
import { SchoolLabel } from "./components/SchoolLabel";
import { McasChart } from "./components/McasChart";
import { SchoolSelect } from "./components/SchoolSelect";
import { AddSchoolButton } from "./components/AddSchoolButton";
import { SelectedSchoolsComponent } from "./components/SelectedSchoolsComponent";

let mockProps;

describe("McasContainer", () => {
  beforeEach(() => {
    mockProps = {
      allSchools: allSchoolsMockData,
      addAllSchools: jest.fn(),
      selectedSchoolIndexes: [],
      dropdownSchoolIndex: 0,
      addSchoolClick: jest.fn(),
      selectSchool: jest.fn(),
      deleteSchool: jest.fn()
    };
  });

  it("renders with correct structure", () => {
    const wrapper = shallow(<UnwrappedMcasContainer {...mockProps} />);
    expect(wrapper.find(SchoolSelect)).toHaveLength(1);
    expect(wrapper.find(McasChart)).toHaveLength(1);
    expect(wrapper.find(SelectedSchoolsComponent)).toHaveLength(1);
  });

  it("clicking add school button fires correct action", () => {
    const wrapper = shallow(<UnwrappedMcasContainer {...mockProps} />);
    const buttonWrapper = wrapper.find(AddSchoolButton);
    buttonWrapper.simulate("click");
    expect(mockProps.addSchoolClick).toHaveBeenCalledTimes(1);
    expect(mockProps.addSchoolClick).toHaveBeenCalledWith(
      mockProps.allSchools[0].schoolCode
    );
  });
});
