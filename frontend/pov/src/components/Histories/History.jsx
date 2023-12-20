import { Fragment } from "react";
import { Link } from "react-router-dom";
import { users } from "../../data/histories";

export const History = () => {
  return (
    <>
      <h2 className="text-[20px] font-bold">Historias</h2>
      <div className="w-full max-w-[600px] mb-4 mx-auto flex flex-row justify-between">
        {users.map((user) => (
          <Fragment key={user.id}>
            <div className="flex flex-col gap-2 items-center">
              <div className="flex justify-center items-center bg-gradient-to-b from-[#5D73E9] via-[#4C22B3] to-[#FF8600] rounded-full hover:-translate-y-1 hover:shadow-lg transition-transform">
                <div className="w-[72px] h-[72px] overflow-hidden rounded-full border-2 border-transparent">
                  {/* ESTE DIV DEBAJO SERA REEMPLAZADO COMPLETO POR LA IMAGEN DE LA HISTORIA */}
                  <Link
                    to={`/histories/${user.id}`}
                    className="w-full h-full flex justify-center items-center overflow-hidden bg-[#232322] rounded-full border-1 border-transparent"
                  >
                    {user?.profile_picture ? (
                      <img
                        src={user.profile_picture}
                        alt={`avatar de ${user.name}`}
                        className="w-[72px] h-[72px] object-cover"
                      />
                    ) : (
                      user.logo
                    )}
                  </Link>
                </div>
              </div>
              <h3 className="text-[14px] text-center">{user.name}</h3>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};
