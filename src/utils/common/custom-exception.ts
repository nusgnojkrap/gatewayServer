import { ERROR_MESSAGES, ErrorCode } from "./error-code";

export class CustomException extends Error {
    errorCode: ErrorCode;
    message: string;

    constructor(errorCode: ErrorCode) {
        super(ERROR_MESSAGES[errorCode]); // 기본 Error의 message 설정
        this.errorCode = errorCode;
        this.message = ERROR_MESSAGES[errorCode];
    }
}
