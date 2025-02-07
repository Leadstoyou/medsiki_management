import { GroupRoles } from '#utils/const';
import { IAccount } from './account.interface';
import { IGroup } from './group.interface';

export interface IStudent {
  _id: string;
  userId: IAccount;
  groupId: IGroup;
  rollNumber: string;
  role: GroupRoles;
  semester: string;
  isActive: boolean;
  warning: IWarning[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface IWarning {
  reason: string;
  createdBy?: IAccount;
  createdAt: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: any;
}
