import React from "react";
import { shallow } from "enzyme";
import { VictoryLabel, VictoryBar, VictoryAxis } from "victory";

import { McasChart } from "./McasChart";
import { allSchoolsMockData } from "../TestData";
describe("McasChart", () => {
  let mockProps = {
    selectedSchools: allSchoolsMockData
  };
  describe("renders graph components", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<McasChart {...mockProps} />);
    });
    it("renders custom axis", () => {
      const axes = wrapper.find(VictoryAxis);
      expect(axes).toHaveLength(2);
      expect(axes.at(1).props().domain).toEqual([0, 80]);
    });

    it("renders correct bar component", () => {
      const victoryBarWrapper = wrapper.find(VictoryBar);
      expect(victoryBarWrapper).toHaveLength(mockProps.selectedSchools.length);
    });
  });
});
