import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { server } from "../../components/constants/config";

const api=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:server}),
    tagsTypes:["Chat","User"],  // cashing

    endpoints:(builder) => ({
        myChat:builder.query({
            query:()=>({
                url:"/chat/my",
                credentials:"include"
            }),
            providesTags:["Chat"],
        }),
        searchUser:builder.query({
            query:(name)=>({
                url:`/user/search?name=${name}`,
                credentials:"include"
            }),
            providesTags:["User"],
        }),
    })
})

export default api;
export const {useMyChatQuery,useLazySearchUserQuery}=api;