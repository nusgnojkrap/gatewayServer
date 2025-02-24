export enum Protocol {
    HTTP = 'HTTP',
    HTTPS = 'HTTPS',
    // TCP = 'TCP',
    // UDP = 'UDP',
}

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    // PATCH = 'PATCH',
    // HEAD = 'HEAD',
    // OPTIONS = 'OPTIONS',
    // CONNECT = 'CONNECT',
    // SEND = 'SEND',
    // RECEIVE = 'RECEIVE',
    // REQUEST = 'REQUEST',
    // RESPONSE = 'RESPONSE',
    // SUBSCRIBE = 'SUBSCRIBE',
    // PUBLISH = 'PUBLISH'
}

export class CreateGatewayHeaderDto {
    messageName: string;
    protocol: Protocol;
    method: string;
    ip: string;
    port: string;
    path: string;
    responseMessage: string;
    responseCode: String
}