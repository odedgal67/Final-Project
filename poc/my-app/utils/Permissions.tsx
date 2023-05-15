export const enum actions {
  MANAGE_USERS = "MANAGE_USERS",
}

export const enum roles {
  WORK_MANAGER = "WORK_MANAGER",
  PROJECT_MANAGER = "PROJECT_MANAGER",
  CONTRACTOR = "CONTRACTOR",
}

const mapRoleToActions = new Map();
mapRoleToActions.set(roles.WORK_MANAGER, []);
mapRoleToActions.set(roles.PROJECT_MANAGER, [actions.MANAGE_USERS]);
mapRoleToActions.set(roles.CONTRACTOR, [actions.MANAGE_USERS]);

export function hasPermission(role: roles, action: actions) {
  return mapRoleToActions.get(role).includes(action);
}
