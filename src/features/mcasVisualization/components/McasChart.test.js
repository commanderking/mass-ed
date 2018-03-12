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
    it("renders correct graph title", () => {
      const title = wrapper.find(VictoryLabel);
      expect(title).toHaveLength(1);
    });

    it("renders correct bar component", () => {
      const victoryBarWrapper = wrapper.find(VictoryBar);
      expect(victoryBarWrapper).toHaveLength(mockProps.selectedSchools.length);
    });
  });
});
