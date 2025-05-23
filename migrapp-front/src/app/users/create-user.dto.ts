export interface CreateUserDto {
    email: string;
    name: string;
    lastName: string;
    country: string;
    phonePrefix: string;
    phone: string;
    password: string;
    confirmPassword: string;
    userType: 'admin' | 'lawyer' | 'auditor' | 'reader';
    hasAccessToAllUsers: boolean;
    assignedUserIds: number[];
  }

export interface PagedResponse<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

export interface TableColumn {
  key: string;
  label: string;
  selected: boolean;
}