// @flow
export type schoolType = {
  subject: string,
  schoolName: string,
  schoolCode: number
};

export type schoolsType = Array<schoolType>;

export type SchoolCodeType = number;

export type SchoolMcasType = {
  subject: "ELA" | "MATH",
  schoolName: string,
  schoolCode: SchoolCodeType,
  exceededPercent: number,
  metPercent: number,
  partiallyMetPercent: number,
  notMetPercent: number
};
