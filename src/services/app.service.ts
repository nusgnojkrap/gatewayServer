import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

// 테스트 코드
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

    getlist(): Array<string> {
        console.log("get list")
        let returnData = ["appale", "babe", "car", "dad", "end"]

        return returnData;
    }

    postHello(): string {
        console.log("post request")


        return 'Hello korea!';
    }

    postCheck(data: any): any {
        console.log("TEST : POST");
        console.log("request data type : " + typeof data);
        console.dir(data);
        console.log("json.stringify : " + JSON.stringify(data))

        return {
            header: {
                responseCode: "200",
                responseMessage: "성공"
            },
            data: data // 그대로 반환
        };
    }

}
