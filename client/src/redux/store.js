import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./reducer/auth"
import miscSlice from "./reducer/misc"
import api from "./api/api";

const store=configureStore({
    reducer:{
        [authSlice.name]:authSlice.reducer,
        [miscSlice.name]:miscSlice.reducer,
        [api.reducerPath]:api.reducer
    },
    middleware:(mid)=>[...mid(),api.middleware]
})

export default store;