import { Injectable } from '@nestjs/common';

import { CreateGatewayDto } from '../dto/create-gateway.dto';

import { jonghttp } from '../protocols/http';
import { jongsocket } from '../protocols/socket';

import { mysqlConn } from '../databases/mysqlConn';

@Injectable()
export class GatewayService {

  async GetGateWay(data: CreateGatewayDto): Promise<CreateGatewayDto> {
    console.log("Gate way : Get");
    let responseData: CreateGatewayDto

    responseData.header.responseCode = "404";
    responseData.header.responseMessage = "잘못된 경로입니다."

    // 응답값에서 data는 두루뭉실하게 처리하고 그대로 반환
    return responseData;
  }

  
  async PostGateWay(data: CreateGatewayDto): Promise<CreateGatewayDto> {
    console.log("Gateway start");
    console.log("message_name : " + data.header.messageName);

    let responseData: CreateGatewayDto


    if(data.header.protocol == 'HTTP'){
      responseData = await jonghttp(data);
    }else{
      // error
      console.log("아직 개발이 안된 protocol 입니다.err");
      responseData = null;
    }

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
