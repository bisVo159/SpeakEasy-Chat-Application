import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isNewGroup:false,
    isAddMember:false,
    isNotification:false,
    isMobile:false,
    isSearch:false,
    isFileMenu:false,
    isDeleteMenu:false,
    uploadingLoader:false,
    seletedDeleteChat:{
        chatId:"",
        groupChat:false
    },
}
const miscSlice=createSlice({
    name:"misc",
    initialState,
    reducers:{
        setIsNewGroup:(state,action)=>{
            state.isNewGroup=action.payload;
        },
        setIsAddMember:(state,action)=>{
            state.isAddMember=action.payload;
        },
        setNotification:(state,action)=>{
            state.isNotification=action.payload;
        },
        setIsMobile:(state,action)=>{
            state.isMobile=action.payload;
            },
        setIsSearch:(state,action)=>{
            state.isSearch=action.payload;
        },
        setIsFileMenu:(state,action)=>{
            state.isFileMenu=action.payload;
        },
        setIsDeleteMenu:(state,action)=>{
            state.isDeleteMenu=action.payload;
        },
        setSeletedDeleteChat:(state,action)=>{
            state.seletedDeleteChat=action.payload;
        },
        setUploadingLoader:(state,action)=>{
            state.uploadingLoader=action.payload;
        },
    }
})

export default miscSlice;
export const {
    setIsNewGroup,
    setIsAddMember,
    setNotification,
    setIsMobile,
    setIsSearch,
    setIsFileMenu,
    setDeleteMenu,
    setSeletedDeleteChat,
    setUploadingLoader,
    setIsDeleteMenu
}=miscSlice.actions