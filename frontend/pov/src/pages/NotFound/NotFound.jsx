import { Link } from 'react-router-dom';
// import NF5 from '../../assets/notFound/NF5.png';
import NtFound from '../../components/Svg/NtFound';

const NotFound = () => {
    return (
        <div className="flex w-full h-screen justify-center items-center">
            <div className="max-w-[320px]">
                <NtFound />
                <div className="w-[320px] h-[28px] mb-3 text-[#232322] flex-shrink-0 text-center font-lexend text-[24px] font-normal line-height-normal">
                    ¡Lo sentimos!
                </div>

                <div className="w-[320px] mb-20 p-3 text-center font-lexend text-[12px] font-normal line-height-normal">
                    No encontramos la pagina que estabas buscando,
                    vuelve a intentarlo. Si crees que fue algún error contáctanos
                </div>

                <div className='m-2'>
                    <Link to="/home">
                        <button
                            className="flex w-[300px] h-[52px] p-6 justify-center items-center gap-6 rounded-lg bg-[#5D73E9]"
                        >
                            <span className="font-Lexend text-white font-normal line-height-normal">
                                Volver a inicio
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
