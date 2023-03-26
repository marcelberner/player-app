import { useState, useRef, useCallback } from "react";

const useModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalState, setModalState] = useState<boolean>(false);

  const showModal = () => {
    document.addEventListener("click", handleOutsideClick, true);
    setModalState(true);
  };

  const closeModal = () => {
    document.removeEventListener("click", handleOutsideClick, true);
    setModalState(false);
  };

  const handleOutsideClick = useCallback((event: any) => {
    if (!modalRef.current!.contains(event.target)) {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    showModal,
    closeModal,
    modalState,
    modalRef,
  };
};

export default useModal;
