"use client";

import { usePathname } from "next/navigation";

import styles from "./AppPage.module.css";
import BuilderCanvas from "@/app/canvas/BuilderCanvas";
import { useCallback, useEffect, useState } from "react";
import {
  getApplication,
  getApplicationIdByAppId,
} from "@/service/application/api";
import { Application } from "@/service/application/interface";
import Image from "next/image";
import image2 from "@/asset/images/image2.png";
import { dismissProgress } from "@/lib/navigation-events";

export default function AppPage() {
  const appId = usePathname().split("/")[2];
  const [applicationInfo, setApplicationInfo] = useState<Application | null>(
    null
  );

  const getApplicationInfo = useCallback(async () => {
    const applicationId = await getApplicationIdByAppId(appId);
    const applicationInfo = await getApplication(applicationId);
    setApplicationInfo(applicationInfo);
    dismissProgress();
  }, [appId]);

  useEffect(() => {
    getApplicationInfo();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.background}>
        <Image src={image2} alt="background" />
      </div>
      <div className={styles.header}>
        <h1>{"Application >"}</h1>
        <span>
          <p>{applicationInfo && applicationInfo.appDisplayName}</p>
        </span>
      </div>
      <div className={styles.body}>
        <div className={styles.overview}>
          {applicationInfo && (
            <>
              <img
                className={styles.appImage}
                src={applicationInfo.imageURL}
                alt="appImage"
                width={1000}
                height={1000}
              />
              <div className={styles.info}>
                <div className={styles.infoHeader}>
                  <p>{applicationInfo.appDisplayName}</p>
                  <div className={styles.infoAppName}>
                    {applicationInfo.appName}
                  </div>
                </div>
                <div className={styles.infoBody}>
                  <div className={styles.infoBodyTop}>
                    <p>{`Application ID: ${applicationInfo.appId}`}</p>
                    <div
                      className={`${styles.status} ${
                        applicationInfo.isActive && styles.active
                      }`}
                    >
                      <span />
                      <p>
                        {applicationInfo.isActive
                          ? "Status: Active"
                          : "Status: Inactive"}
                      </p>
                    </div>
                  </div>
                  <div className={styles.description}>
                    {applicationInfo.description}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
