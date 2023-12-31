import { useEffect, useState } from 'react';
import { useToken } from '../../hooks/useToken';
import { AnimatePresence, motion } from 'framer-motion';
import CardSubscription from './CardSubscription';
import LoadingSpinner from '../Svg/LoadingSpinner';
import axios from 'axios';
import BackBtn from '../Svg/BackBtn';
import { URL } from '../../router/routes';

const ContainerSubscriptions = () => {
  const { token } = useToken();
  const TOKEN = JSON.parse(token);

  const [cardsSuggestions, setcardsSuggestions] = useState([]);
  const [cardsSubscriptions, setCardsSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpenSug, setIsOpenSug] = useState(true);
  const [isOpenSub, setIsOpenSub] = useState(false);

  const beneficiaryId = localStorage.getItem('user');
  let parseBeneficiary = JSON.parse(beneficiaryId);

  const getChats = async (typeCard) => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/users/${typeCard}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if (typeCard === 'suggestions') {
        setcardsSuggestions(response.data);
      } else {
        setCardsSubscriptions(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const beneficiary = cardsSuggestions?.userSubscriptions?.map(
    (sub) => sub.beneficiary.id
  );

  const VerifiedSubscriptions = parseBeneficiary?.user?.subscribedTo?.forEach(
    (subscription) => {
      subscription.beneficiary_id;
    }
  );
  const ValidateSubscription = beneficiary?.includes(VerifiedSubscriptions);

  useEffect(() => {
    if (!TOKEN) {
      getChats('suggestions');
    } else {
      Promise.all([getChats('suggestions'), getChats('subscribed')]);
    }
  }, []);

  const toggleSuggestions = () => {
    setIsOpenSug((isOpenSug) => !isOpenSug);
  };

  const toggleSubscriptions = () => {
    setIsOpenSub((isOpenSub) => !isOpenSub);
  };

  const menuVariant = {
    exit: {
      y: -100,
      opacity: 0,
      transition: {
        ease: 'easeInOut',
        duration: 0.3,
        delay: 0.1,
      },
    },
  };

  return (
    <section>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* SUBSCRIPCIONES OPCIONALES */}
          <div className="w-full mb-8 py-4 relative z-10 rounded-lg bg-white">
            <h2 className="text-[20px] font-bold">Suscripciones</h2>
            <p className="text-[10px]">Tu lista de subscripciones.</p>
            <button
              className={`mr-4 p-2 absolute  top-1/2 right-0 -translate-y-1/2 ${
                isOpenSub ? '-rotate-90' : 'rotate-90'
              } cursor-pointer rounded-full bg-slate-100 transition-transform`}
              onClick={toggleSubscriptions}
            >
              <BackBtn color={'black'} />
            </button>
          </div>
          <AnimatePresence>
            {isOpenSub && (
              <motion.div
                className={`container my-8 mx-auto sm:w-full`}
                variants={menuVariant}
                initial={{
                  y: -100,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {cardsSubscriptions?.userSubscriptions?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {cardsSubscriptions?.userSubscriptions?.map((card) => (
                      <CardSubscription
                        key={card.beneficiary.id}
                        data={card}
                        isSubs={true}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="w-full text-center font-bold">
                    Aún no tienes subscripciones
                    <span className="block text-xs font-normal">
                      Logueate para verlas aquí
                    </span>
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* SUGERENCIAS OBLIGATORIAS */}
          <div className="w-full mb-8 py-4 relative z-10 rounded-lg bg-white">
            <h2 className="text-[20px] font-bold">Sugerencias</h2>
            <p className="text-[10px]">
              Te dejamos algunos perfiles que podrían interesarte.
            </p>
            <button
              className={`mr-4 p-2 absolute top-1/2 right-0 -translate-y-1/2 ${
                isOpenSug ? '-rotate-90' : 'rotate-90'
              } cursor-pointer rounded-full bg-slate-100 transition-transform`}
              onClick={toggleSuggestions}
            >
              <BackBtn color={'black'} />
            </button>
          </div>
          <AnimatePresence>
            {isOpenSug && (
              <motion.div
                className={`container my-8 mx-auto sm:w-full`}
                variants={menuVariant}
                initial={{
                  y: -100,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {cardsSuggestions?.userSubscriptions?.map((card) => (
                    <CardSubscription ValidateSubscription={ValidateSubscription} key={card.beneficiary.id} data={card} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
};

export default ContainerSubscriptions;
