import { createContext, useContext, useMemo } from "react"
import io from "socket.io-client"
export const server=import.meta.env.server;

const SocketContext=createContext();

const getSocket=()=>useContext(SocketContext)

const SocketProvider=({children})=>{

    const socket=useMemo(()=>io(server,{withCredentials:true}),[])

    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export {SocketProvider,getSocket}