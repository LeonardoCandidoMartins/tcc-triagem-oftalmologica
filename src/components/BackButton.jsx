import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./BackButton.module.css";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
        Voltar
      </button>
    </div>
  );
}
