export enum DIALOG {
  ERROR,
  INFO,
  INFO_WITHOUT_ICON,
  CONFIRM,
  CONFIRM_WITHOUT_ICON,
  WARNING,
}

export const LocalStorageKey = {
  currentUser: 'current_user',
  breadCrumb: 'bread_crumb',
  prevBreadcrumb: 'prev_bread_crumb',
  cart: 'cart',
  cartCheckNow: 'cart_check_now',
  layoutMode: 'layout_mode',
  randomComment: 'rcm',
  currentGroup: 'current_group',
};

export enum USER_ROLE {
  ADMIN = 0,
  SUPERVISOR = 1,
  STUDENT = 2,
  MANAGER = 3,
}

export enum GENDER {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}

export const GENDER_MAP = {
  [GENDER.MALE]: 'Male',
  [GENDER.FEMALE]: 'Female',
  [GENDER.OTHER]: 'Other',
};

export enum UserStatus {
  ENABLED = 'enabled',
  BLOCKED = 'block',
  KICKED = 'kicked',
}

export enum GroupRoles {
  MEMBER = 0,
  LEADER = 1,
}

export const GroupRolesMap = {
  [GroupRoles.MEMBER]: 'Member',
  [GroupRoles.LEADER]: 'Leader',
};

export enum SOCKET_SCREEN {
  PROGRESS_WAITING = 'PROGRESS_WAITING',
  NOTIFICATION = 'NOTIFICATION',
}

export enum Locales {
  VI = 'vi',
  EN = 'en',
  JA = 'ja',
  KR = 'kr',
}

export const LANGUAGES = {
  English: 'EN',
  Germany: 'DE',
  Spain: 'ES',
  Italy: 'IT',
};

export enum SOCKET_SCREEN_ACTION {}

export const REGEX = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^.{8,30}$/,
  phoneNumber: /^[0-9]{1,11}$/,
  domain: /^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(?:\.[a-zA-Z]{2,})+$/,
  positiveIntegerNumber: /^[1-9]\d*$/,
  facebook: /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9.]{5,}\/?$/,
};

export enum VALIDATOR_ERROR {
  PASSWORD_NOT_EQUAL = 'custom_password_not_equal',
  CONFIRM_PASSWORD_NOT_EQUAL = 'custom_confirm_password_not_equal',
  OLD_PASSWORD_EQUAL = 'custom_old_password_equal',
  VALIDATION_LENGTH = 'custom_validation_length',
  VALIDATION_REQUIRE = 'custom_validation_require',
}

export const VALID_LENGTH = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 30,
};

export enum STRING {
  ID = 'id',
  ASC = 'ascend',
  DESC = 'descend',
  TIME = 'time',
  DATE = 'date',
  NUMBER = 'number',
  STRING = 'string',
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  PREFIX = 'prefix',
  SUFFIX = 'suffix',
  TOKEN = 'token',
}

export const APP_LOCALES = [Locales.EN, Locales.VI];
export const Default_Lang = Locales.EN;

export const SortTypeTable = {
  ascend: 'asc',
  descend: 'desc',
};

export const PAGE_SIZE = [25, 50, 100];

export const CommonTable = {
  textSelectAll: 'table.selectAll',
  textSelectPage: 'table.selectPage',
};

export enum LOGO {
  images = 'assets/images/logofpt.png',
  name = 'Capstone Management System',
}

export enum BACKGROUND {
  LOGIN_BACKGROUND = 'assets/images/login-background.jpg',
  LANDING_BACKGROUND = 'assets/images/background.jpg',
}

export enum FormType {
  FORM_2 = '2',
  FORM_14 = '14',
}

export const LINK_LOGIN_GUARD = [''];

export const DEFAULT_TIME_SEARCH_DEBOUND = 1000;

export const DEFAULT_TIME_FILTER_DEBOUND = 0;

export const BREAK_POINT = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

export const PAGE_SIZE_FILTER = {
  DEFAULT: 8,
};

export const DEFAULT_LOGO_SIZE = '120px';

export const DEAFULT_COLORS = {
  PRIMARY_COLOR: '#1B1B1B',
  TEXT_COLOR: '#1B1B1B',
  SECONDARY_COLOR: '#FF4343',
  BACKGROUND_COLOR: '#F7F7F7',
};

export const ENCRYPTION_SECRET = 'HEHEHE';

export const MappingLinkByRoles = {
  [USER_ROLE.MANAGER]: '/manager/',
  [USER_ROLE.SUPERVISOR]: '/supervisor/',
  [USER_ROLE.STUDENT]: '/student/',
  [USER_ROLE.ADMIN]: '/admin/',
};

