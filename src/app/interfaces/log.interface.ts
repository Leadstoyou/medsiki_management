import { LogType } from '#utils/const';
import { IAccount } from './account.interface';

export interface ILog {
  _id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdBy: string | IAccount | any;
  description: string;
  type: LogType;
  createdAt: Date;
  updatedAt: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
