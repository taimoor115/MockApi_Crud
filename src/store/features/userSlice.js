import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  users: [],
  user: [],
  status: STATUSES.IDLE,
  setSearch: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(postUser.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.status = STATUSES.IDLE;
      })
      .addCase(postUser.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(getUserById.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(getUserById.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(destroyUser.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(destroyUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.status = STATUSES.IDLE;
      })
      .addCase(destroyUser.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
        state.status = STATUSES.IDLE;
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

// export const {} = userSlice.action;
export default userSlice.reducer;

export const getUsers = createAsyncThunk("getUsers", async () => {
  const response = await apiClient.get("/users");
  return response.data;
});

export const postUser = createAsyncThunk("postUser", async (userData) => {
  const data = await apiClient.post("/users", userData);

  console.log(data);
});

export const getUserById = createAsyncThunk("getUserById", async (userId) => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
});

export const destroyUser = createAsyncThunk("deleteUser", async (id) => {
  await apiClient.delete(`/users/${id}`);
  return id;
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ updatedData, id }) => {
    console.log("Hello", id);
    console.log("Hello2", updatedData);
    const response = await apiClient.put(`/users/${id}`, updatedData);
    console.log(response.data);
    return response.data;
  }
);
