import { request } from 'http';
import { CreateGatewayDto } from '../dto/create-gateway.dto';

export function jonghttp(data:CreateGatewayDto): Promise<CreateGatewayDto> {

  const options = {
    hostname: data.header.ip,
    port: data.header.port,
    path: data.header.path,
    method: data.header.method,
  };

  return new Promise((resolve, reject) => {
    const req = request(options, (res) => {
      let responseData = '';

      // 데이터 수신 중
      res.on('data', (chunk) => {
        responseData += chunk;
      });

      // 응답 완료 시
      res.on('end', () => {
        try {
          let parsedData
          if (typeof responseData == 'string'){
            parsedData = responseData
          }else if (typeof responseData == 'object'){
            parsedData = JSON.parse(responseData);
          }
          
          console.log("response data : " + parsedData);
          
          // 응답 데이터를 CreateGatewayDto 형태로 변환
          const result: CreateGatewayDto = {
            header: data.header,
            data: parsedData || "",  // 응답에서 data가 없으면 원본 data 사용
          };

          resolve(result);  // Promise를 resolve하여 결과를 반환
        } catch (error) {
          reject('Error parsing response data: ' + error);
        }
      });
    });

    req.on('error', (error) => {
      reject('Request error: ' + error);
    });

    req.end();
  });
}

// httpGet();