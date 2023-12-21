import { Link, useNavigate, useParams } from "react-router-dom";
import { users } from "../../data/histories";
import CloseX from "../../components/Svg/CloseX";
import { Fragment, useState } from "react";

const HistoryContainer = () => {
  const { id } = useParams();
  const [time, setTime] = useState(users[id - 1].reels[0].time);

  const navigate = useNavigate();
  return (
    <>
      <header className="w-full px-[24px] py-2 fixed z-10 top-0 gap-4 flex justify-start items-center bg-[rgb(0,0,0,0.8)]">
        <div className="w-full max-w-[1000px] lg: mx-auto flex gap-4 items-center">
          <div className="sm:ml-[24px] flex justify-center items-center bg-gradient-to-b from-[#5D73E9] via-[#4C22B3] to-[#FF8600] rounded-full hover:-translate-y-1 hover:shadow-lg transition-transform">
            <picture className="w-[72px] h-[72px] overflow-hidden rounded-full border-2 border-transparent">
              <Link
                to={`/profile/${users[id - 1].id}`}
                className="w-full h-full flex justify-center items-center overflow-hidden bg-[#232322] rounded-full border-1 border-transparent"
              >
                {users[id - 1]?.profile_picture ? (
                  <img
                    src={users[id - 1].profile_picture}
                    alt={`avatar de ${users[id - 1].name}`}
                    className="w-[72px] h-[72px] object-cover"
                  />
                ) : (
                  users[id - 1].logo
                )}
              </Link>
            </picture>
          </div>
          <div>
            <p className="text-white text-lg">{users[id - 1].name}</p>
            <p className="mt-2 text-white text-xs font-thin">{`Publicado a las ${time}hs`}</p>
          </div>
          <button
            className="ml-auto md:mr-[24px] btn btn-circle btn-ghost bg-gray-200 hover:bg-slate-100"
            onClick={() => navigate("/home")}
          >
            <CloseX />
          </button>
        </div>
      </header>
      <main className="w-full h-screen max-w-[1000px] lg:mx-auto z-20 flex flex-col justify-center items-center bg-[rgba(0,0,0,0.9)]">
        <div className="carousel w-full h-screen">
          {users[id - 1].reels.map((reel, index) => (
            <Fragment key={index}>
              <div
                key={reel.id}
                id={`slide${reel.id}`}
                className="carousel-item relative w-full"
              >
                <img src={reel.gif} className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a
                    href={`#slide${
                      index === 0 ? users[id - 1].reels.length : reel.id - 1
                    }`}
                    className="btn btn-circle border-gray-400 text-gray-200"
                    onClick={() =>
                      setTime(
                        users[id - 1].reels[index === 0 ? 0 : index - 1].time
                      )
                    }
                  >
                    ❮
                  </a>
                  <a
                    href={`#slide${
                      index === users[id - 1].reels.length - 1 ? 1 : reel.id + 1
                    }`}
                    className="btn btn-circle border-gray-400 text-gray-200"
                    onClick={() =>
                      setTime(
                        users[id - 1].reels[
                          index === users[id - 1].reels.length - 1
                            ? 0
                            : index + 1
                        ].time
                      )
                    }
                  >
                    ❯
                  </a>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </main>
    </>
  );
};

export default HistoryContainer;