export const MappingRedirectAfterLoginByRoles = {
  [USER_ROLE.MANAGER]: 'groups',
  [USER_ROLE.ADMIN]: 'groups',
  [USER_ROLE.SUPERVISOR]: 'my-groups',
  [USER_ROLE.STUDENT]: 'my-groups',
};
export const getTypeDescription = (type: number): string => {
  switch (type) {
    case 0:
      return 'Thường gặp';
    case 1:
      return 'Bệnh nền';
    case 2:
      return 'Phân biệt';
    case 3:
      return 'Bệnh nhi';
    default:
      return 'Không xác định';
  }
};
export enum FileType {
  IMPORT_GROUP = 1,
}
export const INIT_TINY_EDITOR = {
  plugins:
    'advlist autolink link image lists charmap preview anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table directionality emoticons accordion',
  toolbar:
    'undo redo | formatselect | bold italic | forecolor alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime | help',
  menubar: 'file edit view insert format tools table help',
  height: 500,
  images_file_types: 'jpg,svg,webp, jpeg, png',
  file_picker_types: 'file image media',
  statusbar: true,
  image_title: true,
  image_caption: true,
  image_advtab: true,
  image_uploadtab: false,
  images_reuse_filename: true,
  paste_data_images: true,
  a11y_advanced_options: true,
};

export enum ReportType {
  MANDATORY = 0,
  CUSTOM = 1,
}

export const reportTypeColor = (type: ReportType): string => {
  switch (type) {
    case ReportType.MANDATORY:
      return 'text-[#E53935] text-sm capitalize';
    case ReportType.CUSTOM:
      return 'text-[#4CAF50] text-sm capitalize';
    default:
      return '';
  }
};
export enum ReportStatus {
  ALL = -1,
  PENDING = 0,
  STARTED = 1,
  SUBMITTED = 2,
  OUTDATED = 3,
  CANCELLED = 4,
  GRADED = 5,
  REVIEWING = 6,
  DONE = 7,
  NOT_GRADED_YET = 8,
}
export const reportStatusOptions = Object.keys(ReportStatus)
  .filter((key) => isNaN(Number(key)))
  .map((key) => ({
    name: key,
    value: ReportStatus[key as keyof typeof ReportStatus],
  }));
export const reportStatusColor = (status: ReportStatus): string => {
  switch (status) {
    case ReportStatus.PENDING:
      return 'bg-yellow-100 text-yellow-700 border border-yellow-500 rounded-md px-2 py-1 text-xs capitalize';
    case ReportStatus.STARTED:
      return 'bg-green-100 text-green-700 border border-green-500 rounded-md px-2 py-1 text-xs capitalize';
    case ReportStatus.SUBMITTED:
      return 'bg-blue-100 text-blue-700 border border-blue-500 rounded-md px-2 py-1 text-xs capitalize';
    case ReportStatus.OUTDATED:
      return 'bg-gray-100 text-gray-700 border border-gray-500 rounded-md px-2 py-1 text-xs capitalize';
    case ReportStatus.CANCELLED:
      return 'bg-red-100 text-red-700 border border-red-500 rounded-md px-2 py-1 text-xs capitalize';
    case ReportStatus.GRADED:
      return 'bg-purple-100 text-purple-700 border border-purple-500 rounded-md px-2 py-1 text-xs capitalize';
    case ReportStatus.NOT_GRADED_YET:
      return 'bg-purple-100 text-purple-700 border border-purple-500 rounded-md px-2 py-1 text-xs capitalize';
    case ReportStatus.REVIEWING:
      return 'bg-orange-100 text-orange-700 border border-orange-500 rounded-md px-2 py-1 text-xs capitalize';
    case ReportStatus.DONE:
      return 'bg-blue-100 text-blue-700 border border-blue-500 rounded-md px-2 py-1 text-xs capitalize';
    default:
      return '';
  }
};

export enum LogType {
  LOG_OTHER = 0,
  LOG_CREATE_REPORT = 1,
  LOG_EDIT_TILE_REPORT = 2,
  LOG_EDIT_DEADLINE_REPORT = 3,
  LOG_EDIT_NOTE_REPORT = 4,
  LOG_EDIT_ATTACH_FILES_REPORT = 5,
  LOG_SUBMIT_REPORT_DRIVE = 6,
  LOG_SUBMIT_REPORT_FILE = 7,
  LOG_EDIT_REPORT_DRIVE = 8,
  LOG_EDIT_REPORT_FILE = 9,
  LOG_REVIEWED_REPORT = 10,
  LOG_GRADE_REPORT = 11,
  LOG_DELETE_MESSAGE = 12,
  LOG_CANCEL_REPORT = 13,
  LOG_EDIT_GRADE_REPORT = 14,
  LOG_RE_OPEN_REPORT = 15,
}

