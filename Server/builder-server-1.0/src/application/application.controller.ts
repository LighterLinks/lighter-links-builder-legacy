import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from './application.interface';
import { AuthUserId } from 'src/auth/local-auth.guard';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get('info/:applicationId')
  async readApplication(
    @Param('applicationId') applicationId: string,
    @AuthUserId() authUserId: string,
  ) {
    const checkOwnership =
      await this.applicationService.checkIsUserOwnsApplication({
        applicationId,
        userId: authUserId,
      });
    if (!checkOwnership) {
      throw new Error('You do not have permission to access this application');
    }
    return this.applicationService.readApplication(applicationId);
  }

  @Get('user/:userId')
  async readApplicationsByUserId(@Param('userId') userId: string) {
    return this.applicationService.readApplicationsByUserId(userId);
  }

  @Get('id/:appId')
  async readApplicationIdByAppId(
    @Param('appId') appId: string,
    @AuthUserId() authUserId: string,
  ) {
    const checkOwnership =
      await this.applicationService.checkIsUserOwnsApplicationByAppId({
        appId,
        userId: authUserId,
      });
    if (!checkOwnership) {
      throw new HttpException(
        'You do not have permission to access this application',
        401,
      );
    }
    return this.applicationService.readApplicationIdByAppId(appId);
  }

  @Post()
  async createApplication(
    @Body('userId') userId: string,
    @Body('applicationData') applicationData: Application,
  ) {
    return this.applicationService.createApplication({
      userId: userId,
      applicationData: applicationData,
    });
  }

  @Post(':applicationId/isActive')
  async updateApplicationIsActive(
    @Body('isActive') isActive: boolean,
    @Param('applicationId') applicationId: string,
  ) {
    return this.applicationService.updateApplicationIsActive({
      applicationId,
      isActive,
    });
  }

  @Post(':applicationId/activeVersion')
  async updateApplicationActiveVersion(
    @Body('activeVersion') activeVersion: string,
    @Param('applicationId') applicationId: string,
  ) {
    return this.applicationService.updateApplicationActiveVersion({
      applicationId,
      activeVersion,
    });
  }

  @Post(':applicationId/description')
  async updateApplicationDescription(
    @Body('description') description: string,
    @Param('applicationId') applicationId: string,
  ) {
    return this.applicationService.updateApplicationDescription({
      applicationId,
      description,
    });
  }

  @Post(':applicationId/appDisplayName')
  async updateApplicationDisplayName(
    @Body('appDisplayName') appDisplayName: string,
    @Param('applicationId') applicationId: string,
  ) {
    return this.applicationService.updateApplicationDisplayName({
      applicationId,
      appDisplayName,
    });
  }

  @Post(':applicationId/imageURL')
  async updateApplicationImageURL(
    @Body('imageURL') imageURL: string,
    @Param('applicationId') applicationId: string,
  ) {
    return this.applicationService.updateApplicationImageURL({
      applicationId,
      imageURL,
    });
  }

  @Post(':applicationId/addVersion')
  async addVersion(
    @Param('applicationId') applicationId: string,
    @Body('appName') appName: string,
    @Body('versionList') versionList: string[],
    @Body('version') version: string,
  ) {
    return this.applicationService.addApplicationVersion({
      applicationId,
      appName,
      versionList,
      newVersion: version,
    });
  }

  @Post(':applicationId/removeVersion')
  async removeVersion(
    @Param('applicationId') applicationId: string,
    @Body('appName') appName: string,
    @Body('versionList') versionList: string[],
    @Body('version') version: string,
  ) {
    return this.applicationService.removeApplicationVersion({
      applicationId,
      appName,
      versionList,
      versionToRemove: version,
    });
  }

  @Post(':applicationId/delete')
  async deleteApplication(@Param('applicationId') applicationId: string) {
    return this.applicationService.deleteApplication(applicationId);
  }

  @Get('appNameDuplicate/:appName')
  async checkAppNameDuplicate(@Param('appName') appName: string) {
    return this.applicationService.checkAppNameDuplication(appName);
  }
}
