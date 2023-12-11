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
      <div className="flex flex-row gap-5 md:gap-36 justify-center">
        {Histories.map((history, index) => (
          <Fragment key={index}>
            <div className="flex flex-col">
              <div className="flex flex-col justify-center items-center w-[72px] h-[72px] rounded-full bg-[#D9D9D9]">
                <span>{history.logo}</span>
              </div>
              <div className="flex flex-row justify-center text-[14px]">
                <h3>{history.name}</h3>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};
