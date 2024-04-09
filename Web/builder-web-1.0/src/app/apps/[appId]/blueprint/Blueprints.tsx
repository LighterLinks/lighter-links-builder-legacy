import BuilderCanvas from "@/app/canvas/BuilderCanvas";
import styles from "./Blueprints.module.css";

export default function Blueprints() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>{"Blueprints >"}</h1>
        <span>
          <p>Blueprints</p>
        </span>
      </div>
      <div className={styles.body}>
        <BuilderCanvas />
      </div>
    </div>
  );
}
