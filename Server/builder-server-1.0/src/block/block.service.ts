import { Inject, Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { Block } from './block.interface';
import { generateDNSRecord } from 'src/core/cloudflare/dnsRecordAPI';
import { generateNginxConfFile } from 'src/core/nginx/confReplacer';
import { restartNginx } from 'src/core/process';

@Injectable()
export class BlockService {
  constructor(
    @Inject(Neo4jService)
    private readonly neo4jService: Neo4jService,
  ) {}

  async createBlock({
    applicationId,
    blockData,
  }: {
    applicationId: string;
    blockData: Block;
  }) {
    const port = await this.getAvailablePort();
    if (port === 0) {
      throw new Error('No available ports');
    }

    const { success, recordId } = await generateDNSRecord({
      isAppDNS: blockData.type === 'Web',
      name: blockData.externalSubDomain,
      comment: blockData.description,
    });
    if (!success) {
      throw new Error('Failed to create DNS record');
    }

    generateNginxConfFile({
      isAppDNS: blockData.type === 'Web',
      blockName: blockData.name,
      dnsRecord: blockData.externalSubDomain,
      port: port.toString(),
    });
    restartNginx();
    const result = await this.neo4jService.write(
      'MATCH (a:Application {id: $applicationId}) CREATE (b:Block {id: randomUUID(), type: $type, version: $version, name: $name, description: $description, isExternal: $isExternal, externalPort: $externalPort, externalRootDomain: $externalRootDomain, externalSubDomain: $externalSubDomain, DNSRecordId: $DNSRecordId, isActive: $isActive, config: $config}) CREATE (a)-[:CONTAINS]->(b) RETURN b',
      {
        applicationId,
        type: blockData.type,
        version: blockData.version,
        name: blockData.name,
        description: blockData.description,
        isExternal: blockData.isExternal,
        externalPort: port,
        externalRootDomain: blockData.externalRootDomain,
        externalSubDomain: blockData.externalSubDomain,
        DNSRecordId: recordId,
        isActive: blockData.isActive,
        config: blockData.config,
      },
    );
    return {
      id: result.records[0].get('b').properties.id,
      type: result.records[0].get('b').properties.type,
      version: result.records[0].get('b').properties.version,
      name: result.records[0].get('b').properties.name,
      description: result.records[0].get('b').properties.description,
      isExternal: result.records[0].get('b').properties.isExternal,
      externalPort: result.records[0].get('b').properties.externalPort,
      externalRootDomain:
        result.records[0].get('b').properties.externalRootDomain,
      externalSubDomain:
        result.records[0].get('b').properties.externalSubDomain,
      DNSRecordId: result.records[0].get('b').properties.DNSRecordId,
      isActive: result.records[0].get('b').properties.isActive,
      config: result.records[0].get('b').properties.config,
    } as Block;
  }

  async readBlock(id: string) {
    const result = await this.neo4jService.read(
      'MATCH (b:Block {id: $id}) RETURN b',
      { id },
    );
    return {
      id: result.records[0].get('b').properties.id,
      type: result.records[0].get('b').properties.type,
      version: result.records[0].get('b').properties.version,
      name: result.records[0].get('b').properties.name,
      description: result.records[0].get('b').properties.description,
      isExternal: result.records[0].get('b').properties.isExternal,
      externalPort: result.records[0].get('b').properties.externalPort,
      externalRootDomain:
        result.records[0].get('b').properties.externalRootDomain,
      externalSubDomain:
        result.records[0].get('b').properties.externalSubDomain,
      DNSRecordId: result.records[0].get('b').properties.DNSRecordId,
      isActive: result.records[0].get('b').properties.isActive,
      config: result.records[0].get('b').properties.config,
    } as Block;
  }

  async readBlocksByApplicationIdAndVersion({
    applicationId,
    version,
  }: {
    applicationId: string;
    version: string;
  }) {
    const result = await this.neo4jService.read(
      'MATCH (a:Application {id: $applicationId})-[:CONTAINS]->(b:Block {version: $version}) RETURN b',
      { applicationId, version },
    );
    return result.records.map(
      (record) =>
        ({
          id: record.get('b').properties.id,
          type: record.get('b').properties.type,
          version: record.get('b').properties.version,
          name: record.get('b').properties.name,
          description: record.get('b').properties.description,
          isExternal: record.get('b').properties.isExternal,
          externalPort: record.get('b').properties.externalPort,
          externalRootDomain: record.get('b').properties.externalRootDomain,
          externalSubDomain: record.get('b').properties.externalSubDomain,
          DNSRecordId: record.get('b').properties.DNSRecordId,
          isActive: record.get('b').properties.isActive,
          config: record.get('b').properties.config,
        }) as Block,
    );
  }

  async updateBlockDescription({
    id,
    description,
  }: {
    id: string;
    description: string;
  }) {
    const result = await this.neo4jService.write(
      'MATCH (b:Block {id: $id}) SET b.description = $description RETURN b',
      { id, description },
    );
    return {
      id: result.records[0].get('b').properties.id,
      type: result.records[0].get('b').properties.type,
      version: result.records[0].get('b').properties.version,
      name: result.records[0].get('b').properties.name,
      description: result.records[0].get('b').properties.description,
      isExternal: result.records[0].get('b').properties.isExternal,
      externalPort: result.records[0].get('b').properties.externalPort,
      externalRootDomain:
        result.records[0].get('b').properties.externalRootDomain,
      externalSubDomain:
        result.records[0].get('b').properties.externalSubDomain,
      DNSRecordId: result.records[0].get('b').properties.DNSRecordId,
      isActive: result.records[0].get('b').properties.isActive,
      config: result.records[0].get('b').properties.config,
    } as Block;
  }

  async updateBlockIsActive({
    id,
    isActive,
  }: {
    id: string;
    isActive: boolean;
  }) {
    const result = await this.neo4jService.write(
      'MATCH (b:Block {id: $id}) SET b.isActive = $isActive RETURN b',
      { id, isActive },
    );
    return {
      id: result.records[0].get('b').properties.id,
      type: result.records[0].get('b').properties.type,
      version: result.records[0].get('b').properties.version,
      name: result.records[0].get('b').properties.name,
      description: result.records[0].get('b').properties.description,
      isExternal: result.records[0].get('b').properties.isExternal,
      externalPort: result.records[0].get('b').properties.externalPort,
      externalRootDomain:
        result.records[0].get('b').properties.externalRootDomain,
      externalSubDomain:
        result.records[0].get('b').properties.externalSubDomain,
      DNSRecordId: result.records[0].get('b').properties.DNSRecordId,
      isActive: result.records[0].get('b').properties.isActive,
      config: result.records[0].get('b').properties.config,
    } as Block;
  }

  async updateBlockIsExternal({
    id,
    isExternal,
  }: {
    id: string;
    isExternal: boolean;
  }) {
    const result = await this.neo4jService.write(
      'MATCH (b:Block {id: $id}) SET b.isExternal = $isExternal RETURN b',
      { id, isExternal },
    );
    return {
      id: result.records[0].get('b').properties.id,
      type: result.records[0].get('b').properties.type,
      version: result.records[0].get('b').properties.version,
      name: result.records[0].get('b').properties.name,
      description: result.records[0].get('b').properties.description,
      isExternal: result.records[0].get('b').properties.isExternal,
      externalPort: result.records[0].get('b').properties.externalPort,
      externalRootDomain:
        result.records[0].get('b').properties.externalRootDomain,
      externalSubDomain:
        result.records[0].get('b').properties.externalSubDomain,
      DNSRecordId: result.records[0].get('b').properties.DNSRecordId,
      isActive: result.records[0].get('b').properties.isActive,
      config: result.records[0].get('b').properties.config,
    } as Block;
  }

  async updateBlockConfig({ id, config }: { id: string; config: object }) {
    const result = await this.neo4jService.write(
      'MATCH (b:Block {id: $id}) SET b.config = $config RETURN b',
      { id, config },
    );
    return {
      id: result.records[0].get('b').properties.id,
      type: result.records[0].get('b').properties.type,
      version: result.records[0].get('b').properties.version,
      name: result.records[0].get('b').properties.name,
      description: result.records[0].get('b').properties.description,
      isExternal: result.records[0].get('b').properties.isExternal,
      externalPort: result.records[0].get('b').properties.externalPort,
      externalRootDomain:
        result.records[0].get('b').properties.externalRootDomain,
      externalSubDomain:
        result.records[0].get('b').properties.externalSubDomain,
      DNSRecordId: result.records[0].get('b').properties.DNSRecordId,
      isActive: result.records[0].get('b').properties.isActive,
      config: result.records[0].get('b').properties.config,
    } as Block;
  }

  async deleteBlock(id: string) {
    const result = await this.neo4jService.write(
      'MATCH (b:Block {id: $id}) DETACH DELETE b RETURN b',
      { id },
    );
    return {
      id: result.records[0].get('b').properties.id,
      type: result.records[0].get('b').properties.type,
      version: result.records[0].get('b').properties.version,
      name: result.records[0].get('b').properties.name,
      description: result.records[0].get('b').properties.description,
      isExternal: result.records[0].get('b').properties.isExternal,
      externalPort: result.records[0].get('b').properties.externalPort,
      externalRootDomain:
        result.records[0].get('b').properties.externalRootDomain,
      externalSubDomain:
        result.records[0].get('b').properties.externalSubDomain,
      DNSRecordId: result.records[0].get('b').properties.DNSRecordId,
      isActive: result.records[0].get('b').properties.isActive,
      config: result.records[0].get('b').properties.config,
    } as Block;
  }

  async getAvailablePort() {
    const result = await this.neo4jService.read(
      'MATCH (n:Port) WHERE NOT (n)-[:CONNECTED]->() RETURN n.data as n ORDER BY n.data LIMIT 1',
    );
    return result.records[0].get('n') || 0;
  }
}
