import { ITableConfig } from '#interfaces/table.interface';

export const tableUser: ITableConfig[] = [
  {
    title: 'common.table.header.email',
    key: 'email',
    width: '140px',
    sort: true,
  },
  {
    title: 'common.table.header.groupName',
    key: 'name',
    width: '140px',
    sort: true,
  },
  {
    title: 'common.table.header.phone',
    key: 'phone',
    width: '100px',
    sort: false,
  },
  {
    title: 'common.table.header.role',
    key: 'role',
    width: '100px',
    sort: false,
  },
  {
    title: 'common.table.header.status',
    key: 'isActive',
    width: '100px',
    sort: false,
  },
  {
    title: 'common.table.header.action',
    key: 'action',
    width: '100px',
    sort: false,
  },
];

export const tableGroupManager: ITableConfig[] = [
  {
    title: 'common.table.header.groupCode',
    key: 'groupCode',
    width: '100px',
    sort: true,
  },
  {
    title: 'common.table.header.supervisor',
    key: 'supervisor',
    width: '140px',
    sort: false,
  },
  {
    title: 'common.table.header.topic',
    key: 'topic',
    width: '100px',
    sort: true,
  },
  {
    title: 'common.table.header.semester',
    key: 'semester',
    width: '100px',
    sort: false,
  },
  {
    title: 'common.table.header.action',
    key: 'action',
    width: '100px',
    sort: false,
  },
];

export const tableGroupDetailManager: ITableConfig[] = [
  {
    title: 'common.table.header.rollNumber',
    key: 'rollNumber',
    width: '100px',
    sort: true,
  },
  {
    title: 'common.table.header.email',
    key: 'email',
    width: '180px',
    sort: false,
  },
  {
    title: 'common.table.header.name',
    key: 'name',
    width: '100px',
    sort: true,
  },
  {
    title: 'common.table.header.phone',
    key: 'phone',
    width: '100px',
    sort: false,
  },
  {
    title: 'common.table.header.gender',
    key: 'gender',
    width: '100px',
    sort: false,
  },
];

