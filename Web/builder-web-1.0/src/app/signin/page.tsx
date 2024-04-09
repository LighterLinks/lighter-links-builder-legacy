"use client";

import Image from "next/image";
import styles from "./page.module.css";
import image1 from "@/asset/images/image1.png";
import useModal from "../../lib/hook/useModal";
import LoadingDialog from "../components/dialog/LoadingDialog";
import { use, useCallback, useEffect, useState } from "react";
import { login } from "@/service/auth/auth-api";
import BuilderLoader from "../components/dialog/BuilderLoader";
import LocalStorage from "@/lib/localstroage";
import { useRouter } from "next/navigation";
import { dismissProgress } from "@/lib/navigation-events";

export default function SignIn() {
  const router = useRouter();
  const { openModal, closeModal, renderModal } = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const checkSignedIn = useCallback(() => {
    if (LocalStorage.getItem("accessToken")) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSignIn = useCallback(async () => {
    openModal();
    const result = await login({ email, password });
    if (result.status === 200) {
      LocalStorage.setItem("refreshToken", result.refreshToken!);
      LocalStorage.setItem("accessToken", result.accessToken!);
      router.push("/dashboard");
    } else {
      setErrorMessage("Please check your email and password.");
    }
    closeModal();
  }, [email, password, openModal, closeModal, router]);

  useEffect(() => {
    checkSignedIn();
    dismissProgress();
  }, [checkSignedIn]);

  return (
    <div className={styles.main}>
      <div className={styles.background}>
        <Image src={image1} alt="image1" width={800} />
      </div>
      <div
        className={styles.form}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSignIn();
          }
        }}
      >
        <div className={styles.title}>Start Building</div>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <p className={styles.inputGuide}>Email</p>
        <input
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter your Email"
        />
        <p className={styles.inputGuide}>Password</p>
        <input
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your Password"
        />
        <button className={styles.primaryButton} onClick={handleSignIn}>
          Sign In
        </button>
        <div className={styles.footer}>
          <p>{"Don't have an account?"}</p>
          <button>Sign Up</button>
        </div>
      </div>
      {renderModal(<LoadingDialog />)}
    </div>
  );
}
