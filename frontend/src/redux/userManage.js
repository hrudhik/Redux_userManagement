

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/admin/users";

// 1️⃣ Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch users");
  }
});

// 2️⃣ Add new user
export const addUser = createAsyncThunk("users/add", async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.post(API, userData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to add user");
  }
});

// 3️⃣ Update user
export const updateUser = createAsyncThunk("users/update", async ({ id, userData }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`${API}/${id}`, userData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to update user");
  }
});

// 4️⃣ Delete user
export const deleteUser = createAsyncThunk("users/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API}/${id}`);
    return id; // return deleted user id to remove it from store
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to delete user");
  }
});

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add new user
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u._id === action.payload._id);
        if (index !== -1) state.users[index] = action.payload;
      })
      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      });
  },
});

export default userManagementSlice.reducer;
