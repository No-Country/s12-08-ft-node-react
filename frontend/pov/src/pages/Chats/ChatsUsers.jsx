import { Fragment } from 'react';
import { CheckedLogo, LogoHistory } from '../../components/Svg/Svgs';

const Chats = [
  {
    logo: <LogoHistory />,
    message: 'Hello',
    name: 'Santiago',
    check: <CheckedLogo />,
    date: 'Yesterday, 15:20',
  },
  {
    logo: <LogoHistory />,
    message: 'Okay',
    name: 'Agustina',
    check: <CheckedLogo />,
    date: 'Saturday, 18:30',
  },
  {
    logo: <LogoHistory />,
    message: 'Hello',
    name: 'Santiago',
    check: <CheckedLogo />,
    date: 'Yesterday, 15:20',
  },
];

export const ChatsUsers = () => {
  return (
    <main className="flex pt-24 px-5">
      <div className="flex flex-col bg-[#D9D9D9F0] rounded-3xl h-full w-full p-5 shadow-2xl ">
        <h1 className="text-start text-5xl">Chats</h1>
        {Chats.map((chat, index) => {
          return (
            <Fragment key={index}>
              <div className="flex flex-row justify-center sm:justify-start">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex flex-col items-center pt-10">
                    <span className="flex justify-center items-center w-28 h-28 rounded-full bg-[#2F2F2F87]">
                      {chat.logo}
                    </span>
                    <p className="flex items-center justify-center w-20 h-5 rounded-xl bg-[#fff]">
                      {chat.message}
                    </p>
                  </div>

                  <div className="flex flex-col justify-center pl-5">
                    <div className="flex flex-row w-52 sm:w-96 justify-between">
                      <h1 className="text-2xl">{chat.name}</h1>
                      <div className="flex flex-col items-end">
                        <span>{chat.check}</span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-5 w-72 sm:w-96 text-sm">
                      <span className="flex justify-center items-center w-10 h-10 rounded-full bg-[#2F2F2F87]">
                        {chat.logo}
                      </span>
                      <p>{chat.message}</p>
                      <div className="flex flex-row w-32 sm:w-72 justify-end ">
                        <p>{chat.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </main>
  );
};
