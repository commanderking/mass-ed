import React from "react";
import { allSchoolsMockData } from "./TestData";
import { UnwrappedMcasContainer } from "./McasContainer";
import { shallow } from "enzyme";
import VirtualizedSelect from "react-virtualized-select";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from "victory";
import * as mcasActions from "./mcasActions";

let mockProps;

describe("McasContainer", () => {
  beforeEach(() => {
    mockProps = {
      allSchools: allSchoolsMockData,
      selectedSchoolIndexes: [],
      dropdownSchoolIndex: 0,
      addSchoolClick: jest.fn(),
      selectSchool: jest.fn(),
      deleteSchool: jest.fn()
    };
  });

  it("renders with correct structure", () => {
    const wrapper = shallow(<UnwrappedMcasContainer {...mockProps} />);
    expect(wrapper.find(VirtualizedSelect)).toHaveLength(1);
    expect(wrapper.find(VictoryChart)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders charts when more than one chart is present", () => {
    mockProps.selectedSchoolIndexes = [0, 1];
    const wrapper = shallow(<UnwrappedMcasContainer {...mockProps} />);
    // Always only one dropdwon
    expect(wrapper.find(VirtualizedSelect)).toHaveLength(1);

    // Should render as many school indexes that have been added
    const expectedNumberOfSchools = mockProps.selectedSchoolIndexes.length;
    expect(wrapper.find(VictoryChart)).toHaveLength(expectedNumberOfSchools);
    expect(wrapper.find(VictoryBar)).toHaveLength(expectedNumberOfSchools);
    expect(wrapper.find(VictoryLabel)).toHaveLength(expectedNumberOfSchools);
  });

  it("renders close graph button with each graph", () => {
    mockProps.selectedSchoolIndexes = [0, 1];
    const wrapper = shallow(<UnwrappedMcasContainer {...mockProps} />);
    expect(wrapper.find(".closeGraphButton")).toHaveLength(
      mockProps.selectedSchoolIndexes.length
    );
  });

  describe("renders graph components", () => {
    let wrapper;
    beforeEach(() => {
      mockProps.selectedSchoolIndexes = [0];
      wrapper = shallow(<UnwrappedMcasContainer {...mockProps} />);
    });
    it("renders correct graph title", () => {
      const title = wrapper.find(VictoryLabel);
      expect(title).toMatchSnapshot();
    });

    it("renders correct bar component", () => {
      expect(wrapper.find(VictoryBar)).toMatchSnapshot();
    });

    it("renders correct x-axis", () => {
      const xAxis = wrapper.find(VictoryAxis).first();
      expect(xAxis).toHaveLength(1);
    });

    it("renders correct y-axis", () => {
      const yAxis = wrapper.find(VictoryAxis).at(1);
      expect(yAxis).toHaveLength(1);
      expect(yAxis.props().dependentAxis).toEqual(true);
    });
  });

  it("clicking add school button fires correct action", () => {
    const wrapper = shallow(<UnwrappedMcasContainer {...mockProps} />);
    const buttonWrapper = wrapper.find("button");
    buttonWrapper.simulate("click");
    expect(mockProps.addSchoolClick).toHaveBeenCalledTimes(1);
    expect(mockProps.addSchoolClick).toHaveBeenCalledWith(
      mockProps.dropdownSchoolIndex
    );
  });

  it("clicking remove school button fires correct action", () => {
    mockProps.selectedSchoolIndexes = [0, 1];
    const wrapper = shallow(<UnwrappedMcasContainer {...mockProps} />);
    const closeButton = wrapper.find(".closeGraphButton").first();
    closeButton.simulate("click");
    expect(mockProps.deleteSchool).toHaveBeenCalledTimes(1);
    expect(mockProps.deleteSchool).toHaveBeenCalledWith(
      mockProps.selectedSchoolIndexes[0]
    );
  });
});
