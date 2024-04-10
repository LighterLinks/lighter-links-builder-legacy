"use client";

import Image from "next/image";
import styles from "./TopBar.module.css";
import { useCallback, useEffect, useState } from "react";
import { logout, profile } from "@/service/auth/auth-api";
import { getUser } from "@/service/user/api";
import { User } from "@/service/user/interface";
import { useRouter } from "next/navigation";
import LocalStorage from "@/lib/localstroage";
import logoWithText from "@/asset/images/logo_text.png";
import "react-loading-skeleton/dist/skeleton.css";

export default function TopBar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    const refreshToken = LocalStorage.getItem("refreshToken");
    if (!refreshToken) {
      router.push("/signin");
      return;
    }
    const result = await logout({ refreshToken });
    LocalStorage.removeItem("refreshToken");
    LocalStorage.removeItem("accessToken");
    router.push("/");
  }, [router]);

  const getUserProfile = useCallback(async () => {
    const { id } = await profile();
    const result = await getUser(id);
    setUser(result);
  }, []);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <Image
          src={logoWithText}
          alt="logo"
          width={120}
          onClick={() => {
            router.push("/");
          }}
        />
      </div>
      <div className={styles.userCircle} onClick={handleSignOut}>
        <p>{user?.name?.charAt(0)}</p>
      </div>
    </div>
  );
}
