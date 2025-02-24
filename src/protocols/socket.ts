import { CreateGatewayDto } from '../dto/create-gateway.dto';
import { io, Socket } from "socket.io-client";



export function jongsocket(data:CreateGatewayDto): Promise<CreateGatewayDto> {

  const options = {
    hostname: data.header.ip,
    port: data.header.port,
    path: data.header.path,
    method: data.header.method,
  };

    return new Promise((resolve, reject) => {
        const socket: Socket = io("http://" + options.hostname + ":" +  options.port);

        socket.on("message", (msg: string) => {
          console.log("msg : " + msg);
          data.data = msg
        });

        return () => {
            socket.off("message");
        };

    })
}

// httpGet();