import { motion } from "framer-motion";
import styles from "@/styles/editors/DatabaseEditor.module.css";
import BuilderButton from "@/app/components/button/BuilderButton";
import useModal from "@/lib/hook/useModal";
import { successToast } from "@/utils/toasts";
import CloseDialog from "@/app/components/dialog/CloseDialog";
import CloseButton from "@/app/components/button/CloseButton";
import AnimatedModalWrapper from "@/app/components/modal/AnimatedModalWrapper";

export default function DatabaseEditor({ close }: { close: () => void }) {
  const { openModal, closeModal, renderModal, isModalOpen } = useModal();

  const showCloseModal = () => {
    openModal();
  };

  return (
    <AnimatedModalWrapper className={styles.container}>
      <div className={styles.sideBar}></div>
      <div className={styles.closeButton}>
        <CloseButton onClick={showCloseModal} size={20} color="red" />
      </div>
      {renderModal(
        <CloseDialog
          text="Are you sure you want to close?"
          onClickLeft={closeModal}
          onClickRight={close}
        />
      )}
    </AnimatedModalWrapper>
  );
}
