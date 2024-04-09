import { Inject, Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { Application } from './application.interface';
import {
  generateApplicationBaseDirectory,
  generateApplicationNetwork,
  removeApplicationBaseDirectory,
  removeApplicationBaseDirectoryAll,
  removeApplicationNetwork,
} from 'src/core/process';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject(Neo4jService)
    private readonly neo4jService: Neo4jService,
  ) {}

  async createApplication({
    userId,
    applicationData,
  }: {
    userId: string;
    applicationData: Application;
  }) {
    const result = await this.neo4jService.write(
      'MATCH (u:User {id: $userId}) CREATE (a:Application {id: randomUUID(), appId: $appId, appName: $appName, appDisplayName: $appDisplayName, versionList: $versionList, activeVersion: $activeVersion, isActive: $isActive, description: $description, createdAt: $createdAt, imageURL: $imageURL}) CREATE (u)-[:OWNS]->(a) RETURN a',
      {
        userId,
        appId: applicationData.appId,
        appName: applicationData.appName,
        appDisplayName: applicationData.appDisplayName,
        versionList: applicationData.versionList,
        activeVersion: applicationData.activeVersion,
        isActive: applicationData.isActive,
        description: applicationData.description,
        createdAt: new Date().toISOString(),
        imageURL: applicationData.imageURL,
      },
    );
    return {
      id: result.records[0].get('a').properties.id,
      appId: result.records[0].get('a').properties.appId,
      appName: result.records[0].get('a').properties.appName,
      appDisplayName: result.records[0].get('a').properties.appDisplayName,
      versionList: result.records[0].get('a').properties.versionList,
      activeVersion: result.records[0].get('a').properties.activeVersion,
      isActive: result.records[0].get('a').properties.isActive,
      description: result.records[0].get('a').properties.description,
      createdAt: result.records[0].get('a').properties.createdAt,
      imageURL: result.records[0].get('a').properties.imageURL,
    } as Application;
  }

  async readApplication(applicationId: string) {
    const result = await this.neo4jService.read(
      'MATCH (a:Application {id: $applicationId}) RETURN a',
      { applicationId },
    );
    return {
      id: result.records[0].get('a').properties.id,
      appId: result.records[0].get('a').properties.appId,
      appName: result.records[0].get('a').properties.appName,
      appDisplayName: result.records[0].get('a').properties.appDisplayName,
      versionList: result.records[0].get('a').properties.versionList,
      activeVersion: result.records[0].get('a').properties.activeVersion,
      isActive: result.records[0].get('a').properties.isActive,
      description: result.records[0].get('a').properties.description,
      createdAt: result.records[0].get('a').properties.createdAt,
      imageURL: result.records[0].get('a').properties.imageURL,
    } as Application;
  }

  async readApplicationsByUserId(userId: string) {
    const result = await this.neo4jService.read(
      'MATCH (u:User {id: $userId})-[:OWNS]->(a:Application) RETURN a',
      { userId },
    );
    return result.records.map((record) => ({
      id: record.get('a').properties.id,
      appId: record.get('a').properties.appId,
      appName: record.get('a').properties.appName,
      appDisplayName: record.get('a').properties.appDisplayName,
      versionList: record.get('a').properties.versionList,
      activeVersion: record.get('a').properties.activeVersion,
      isActive: record.get('a').properties.isActive,
      description: record.get('a').properties.description,
      createdAt: record.get('a').properties.createdAt,
      imageURL: record.get('a').properties.imageURL,
    })) as Application[];
  }

  async readApplicationIdByAppId(appId: string) {
    const result = await this.neo4jService.read(
      'MATCH (a:Application {appId: $appId}) RETURN a',
      { appId },
    );
    return result.records[0].get('a').properties.id as string;
  }

  async updateApplicationDescription({
    applicationId,
    description,
  }: {
    applicationId: string;
    description: string;
  }) {
    const result = await this.neo4jService.write(
      'MATCH (a:Application {id: $applicationId}) SET a.description = $description RETURN a',
      { applicationId, description },
    );
    return {
      id: result.records[0].get('a').properties.id,
      appId: result.records[0].get('a').properties.appId,
      appName: result.records[0].get('a').properties.appName,
      appDisplayName: result.records[0].get('a').properties.appDisplayName,
      versionList: result.records[0].get('a').properties.versionList,
      activeVersion: result.records[0].get('a').properties.activeVersion,
      isActive: result.records[0].get('a').properties.isActive,
      description: result.records[0].get('a').properties.description,
      createdAt: result.records[0].get('a').properties.createdAt,
      imageURL: result.records[0].get('a').properties.imageURL,
    } as Application;
  }

  async updateApplicationIsActive({
    applicationId,
    isActive,
  }: {
    applicationId: string;
    isActive: boolean;
  }) {
    const result = await this.neo4jService.write(
      'MATCH (a:Application {id: $applicationId}) SET a.isActive = $isActive RETURN a',
      { applicationId, isActive },
    );
    return {
      id: result.records[0].get('a').properties.id,
      appId: result.records[0].get('a').properties.appId,
      appName: result.records[0].get('a').properties.appName,
      appDisplayName: result.records[0].get('a').properties.appDisplayName,
      versionList: result.records[0].get('a').properties.versionList,
      activeVersion: result.records[0].get('a').properties.activeVersion,
      isActive: result.records[0].get('a').properties.isActive,
      description: result.records[0].get('a').properties.description,
      createdAt: result.records[0].get('a').properties.createdAt,
      imageURL: result.records[0].get('a').properties.imageURL,
    } as Application;
  }

  async updateApplicationActiveVersion({
    applicationId,
    activeVersion,
  }: {
    applicationId: string;
    activeVersion: string;
  }) {
    const result = await this.neo4jService.write(
      'MATCH (a:Application {id: $applicationId}) SET a.activeVersion = $activeVersion RETURN a',
      { applicationId, activeVersion },
    );
    return {
      id: result.records[0].get('a').properties.id,
      appId: result.records[0].get('a').properties.appId,
      appName: result.records[0].get('a').properties.appName,
      appDisplayName: result.records[0].get('a').properties.appDisplayName,
      versionList: result.records[0].get('a').properties.versionList,
      activeVersion: result.records[0].get('a').properties.activeVersion,
      isActive: result.records[0].get('a').properties.isActive,
      description: result.records[0].get('a').properties.description,
      createdAt: result.records[0].get('a').properties.createdAt,
      imageURL: result.records[0].get('a').properties.imageURL,
    } as Application;
  }

  async updateApplicationImageURL({
    applicationId,
    imageURL,
  }: {
    applicationId: string;
    imageURL: string;
  }) {
    const result = await this.neo4jService.write(
      'MATCH (a:Application {id: $applicationId}) SET a.imageURL = $imageURL RETURN a',
      { applicationId, imageURL },
    );
    return {
      id: result.records[0].get('a').properties.id,
      appId: result.records[0].get('a').properties.appId,
      appName: result.records[0].get('a').properties.appName,
      appDisplayName: result.records[0].get('a').properties.appDisplayName,
      versionList: result.records[0].get('a').properties.versionList,
      activeVersion: result.records[0].get('a').properties.activeVersion,
      isActive: result.records[0].get('a').properties.isActive,
      description: result.records[0].get('a').properties.description,
      createdAt: result.records[0].get('a').properties.createdAt,
      imageURL: result.records[0].get('a').properties.imageURL,
    } as Application;
  }

  async addApplicationVersion({
    applicationId,
    appName,
    versionList,
    newVersion,
  }: {
    applicationId: string;
    appName: string;
    versionList: string[];
    newVersion: string;
  }) {
    generateApplicationBaseDirectory({ appName, version: newVersion });
    generateApplicationNetwork({ appName, version: newVersion });
    const newVersionList = [...versionList, newVersion];
    const result = await this.neo4jService.write(
      'MATCH (a:Application {id: $applicationId}) SET a.versionList = $newVersionList RETURN a',
      { applicationId, newVersionList },
    );
    return {
      id: result.records[0].get('a').properties.id,
      appId: result.records[0].get('a').properties.appId,
      appName: result.records[0].get('a').properties.appName,
      appDisplayName: result.records[0].get('a').properties.appDisplayName,
      versionList: result.records[0].get('a').properties.versionList,
      activeVersion: result.records[0].get('a').properties.activeVersion,
      isActive: result.records[0].get('a').properties.isActive,
      description: result.records[0].get('a').properties.description,
      createdAt: result.records[0].get('a').properties.createdAt,
      imageURL: result.records[0].get('a').properties.imageURL,
    } as Application;
  }

  async removeApplicationVersion({
    applicationId,
    appName,
    versionList,
    versionToRemove,
  }: {
    applicationId: string;
    appName: string;
    versionList: string[];
    versionToRemove: string;
  }) {
    removeApplicationBaseDirectory({ appName, version: versionToRemove });
    removeApplicationNetwork({ appName, version: versionToRemove });
    const newVersionList = versionList.filter(
      (version) => version !== versionToRemove,
    );
    const result = await this.neo4jService.write(
      'MATCH (a:Application {id: $applicationId}) SET a.versionList = $newVersionList RETURN a',
      { applicationId, newVersionList },
    );
    return {
      id: result.records[0].get('a').properties.id,
      appId: result.records[0].get('a').properties.appId,
      appName: result.records[0].get('a').properties.appName,
      appDisplayName: result.records[0].get('a').properties.appDisplayName,
      versionList: result.records[0].get('a').properties.versionList,
      activeVersion: result.records[0].get('a').properties.activeVersion,
      isActive: result.records[0].get('a').properties.isActive,
      description: result.records[0].get('a').properties.description,
      createdAt: result.records[0].get('a').properties.createdAt,
      imageURL: result.records[0].get('a').properties.imageURL,
    } as Application;
  }

  async updateApplicationDisplayName({
    applicationId,
    appDisplayName,
  }: {
    applicationId: string;
    appDisplayName: string;
  }) {
    const result = await this.neo4jService.write(
      'MATCH (a:Application {id: $applicationId}) SET a.appDisplayName = $appDisplayName RETURN a',
      { applicationId, appDisplayName },
    );
    return {
      id: result.records[0].get('a').properties.id,
      appId: result.records[0].get('a').properties.appId,
      appName: result.records[0].get('a').properties.appName,
      appDisplayName: result.records[0].get('a').properties.appDisplayName,
      versionList: result.records[0].get('a').properties.versionList,
      activeVersion: result.records[0].get('a').properties.activeVersion,
      isActive: result.records[0].get('a').properties.isActive,
      description: result.records[0].get('a').properties.description,
      createdAt: result.records[0].get('a').properties.createdAt,
      imageURL: result.records[0].get('a').properties.imageURL,
    } as Application;
  }

  async deleteApplication(applicationId: string) {
    const application = await this.readApplication(applicationId);
    removeApplicationBaseDirectoryAll({ appName: application.appName });
    const result = await this.neo4jService.write(
      'MATCH (a:Application {id: $applicationId}) DETACH DELETE a RETURN a',
      { applicationId },
    );
    return {
      id: result.records[0].get('a').properties.id,
      appId: result.records[0].get('a').properties.appId,
      appName: result.records[0].get('a').properties.appName,
      appDisplayName: result.records[0].get('a').properties.appDisplayName,
      versionList: result.records[0].get('a').properties.versionList,
      activeVersion: result.records[0].get('a').properties.activeVersion,
      isActive: result.records[0].get('a').properties.isActive,
      description: result.records[0].get('a').properties.description,
      createdAt: result.records[0].get('a').properties.createdAt,
      imageURL: result.records[0].get('a').properties.imageURL,
    } as Application;
  }

  async checkAppNameDuplication(appName: string) {
    const result = await this.neo4jService.read(
      'MATCH (a:Application {appName: $appName}) RETURN a',
      { appName },
    );
    return result.records.length > 0;
  }

  async checkIsUserOwnsApplication({
    userId,
    applicationId,
  }: {
    userId: string;
    applicationId: string;
  }) {
    const result = await this.neo4jService.read(
      'MATCH (u:User {id: $userId})-[:OWNS]->(a:Application {id: $applicationId}) RETURN a',
      { userId, applicationId },
    );
    return result.records.length > 0;
  }

  async checkIsUserOwnsApplicationByAppId({
    userId,
    appId,
  }: {
    userId: string;
    appId: string;
  }) {
    const result = await this.neo4jService.read(
      'MATCH (u:User {id: $userId})-[:OWNS]->(a:Application {appId: $appId}) RETURN a',
      { userId, appId },
    );
    return result.records.length > 0;
  }
}
