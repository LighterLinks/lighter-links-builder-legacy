import { Inject, Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { User } from './user.interface';
import * as bycrypt from 'bcryptjs';
import { encryptionSalt } from 'src/auth/constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @Inject(Neo4jService)
    private readonly neo4jService: Neo4jService,
    private readonly configService: ConfigService,
  ) {}

  async readUser(id: string) {
    const result = await this.neo4jService.read(
      'MATCH (u:User {id: $id}) RETURN u',
      { id },
    );
    return {
      id: result.records[0].get('u').properties.id,
      name: result.records[0].get('u').properties.name,
      email: result.records[0].get('u').properties.email,
      password: 'undefined',
      createdAt: result.records[0].get('u').properties.createdAt,
      avatarURL: result.records[0].get('u').properties.avatarURL,
      bio: result.records[0].get('u').properties.bio,
    } as User;
  }

  async readUserByEmail(email: string) {
    const result = await this.neo4jService.read(
      'MATCH (u:User {email: $email}) RETURN u',
      { email },
    );
    if (result.records.length === 0) {
      return null;
    }
    return {
      id: result.records[0].get('u').properties.id,
      name: result.records[0].get('u').properties.name,
      email: result.records[0].get('u').properties.email,
      password: result.records[0].get('u').properties.password,
      createdAt: result.records[0].get('u').properties.createdAt,
      avatarURL: result.records[0].get('u').properties.avatarURL,
      bio: result.records[0].get('u').properties.bio,
    } as User;
  }

  async createUser(userData: User) {
    const encryptedPassword = bycrypt.hashSync(
      userData.password,
      encryptionSalt,
    );
    const result = await this.neo4jService.write(
      'CREATE (u:User {id: randomUUID(), name: $name, email: $email, password: $password, createdAt: $createdAt, avatarURL: $avatarURL, bio: $bio}) RETURN u',
      {
        name: userData.name,
        email: userData.email,
        password: encryptedPassword,
        createdAt: new Date().toISOString(),
        avatarURL: userData.avatarURL,
        bio: userData.bio,
      },
    );
    return {
      id: result.records[0].get('u').properties.id,
      name: result.records[0].get('u').properties.name,
      email: result.records[0].get('u').properties.email,
      password: result.records[0].get('u').properties.password,
      createdAt: result.records[0].get('u').properties.createdAt,
      avatarURL: result.records[0].get('u').properties.avatarURL,
      bio: result.records[0].get('u').properties.bio,
    } as User;
  }

  async deleteUser(id: string) {
    await this.neo4jService.write('MATCH (u:User {id: $id}) DETACH DELETE u', {
      id,
    });
    return {
      id: id,
      name: 'undefined',
      email: 'undefined',
      password: 'undefined',
      createdAt: 'undefined',
      avatarURL: 'undefined',
      bio: 'undefined',
    } as User;
  }

  async updateUser(userData: User) {
    const result = await this.neo4jService.write(
      'MATCH (u:User {id: $id}) SET u.name = $name, u.email = $email, u.password = $password, u.avatarURL = $avatarURL, u.bio = $bio RETURN u',
      {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        avatarURL: userData.avatarURL,
        bio: userData.bio,
      },
    );
    return {
      id: result.records[0].get('u').properties.id,
      name: result.records[0].get('u').properties.name,
      email: result.records[0].get('u').properties.email,
      password: 'undefined',
      createdAt: result.records[0].get('u').properties.createdAt,
      avatarURL: result.records[0].get('u').properties.avatarURL,
      bio: result.records[0].get('u').properties.bio,
    } as User;
  }

  async checkUser(email: string, password: string) {
    const result = await this.neo4jService.read(
      'MATCH (u:User {email: $email, password: $password}) RETURN u',
      { email, password },
    );
    return {
      id: result.records[0].get('u').properties.id,
      name: result.records[0].get('u').properties.name,
      email: result.records[0].get('u').properties.email,
      password: 'undefined',
      createdAt: result.records[0].get('u').properties.createdAt,
      avatarURL: result.records[0].get('u').properties.avatarURL,
      bio: result.records[0].get('u').properties.bio,
    } as User;
  }

  async readUserByRefreshToken(refreshToken: string) {
    const result = await this.neo4jService.read(
      'MATCH (u:User {refreshToken: $refreshToken}) RETURN u',
      { refreshToken },
    );
    if (result.records.length === 0) {
      return null;
    }
    return {
      id: result.records[0].get('u').properties.id,
      name: result.records[0].get('u').properties.name,
      email: result.records[0].get('u').properties.email,
      password: 'undefined',
      createdAt: result.records[0].get('u').properties.createdAt,
      avatarURL: result.records[0].get('u').properties.avatarURL,
      bio: result.records[0].get('u').properties.bio,
    } as User;
  }

  async updateUserRefreshToken(id: string, refreshToken: string) {
    const result = await this.neo4jService.write(
      'MATCH (u:User {id: $id}) SET u.refreshToken = $refresh, u.refreshTokenExpiration = $refreshTokenExpiration RETURN u',
      {
        id,
        refresh: refreshToken,
        refreshTokenExpiration: await this.getCurrentRefreshTokenExpiration(),
      },
    );
    return {
      id: result.records[0].get('u').properties.id,
      name: result.records[0].get('u').properties.name,
      email: result.records[0].get('u').properties.email,
      password: 'undefined',
      createdAt: result.records[0].get('u').properties.createdAt,
      avatarURL: result.records[0].get('u').properties.avatarURL,
      bio: result.records[0].get('u').properties.bio,
    } as User;
  }

  async deleteUserRefreshToken(id: string) {
    const result = await this.neo4jService.write(
      'MATCH (u:User {id: $id}) REMOVE u.refreshToken RETURN u',
      { id },
    );
    return {
      id: result.records[0].get('u').properties.id,
      name: result.records[0].get('u').properties.name,
      email: result.records[0].get('u').properties.email,
      password: 'undefined',
      createdAt: result.records[0].get('u').properties.createdAt,
      avatarURL: result.records[0].get('u').properties.avatarURL,
      bio: result.records[0].get('u').properties.bio,
    } as User;
  }

  async getCurrentRefreshTokenExpiration() {
    const currentDate = new Date();
    currentDate.setSeconds(
      currentDate.getSeconds() +
        parseInt(this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME')),
    );
    return currentDate.toISOString();
  }
}
