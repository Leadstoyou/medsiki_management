import { REQUEST_ACTION, REQUEST_STATUS, REQUEST_TYPE, SPRINT_STATUS, TASK_STATUS } from '#utils/const';
import { IAccount } from './account.interface';
import { IGroup } from './group.interface';

export interface ISprint {
  _id: string;
  createdBy: IAccount;
  title: string;
  goal?: string;
  startDate: Date;
  endDate: Date;
  status: SPRINT_STATUS;
  groupId: string;
  deletedAt?: Date | null;
  tasks: ITask[];
  isConfirmed: boolean;
  requestRejected?: IRequest;
}

export interface TaskComment {
  content: string;
  createdBy: string; // ID của User
  deletedAt?: Date | null;
}

export interface TaskHistory {
  origin?: string;
  newContent?: string;
  action?: string;
  createdBy: IAccount;
  createdAt: Date;
}

export interface ITask {
  _id: string;
  sprintId: ISprint; // ID của Sprint
  createdBy: IAccount; // ID của User
  assignee?: IAccount | null; // ID của User hoặc null
  title: string;
  priority: number;
  description?: string;
  deadline: Date;
  status: TASK_STATUS;
  comments: TaskComment[];
  taskHistory: TaskHistory[];
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateSprint {
  title: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  tasks: ICreateTask[];
}

export interface ICreateTask {
  title: string;
  description: string;
  priority: number;
  deadline: Date;
  assignee?: string | null;
}

export interface MemberStats {
  [TASK_STATUS.PROCESSING]: number;
  [TASK_STATUS.DONE]: number;
  [TASK_STATUS.CANCELED]: number;
  [TASK_STATUS.OVERDUE]: number;
  name: string;
}

export interface IRequest {
  _id: string;
  createdBy: IAccount;
  changedBy?: IAccount | null;
  type: REQUEST_TYPE;
  action: REQUEST_ACTION;
  status: REQUEST_STATUS;
  createdAt: Date;
  updatedAt: Date;
  sprint?: ISprint;
  rejectReason?: string;
  groupId: IGroup;
  origin?: string;
  newContent?: string;
}