export const LogTypeName = {
  [LogType.LOG_OTHER]: 'Other Log',
  [LogType.LOG_CREATE_REPORT]: 'Create New <span class="font-semibold">Report</span>',
  [LogType.LOG_EDIT_TILE_REPORT]: 'Edit <span class="font-semibold">Report Title</span>',
  [LogType.LOG_EDIT_DEADLINE_REPORT]: 'Edit <span class="font-semibold">Report Deadline</span>',
  [LogType.LOG_EDIT_NOTE_REPORT]: 'Edit <span class="font-semibold">Report Note</span>',
  [LogType.LOG_EDIT_ATTACH_FILES_REPORT]: 'Edit <span class="font-semibold">Report Attach Files</span>',
  [LogType.LOG_SUBMIT_REPORT_DRIVE]: 'Submit <span class="font-semibold">Report (Drive)</span>',
  [LogType.LOG_SUBMIT_REPORT_FILE]: 'Submit <span class="font-semibold">Report (File)</span>',
  [LogType.LOG_EDIT_REPORT_DRIVE]: 'Edit <span class="font-semibold">Report (Drive)</span>',
  [LogType.LOG_EDIT_REPORT_FILE]: 'Edit <span class="font-semibold">Report (File)</span>',
  [LogType.LOG_REVIEWED_REPORT]: 'Reviewed <span class="font-semibold">Report</span>',
  [LogType.LOG_GRADE_REPORT]:
    '<span class="font-semibold">Change in</span> Grade <span class="font-semibold">Report</span>',
  [LogType.LOG_DELETE_MESSAGE]: 'Delete <span class="font-semibold">Message</span>',
  [LogType.LOG_CANCEL_REPORT]: 'Cancel <span class="font-semibold">Report</span>',
  [LogType.LOG_EDIT_GRADE_REPORT]: 'Edit <span class="font-semibold">Grade</span>',
  [LogType.LOG_RE_OPEN_REPORT]: 'Re open <span class="font-semibold">Grade</span>',
} as const;
export const isActiveStatusColor = (isActive: boolean): string => {
  if (isActive) {
    return 'bg-green-100 text-green-700 border border-green-500 rounded-md px-2 py-1 text-xs capitalize';
  }
  return 'bg-red-100 text-red-700 border border-red-500 rounded-md px-2 py-1 text-xs capitalize';
};

export enum SPRINT_STATUS {
  'CANCELED' = 'CANCELED',
  'PROCESSING' = 'PROCESSING',
  'DONE' = 'DONE',
  'OVERDUE' = 'OVERDUE',
}

export enum TASK_STATUS {
  'CANCELED' = 'CANCELED',
  'PROCESSING' = 'PROCESSING',
  'DONE' = 'DONE',
  'OVERDUE' = 'OVERDUE',
}

export enum TASK_STATUS_SELECT {
  'CANCELED' = 'CANCELED',
  'PROCESSING' = 'PROCESSING',
  'DONE' = 'DONE',
  'OVERDUE' = 'OVERDUE',
}

export const NO_AVATAR = 'assets/images/default-user-avatar.png';

export enum TASK_PRIORITY {
  LOW = 3,
  MEDIUM = 2,
  HIGH = 1,
  CRITICAL = 0,
}

export const TASK_PRIORITY_ARRAY = [
  { label: 'Low', value: TASK_PRIORITY.LOW },
  { label: 'Medium', value: TASK_PRIORITY.MEDIUM },
  { label: 'High', value: TASK_PRIORITY.HIGH },
  { label: 'Critical', value: TASK_PRIORITY.CRITICAL },
];

export enum REQUEST_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum REQUEST_TYPE {
  SPRINT = 'SPRINT',
  TOPIC = 'TOPIC',
  BAN = 'BAN',
  REPORT_GRADE_ZERO = 'REPORT_GRADE_ZERO',
}

export enum REQUEST_ACTION {
  SPRINT_CREATE = 'Create new sprint',
  SPRINT_UPDATE = 'Update sprint',
  CHANGE_TOPIC = 'Change topic',
  REPORT_GRADE_ZERO = 'Ban student when mandatory report got 0 grade',
}

export enum NOTIFY_ACTION {
  SPRINT_CREATED = 'SPRINT_CREATED',
  SPRINT_UPDATED = 'SPRINT_UPDATED',
  SPRINT_DELETED = 'SPRINT_DELETED',

  TASK_CREATED = 'TASK_CREATED',
  TASK_ASSIGNED = 'TASK_ASSIGNED',
  TASK_COMPLETED = 'TASK_COMPLETED',
  TASK_DUE_SOON = 'TASK_DUE_SOON',
  TASK_OVERDUE = 'TASK_OVERDUE',

  REQUEST_CREATED = 'REQUEST_CREATED',
  REQUEST_APPROVED = 'REQUEST_APPROVED',
  REQUEST_REJECTED = 'REQUEST_REJECTED',

  COMMENT_ADDED = 'COMMENT_ADDED',

  REPORT_SUBMITTED = 'REPORT_SUBMITTED',
  REPORT_GRADED = 'REPORT_GRADED',
  REPORT_CREATED = 'REPORT_CREATED',
  REPORT_EXTRA_TIME = 'REPORT_EXTRA_TIME',
  REPORT_UPDATED = 'REPORT_UPDATED',

  CHANGE_TOPIC = 'CHANGE_TOPIC',
  ADD_GROUP_RULE = 'ADD_GROUP_RULE',
  SET_LEADER = 'SET_LEADER',
  WARNING = 'WARNING',
  BAN = 'BAN',
  ACTIVATED = 'ACTIVATED',

  GIT_DISABLED = 'GIT_DISABLED',
}
