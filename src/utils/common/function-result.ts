import { ErrorCode } from "./error-code";

export class FunctionResult<T> {
    private success: boolean;
    private message: ErrorCode | null;
    private data: T | null;

    constructor(success: boolean, message: ErrorCode | null, data: T | null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success<T>(data: T): FunctionResult<T> {
        return new FunctionResult<T>(true, ErrorCode.SUCCESS, data);
    }

    static failure<T>(errorCode: ErrorCode): FunctionResult<T> {
        return new FunctionResult<T>(false, errorCode, null);
    }

    isSuccess(): boolean {
        return this.success;
    }

    getData(): T | null {
        return this.success ? this.data : null;
    }

    getMessage(): ErrorCode {
        return this.success ? ErrorCode.SUCCESS : this.message!;
    }
    
}
