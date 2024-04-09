export interface Application {
  id: string;
  appId: string;
  appName: string;
  appDisplayName: string;
  versionList: string[];
  activeVersion: string;
  isActive: boolean;
  description: string;
  createdAt: string;
  imageURL: string;
}
