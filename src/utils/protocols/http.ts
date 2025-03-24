import { request } from 'http';
import { CreateGatewayDto } from '../../dto/create-gateway.dto';
import { isJsonString } from 'src/utils/utils/utils';
import { FunctionResult } from '../common/function-result';
import { ErrorCode } from '../common/error-code';

/*
{
  "data": {
      "data1": "String", 
      "data2": "String", 
      "data3": {
        "Sdata1": "String", 
        "Sdata2": "String"
      }
  }, 
  "info": {
    "age": "int", 
    "sex": "String", 
    "last name": "String", 
    "first name": "String"
  }
}

*/
export function jonghttp(data: CreateGatewayDto): Promise<FunctionResult<CreateGatewayDto>> {
    const requestData = typeof data.body === 'object' ? JSON.stringify(data.body) : data.body;

    const options = {
        hostname: data.header.ip,
        port: data.header.port,
        path: data.header.path,
        method: data.header.method,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestData), // 요청 데이터 길이 설정
        },
    };

    return new Promise((resolve) => {
        const req = request(options, (res) => {
            let responseData = '';

            // 데이터 수신 중
            res.on('data', (chunk) => {
                responseData += chunk;
            });

            // 응답 완료 시
            res.on('end', () => {
                try {
                    const parsedData = isJsonString(responseData) ? JSON.parse(responseData) : responseData;

                    console.log("response data : " + parsedData);

                    // 응답 데이터를 CreateGatewayDto 형태로 변환
                    const result: CreateGatewayDto = {
                        header: data.header,
                        body: parsedData || "",  // 응답에서 data가 없으면 원본 data 사용
                    };

                    resolve(FunctionResult.success(result));  // 성공 반환
                } catch (error) {
                    resolve(FunctionResult.failure(ErrorCode.EXCEPTION_ERROR));  // JSON 파싱 실패
                }
            });
        });

        req.on('error', (error) => {
            console.error("Request error: ", error);
            resolve(FunctionResult.failure(ErrorCode.CONNECTION_FAIL));  // HTTP 요청 실패
        });

        // 요청 데이터 전송
        if (requestData) {
            req.write(requestData);
        }

        req.end();
    });
}