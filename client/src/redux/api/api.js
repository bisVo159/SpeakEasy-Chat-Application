import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { server } from "../../components/constants/config";

const api=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:server}),
    tagsTypes:["Chat","User","Message"],  // cashing

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
        sendFrindRequest:builder.mutation({
            query:(data)=>({
                url:'/user/sendRequest',
                method:"PUT",
                credentials:"include",
                body:data
            }),
            invalidatesTags:["User"],
        }),
        getNotifications:builder.query({
            query:()=>({
                url:'/user/notifications',
                credentials:"include",
            }),
            keepUnusedDataFor:0,  // not cashing
        }),
        acceptFriendRequest:builder.mutation({
            query:(data)=>({
                url:'/user/acceptrequest',
                method:"PUT",
                credentials:"include",
                body:data
            }),
            invalidatesTags:["Chat"],
        }),
        getChatDetails:builder.query({
            query:({chatId,populate=false})=>{
                const url=`/chat/${chatId}`
                if(populate) url+="?populate=true"
                return {
                    url,
                    credentials:"include",
                }
            },
            providesTags:["Chat"],  
        }),
        getMesseges:builder.query({
            query:({chatId,page=1})=>({
                    url:`/chat/message/${chatId}?page=${page}`,
                    credentials:"include",
            }),
            providesTags:["Message"],  
        }),
        sendAttachments:builder.mutation({
            query:(data)=>({
                url:'/chat/message',
                method:"POST",
                credentials:"include",
                body:data
            }),
        }),
    })
})

export default api;
export const {
    useMyChatQuery,
    useLazySearchUserQuery,
    useSendFrindRequestMutation,
    useGetNotificationsQuery,
    useAcceptFriendRequestMutation,
    useGetChatDetailsQuery, 
    useGetMessegesQuery,
    useSendAttachmentsMutation
}=api;