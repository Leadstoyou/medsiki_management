import { ISemester } from './semester.interface';
import { IStudent } from './student.interface';
import { ISupervisor, ISupervisorLocal } from './supervisor.interface';

export interface IGroup {
  _id: string;
  supervisor: ISupervisor;
  coSupervisor: ISupervisor | null;
  groupCode: string;
  topic: string;
  description?: string;
  semester: ISemester;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jiraConfig?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gitConfig?: any;
  deletedAt: Date | null;
  isActive: boolean;
}

export interface IGroupLocal {
  _id: string;
  supervisor: ISupervisorLocal;
  coSupervisor: ISupervisorLocal | null;
  groupCode: string;
  topic: string;
  description?: string;
  semester: ISemester;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jiraConfig?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gitConfig?: any;
  deletedAt: Date | null;
  isActive: boolean;
}

export interface IMyGroupRes {
  group: IGroup;
  listStudents: IStudent[];
}
