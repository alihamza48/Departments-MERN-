import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth";
import departmentReducer from "./dept";

const Store = configureStore({
  reducer: { login: AuthReducer, department: departmentReducer },
});
export default Store;
