import { Roles } from "./roles";

export const Permissions = {
  CREATE_PROPOSAL: [Roles.OWNER, Roles.ADMIN],
  EXECUTE_ACTION: [Roles.OWNER, Roles.ADMIN, Roles.OPERATOR],
  VIEW_AUDIT_LOGS: [Roles.OWNER, Roles.ADMIN, Roles.AUDITOR],
  MANAGE_ROLES: [Roles.OWNER],
};
