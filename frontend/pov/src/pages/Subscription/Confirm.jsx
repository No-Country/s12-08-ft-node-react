import { useEffect, useState } from "react";
import { useToken } from "../../hooks/useToken"
import { useParams } from 'react-router-dom';
import { URL } from "../../router/routes";
import { Verified } from "../../components/Svg/Verified";
export const Confirm = () => {
    const [beneficiary, setBeneficiary] = useState({})
    const TOKEN = JSON.parse(useToken().token)
    const { id } = useParams();


    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`${URL}/users`, {headers: {
                Authorization: `Bearer ${TOKEN}`,
            }})

            const data =  await response.json()

            setBeneficiary(data)
        }
        getUser()
        
    },[id])

    const handleConfirm = () => {
      console.log("confirm")
    }


    const handleCancel = () => {
      console.log("cancel")
    }
    
    return(
        <>
      <header className="w-full px-[24px] py-[10px] mt-[96px] mb-[12px] flex bg-white">
        <div className="w-full md:max-w-[1000px] lg:mx-auto items-center ">
          <h2 className="text-[20px]">Datos de Subscripción</h2>
        </div>
      </header>
      <main className="w-full md:max-w-[1000px] lg:mx-auto px-[24px]">
        <h3 className="flex flex-row">{beneficiary.username} <Verified /> </h3>
        <p>{beneficiary.suscribersCount} suscriptores</p>
        <img className="w-40 h-40 rounded-full mt-4" src={beneficiary.profile_picture ? beneficiary.profile_picture : 'https://res.cloudinary.com/dkgvoukdj/image/upload/v1702563393/pov/uaotuzpgadixhmaoxtxy.avif'}></img>
        <p className="mt-6">Lorem ipsum dolor sit amet consectetur. Nunc lacus iaculis molestie proin placerat. Urna diam ornare diam bibendum eget. Amet at pellentesque netus ut elit. Dui pulvinar ultrices vivamus ultrices accumsan mauris at molestie. Ante a quis tempor ac tellus. Tristique purus eget vitae.</p>
        <div className="flex space-x-48 mt-6">
          <p>$5.00</p>
          <p>Mensuales</p>
        </div>
        <div className="flex flex-col">
          <button className="btn text-white hover:bg-gray-500 flex w-full h-14 px-10 justify-center items-center gap-4 flex-shrink-0 border rounded-md bg-[#232322]" onClick={handleConfirm}>
            Continuar con el pago</button>
          <button className="btn text-dark hover:bg-gray-500 flex w-full h-14 px-10 justify-center items-center gap-4 flex-shrink-0 border rounded-md bg-[#DADADA]" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </main>
        </>
    )
}