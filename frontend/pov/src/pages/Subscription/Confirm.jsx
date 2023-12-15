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
          <header className="w-full mt-[78px] mb-[12px] flex bg-white text-center">
            <div className="w-full md:max-w-[1000px] lg:mx-auto items-center ">
              <h2 className="text-[20px] font-bold">Datos de Subscripción</h2>
            </div>
          </header>
          <main className="w-full md:max-w-[1000px] mt-12 lg:mx-auto px-[24px] text-center">
            <div className="flex text-center items-center justify-center">
                <p className="font-bold">{beneficiary.username}</p>
                <Verified />
            </div>
            <p className="font-light">{beneficiary.suscribersCount} suscriptores</p>
            <img className="w-40 h-40 rounded-full mt-4 mx-auto my-auto" src={beneficiary.profile_picture}></img>
            <p className="mt-6 text-sm">Al proceder con la confirmación del pago, se entiende que aceptas plenamente las condiciones establecidas por Stripe, así como los Términos y Condiciones de POV. Este acuerdo contractual regula la relación entre el usuario y nuestra plataforma, garantizando un uso adecuado de los servicios proporcionados.</p>
            <div>
              <div className="flex space-x-40 mt-8 bg-[#D9D9D9] rounded-lg py-2 items-center">
                <p className="font-bold ml-3">$<span className="text-[24px]">5</span>.00</p>
                <p className="bg-[#FF8600] rounded-full text-sm px-3 py-1 mr-3">Mensuales</p>
              </div>
              <div className="border-b-[1px] border-gray-400 w-full my-4"></div>
              <div className="flex flex-col">
                <button className="btn mt-2 text-white hover:bg-gray-500 flex w-full h-14 px-10 justify-center items-center gap-4 flex-shrink-0 border rounded-lg bg-[#232322]" onClick={handleConfirm}>
                  Continuar con el pago</button>
                <Link className="btn mt-2 text-dark hover:bg-gray-500 flex w-full h-14 px-10 justify-center items-center gap-4 flex-shrink-0 border rounded-lg bg-[#DADADA]" to={`/sub/${id}`}>
                  Cancelar
                </Link>
              </div>
            </div>
          </main>
        </>
    )
}