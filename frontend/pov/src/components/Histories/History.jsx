import { Fragment } from 'react';
import { LogoHistory } from '../Svg/Svgs';

const Histories = [
  {
    logo: <LogoHistory />,
    name: 'Paola',
  },
  {
    logo: <LogoHistory />,
    name: 'Fernando',
  },
  {
    logo: <LogoHistory />,
    name: 'Carlos',
  },
  {
    logo: <LogoHistory />,
    name: 'Luisa',
  },
];

export const History = () => {
  return (
    <>
      <h1 className="text-4xl text-black ">Historias</h1>
      <div className="flex flex-row gap-5 md:gap-36 justify-center">
        {Histories.map((history, index) => (
          <Fragment key={index}>
            <div className="flex flex-col">
              <div className="flex flex-col justify-center items-center w-20 h-20 rounded-full bg-[#D9D9D9]">
                <span>{history.logo}</span>
              </div>
              <div className="flex flex-row justify-center text-lg">
                <h1>{history.name}</h1>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};
