import { USER_ROLE } from '#utils/const';

export type IGallery = {
  _id: string;
  userId: string;
  role: USER_ROLE;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
};
