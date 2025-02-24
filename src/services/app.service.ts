import { Injectable } from '@nestjs/common';
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
