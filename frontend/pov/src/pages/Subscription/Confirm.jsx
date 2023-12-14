import { useEffect, useState } from "react";
import { useToken } from "../../hooks/useToken"
import { useParams } from 'react-router-dom';
import { URL } from "../../router/routes";
export const Confirm = () => {
    const [user, setUser] = useState({})
    const TOKEN = JSON.parse(useToken().token)
    const { id } = useParams();


    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`${URL}/users/${id}`)
            console.log(response)
        }
        getUser
        
    },[id])

    console.log(id)

    
    return(
        <>
      <header className="w-full px-[24px] py-[10px] mt-[96px] mb-[12px] flex bg-white">
        <div className="w-full md:max-w-[1000px] lg:mx-auto items-center ">
          <h2 className="text-[20px]">Datos de Subscripción</h2>
        </div>
      </header>
        </>
    )
}