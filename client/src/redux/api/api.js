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
                let url=`/chat/${chatId}`
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
            keepUnusedDataFor:0,   //no cashing
        }),
        sendAttachments:builder.mutation({
            query:(data)=>({
                url:'/chat/message',
                method:"POST",
                credentials:"include",
                body:data
            }),
        }),
        myGroups:builder.query({
            query:()=>({
                url:"/chat/my/groups",
                credentials:"include"
            }),
            providesTags:["Chat"],
        }),
        availFriendDetails:builder.query({
            query:(chatId)=>{
                let url="/user/friends"
                if(chatId) url+=`?chatId=${chatId}`
                return {
                    url,
                    credentials:"include",
                }
            },
            providesTags:["Chat"],  
        }),
        newGroup:builder.mutation({
            query:({name,members})=>({
                url:'/chat/new',
                method:"POST",
                credentials:"include",
                body:{name,members}
            }),
            invalidatesTags:["Chat"],
        }),
        renameGroup:builder.mutation({
            query:({chatId,name})=>({
                url:`/chat/${chatId}`,
                method:"PUT",
                credentials:"include",
                body:{name}
            }),
            invalidatesTags:["Chat"],
        }),
        removeGroupMember:builder.mutation({
            query:({chatId,userId})=>({
                url:`/chat/removemember`,
                method:"PUT",
                credentials:"include",
                body:{chatId,userId}
            }),
            invalidatesTags:["Chat"],
        }),
        addGroupMember:builder.mutation({
            query:({chatId,members})=>({
                url:`/chat/addmembers`,
                method:"PUT",
                credentials:"include",
                body:{chatId,members}
            }),
            invalidatesTags:["Chat"],
        }),
        deleteChat:builder.mutation({
            query:(chatId)=>({
                url:`/chat/${chatId}`,
                method:"DELETE",
                credentials:"include",
            }),
            invalidatesTags:["Chat"],
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
    useSendAttachmentsMutation,
    useMyGroupsQuery,
    useAvailFriendDetailsQuery,
    useNewGroupMutation,
    useRenameGroupMutation,
    useRemoveGroupMemberMutation,
    useAddGroupMemberMutation,
    useDeleteChatMutation
}=api;