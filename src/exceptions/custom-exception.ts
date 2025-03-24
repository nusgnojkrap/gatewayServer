import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCode } from "./error-codes";

export class CustomException extends HttpException {
    errorCode: String;
    constructor(errorCode: ErrorCode) {
        super(
            {
                statusCode: HttpStatus.BAD_REQUEST,
                errorCode: errorCode,
                message: CustomException.getMessage(errorCode),
            },
            HttpStatus.BAD_REQUEST
        );
    }

    private static getMessage(errorCode: ErrorCode): string {
        const errorMessages: Record<ErrorCode, string> = {
            [ErrorCode.SUCCESS]: "성공",
            [ErrorCode.EXCEPTION_ERROR]: "Exception 장애",
            [ErrorCode.INPUT_HEADER_NULL]: "헤더값이 들어있지 않습니다.",
            [ErrorCode.INPUT_PARAM_NULL]: "요청값이 들어있지 않습니다.",
            [ErrorCode.OUTPUT_PARAM_NULL]: "결과값을 찾을 수 없습니다.",
            [ErrorCode.PERMISSION_DENIED]: "권한이 없습니다.",
            [ErrorCode.FILE_NOT_FOUND]: "해당 파일이 없습니다.",
            [ErrorCode.METHOD_NOT_FOUND]: "메소드가 없습니다.",
            [ErrorCode.TIMEOUT_ERROR]: "타임아웃 발생",
        };

        return errorMessages[errorCode] || "알 수 없는 오류";
    }
}
