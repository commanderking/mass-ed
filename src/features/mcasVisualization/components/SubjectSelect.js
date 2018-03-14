import React from "react";
import { Button, ButtonGroup } from "reactstrap";

export const subjects = ["ela", "math"];

const isSelectedSubject = (subject, selectedSubject) =>
  subject === selectedSubject;

const formatBackgroundColorForSubject = (subject, selectedSubject) =>
  isSelectedSubject(subject, selectedSubject) ? "red" : "green";

const renderSubjectButtons = (setSubject, selectedSubject) =>
  subjects.map(subject => (
    <Button
      key={`subjectSelect-${subject}-button`}
      style={{
        backgroundColor: formatBackgroundColorForSubject(
          subject,
          selectedSubject
        )
      }}
      onClick={() => {
        setSubject(subject);
      }}
    >
      {subject}
    </Button>
  ));

const SubjectSelect = ({ setSubject, selectedSubject }) => (
  <ButtonGroup>{renderSubjectButtons(setSubject, selectedSubject)}</ButtonGroup>
);

export { SubjectSelect };
