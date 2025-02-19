import { Injectable } from '@nestjs/common';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { jonghttp } from './gateway/jonghttp';
import { jongsocket } from './gateway/jongsocket';
import { DateTime } from 'luxon';


@Injectable()
export class AppService {
  getHello(): string {
    console.log("get request")
    return 'Hello World!';
  }

  getNowTime(): string {
    console.log("getNowTime")
    const now = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss');
    console.log(now);
    return now;
  }

  postHello(): string {
    console.log("post request")


    return 'Hello korea!';
  }
}

@Injectable()
export class PathService {
  async jongWay(data: CreateGatewayDto): Promise<CreateGatewayDto> {
    console.log("path post start");

    console.log("request ip :" + data.header.ip);
    console.log("request port :" + data.header.port);
    console.log("protocol : " + data.header.protocol);

    let responseData: CreateGatewayDto
    if(data.header.protocol == 'http'){
      responseData = await jonghttp(data);
    }else if(data.header.protocol == 'socket'){
      // responseData = await jongsocket(data);
      responseData = await jongsocket(data);
    }else{
      // error
      console.log("protocol err");
      responseData = null;
    }

    // 응답값에서 data는 두루뭉실하게 처리하고 그대로 반환
    return responseData;
  }

}
