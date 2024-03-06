// store.js
import { configureStore } from '@reduxjs/toolkit';

import globalReducer from "../state/index";
import { setupListeners } from "@reduxjs/toolkit/query";
// import {api} from "../state/api";

const store = configureStore({
    reducer: {
      
        global:globalReducer,
    //    [api.reducerPath]:api.reducer,
      
    },
    // middleware:(getDeault)=> getDeault().concat(api.middleware)
});
setupListeners(store.dispatch)

export default store;