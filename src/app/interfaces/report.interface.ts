import { IFile } from '.';
import { IAccount } from './account.interface';
import { IGroup } from './group.interface';

export interface IReport {
  _id: string;
  title: string;
  note: string;
  group: IGroup;
  deadline: Date;
  status: number;
  deletedAt: Date | null;
  submitFile: IFile | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface IReportComment {
  report: string | IReport;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: string | IAccount | any;
  text: string;
  createdAt: Date;
  deletedAt: Date | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
