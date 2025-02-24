import { Method } from 'src/dto/create-gateway-Method.dto';
import { Protocol } from 'src/dto/create-gateway-Protocol.dto';
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Index('unique_message', ['message_name', 'ip', 'port', 'path', 'protocol', 'method'], { unique: true })
@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  message_id: number;

  @Column()
  message_name: string;

  @Column()
  ip: string;

  @Column()
  port: number;

  @Column()
  path: string;

  @Column({type: 'enum', enum: Protocol})
  protocol: Protocol;

  @Column({type: 'enum', enum: Method})
  method: Method;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}