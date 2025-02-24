import { Injectable } from '@nestjs/common';

import { CreateGatewayDto } from '../dto/create-gateway.dto';

import { jonghttp } from '../protocols/http';

import { messageRepository } from '../repositorys/message.repository'
import { message_request_paramRepository } from '../repositorys/message_request_param.repository'
import isValidStructure from '../utils/checkProtocol';


@Injectable()
export class GatewayService {

  constructor(
    private readonly messageRepository: messageRepository,
    private readonly message_request_paramRepository: message_request_paramRepository,
  ) {}

  async PostGateWay(data: CreateGatewayDto): Promise<CreateGatewayDto> {

    // response data Setting
    let responseData: CreateGatewayDto
    responseData = data;
    responseData.header.responseCode = "400";
    responseData.header.responseMessage = "개발되지 않은 프로토콜"

    console.log("Gate way : Post");
    console.log("messageName : " + data.header.messageName);

    // DB check
    let dbCheck = await this.messageRepository.findMessage(data.header.messageName);
    if (dbCheck.message_name == null) {
      // 등록하지 않은 전문
    }else{
      // 등록한 전문에 대한 구조 가져오기
      console.log("등록된 전문입니다.")
      let format = await this.message_request_paramRepository.findFormat(data.header.messageName);

      console.log("format : " + format.parameter_format);
      // data 구조 확인

      if (format.parameter_format == "JSON"){
        let schema = await this.message_request_paramRepository.findStructure(data.header.messageName);
        console.log("schema : " + schema.parameter_schema)

        if (! isValidStructure(schema.parameter_schema, data.body)){
          // 실패
          // 실패코드 세팅

          console.log("구조 다름 실패")
          return responseData;
        }
      }

      responseData.header.responseCode = "200";
      responseData.header.responseMessage = "success"
      switch (data.header.protocol) {
        case 'HTTP':
          responseData = await jonghttp(data);
          
          break;
  
        case 'HTTPS':
          responseData = await jonghttp(data);
          break;
      
        default:
          // error
          responseData.header.responseCode = "400";
          responseData.header.responseMessage = "개발되지 않은 프로토콜"
          break;
      }

    }
    // 응답값에서 data는 두루뭉실하게 처리하고 그대로 반환
    return responseData;
  }

  async GetGateWay(data: CreateGatewayDto): Promise<CreateGatewayDto> {
    console.log("Gate way : Get");
    let responseData: CreateGatewayDto

    responseData.header.responseCode = "404";
    responseData.header.responseMessage = "잘못된 경로입니다."

    // 응답값에서 data는 두루뭉실하게 처리하고 그대로 반환
    return responseData;
  }
  
  async PatchGateWay(data: CreateGatewayDto): Promise<CreateGatewayDto> {
    console.log("Gate way : Get");
    let responseData: CreateGatewayDto

    responseData.header.responseCode = "404";
    responseData.header.responseMessage = "잘못된 경로입니다."

    // 응답값에서 data는 두루뭉실하게 처리하고 그대로 반환
    return responseData;
  }
}