export const tableAdminUser: ITableConfig[] = [
  {
    title: 'email',
    key: 'email',
    width: '150px',
    sort: true,
  },
  {
    title: 'username',
    key: 'fullName',
    width: '180px',
    sort: false,
  },
  {
    title: 'mobile',
    key: 'mobile',
    width: '100px',
    sort: false,
  },
  {
    title: 'dob',
    key: 'dob',
    width: '100px',
    sort: false,
  },
  {
    title: 'isActive',
    key: 'isActive',
    width: '100px',
    sort: false,
  },
];
export const tableAdminCourse: ITableConfig[] = [
  {
    title: '',
    key: 'thumbnail',
    width: '100px',
    sort: false,
  },
  {
    title: 'title',
    key: 'title',
    width: '100px',
    sort: false,
  },
  {
    title: 'description',
    key: 'description',
    width: '100px',
    sort: false,
  },
  {
    title: 'price',
    key: 'price',
    width: '100px',
    sort: false,
  },
  {
    title: 'discountPrice',
    key: 'discountPrice',
    width: '100px',
    sort: false,
  },
  {
    title: 'star',
    key: 'star',
    width: '100px',
    sort: false,
  },
  {
    title: 'type',
    key: 'type',
    width: '100px',
    sort: false,
  },
  {
    title: 'action',
    key: 'action',
    width: '100px',
    sort: false,
  },
];
export const tableAdminProduct: ITableConfig[] = [
  {
    title: '',
    key: 'thumbnail',
    width: '100px',
    sort: false,
  },
  {
    title: 'title',
    key: 'title',
    width: '100px',
    sort: false,
  },
  {
    title: 'description',
    key: 'description',
    width: '100px',
    sort: false,
  },
  {
    title: 'Options',
    key: 'options',
    width: '100px',
    sort: false,
  },
  {
    title: 'price',
    key: 'price',
    width: '100px',
    sort: false,
  },
  {
    title: 'Discount Price',
    key: 'discountPrice',
    width: '100px',
    sort: false,
  },

  {
    title: 'action',
    key: 'action',
    width: '100px',
    sort: false,
  },
];
export const tableAdminNews: ITableConfig[] = [
  {
    title: '',
    key: 'thumbnail',
    width: '100px',
    sort: false,
  },
  {
    title: 'title',
    key: 'title',
    width: '100px',
    sort: false,
  },
  {
    title: 'description',
    key: 'description',
    width: '100px',
    sort: false,
  },
  {
    title: 'Redirect Link',
    key: 'redirectLink',
    width: '100px',
    sort: false,
  },
  {
    title: 'action',
    key: 'action',
    width: '100px',
    sort: false,
  },
];
export const tableGroupSupervisor: ITableConfig[] = [
  {
    title: 'common.table.header.groupCode',
    key: 'groupCode',
    width: '100px',
    sort: true,
  },
  {
    title: 'common.table.header.topic',
    key: 'topic',
    width: '180px',
    sort: false,
  },
  {
    title: 'common.table.header.description',
    key: 'description',
    width: '100px',
    sort: true,
  },
  {
    title: 'common.table.header.semester',
    key: 'semester',
    width: '100px',
    sort: false,
  },
  {
    title: 'common.table.header.supervisor',
    key: 'supervisor',
    width: '100px',
    sort: false,
  },
];
export const tableGroupDetailSupervisor: ITableConfig[] = [
  {
    title: 'common.table.header.rollNumber',
    key: 'rollNumber',
    width: '80px',
    sort: true,
  },
  {
    title: 'common.table.header.email',
    key: 'email',
    width: '120px',
    sort: false,
  },
  {
    title: 'common.table.header.name',
    key: 'name',
    width: '100px',
    sort: true,
  },
  {
    title: 'common.table.header.phone',
    key: 'phone',
    width: '70px',
    sort: false,
  },
  {
    title: 'common.table.header.role',
    key: 'role',
    width: '70px',
    sort: false,
  },
  {
    title: 'Red flag',
    key: 'redFlag',
    width: '80px',
    sort: false,
  },
  {
    title: 'Status',
    key: 'status',
    width: '80px',
    sort: false,
  },
  {
    title: 'common.table.header.action',
    key: 'action',
    width: '150px',
    sort: false,
  },
];
export const tableGroupDetailManager2: ITableConfig[] = [
  {
    title: 'common.table.header.rollNumber',
    key: 'rollNumber',
    width: '80px',
    sort: true,
  },
  {
    title: 'common.table.header.email',
    key: 'email',
    width: '120px',
    sort: false,
  },
  {
    title: 'common.table.header.name',
    key: 'name',
    width: '100px',
    sort: true,
  },
  {
    title: 'common.table.header.phone',
    key: 'phone',
    width: '70px',
    sort: false,
  },
  {
    title: 'common.table.header.role',
    key: 'role',
    width: '70px',
    sort: false,
  },
  {
    title: 'Red flag',
    key: 'redFlag',
    width: '80px',
    sort: false,
  },
  {
    title: 'Status',
    key: 'status',
    width: '80px',
    sort: false,
  },
];
export const tableReportSupervisor: ITableConfig[] = [
  {
    title: 'common.table.header.groupName',
    key: 'groupName',
    width: '100px',
    sort: false,
  },
  {
    title: 'common.table.header.title',
    key: 'title',
    width: '130px',
    sort: false,
  },
  {
    title: 'common.table.header.status',
    key: 'status',
    width: '100px',
    sort: false,
  },
  {
    title: 'common.table.header.deadline-extraDate',
    key: 'deadline',
    width: '170px',
    sort: false,
  },
  {
    title: 'common.table.header.createdBy',
    key: 'createdBy',
    width: '80px',
    sort: false,
  },
  {
    title: 'common.table.header.action',
    key: 'action',
    width: '60px',
    sort: false,
  },
];
export const tableReportStudent: ITableConfig[] = [
  {
    title: 'common.table.header.groupName',
    key: 'groupName',
    width: '100px',
    sort: false,
  },
  {
    title: 'common.table.header.title',
    key: 'title',
    width: '130px',
    sort: false,
  },
  {
    title: 'common.table.header.status',
    key: 'status',
    width: '100px',
    sort: true,
  },
  {
    title: 'common.table.header.deadline',
    key: 'deadline',
    width: '150px',
    sort: false,
  },
  {
    title: 'common.table.header.createdBy',
    key: 'createdBy',
    width: '80px',
    sort: false,
  },
  {
    title: 'common.table.header.action',
    key: 'action',
    width: '80px',
    sort: false,
  },
];

