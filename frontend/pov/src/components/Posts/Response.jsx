import {format} from "date-fns"
import { useEffect, useState } from "react";
const Response = ({ responses }) => {
  const { createdAt, text, user_photo, username } = responses;
  const [formatDate, setFormatDate] = useState(format(new Date(), 'dd-MM-yyyy hh:mm'))

  useEffect(() => {
    setFormatDate(format(new Date(createdAt), 'dd-MM-yyyy hh:mm'))
  }, [createdAt])

  return (
    responses && (
      <>
        <img alt="user avatar" src={user_photo} className="w-[24px] rounded-full" />
        <div className="flex flex-col">
          <p className="text-[12px] text-black">
          <span className="font-black">{username}: </span>
            {text}
          </p>
          <p className="text-[10px] font-thin">{formatDate} </p>
        </div>
        
      </>
    )
  );
};

export default Response;
