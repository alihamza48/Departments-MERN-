import { createSlice } from "@reduxjs/toolkit";

const initialDeptState = { name: "", logo: "", parentId: null };
export const DeptSlice = createSlice({
  name: "department",
  initialState: initialDeptState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setLogo: (state, action) => {
      state.logo = action.payload;
    },
    setParentId: (state, action) => {
      state.parentId = action.payload;
    },
  },
});

export const { setName, setLogo, setParentId } = DeptSlice.actions;
export default DeptSlice.reducer;
