import { Link } from 'react-router-dom';
// import NF5 from '../../assets/notFound/NF5.png';
import NtFound from '../../components/Svg/NtFound';

const NotFound = () => {
    return (
        <div className="bg-cover bg-center w-full h-full flex flex-col items-center justify-center text-[#232322]">
            {/* <div className="w-52 h-w-52 mt-20 flex-shrink-0 rounded-full overflow-hidden bg-[#232322]">
                <img
                    className="w-full h-full object-cover"
                    src={NF5}
                    alt="Imagen de fondo"
                />
            </div> */}

            <NtFound />
            <div className="w-80 h-8 mt-5 flex-shrink-0 text-center font-lexend text-[24px] font-normal">
                ¡Lo sentimos!
            </div>

            <div className="w-80 h-20 mt-2 flex-shrink-0 text-center font-lexend text-[12px] font-normal">
                La página que intentas encontrar aún no ha sido diseñada.
                ¡Pero lo tendremos en cuenta! Por el momento, intenta explorar otras pestañas.
            </div>
            <Link to="/home">
                <button className="flex w-80 h-3 mt-5 p-8 justify-center items-center gap-10 flex-shrink-0 rounded-[10px] bg-[#232322]">
                    <span className="font-Lexend text-2xl text-white font-medium">
                        Volver a inicio
                    </span>
                </button>
            </Link>
        </div>
    );
};

export default NotFound;

