import { CreateGatewayDto } from "src/dto/create-gateway.dto";
import { ERROR_MESSAGES, ErrorCode } from "../common/error-code";

export function isJsonString(str: string): boolean {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

export function add(a: number, b: number): number {
    return a + b;
}
  
export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

export function errorCodeSet(data:CreateGatewayDto, errCode:ErrorCode){
    data.header.responseCode = errCode;
    data.header.responseMessage = ERROR_MESSAGES[errCode]
}