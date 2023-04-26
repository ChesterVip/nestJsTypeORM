import {SetMetadata} from "@nestjs/common";
//Please Put value in seconds;
export const UseTimeout = (time: number) => SetMetadata("timeoutOfMethod", time);