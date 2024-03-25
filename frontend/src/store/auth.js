import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { email: "", password: "", loggedIn: false };
export const AuthSlice = createSlice({
  name: "login",
  initialState: initialAuthState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const { setLoggedIn, setEmail, setPassword } = AuthSlice.actions;
export default AuthSlice.reducer;
