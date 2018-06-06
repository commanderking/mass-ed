import React from "react";
import { Button } from "reactstrap";

const AddSchoolButton = ({ schoolGroup, onClick, disabled }) => (
  <Button disabled={disabled} onClick={onClick} color="primary">
    ADD {schoolGroup}
  </Button>
);

export { AddSchoolButton };
