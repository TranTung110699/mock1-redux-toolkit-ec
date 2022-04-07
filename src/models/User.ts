export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegister {
  username: string;
  password: string;
  email: string;
}

export interface UserLogout {
  refreshToken: string | null;
}

export interface UserRefreshToken {
  refreshToken: string;
}

export interface RefreshTokenOutput {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
}

export interface UserModel {
  user: {
    score: number;
    role: string;
    isEmailVerified: boolean;
    avatar: string;
    username: string;
    email: string;
    id: string;
  };
  tokens: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
}

export interface ManageUser {
  score: number;
  role: string;
  isEmailVerified: boolean;
  avatar: string;
  username: string;
  email: string;
  id: string;
}
export interface UserAdminModel {
  results: ManageUser[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

//Admin manage User
export interface UserCreate {
  username: string;
  password: string;
  email: string;
  role: string;
}

export interface UserUpdate {
  avatar: string;
}

export interface User {
  user: {
    score: number;
    role: string;
    isEmailVerified: boolean;
    avatar: string;
    username: string;
    email: string;
    id: string;
  };
}
