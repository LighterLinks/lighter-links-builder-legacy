import { instance } from "../interceptor";
import { Application } from "./interface";

export async function getApplicationsByUserId(userId: string) {
  const result = await instance.get(`/application/user/${userId}`);
  return result.data as Application[];
}

export async function getApplication(applicationId: string) {
  const result = await instance.get(`/application/info/${applicationId}`);
  return result.data as Application;
}

export async function getApplicationIdByAppId(appId: string) {
  const result = await instance.get(`/application/id/${appId}`);
  return result.data as string;
}

export async function createApplication({
  userId,
  applicationData,
}: {
  userId: string;
  applicationData: Application;
}) {
  const result = await instance.post("/application", {
    userId,
    applicationData,
  });
  return result.data as Application;
}

export async function updateApplicationIsActive({
  applicationId,
  isActive,
}: {
  applicationId: string;
  isActive: boolean;
}) {
  const result = await instance.post(`/application/${applicationId}/isActive`, {
    isActive,
  });
  return result.data as Application;
}

export async function updateApplicationActiveVersion({
  applicationId,
  activeVersion,
}: {
  applicationId: string;
  activeVersion: string;
}) {
  const result = await instance.post(
    `/application/${applicationId}/activeVersion`,
    {
      activeVersion,
    }
  );
  return result.data as Application;
}

export async function updateApplicationDescription({
  applicationId,
  description,
}: {
  applicationId: string;
  description: string;
}) {
  const result = await instance.post(
    `/application/${applicationId}/description`,
    {
      description,
    }
  );
  return result.data as Application;
}

export async function updateApplicationDisplayName({
  applicationId,
  appDisplayName,
}: {
  applicationId: string;
  appDisplayName: string;
}) {
  const result = await instance.post(
    `/application/${applicationId}/appDisplayName`,
    {
      appDisplayName,
    }
  );
  return result.data as Application;
}

export async function addApplicationVersion({
  applicationId,
  appName,
  versionList,
  version,
}: {
  applicationId: string;
  appName: string;
  versionList: string[];
  version: string;
}) {
  const result = await instance.post(
    `/application/${applicationId}/addVersion`,
    {
      appName,
      versionList,
      version,
    }
  );
  return result.data as Application;
}

export async function removeApplicationVersion({
  applicationId,
  appName,
  versionList,
  version,
}: {
  applicationId: string;
  appName: string;
  versionList: string[];
  version: string;
}) {
  const result = await instance.post(
    `/application/${applicationId}/removeVersion`,
    {
      appName,
      versionList,
      version,
    }
  );
  return result.data as Application;
}

export async function deleteApplication(applicationId: string) {
  const result = await instance.post(
    `/application/${applicationId}/delete`,
    {}
  );
  return result.data as Application;
}

export async function checkAppNameDuplication(appName: string) {
  const result = await instance.get(`/application/appNameDuplicate/${appName}`);
  return result.data as boolean;
}
