import { useEffect } from "react";
import styles from "./SuccessModal.module.css"
import confetti from 'canvas-confetti';

const showConfetti = () => {
  const confettiOptions = {
    particleCount: 1000,
    spread: 790,
    origin: { y: 0.6 },
  };

  confetti(confettiOptions);
};

type Props = {
  handleCloseModal: () => void,
}

export default function SuccessModal({handleCloseModal}: Props) {

  useEffect(()=>{
    showConfetti();
  })

  return (
    <div className={styles["success-modal-container"]}>
      <div className={styles["success-modal-content"]}>
        <button className={styles["button--close-modal"]} onClick={()=>handleCloseModal()}>X</button>
        <section className={styles["success-modal-text-section"]}>
          <h3 className={styles["success-modal-headline"]}>Thank you!</h3>
          <p className={styles["success-modal-text"]}> You have successfully paid $100 to support Ukranian army </p>
        </section>
        <button className={styles["button--thank-you"]} onClick={()=>handleCloseModal()}>OK</button>
      </div>
    </div>
  )
}
