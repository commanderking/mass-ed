import React from "react";
import { Button } from "reactstrap";

const AddSchoolButton = ({ onClick, disabled }) => (
  <Button disabled={disabled} onClick={onClick} color="primary">
    Add School
  </Button>
);

export { AddSchoolButton };
