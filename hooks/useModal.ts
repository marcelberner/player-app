import { useState, useRef } from "react";

const useModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalState, setModalState] = useState<boolean>(false);

  const showModal = () => {
    document.addEventListener("click", handleOutsideClick, true);
    setModalState(true);
  };

  const handleOutsideClick = (event: any) => {
    if (!modalRef.current!.contains(event.target)) {
      document.removeEventListener("click", handleOutsideClick, true);
      setModalState(false);
    }
  };

  return {
    showModal,
    modalState,
    modalRef,
  };
};

export default useModal;
