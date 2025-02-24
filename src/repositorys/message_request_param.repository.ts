import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessageRequestParam } from 'src/entitys/message_request_param.entity';

@Injectable()
export class message_request_paramRepository {

  constructor(
    @InjectRepository(MessageRequestParam) // 메시지 엔티티에 대한 리포지토리 주입
    private Repository: Repository<MessageRequestParam>) {}

  // 특정 전문 포맷 확인 (TEXT or JSON)
  async findFormat(message_name: string): Promise<Pick<MessageRequestParam, 'parameter_format'>> {
    return this.Repository.findOne({ where: { message_name }, select: ["parameter_format"] });
  }

  // 특정 전문 구조 확인 (JSON)
  async findStructure(message_name: string): Promise<Pick<MessageRequestParam, 'parameter_schema'>> {
    return this.Repository.findOne({ where: { message_name }, select: ["parameter_schema"] });
  }

  // 새 전문 생성 (이후 웹에서 개발)
  async create(MessageData: Partial<MessageRequestParam>): Promise<MessageRequestParam> {
    const newMessage = this.Repository.create(MessageData);
    return this.Repository.save(newMessage); 
  } 
}