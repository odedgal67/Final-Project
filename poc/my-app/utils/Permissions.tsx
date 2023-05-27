export const enum actions {
  MANAGE_PROJECT_SETTINGS = "MANAGE_PROJECT_SETTINGS",
}

export enum roles {
  WORK_MANAGER = 1,
  PROJECT_MANAGER = 2,
  CONTRACTOR = 3,
  UNDEFINED = 0,
}

const mapRoleToActions = new Map();
mapRoleToActions.set(roles.WORK_MANAGER, []);
mapRoleToActions.set(roles.PROJECT_MANAGER, [actions.MANAGE_PROJECT_SETTINGS]);
mapRoleToActions.set(roles.CONTRACTOR, [actions.MANAGE_PROJECT_SETTINGS]);

export function hasPermission(role: roles, action: actions) {
  return mapRoleToActions.get(role).includes(action);
}
