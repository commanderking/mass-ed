import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { subjectsConstants } from "../mcasConstants";
export const subjects = [subjectsConstants.ELA, subjectsConstants.MATH];

const isSelectedSubject = (subject, selectedSubject) =>
  subject === selectedSubject;

const formatBackgroundColorForSubject = (subject, selectedSubject) =>
  isSelectedSubject(subject, selectedSubject) ? "#006CD6" : "gray";

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
  <ButtonGroup className="subjectSelect">
    {renderSubjectButtons(setSubject, selectedSubject)}
  </ButtonGroup>
);

export { SubjectSelect };
