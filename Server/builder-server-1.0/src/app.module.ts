import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Neo4jModule } from './neo4j/neo4j.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { ApplicationModule } from './application/application.module';
import { BlockModule } from './block/block.module';
import { Neo4jConfig } from './neo4j/neo4j.constants';
import { JwtService } from '@nestjs/jwt';
import { StatModule } from './stat/stat.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    Neo4jModule.forRoot(Neo4jConfig),
    UserModule,
    FileModule,
    ApplicationModule,
    BlockModule,
    StatModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    AppService,
    JwtService,
  ],
})
export class AppModule {}
