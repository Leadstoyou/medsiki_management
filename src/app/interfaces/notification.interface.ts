import { REQUEST_ACTION, REQUEST_TYPE } from '#utils/const';
import { IAccount } from './account.interface';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface INotificationResponse {
  _id: string;
  actor: IAccount;
  action: string;
  metadata?: any;
  image?: string;
  read: boolean;
  payload?: any;
}

export interface NotificationParams {
  actorName?: string;
  sprintName?: string;
  taskName?: string;
  groupCode?: string;
  assigneeName?: string;
  commentContent?: string;
  requestType?: REQUEST_TYPE;
  requestAction?: REQUEST_ACTION;
  reportName?: string;
  newTopic?: string;
  ruleContent?: string;
  studentName?: string;
  [key: string]: any;
}
