import { createContext, useEffect, useState } from "react";
import { io } from 'socket.io-client'

export const ChatContext = createContext()

export const ChatProvider = ({ children, user }) => {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
      const newSocket = io('https://pov.azurewebsites.net/')
      setSocket(newSocket)

      return () => {
        newSocket.disconnect()
      }
    }, [user])


    return (
        <ChatContext.Provider>
            {children}
        </ChatContext.Provider>
    )
}