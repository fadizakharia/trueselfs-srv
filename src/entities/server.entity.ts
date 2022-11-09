import { Column, PrimaryColumn } from 'typeorm';
import { countries } from '../../constants/countries-list';

export abstract class Server {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;
  @Column({ name: 'server_id', type: 'text' })
  serverId: string;
  @Column({ name: 'server_name', type: 'text' })
  serverName: string;
  @Column({ name: 'server_size', type: 'number' })
  serverSize: number;
  @Column({ type: 'text', enum: countries })
  country: countries;
}
