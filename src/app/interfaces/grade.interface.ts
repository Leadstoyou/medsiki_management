import { IAccount } from './account.interface';
import { IReport } from './report.interface';

export interface IGrade {
  _id : string;
  user: IAccount;
  report: IReport;
  note: string;
  score: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
