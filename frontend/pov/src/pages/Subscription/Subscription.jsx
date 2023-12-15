import { useEffect, useState } from "react";
import { useToken } from "../../hooks/useToken"
import { useParams } from 'react-router-dom';
import { URL } from "../../router/routes";
import Preview from "../../assets/Image preview of chat.png"
import { Link } from "react-router-dom";

export const Subscription = () => {
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

    return(
        <>
            <header className="w-full mt-[24px] mb-[12px] flex bg-white text-center">
                <div className="w-full md:max-w-[1000px] lg:mx-auto items-center ">
                <h2 className="text-[20px]">Datos de Subscripción</h2>
                </div>
          </header>
          <main className="w-full md:max-w-[1000px] lg:mx-auto px-[24px]">
            <div className="bg-[#D9D9D9]">
                <h4>Subscripción</h4>
                <ul className="list-disc">
                    <li>Precio - $5.00 usd</li>
                    <li>Duración - 30 días</li>
                    <li>Fecha de proximo pago - </li>
                </ul>

                <h4>Incluye</h4>
                <ul className="list-disc">
                    <li>Acceso a chat privado </li>
                    <li>Capacidad de enviar comentarios y reaccionar</li>
                    <li>Contacto directo con tu figura favorita</li>
                </ul>
            </div>
            <div className="flex">
                <img className="w-10 h-10 rounded-full mt-4" src={beneficiary.profile_picture}></img>
                <h3>{beneficiary.username}</h3>
            </div>
            <img className="w-68 h-40 mt-4 mx-auto my-auto" src={Preview}></img>
            <div className="flex flex-col">
              <Link className="btn mt-2 text-white hover:bg-gray-500 flex w-full h-14 px-10 justify-center items-center gap-4 flex-shrink-0 border rounded-md bg-[#232322]" to={`/sub/confirm/${id}`}>
                Pagar con Stripe</Link>
              <Link className="btn mt-2 text-dark hover:bg-gray-500 flex w-full h-14 px-10 justify-center items-center gap-4 flex-shrink-0 border rounded-md bg-[#DADADA]">
                Atras
              </Link>
            </div>
          </main>
        </>
    )
}