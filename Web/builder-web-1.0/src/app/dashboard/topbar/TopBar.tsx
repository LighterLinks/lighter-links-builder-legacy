"use client";

import Image from "next/image";
import styles from "./TopBar.module.css";
import { Suspense, use, useCallback, useEffect, useState } from "react";
import { logout, profile } from "@/service/auth/auth-api";
import { getUser } from "@/service/user/api";
import { User } from "@/service/user/interface";
import SettingsIcon from "@/asset/Icons/SettingsIcon";
import { useRouter } from "next/navigation";
import LocalStorage from "@/lib/localstroage";
import Skeleton from "react-loading-skeleton";
import logoWithText from "@/asset/images/logo_text.png";
import "react-loading-skeleton/dist/skeleton.css";
import ProfileIcon from "@/asset/Icons/ProfileIcon";

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
      <div className={styles.userSection} onClick={handleSignOut}>
        {user ? (
          <>
            <p>{user?.name}</p>
            <ProfileIcon size={15} color="#000" />
          </>
        ) : (
          <Skeleton containerClassName="flex-1" width={80} />
        )}
      </div>
    </div>
  );
}
