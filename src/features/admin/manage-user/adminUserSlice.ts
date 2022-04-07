import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ManageUser,
  UserAdminModel,
  UserCreate,
  UserUpdate,
} from "../../../models/User";
import { Page } from "../../../models/Question";

interface questionType {
  users: UserAdminModel;
  getUserById?: ManageUser;
  postUser?: ManageUser;
  patchUser?: ManageUser;
}

interface patchUserType {
  user: UserUpdate;
  userId: string;
}

const initialState: questionType = {
  users: {
    results: [],
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0,
  },
  getUserById: undefined,
  postUser: undefined,
  patchUser: undefined,
};

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {
    getAdminUser: (state, action: PayloadAction<Page>) => {},
    getAdminUserSuccess: (state, action: PayloadAction<UserAdminModel>) => {
      state.users = action.payload;
    },

    getAdminUserById: (state, action: PayloadAction<string>) => {},
    getAdminUserByIdSuccess: (state, action: PayloadAction<ManageUser>) => {
      state.getUserById = action.payload;
    },

    postAdminUser: (state, action: PayloadAction<UserCreate>) => {},
    postAdminUserSuccess: (state, action: PayloadAction<ManageUser>) => {
      state.postUser = action.payload;
    },

    patchAdminUser: (state, action: PayloadAction<patchUserType>) => {},
    patchAdminUserSuccess: (state, action: PayloadAction<ManageUser>) => {
      state.patchUser = action.payload;
    },
  },
});

export const adminUserAction = adminUserSlice.actions;
const adminUserReducer = adminUserSlice.reducer;
export default adminUserReducer;
