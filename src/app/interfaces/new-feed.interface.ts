import { IFile } from '.';
import { IAccount } from './account.interface';

export interface INewFeed {
  _id: string;
  title: string;
  link: IFile[];
  groupId: string;
  createdBy: IAccount;
  updatedAt: Date;
  createdAt: Date;
  comments: INewFeedComment[];
  isPin: boolean;
  pinAt?: Date;
}

export interface INewFeedComment {
  _id: string;
  content: string;
  createdBy: IAccount;
  updatedAt: Date;
  createdAt: Date;
}
