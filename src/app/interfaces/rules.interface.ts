export interface IRules {
  _id: string;
  percentNotFinish: string;
  numberSprint: string;
  numberFlag: string;
  groupId: string;
  others: IRulesOthers[];
}

export interface IRulesOthers {
  content: string;
  createdByName: string;
  createdById: string;
}
