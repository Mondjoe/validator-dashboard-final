import { Roles } from "./roles";

export const Escalation = {
  [Roles.OWNER]: [Roles.ADMIN, Roles.OPERATOR, Roles.AUDITOR],
  [Roles.ADMIN]: [Roles.OPERATOR, Roles.AUDITOR],
  [Roles.OPERATOR]: [],
  [Roles.AUDITOR]: [],
};
