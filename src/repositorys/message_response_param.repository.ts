import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessageResponseParam } from 'src/entitys/message_response_param.entity';

@Injectable()
export class message_response_paramRepository {

    constructor(
        @InjectRepository(MessageResponseParam) // 메시지 엔티티에 대한 리포지토리 주입
        private Repository: Repository<MessageResponseParam>) { }

    // 특정 전문 확인
    async findFormat(message_name: string): Promise<MessageResponseParam> {
        return this.Repository.findOne({ where: { message_name } });
    }

    // 특정 전문 구조 확인 (JSON)
    async findStructure(message_name: string): Promise<Pick<MessageResponseParam, 'parameter_schema'>> {
        return this.Repository.findOne({ where: { message_name }, select: ["parameter_schema"] });
    }

    // 새 전문 생성 (이후 웹에서 개발)
    async create(MessageData: Partial<MessageResponseParam>): Promise<MessageResponseParam> {
        const newMessage = this.Repository.create(MessageData);
        return this.Repository.save(newMessage);
    }
}