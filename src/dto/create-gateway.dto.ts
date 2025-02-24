import { CreateGatewayHeaderDto } from "./create-gateway-header.dto";

export class CreateGatewayDto {
    header:CreateGatewayHeaderDto;
    body: any;  // data는 어떤 object 형태든 받을 수 있습니다.
}