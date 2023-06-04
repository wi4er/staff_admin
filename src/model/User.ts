import { CommonEntity } from '../components/CommonTable/CommonEntity';

export interface UserProperty {
  property: string;
  value: string;
}

export interface User extends CommonEntity {
  id: number;
  login: string;
  group: number[];
  property: UserProperty[];
}