"use client";

import { getApplicationsByUserId } from "@/service/application/api";
import styles from "./MyAppScreen.module.css";
import { useCallback, useEffect, useState } from "react";
import { Application } from "@/service/application/interface";
import { profile } from "@/service/auth/auth-api";
import AppBlock from "./applicationblock/AppBlock";
import LoadingDialog from "@/app/components/dialog/LoadingDialog";
import { dismissProgress } from "@/lib/navigation-events";

export default function MyAppScreenAlt() {
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUserId = useCallback(async () => {
    const { id } = await profile();
    return id;
  }, []);

  const getApplications = useCallback(async () => {
    const result = await getApplicationsByUserId(await getUserId());
    setApplications(result.filter((app) => app.isActive));
  }, [getUserId]);

  const handleInitialize = useCallback(async () => {
    setIsLoading(true);
    await getApplications();
    setIsLoading(false);
    dismissProgress();
  }, [getApplications]);

  useEffect(() => {
    handleInitialize();
  }, []);

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loadingWrapper}>
          <LoadingDialog />
        </div>
      )}
      {applications?.length === 0 && (
        <div className={styles.noApp}>
          <h1>No application found</h1>
          <p>Create a new application to start</p>
        </div>
      )}
      <div className={styles.cellGrid}>
        {applications?.map((app) => (
          <AppBlock key={app.appId} application={app} />
        ))}
      </div>
    </div>
  );
}
