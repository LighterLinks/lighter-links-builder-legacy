import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { AuthController } from './auth.controller';
import { Neo4jConfig } from 'src/neo4j/neo4j.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    Neo4jModule.forRoot(Neo4jConfig),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_ACCESS_EXPIRATION_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
