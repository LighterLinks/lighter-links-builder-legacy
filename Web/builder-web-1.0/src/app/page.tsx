import Image from "next/image";
import styles from "./page.module.css";
import image1 from "@/asset/images/image1.png";
import logoWithText from "@/asset/images/logo_text.png";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Image src={logoWithText} alt="logo" width={160} />
        <Link href="/signin" className={styles.link}>
          <button className={styles.primaryButton} type="button">
            <p>Get Started 🚀</p>
          </button>
        </Link>
      </div>
      <div className={styles.body}>
        <div className={styles.text}>
          <div className={styles.title}>Build your first web service</div>
          <div className={styles.subtitle}>with Lighter Links Builder</div>
        </div>
      </div>
    </main>
  );
}
