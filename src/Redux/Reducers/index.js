import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "./AccountReducer";

const rootReducer = combineReducers({
    account: accountReducer
})

export default rootReducer