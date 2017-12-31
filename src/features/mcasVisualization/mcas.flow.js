// @flow
export type schoolType = {
  subject: string,
  schoolName: string,
  schoolCode: number,
}

export type schoolsType = Array<schoolType>;

export type schoolMcasType = {
  subject: 'ELA' | 'MATH',
  schoolName: string,
  schoolCode: number,
  exceededPercent: number,
  metPercent: number,
  partiallyMetPercent: number,
  notMetPercent: number
}
