"use client";

import { Application } from "@/service/application/interface";
import styles from "./AppBlock.module.css";
import Image from "next/image";
import {
  deleteApplication,
  removeApplicationVersion,
} from "@/service/application/api";
import { useRouter } from "next/navigation";

export default function AppBlock({
  application,
}: {
  application: Application;
}) {
  const router = useRouter();

  const handleDeleteApplication = async (id: string) => {
    for (const version of application.versionList) {
      const res = await removeApplicationVersion({
        applicationId: application.id,
        appName: application.appName,
        versionList: application.versionList,
        version,
      });
    }
    const res = await deleteApplication(id);
  };

  const handleGoToAppPage = () => {
    router.push(`/apps/${application.appId}`);
  };

  return (
    <div
      className={styles.container}
      onClick={() => {
        handleGoToAppPage();
      }}
    >
      <div className={styles.header}>
        <div className={styles.imageContainer}>
          {/* <Image
            className={styles.image}
            src={application.imageURL}
            alt="app"
            fill
            objectFit="cover"
          /> */}
          <img className={styles.image} src={application.imageURL} alt="app" />
        </div>
        <div
          className={`${styles.status} ${
            application.isActive && styles.active
          }`}
        >
          <p>{application.isActive ? "Status: Active" : "Status: Inactive"}</p>
          <span />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.textSection}>
          <p className={styles.displayName}>{application.appDisplayName}</p>
          <p className={styles.name}>{application.appId}</p>
        </div>
        <div className={styles.versionSection}>
          <p className={styles.version}>{application.activeVersion}</p>
          <p className={styles.versionText}>version</p>
        </div>
      </div>
    </div>
  );
}
