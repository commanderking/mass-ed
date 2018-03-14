import React from "react";
import { shallow } from "enzyme";
import { SubjectSelect, subjects } from "./SubjectSelect";
import { Button, ButtonGroup } from "reactstrap";

describe("SubjectSelect", () => {
  let mockProps = {
    selectedSubject: "ela",
    setSubject: jest.fn()
  };
  let wrapper = shallow(<SubjectSelect {...mockProps} />);

  it("renders correct structure", () => {
    expect(wrapper.find(ButtonGroup)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
  });

  it("fires setSubject action for ela and math", () => {
    const buttonWrapper = wrapper.find(Button);
    buttonWrapper.first().simulate("click");
    expect(mockProps.setSubject).toHaveBeenCalledTimes(1);
    expect(mockProps.setSubject).toHaveBeenCalledWith(subjects[0]);
  });
});
