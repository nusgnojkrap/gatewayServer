import { CreateGatewayDto } from '../../dto/create-gateway.dto';
import { io, Socket } from "socket.io-client";
import { FunctionResult } from '../common/function-result';
import { ErrorCode } from '../common/error-code';



export function jongwebsocket(data: CreateGatewayDto): Promise<FunctionResult<CreateGatewayDto>> {
  return new Promise((resolve, reject) => {
    const socket: Socket = io(`http://${data.header.ip}:${data.header.port}`);

    // 데이터를 서버로 전송 (예: "message" 이벤트로 보낸다고 가정)
    socket.emit("message", data.body);

    socket.on("message", (responseData: string) => {
      console.log("응답 메시지: " + responseData);
      data.body = responseData;
      socket.off("message"); // 이벤트 리스너 해제
      resolve(FunctionResult.success(data)); // 응답을 반환
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      resolve(FunctionResult.failure(ErrorCode.CONNECTION_FAIL))
    });
  });
}