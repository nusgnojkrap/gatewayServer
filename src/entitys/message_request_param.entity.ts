import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('message_request_param')
export class MessageRequestParam {
    @PrimaryColumn()
    message_name: string;

    @Column({ type: 'enum', enum: ['application/json','text/plain'] })
    parameter_format: 'application/json' | 'text/plain';

    @Column({ type: 'json', nullable: true })
    parameter_schema: object | null;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
