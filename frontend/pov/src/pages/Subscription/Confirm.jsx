import { useEffect, useState } from "react";
import { useToken } from "../../hooks/useToken"
import { useParams } from 'react-router-dom';
import { URL } from "../../router/routes";
import { Verified } from "../../components/Svg/Verified";
import { Link } from "react-router-dom";
export const Confirm = () => {
    const [beneficiary, setBeneficiary] = useState({})
    const TOKEN = JSON.parse(useToken().token)
    const { id } = useParams();


    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`${URL}/users?profile=${id}`, {headers: {
                Authorization: `Bearer ${TOKEN}`,
            }})

            const data =  await response.json()

            setBeneficiary(data)
        }
        getUser()
        
    },[TOKEN, id])

    const handleConfirm = async() => {
      const response = await fetch(`${URL}/payments/subscribe/${id}`, {method: "POST", headers:{
        Authorization: `Bearer ${TOKEN}`,
      }})

      const data = await response.json()

      window.location.href = data.session.url
    }

    return(
        <>
          <header className="w-full mt-[96px] mb-[12px] flex bg-white text-center">
            <div className="w-full md:max-w-[1000px] lg:mx-auto items-center ">
              <h2 className="text-[20px] font-bold">Datos de Subscripción</h2>
            </div>
          </header>
          <main className="w-full md:max-w-[1000px] lg:mx-auto px-[24px] text-center">
            <div className="flex text-center items-center justify-center">
                <p>{beneficiary.username}</p>
                <Verified />
            </div>
            <p>{beneficiary.suscribersCount} suscriptores</p>
            <img className="w-40 h-40 rounded-full mt-4 mx-auto my-auto" src={beneficiary.profile_picture}></img>
            <p className="mt-6">Lorem ipsum dolor sit amet consectetur. Nunc lacus iaculis molestie proin placerat. Urna diam ornare diam bibendum eget. Amet at pellentesque netus ut elit. Dui pulvinar ultrices vivamus ultrices accumsan mauris at molestie. Ante a quis tempor ac tellus. Tristique purus eget vitae.</p>
            <div className="flex space-x-48 mt-6">
              <p>$5.00</p>
              <p>Mensuales</p>
            </div>
            <div className="flex flex-col">
              <button className="btn mt-2 text-white hover:bg-gray-500 flex w-full h-14 px-10 justify-center items-center gap-4 flex-shrink-0 border rounded-lg bg-[#232322]" onClick={handleConfirm}>
                Continuar con el pago</button>
              <Link className="btn mt-2 text-dark hover:bg-gray-500 flex w-full h-14 px-10 justify-center items-center gap-4 flex-shrink-0 border rounded-lg bg-[#DADADA]" to={`/sub/${id}`}>
                Cancelar
              </Link>
            </div>
          </main>
        </>
    )
}