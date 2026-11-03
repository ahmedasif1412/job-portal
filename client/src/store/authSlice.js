import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { registerUser, loginUser, getCurrentUser } from "../api/auth";

// A thunk = an async action. If the api function throws, the thunk becomes "rejected"
// and the error message lands in action.error.message.
export const register = createAsyncThunk("auth/register", async (credentials) => {
  return await registerUser(credentials);
});

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const data = await loginUser(credentials);
  localStorage.setItem("token", data.token);
  return data;
});

export const checkLoggedIn = createAsyncThunk("auth/checkLoggedIn", async () => {
  try {
    return await getCurrentUser();
  } catch (err) {
    localStorage.removeItem("token");
    throw err;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, error: "" },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { id, name, role } = action.payload;
        state.user = { id, name, role };
      })
      .addCase(checkLoggedIn.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addMatcher(isAnyOf(login.pending, register.pending), (state) => {
        state.error = "";
      })
      .addMatcher(isAnyOf(login.rejected, register.rejected), (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
