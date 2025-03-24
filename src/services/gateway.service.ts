import { Injectable } from '@nestjs/common';

import { CreateGatewayDto } from '../dto/create-gateway.dto';

import { jonghttp } from '../utils/protocols/http';

import { messageRepository } from '../repositorys/message.repository'
import { message_request_paramRepository } from '../repositorys/message_request_param.repository'
import formatCheck from '../utils/utils/checkProtocol';

import { Messages } from 'src/entitys/messages.entity';
import { MessageRequestParam } from 'src/entitys/message_request_param.entity';
import { getRedis, setRedis, delRedis } from '../utils/utils/redis.util';
import { FunctionResult } from 'src/utils/common/function-result';
import { ErrorCode } from 'src/utils/common/error-code';
import { errorCodeSet } from 'src/utils/utils/utils';

@Injectable()
export class GatewayService {

    constructor(
        private readonly messageRepository: messageRepository,
        private readonly message_request_paramRepository: message_request_paramRepository,
    ) { }



    async PostGateWay(requestData: CreateGatewayDto): Promise<CreateGatewayDto> {

        // response data Setting
        let responseData: CreateGatewayDto
        responseData = requestData;

        // 1. Redis에서 데이터 조회 (캐싱 확인)
        const cachedData = await getRedis(requestData.header.messageName);
        if (cachedData) {
            responseData.body = cachedData;
            console.log(`Redis key   : ${requestData.header.messageName}`);
            console.log(`Redis value : ${cachedData}`);
            return responseData;
        }


        // 2. DB check
        const dbCheck: Messages = await this.messageRepository.findMessage(requestData.header.messageName);
        if (dbCheck) {
            // 등록한 전문에 대한 구조 가져오기
            requestData.header.ip = dbCheck.ip;
            requestData.header.port = dbCheck.port;
            requestData.header.path = dbCheck.path;
            requestData.header.protocol = dbCheck.protocol;
            requestData.header.method = dbCheck.method;

            const requestFormat: MessageRequestParam = await this.message_request_paramRepository.findFormat(requestData.header.messageName);

            // 3. Request data 구조 확인
            switch(requestFormat.parameter_format){
                case 'application/json':
                    // 구조 검사
                    if (!formatCheck(requestFormat.parameter_schema, requestData.body)) {
                        errorCodeSet(responseData, ErrorCode.NOT_DEFINED_DATA)
                        return responseData;
                    }
                    break;

                case 'text/plain':
                    // 개발 예정

                    break;
                
                default:
                    // 장애
                    errorCodeSet(responseData, ErrorCode.NOT_DEFINED_DATA)
                    break;
            }

            // 4. 전문 통신
            switch (dbCheck.protocol) {
                case 'HTTP':
                    try {
                        //responseData = await jonghttp(requestData);
                        let httpResult:FunctionResult<CreateGatewayDto> = await jonghttp(requestData);
                        if (httpResult.isSuccess()){
                            responseData.body = httpResult.getData().body;
                            if (dbCheck.cacheYN) setRedis(requestData.header.messageName, responseData.body, dbCheck.cacheTTL)
                        }
                        errorCodeSet(responseData, httpResult.getMessage())
                    } catch (error) {
                        console.log("error : " + error)
                        errorCodeSet(responseData, ErrorCode.EXCEPTION_ERROR)
                    }
                    break;

                case 'HTTPS':
                    try {
                        let httpsResult:FunctionResult<CreateGatewayDto> = await jonghttp(requestData);
                        if (httpsResult.isSuccess()){
                            responseData.body = httpsResult.getData().body;
                            if (dbCheck.cacheYN) setRedis(requestData.header.messageName, responseData.body, dbCheck.cacheTTL)
                        }
                        errorCodeSet(responseData, httpsResult.getMessage())
                    } catch (error) {
                        console.log("error : " + error)
                        errorCodeSet(responseData, ErrorCode.EXCEPTION_ERROR)
                    }

                    break;

                default:
                    console.log("개발하지 않은 프로토콜 : " + dbCheck.protocol);
                    errorCodeSet(responseData, ErrorCode.METHOD_NOT_FOUND)
                    break;
            }
        } else {
            console.log("미등록 전문 : " + requestData.header.messageName);
            errorCodeSet(responseData, ErrorCode.METHOD_NOT_FOUND)
        }

        // 응답값에서 data는 두루뭉실하게 처리하고 그대로 반환
        return responseData;
    }


    async deleteCache(messageName: string): Promise<string> {
        try {
            await delRedis(messageName);
            return "SUCCESS";
        } catch (err) {
            console.log("delete cache error : " + err)
            return "FAIL";
        }
    }

    async GetGateWay(requestData: CreateGatewayDto): Promise<CreateGatewayDto> {
        console.log("Gate way : Get");
        let responseData: CreateGatewayDto

        errorCodeSet(responseData, ErrorCode.INVALID_PATH)

        // 응답값에서 data는 두루뭉실하게 처리하고 그대로 반환
        return responseData;
    }

    async PatchGateWay(requestData: CreateGatewayDto): Promise<CreateGatewayDto> {
        console.log("Gate way : Get");
        let responseData: CreateGatewayDto

        errorCodeSet(responseData, ErrorCode.INVALID_PATH)

        // 응답값에서 data는 두루뭉실하게 처리하고 그대로 반환
        return responseData;
    }

}
