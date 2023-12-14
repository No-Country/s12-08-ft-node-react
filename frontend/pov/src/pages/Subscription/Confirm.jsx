import { useToken } from "../../hooks/useToken"
export const Confirm = () => {
    const TOKEN = JSON.parse(useToken().token)

    
    return(
        <>
      <header className="w-full px-[24px] py-[10px] mt-[96px] mb-[12px] flex bg-white">
        <div className="w-full md:max-w-[1000px] lg:mx-auto items-center ">
          <h2 className="text-[20px]">Datos de Subscripción</h2>
        </div>
      </header>
        </>
    )
}