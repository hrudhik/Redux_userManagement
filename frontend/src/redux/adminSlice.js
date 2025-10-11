// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";



// export const adminlogin=createAsyncThunk("/admin/login",async (credantionls,{rejectWithValue}) => {
//     try {
//         const res=await axios("http://localhost:5000/admin/login",credantionls)
//         return res.data
//     } catch (error) {
//         rejectWithValue(error.response.data.message)
//     }

// })

// const adminSlice = createSlice({
//   name: "admin",
//   initialState: {
//     admin: null,
//     token: null,
//     isAuthenticated: false,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logoutAdmin: (state) => {
//       state.admin = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(adminlogin.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(adminlogin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.admin = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//       })
//       .addCase(adminlogin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logoutAdmin } = adminSlice.actions;
// export default adminSlice.reducer;



// // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// // import axios from "axios";

// // // ✅ Admin Login
// // export const adminlogin = createAsyncThunk("/admin/login", async (credentials, { rejectWithValue }) => {
// //     try {
// //         const res = await axios.post("http://localhost:5000/admin/login", credentials);
// //         return res.data;
// //     } catch (error) {
// //         return rejectWithValue(error.response.data.message);
// //     }
// // });

// // // ✅ Fetch Users
// // export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, { rejectWithValue }) => {
// //     try {
// //         const res = await axios.get("http://localhost:5000/admin/users");
// //         return res.data;
// //     } catch (error) {
// //         return rejectWithValue(error.response.data.message);
// //     }
// // });

// // // ✅ Block / Unblock User
// // export const toggleBlockUser = createAsyncThunk("admin/toggleBlockUser", async (userId, { rejectWithValue }) => {
// //     try {
// //         const res = await axios.put(`http://localhost:5000/admin/block/${userId}`);
// //         return res.data;
// //     } catch (error) {
// //         return rejectWithValue(error.response.data.message);
// //     }
// // });

// // const adminSlice = createSlice({
// //     name: "admin",
// //     initialState: {
// //         admin: null,
// //         token: null,
// //         isAuthenticated: false,
// //         loading: false,
// //         error: null,
// //         users: [], // 🟢 added this for dashboard
// //     },
// //     reducers: {
// //         logoutAdmin: (state) => {
// //             state.admin = null;
// //             state.token = null;
// //             state.isAuthenticated = false;
// //             state.error = null;
// //         },
// //     },
// //     extraReducers: (builder) => {
// //         builder
// //             // 🟢 Admin Login
// //             .addCase(adminlogin.pending, (state) => {
// //                 state.loading = true;
// //                 state.error = null;
// //             })
// //             .addCase(adminlogin.fulfilled, (state, action) => {
// //                 state.loading = false;
// //                 state.admin = action.payload.user;
// //                 state.token = action.payload.token;
// //                 state.isAuthenticated = true;
// //             })
// //             .addCase(adminlogin.rejected, (state, action) => {
// //                 state.loading = false;
// //                 state.error = action.payload;
// //             })

// //             // 🟢 Fetch Users
// //             .addCase(fetchUsers.pending, (state) => {
// //                 state.loading = true;
// //             })
// //             .addCase(fetchUsers.fulfilled, (state, action) => {
// //                 state.loading = false;
// //                 state.users = action.payload;
// //             })
// //             .addCase(fetchUsers.rejected, (state, action) => {
// //                 state.loading = false;
// //                 state.error = action.payload;
// //             })

// //             // 🟢 Block / Unblock User
// //             .addCase(toggleBlockUser.fulfilled, (state, action) => {
// //                 const updatedUser = action.payload;
// //                 const index = state.users.findIndex((u) => u._id === updatedUser._id);
// //                 if (index !== -1) {
// //                     state.users[index] = updatedUser;
// //                 }
// //             });
// //     },
// // });

// // export const { logoutAdmin } = adminSlice.actions;
// // export default adminSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Step 1: Create async thunk for admin login
export const adminLogin = createAsyncThunk(
  "admin/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/admin/login", credentials);
      localStorage.setItem("adminToken", response.data.token); // save token
      return response.data; // send data to extraReducers
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// 🔹 Step 2: Create slice
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
      localStorage.removeItem("adminToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
