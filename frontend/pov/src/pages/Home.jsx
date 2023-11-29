<<<<<<< HEAD
import { Cards } from "../components/Cards";
import ContainerSubscriptions from "../components/Subscription/ContainerSubscriptions";
=======
import { Fragment } from 'react';
import { LogoHistory } from '../components/Svg/Logo';

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
>>>>>>> 7aa49a6ba787b8c7a9cc983f18811362e517c113

export const Home = () => {
  return (
    <>
<<<<<<< HEAD
      <h1>Este es el Home-Page</h1>
      <Cards />
      <ContainerSubscriptions />
=======
      <section className="flex flex-col pt-28 px-5">
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
      </section>
>>>>>>> 7aa49a6ba787b8c7a9cc983f18811362e517c113
    </>
  );
};
