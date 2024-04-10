"use client";

import { ReactNode, useCallback, useState } from "react";
import styles from "./DashboardHome.module.css";
import AppIcon from "@/asset/Icons/AppIcon";
import { profile } from "@/service/auth/auth-api";
import { getUser } from "@/service/user/api";
import MyAppScreen from "./myapplication/MyAppScreen";
import useModal from "@/lib/hook/useModal";
import AppCreatorScreen from "./applicationCreator/AppCreatorScreen";
import { useRouter } from "next/navigation";
import logoOutline from "@/asset/images/logo_outline.png";
import logoAlt from "@/asset/images/logo_alt.png";
import Image from "next/image";
import PlusIcon from "@/asset/Icons/PlusIcon";
import applicationLogo from "@/asset/images/application_logo.png";
import MyAppScreenAlt from "./myapplication/MyAppScreenAlt";

export default function DashboardHome() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const {
    renderModal: renderCreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();

  const DashboardTabs: { name: string; component: ReactNode }[] = [
    {
      name: "My Applications",
      component: <MyAppScreen />,
    },
    {
      name: "On air",
      component: <MyAppScreenAlt />,
    },
  ];

  const handleCloseCreateModal = useCallback(() => {
    closeCreateModal();
    window.location.reload();
  }, [closeCreateModal]);

  return (
    <div className={styles.container}>
      {/* <div className={styles.header}>
        <h1>Actions</h1>
        <div className={styles.headerList}>
          <div className={styles.headerItem} onClick={openCreateModal}>
            <Image src={logoAlt} alt="logo" width={80} height={80} />
            <p>New Application</p>
          </div>
        </div>
      </div> */}
      <div className={styles.tabWrapper}>
        <div className={styles.adderButton} onClick={openCreateModal}>
          <p>New Application</p>
          <Image src={applicationLogo} alt="logo" />
          {/* <PlusIcon size={16} color="#000" /> */}
        </div>
        <div className={styles.tabs}>
          {DashboardTabs.map((tab, index) => (
            <div
              key={index}
              className={`${styles.tab} ${
                index === activeTab ? styles.active : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              <p>{tab.name}</p>
            </div>
          ))}
        </div>
        <div className={styles.tabContent}>
          {DashboardTabs[activeTab].component}
        </div>
      </div>
      {renderCreateModal(<AppCreatorScreen close={handleCloseCreateModal} />)}
    </div>
  );
}
