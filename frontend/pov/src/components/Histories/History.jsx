import { Fragment } from "react";
import { LogoHistory } from "../Svg/Svgs";

const Histories = [
  {
    logo: <LogoHistory />,
    name: "Paola",
  },
  {
    logo: <LogoHistory />,
    name: "Fernando",
  },
  {
    logo: <LogoHistory />,
    name: "Carlos",
  },
  {
    logo: <LogoHistory />,
    name: "Luisa",
  },
];

export const History = () => {
  return (
    <>
      <h2 className="text-[20px] font-bold">Historias</h2>
      <div className="w-full max-w-[600px] mb-4 mx-auto flex flex-row justify-between">
        {Histories.map((history, index) => (
          <Fragment key={index}>
            <div className="flex flex-col gap-2 items-center">
              <div className="flex justify-center items-center bg-gradient-to-b from-[#5D73E9] via-[#4C22B3] to-[#FF8600] rounded-full">
                <div className="w-[72px] h-[72px] overflow-hidden rounded-full border-2 border-transparent">
                  {/* ESTE DIV DEBAJO SERA REEMPLAZADO COMPLETO POR LA IMAGEN DE LA HISTORIA */}
                  <div className="w-full h-full flex justify-center items-center overflow-hidden bg-[#232322] rounded-full border-8 border-transparent">
                    {history.logo}
                  </div>
                </div>
              </div>

              <h3 className="text-[14px] text-center">{history.name}</h3>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};
