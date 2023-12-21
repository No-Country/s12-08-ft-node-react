import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Response = ({ responses, lastOne, toShow, page, setPage }) => {
  const { createdAt, text, user_photo, username } = responses;
  const [formatDate, setFormatDate] = useState(
    format(new Date(), "dd-MM-yyyy hh:mm")
  );

  useEffect(() => {
    setFormatDate(format(new Date(createdAt), "dd-MM-yyyy hh:mm"));
  }, [createdAt]);

  const handlePage = (e) => {
    e.stopPropagation();
    setPage(page + 1);
  };

  return (
    responses && (
      <div className="flex items-center w-full">
        <div className="w-[24px] h-[24px] mr-[3px] overflow-hidden rounded-full">
          <img
            alt="user avatar"
            src={user_photo}
            className="w-[24px] h-[24px] object-cover"
          />
        </div>
        <div className="flex flex-col w-full overflow-auto">
          <p className="text-[12px] text-black break-words">
            <span className="font-black">{username}: </span>
            {text}
          </p>
          <div className="flex">
            <p className="text-[10px] font-thin">{formatDate} </p>
            {lastOne && toShow > 0 && (
              <Link
                onClick={handlePage}
                className="cursor-pointer text-[12px] ml-auto"
              >
                +{toShow > 10 ? 10 : toShow} {">"}
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Response;
