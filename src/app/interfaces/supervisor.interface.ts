import { IAccount } from './account.interface';

export interface ISupervisor {
  _id: string;
  user: IAccount;
  supervisorCode: string;
}

//interface in localStorage.
export interface ISupervisorLocal {
  _id: string;
  user: string;
  __v: number;
  createdAt: string;
  supervisorCode: string;
  updatedAt: string;
}
