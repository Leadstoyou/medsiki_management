interface IBreadcrumb {
  [key: string]: string | IBreadcrumb;
}

const TOP_MENU = [''];

const TOP_MENU_ONLY_USER = [''];

const commons: IBreadcrumb = {
  home: 'commons',
  demo: 'Demo',
  detail: 'Detail',
};

const GROUPS: IBreadcrumb = {
  home: 'Groups',
  detail: 'Detail',
};

const MY_GROUPS: IBreadcrumb = {
  home: 'My Groups',
  detail: 'Detail',
};

const MANAGERS: IBreadcrumb = {
  home: 'Managers',
};

const PROJECTS: IBreadcrumb = {
  home: 'Projects Tracking',
};
const PROJECT_INFO: IBreadcrumb = {
  home: 'Project Information',
};

const BREADCRUMB: IBreadcrumb = {
  COMMONS: commons,
  groups: GROUPS,
  managers: MANAGERS,
  'my-groups': MY_GROUPS,
  'new-feed': 'New Feed',
  materials: 'Materials',
  reports: 'Reports',
  projects: PROJECTS,
  ['project-info']: PROJECT_INFO,
};

export { BREADCRUMB, TOP_MENU, TOP_MENU_ONLY_USER };
