import { Role } from '@shared/enum/role.enum';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: Array<Role>;
}
