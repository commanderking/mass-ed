// @flow
export type schoolType = {
  subject: string,
  name: string,
  code: number
};

export type schoolsType = Array<schoolType>;

export type SchoolCodeType = number;

export type SchoolMcasType = {
  subject: "ELA" | "MATH",
  name: string,
  code: SchoolCodeType,
  exceededPercent: number,
  metPercent: number,
  partiallyMetPercent: number,
  notMetPercent: number
};
