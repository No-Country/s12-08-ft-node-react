import BackBtn from "../../components/Svg/BackBtn";
import noUser from "../../assets/avatars/no_user.svg";
import fondo from "../../assets/avatars/fondo1.jpg";
import Cheked from "../../components/Svg/Cheked";

const ChatContainer = () => {

  return (
    <>
      <header
        className="flex justify-between items-center px-[24px] py-2 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${fondo})`,
        }}
      >
        <div className="w-[79px]">
          <BackBtn color={"white"} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <img src={noUser} alt="" />
          <p className="flex w-full items-center justify-center gap-2 text-white text-[14px]">
            Lucas<span>{<Cheked />}</span>
          </p>
          <p className="text-white text-[12px] font-thin">
            <span>13,8</span> millones
          </p>
        </div>
        <button className="w-[79px] h-[28px] md:w-[120px] text-white text-[10px] rounded-full bg-[#232322] border-none hover:bg-gray-600">
          Subscribirse
        </button>
      </header>

      <main></main>
    </>
  );
  
};

export default ChatContainer;
