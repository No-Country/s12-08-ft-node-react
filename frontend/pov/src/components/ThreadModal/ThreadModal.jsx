import ThreadInput from "./ThreadInput";

const ThreadModal = ({ toggleModal }) => {
  const handleClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <div
      className="w-full h-screen fixed z-20 flex flex-col items-center bg-[rgba(0,0,0,0.3)]"
      onClick={handleClick}
    >
      <ThreadInput toggleModal={toggleModal} />
    </div>
  );
};

export default ThreadModal;
