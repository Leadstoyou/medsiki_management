import { GENDER, USER_ROLE, UserStatus } from '#utils/const';
import { IGallery } from './gallery.interface';

export interface IAccount {
  _id : string
  email: string;
  name: string;
  phone?: string;
  role: USER_ROLE;
  alternativeEmail?: string;
  facebook?: string;
  bio?: string;
  gender?: GENDER;
  avatar: IGallery | null;
  deletedAt: Date | null;
  status: UserStatus;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IAccount;
}

export interface IChangePassword {
  oldPassword?: string;
  password: string;
  confirm: string;
  token?: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
  code?: string;
}

export interface IRenewResponse {
  token: string;
}
