//Defines the minio server configuration for client connection.
import * as Minio from "minio";
import { configDotenv } from "dotenv";
configDotenv();
const min_client=new Minio.Client({
    port:process.env.port,
    useSSL:false,
    secretKey:process.env.secretKey,
    accessKey:process.env.accessKey,
    endPoint:process.env.endPoint
});
export default min_client;