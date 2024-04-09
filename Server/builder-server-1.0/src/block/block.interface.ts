export interface Block {
  id: string;
  type: 'Database' | 'Server' | 'Web' | 'Mobile' | 'Storage';
  version: string;
  name: string;
  description: string;
  isExternal: boolean;
  externalPort: number;
  externalRootDomain: string;
  externalSubDomain: string;
  DNSRecordId: string;
  isActive: boolean;
  config: object;
}
