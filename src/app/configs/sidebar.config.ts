import { IMenu } from '#interfaces/menu.interface';
import { USER_ROLE } from '#utils/const';

const Manager: IMenu[] = [
  {
    label: 'menubar.groups',
    icon: 'group-user',
    routerLink: '/manager/groups',
  },
];
const Admin: IMenu[] = [
  {
    label: 'Home',
    icon: 'group-user',
    routerLink: '/admin/home',
  },
  {
    label: 'User',
    matIcon: 'group-user',
    routerLink: '/admin/user',
  },
  {
    label: 'Course',
    matIcon: 'group-user',
    routerLink: '/admin/course',
  },
  {
    label: 'Product',
    routerLink: '/admin/product',
    matIcon: 'date_range',
  },
  {
    label: 'Chat',
    routerLink: '/admin/chat',
    matIcon: 'date_range',
  },
  {
    label: 'News',
    routerLink: '/admin/news',
    matIcon: 'date_range',
  },
];

const Supervisor: IMenu[] = [
  {
    label: 'menubar.myGroups',
    icon: 'group-user',
    routerLink: '/supervisor/my-groups',
  },
  {
    label: 'menubar.reports',
    icon: 'report',
    routerLink: '/supervisor/reports',
  },
  {
    label: 'Materials',
    icon: 'file-zipper',
    routerLink: '/supervisor/materials',
  },
  {
    label: 'News feed',
    icon: 'file-zipper',
    routerLink: '/supervisor/new-feed',
  },

  {
    label: 'menubar.projects',
    icon: 'project',
    children: [
      {
        label: 'menubar.projectTracking',
        routerLink: '/supervisor/projects',
      },
      {
        label: 'menubar.projectStatictis',
        routerLink: '/supervisor/project-statictis',
      },
    ],
  },
  {
    label: 'Requests',
    icon: 'group-user',
    children: [
      {
        label: 'Student requests',
        routerLink: '/supervisor/student-requests',
      },
    ],
  },
  {
    label: 'menubar.rule',
    icon: 'rule',
    routerLink: '/supervisor/rules',
  },
];

const Student: IMenu[] = [
  {
    label: 'menubar.myGroups',
    icon: 'group-user',
    routerLink: '/student/my-groups',
  },
  {
    label: 'menubar.reports',
    icon: 'report',
    routerLink: '/student/reports',
  },
  {
    label: 'Materials',
    icon: 'file-zipper',
    routerLink: '/student/materials',
  },
  {
    label: 'News feed',
    icon: 'file-zipper',
    routerLink: '/student/new-feed',
  },

  {
    label: 'menubar.projects',
    icon: 'project',
    children: [
      {
        label: 'menubar.projectTracking',
        routerLink: '/student/projects',
      },
      {
        label: 'menubar.projectInfo',
        routerLink: '/student/project-info',
      },
    ],
  },
  {
    label: 'menubar.rule',
    icon: 'rule',
    routerLink: '/supervisor/rules',
  },
  {
    label: 'My requests',
    icon: 'group-user',
    routerLink: '/student/my-requests',
  },
];

export const MappingMenuByRoles = {
  [USER_ROLE.MANAGER]: Manager,
  [USER_ROLE.SUPERVISOR]: Supervisor,
  [USER_ROLE.STUDENT]: Student,
  [USER_ROLE.ADMIN]: Admin,
};

export const MappingNameRoleByRoles = {
  [USER_ROLE.MANAGER]: 'Manager',
  [USER_ROLE.SUPERVISOR]: 'Supervisor',
  [USER_ROLE.STUDENT]: 'Student',
  [USER_ROLE.ADMIN]: 'Admin',
};
