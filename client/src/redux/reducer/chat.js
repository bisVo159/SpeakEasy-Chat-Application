import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../components/constants/events";

const initialState={
    notificationsCount:0,
    newMessagesAlert:getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,get:true})||[{
        chatId:"",
        count:0
    }]
}
const chatSlice=createSlice({
    name:"chat",
    initialState,
    reducers:{
        incrementNotification:(state)=>{
            state.notificationsCount+=1;
        },
        resetNotification:(state)=>{
            state.notificationsCount=0;
        },
        setNewMessagesAlert:(state,action)=>{
            const index=state.newMessagesAlert.findIndex(
                item=>item.chatId===action.payload.chatId);
            
            const chatId=action.payload.chatId;
            if(index===-1){
                state.newMessagesAlert.push({
                    chatId,
                    count:1
                });
            }
            else state.newMessagesAlert[index].count++;
        },
        removeNewMessagesAlert:(state,action)=>{
            state.newMessagesAlert=state.newMessagesAlert.filter(
                item=>item.chatId!==action.payload
            )
        },
    }
})

export default chatSlice;
export const {
    incrementNotification,
    resetNotification,
    setNewMessagesAlert,
    removeNewMessagesAlert
}=chatSlice.actions