export const tableRequestStudent: ITableConfig[] = [
  {
    title: 'Group',
    key: 'group',
    width: '100px',
    sort: false,
  },
  {
    title: 'Action',
    key: 'action',
    width: '130px',
    sort: false,
  },
  {
    title: 'Detail',
    key: 'detail',
    width: '240px',
    sort: false,
  },
  {
    title: 'Created by',
    key: 'createdBy',
    width: '100px',
    sort: false,
  },
  {
    title: 'Request Date',
    key: 'createdAt',
    width: '100px',
    sort: true,
  },
  {
    title: 'Change status Date',
    key: 'changeStatus',
    width: '100px',
    sort: true,
  },
  {
    title: 'Status',
    key: 'status',
    width: '80px',
    sort: false,
  },
];

const tableSemester: ITableConfig[] = [
  {
    title: 'Semester',
    key: 'semester',
    width: '140px',
    sort: true,
  },
  {
    title: 'Register Date',
    key: 'registerDate',
    width: '140px',
    sort: true,
  },
  {
    title: 'Start Date',
    key: 'startDate',
    width: '140px',
    sort: true,
  },
  {
    title: 'End Date',
    key: 'endDate',
    width: '140px',
    sort: true,
  },
  {
    title: 'Action',
    key: 'action',
    width: '100px',
    sort: false,
  },
];
const tableGroupsManager: ITableConfig[] = [
  {
    title: 'Semester',
    key: 'semester',
    width: '100px',
    sort: false,
  },
  {
    title: 'Group',
    key: 'group',
    width: '100px',
    sort: false,
  },
  {
    title: 'Topic',
    key: 'topic',
    width: '160px',
    sort: false,
  },
  {
    title: 'Supervisor',
    key: 'supervisor',
    width: '100px',
    sort: true,
  },
  {
    title: 'CoSupervisor',
    key: 'coSupervisor',
    width: '100px',
    sort: true,
  },
  {
    title: 'Active',
    key: 'active',
    width: '80px',
    sort: false,
  },
  {
    title: 'Action',
    key: 'action',
    width: '100px',
    sort: false,
  },
];

export const TABLE_CONFIG = {
  TABLE_USER: tableUser,
  TABLE_GROUP_MANGER: tableGroupManager,
  TABLE_GROUP_DETAIL_MANAGER: tableGroupDetailManager,
  TABLE_ADMIN_USER: tableAdminUser,
  TABLE_ADMIN_COURSE: tableAdminCourse,
  TABLE_ADMIN_PRODUCT: tableAdminProduct,
  TABLE_ADMIN_NEWS: tableAdminNews,
  TABLE_GROUP_DETAIL_MANAGER_2: tableGroupDetailManager2,
  TABLE_GROUP_DETAIL_SUPERVISOR: tableGroupDetailSupervisor,
  TABLE_GROUP_SUPERVISOR: tableGroupSupervisor,
  TABLE_REPORT_SUPERVISOR: tableReportSupervisor,
  TABLE_REPORT_STUDENT: tableReportStudent,
  TABLE_REQUEST_STUDENT: tableRequestStudent,
  TABLE_SEMESTER: tableSemester,
  TABLE_GROUPS_MANGER: tableGroupsManager,
};
