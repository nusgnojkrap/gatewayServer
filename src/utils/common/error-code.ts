export enum ErrorCode {
    SUCCESS = "SUCCESS",
    EXCEPTION_ERROR = "EXCEPTION_ERROR",
    INPUT_HEADER_NULL = "INPUT_HEADER_NULL",
    REQUEST_PARAM_NULL = "REQUEST_PARAM_NULL",
    RESPONSE_PARAM_NULL = "RESPONSE_PARAM_NULL",
    PERMISSION_DENIED = "PERMISSION_DENIED",
    FILE_NOT_FOUND = "FILE_NOT_FOUND",
    METHOD_NOT_FOUND = "METHOD_NOT_FOUND",
    TIMEOUT_ERROR = "TIMEOUT_ERROR",
    NOT_FOUND_MESSAGE = "NOT_FOUND_MESSAGE",
    NOT_DEFINED_DATA = "NOT_DEFINED_DATA",
    CONNECTION_FAIL = "CONNECTION_FAIL",
    INVALID_PATH = "INVALID_PATH",
}

/**
 * 에러 코드와 메시지를 매핑한 객체
 */
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
    [ErrorCode.SUCCESS]: "성공",
    [ErrorCode.EXCEPTION_ERROR]: "Exception 장애",
    [ErrorCode.INPUT_HEADER_NULL]: "헤더값이 들어있지 않습니다.",
    [ErrorCode.REQUEST_PARAM_NULL]: "요청값이 들어있지 않습니다.",
    [ErrorCode.RESPONSE_PARAM_NULL]: "결과값을 찾을 수 없습니다.",
    [ErrorCode.PERMISSION_DENIED]: "권한이 없습니다.",
    [ErrorCode.FILE_NOT_FOUND]: "해당 파일이 없습니다.",
    [ErrorCode.METHOD_NOT_FOUND]: "메소드가 없습니다.",
    [ErrorCode.TIMEOUT_ERROR]: "타임아웃 발생",
    [ErrorCode.NOT_FOUND_MESSAGE]: "전문등록이 안되어 있습니다.",
    [ErrorCode.NOT_DEFINED_DATA]: "데이터 규격이 잘못되었습니다.",
    [ErrorCode.CONNECTION_FAIL]: "통신 실패",
    [ErrorCode.INVALID_PATH]: "잘못된 경로",
};

/**
 * 에러 코드 문자열을 ErrorCode Enum으로 변환하는 함수
 */
export function fromErrorCode(code: string): ErrorCode {
    if (!(code in ErrorCode)) {
        throw new Error(`Invalid error code: ${code}`);
    }
    return code as ErrorCode;
}
