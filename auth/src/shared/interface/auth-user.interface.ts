import { Role } from '../enum/role.enum';

export interface AuthUser {
  id: bigint;
  name: string;
  email: string;
  roles: Array<Role>;
}
