import { Injectable } from '@nestjs/common';

import { CreateGatewayDto } from '../dto/create-gateway.dto';

import { jonghttp } from '../protocols/http';

import { messageRepository } from '../repositorys/message.repository'
import { message_request_paramRepository } from '../repositorys/message_request_param.repository'
import formatCheck from '../utils/checkProtocol';

// import { CustomException } from "../exceptions/custom-exception";
// import { ErrorCode } from "../exceptions/error-codes";
import { Messages } from 'src/entitys/messages.entity';
import { MessageRequestParam } from 'src/entitys/message_request_param.entity';
import { getRedis, setRedis, delRedis } from '../utils/redis.util';

@Injectable()
export class GatewayService {

    constructor(
        private readonly messageRepository: messageRepository,
        private readonly message_request_paramRepository: message_request_paramRepository,
        // private readonly RedisService: RedisService
    ) { }

    async PostGateWay(requestData: CreateGatewayDto): Promise<CreateGatewayDto> {


        // response data Setting
        let responseData: CreateGatewayDto
        responseData = requestData;
        // responseData.header.responseCode = custExcep.errorCode
        // responseData.header.responseMessage = custExcep.message

        console.log("messageName : " + requestData.header.messageName);

        // ✅ 1️⃣ Redis에서 데이터 조회 (캐싱 확인)
        const cachedData = await getRedis(requestData.header.messageName);
        if (cachedData) {
            responseData.body = cachedData;
            console.log(`Redis key   : ${requestData.header.messageName}`);
            console.log(`Redis value : ${cachedData}`);
            return responseData;
        }


        // DB check
        // let dbCheck = await this.messageRepository.findMessage(data.header.messageName);
        const dbCheck: Messages = await this.messageRepository.findMessage(requestData.header.messageName);
        if (dbCheck) {
            // 등록한 전문에 대한 구조 가져오기
            requestData.header.ip = dbCheck.ip;
            requestData.header.port = dbCheck.port;
            requestData.header.path = dbCheck.path;
            requestData.header.protocol = dbCheck.protocol;
            requestData.header.method = dbCheck.method;

            const requestFormat: MessageRequestParam = await this.message_request_paramRepository.findFormat(requestData.header.messageName);

            // data 구조 확인
            switch(requestFormat.parameter_format){
                case 'application/json':
                    // 구조 검사
                    if (!formatCheck(requestFormat.parameter_schema, requestData.body)) {
                        // 실패
                        // 실패코드 세팅
                        console.log("데이터 구조 오류")
                        console.log("스키마  : " + requestFormat.parameter_schema);
                        console.log("데이터 : " + requestData.body);
                        responseData.header.responseCode = "400";
                        responseData.header.responseMessage = "정의된 요청 데이터가 아닙니다."
                        return responseData;
                    }
                    break;
                case 'text/plain':
                    // // 길이 검사
                    // if (!formatCheck(requestFormat.parameter_schema, requestData.body)) {
                    //     // 실패
                    //     // 실패코드 세팅
                    //     console.log("데이터 길이 오류")
                    //     console.log("스키마  : " + requestFormat.parameter_schema.toString());
                    //     console.log("데이터 : " + requestData.body);
                    //     responseData.header.responseCode = "400";
                    //     responseData.header.responseMessage = "정의된 요청 데이터가 아닙니다."
                    //     return responseData;
                    // }
                    break;
                
                default:
                    // 장애
                    break;
            }

            switch (dbCheck.protocol) {
                case 'HTTP':
                    try {
                        responseData = await jonghttp(requestData);
                        responseData.header.responseCode = "200";
                        responseData.header.responseMessage = "success"
                        if (dbCheck.cacheYN) setRedis(requestData.header.messageName, responseData.body, dbCheck.cacheTTL)
                    } catch (error) {
                        console.log("error : " + error)
                        responseData.header.responseCode = "400";
                        responseData.header.responseMessage = error
                    }
                    break;

                case 'HTTPS':
                    try {
                        responseData = await jonghttp(requestData);
                        responseData.header.responseCode = "200";
                        responseData.header.responseMessage = "success"
                        if (dbCheck.cacheYN) setRedis(requestData.header.messageName, responseData.body, dbCheck.cacheTTL)
                    } catch (error) {
                        console.log("error : " + error)
                        responseData.header.responseCode = "400";
                        responseData.header.responseMessage = error
                    }

                    break;

                default:
                    // error
                    break;
            }
        } else {
            // 등록하지 않은 전문
            console.log("등록된 전문이 아닙니다. DB에 전문 등록을 해주세요");
        }
        // 응답값에서 data는 두루뭉실하게 처리하고 그대로 반환
        return responseData;
    }

    async GetGateWay(requestData: CreateGatewayDto): Promise<CreateGatewayDto> {
        console.log("Gate way : Get");
        let responseData: CreateGatewayDto

        responseData.header.responseCode = "404";
        responseData.header.responseMessage = "잘못된 경로입니다."

        // 응답값에서 data는 두루뭉실하게 처리하고 그대로 반환
        return responseData;
    }

    async PatchGateWay(requestData: CreateGatewayDto): Promise<CreateGatewayDto> {
        console.log("Gate way : Get");
        let responseData: CreateGatewayDto

        responseData.header.responseCode = "404";
        responseData.header.responseMessage = "잘못된 경로입니다."

        // 응답값에서 data는 두루뭉실하게 처리하고 그대로 반환
        return responseData;
    }

}
