import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContainer, setModalContainer] = useState(null);

  useEffect(() => {
    if (isModalOpen) {
      const modalRoot = document.getElementById("modal-root");
      const el = document.createElement("div");
      el.classList.add("modal-container");
      el.style.position = "fixed";
      el.style.top = "0";
      el.style.left = "0";
      el.style.width = "100%";
      el.style.height = "100%";
      el.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      el.style.backdropFilter = "blur(5px)";
      el.style.display = "flex";
      el.style.justifyContent = "center";
      el.style.alignItems = "center";
      el.style.zIndex = "1000";

      modalRoot?.appendChild(el);
      setModalContainer(el);

      return () => {
        modalRoot?.removeChild(el);
      };
    } else {
      setModalContainer(null);
    }
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderModal = (children) => {
    if (isModalOpen && modalContainer) {
      return ReactDOM.createPortal(children, modalContainer);
    }
    return null;
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    renderModal,
  };
}
