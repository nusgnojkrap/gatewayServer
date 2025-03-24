import { Method } from "./create-gateway-Method.dto";
import { Protocol } from "./create-gateway-Protocol.dto";

export class CreateGatewayHeaderDto {
    readonly messageName: string;
    protocol: Protocol;
    method: Method;
    ip: string;
    port: number;
    path: string;
    responseMessage: string;
    responseCode: String
}