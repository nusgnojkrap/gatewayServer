import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Messages } from '../entitys/messages.entity';

@Injectable()
export class messageRepository {

    constructor(
        @InjectRepository(Messages) // 메시지 엔티티에 대한 리포지토리 주입
        private Repository: Repository<Messages>) { }

    // 특정 전문 존재 여부
    async findMessage(message_name: string): Promise<Messages> {
        return this.Repository.findOne({ where: { message_name } });
    }

    // 새 전문 생성 (이후 웹에서 개발)
    async create(MessageData: Partial<Messages>): Promise<Messages> {
        const newMessage = this.Repository.create(MessageData);
        return this.Repository.save(newMessage);
    }
}