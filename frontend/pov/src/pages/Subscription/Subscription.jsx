import { useEffect, useState } from "react";
import { useToken } from "../../hooks/useToken";
import { useParams, useNavigate } from "react-router-dom";
import { URL } from "../../router/routes";
import { Link } from "react-router-dom";
import { format, addMonths } from "date-fns";
import Preview from "../../assets/preview.png";

export const Subscription = () => {
  const [beneficiary, setBeneficiary] = useState({});
  const nextPayment = format(addMonths(new Date(), 1), "dd/MM/yyyy");
  const navigate = useNavigate();

  const TOKEN = JSON.parse(useToken().token);
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${URL}/users?profile=${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const data = await response.json();

      setBeneficiary(data);
    };
    getUser();
  }, [TOKEN, id]);

  return (
    <>
      <header className="w-full mt-[24px] mb-[12px] flex bg-white text-center">
        <div className="w-full md:max-w-[1000px] lg:mx-auto items-center ">
          <h2 className="text-[20px] font-bold">Datos de Subscripción</h2>
        </div>
      </header>
      <main className="w-full md:max-w-[1000px] lg:mx-auto px-[24px]">
        <div className="bg-[#D9D9D9] rounded-lg p-3">
          <p className="font-medium">Subscripción</p>
          <ul className="list-disc ml-8 text-sm">
            <li>Precio - $5.00 usd</li>
            <li>Duración - 30 días</li>
            <li>Fecha de proximo pago - {nextPayment}</li>
          </ul>

          <p className="font-medium">Incluye</p>
          <ul className="list-disc ml-8 text-sm">
            <li>Acceso a chat privado </li>
            <li>Capacidad de enviar comentarios y reaccionar</li>
            <li>Contacto directo con tu figura favorita</li>
          </ul>
        </div>
        <div className="flex mt-6 items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={beneficiary.profile_picture}
          ></img>
          <h3 className="ml-2">{beneficiary.username}</h3>
        </div>
        <img
          className="w-[233px] h-[168px] mt-8 mx-auto my-auto"
          src={Preview}
        ></img>
        <div className="flex flex-col mt-32">
          <Link
            className="btn mt-2 text-white hover:bg-gray-500 flex w-full h-14 px-10 justify-center items-center gap-4 flex-shrink-0 border rounded-lg bg-[#232322]"
            to={`/sub/confirm/${id}`}
          >
            Pagar con Stripe
          </Link>
          <Link
            className="btn mt-2 text-dark hover:bg-gray-500 flex w-full h-14 px-10 justify-center items-center gap-4 flex-shrink-0 border rounded-lg bg-[#DADADA]"
            to="/home"
          >
            Atras
          </Link>
        </div>
      </main>
    </>
  );
};
